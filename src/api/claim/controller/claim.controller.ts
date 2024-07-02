import { Body, Controller, Inject, Post, Put, Res, Param, Req } from '@nestjs/common';
import { ClaimService } from '../service/claim.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ConfirmSignatureMintDto, SignatureMintDto } from '../dto/signature-mint.dto';

@ApiTags('CLAIM')
@Controller('claim')
export class ClaimController {
  @Inject(ClaimService)
  private readonly service: ClaimService;

  @Post()
  private async claim(@Body() body: SignatureMintDto): Promise<any> {
    const result = await this.service.claim(body);
    const replacer = (key: string, value: any) => (typeof value === 'bigint' ? value.toString() : value);

    const jsonString = JSON.stringify(result, replacer);

    // Parse the JSON string back to an object
    const parsedResult = JSON.parse(jsonString);
  
    return parsedResult;

}
}
