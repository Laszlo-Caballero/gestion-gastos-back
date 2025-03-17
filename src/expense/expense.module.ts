import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { User } from 'src/auth/entities/user.entity';
import { MaximumQuantity } from 'src/maximum-quantity/entities/maximum-quantity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, User, MaximumQuantity])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
