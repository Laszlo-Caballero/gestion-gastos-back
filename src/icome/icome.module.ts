import { Module } from '@nestjs/common';
import { IcomeService } from './icome.service';
import { IcomeController } from './icome.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icome } from './entities/icome.entity';
import { User } from 'src/auth/entities/user.entity';
import { MaximumQuantity } from 'src/maximum-quantity/entities/maximum-quantity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Icome, User, MaximumQuantity])],
  controllers: [IcomeController],
  providers: [IcomeService],
})
export class IcomeModule {}
