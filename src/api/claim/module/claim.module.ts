import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimController } from '../controller/claim.controller';
import { ClaimService } from '../service/claim.service';

@Module({
  controllers: [ClaimController],
  providers: [ClaimService],
})
export class ClaimModule {}
