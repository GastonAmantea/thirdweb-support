import { Module } from '@nestjs/common';
import { ClaimModule } from './claim/module/claim.module';


@Module({
  imports: [ ClaimModule],
})
export class ApiModule {}
