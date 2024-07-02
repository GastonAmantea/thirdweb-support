import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum PaymentMethod {
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  FIAT = 'FIAT'
}

export class SignatureMintDto {
  @ApiProperty()
  @IsString()
  tokenId: string;

  @ApiProperty()
  @IsNumber()
  quantityDesired: number;

  @ApiProperty()
  @IsString()
  buyerAddress: string;

  @ApiProperty()
  @IsString()
  contractAddress: string;

  
  @ApiProperty()
  @IsNumber()
  chainId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;
}

export class ConfirmSignatureMintDto {
  @ApiProperty()
  @IsString()
  txHash: string;
}
