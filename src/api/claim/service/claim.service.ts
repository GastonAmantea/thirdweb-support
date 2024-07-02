import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfirmSignatureMintDto, PaymentMethod, SignatureMintDto } from '../dto/signature-mint.dto';
import axios from 'axios';
import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from '@thirdweb-dev/sdk';
import { PRIVATE_KEY,THIRDWEB_CLIENT_ID } from 'config';
import { createThirdwebClient, defineChain, getContract } from 'thirdweb';
import { createWallet, privateKeyToAccount } from "thirdweb/wallets";

import {
    generateMintSignature,
} from "thirdweb/extensions/erc1155";
@Injectable()
export class ClaimService {

  public async claim(_claim: SignatureMintDto): Promise<any> {
  
    const chain = defineChain(_claim.chainId);

    const client = createThirdwebClient({
      clientId: THIRDWEB_CLIENT_ID,
    });
    const account = privateKeyToAccount({
      client,
      privateKey: PRIVATE_KEY,
    });

    const _contract = getContract({
      // the client you have created via `createThirdwebClient()`
      client,
      // the chain the contract is deployed on
      chain: chain,
      // the contract's address
      address: _claim.contractAddress,
      // OPTIONAL: the contract's abi
    });



    try {


      // 9 - generate payload for signature mint
      const validityStartTimestamp = new Date(new Date().toISOString());
      const validityEndTimestamp = new Date(validityStartTimestamp.getTime() + 5 * 60 * 1000);

      const mintRequest= {
        to:  _claim.buyerAddress,
        quantity: BigInt(_claim.quantityDesired),
        tokenId:BigInt(_claim.tokenId),
        pricePerToken:_claim.price && _claim.price != 0 ? _claim.price.toString() : undefined,
        //currency:NATIVE_TOKEN_ADDRESS, 
        validityStartTimestamp,
        validityEndTimestamp
      }
      console.log("mintRequest", mintRequest)
      const signatureMintPayload = await generateMintSignature({
        account,
        contract:_contract,
        mintRequest
      });
      return {
        id: 1,
        payload: signatureMintPayload,
      };      
    } catch (error) {
      console.error(error);
      throw new HttpException('There was a problem generating the signature', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
