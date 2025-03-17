import { Module } from '@nestjs/common';
import { MaximumQuantityService } from './maximum-quantity.service';
import { MaximumQuantityController } from './maximum-quantity.controller';

@Module({
  controllers: [MaximumQuantityController],
  providers: [MaximumQuantityService],
})
export class MaximumQuantityModule {}
