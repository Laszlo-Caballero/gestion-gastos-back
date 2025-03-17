import { Module } from '@nestjs/common';
import { MaximumQuantityService } from './maximum-quantity.service';
import { MaximumQuantityController } from './maximum-quantity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaximumQuantity } from './entities/maximum-quantity.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaximumQuantity, User])],
  controllers: [MaximumQuantityController],
  providers: [MaximumQuantityService],
})
export class MaximumQuantityModule {}
