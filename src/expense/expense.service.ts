import { HttpException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtPayload } from 'src/types/types';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { User } from 'src/auth/entities/user.entity';
import { MaximumQuantity } from 'src/maximum-quantity/entities/maximum-quantity.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(MaximumQuantity)
    private maximumQuantityRepository: Repository<MaximumQuantity>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, user: JwtPayload) {
    const findUser = await this.userRepository.findOneBy({ userId: user.id });

    if (!findUser) throw new HttpException('User not found', 404);

    const findMaximumQuantity = await this.maximumQuantityRepository.findOne({
      where: {
        user: {
          userId: user.id,
        },
      },
      order: {
        maximumQuantityId: 'DESC',
      },
    });

    if (!findMaximumQuantity)
      throw new HttpException('Maximum quantity not found', 404);

    const allExpenses = await this.expenseRepository.find({
      where: {
        user: {
          userId: user.id,
        },
        expenseDate: MoreThanOrEqual(findMaximumQuantity.initialDate),
      },
    });

    const totalExpenses = allExpenses.reduce(
      (acc, expense) => acc + expense.expenseAmount,
      0,
    );

    const newTotal = totalExpenses + createExpenseDto.expenseAmount;

    if (newTotal > findMaximumQuantity.quantity) {
      const newExtra = newTotal - findMaximumQuantity.quantity;

      await this.maximumQuantityRepository.update(
        {
          maximumQuantityId: findMaximumQuantity.maximumQuantityId,
          user: {
            userId: user.id,
          },
        },
        {
          extra: findMaximumQuantity.extra + newExtra,
        },
      );
    }

    const newExpense = this.expenseRepository.create({
      ...createExpenseDto,
      user: findUser,
    });

    const saveExpense = await this.expenseRepository.save(newExpense);

    return {
      message: 'Expense created successfully',
      body: saveExpense,
      status: 201,
    };
  }

  async findAll(user: JwtPayload) {
    const expenses = await this.expenseRepository.find({
      where: {
        user: {
          userId: user.id,
        },
      },
    });

    return {
      message: 'Expenses retrieved successfully',
      body: expenses,
      status: 200,
    };
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
    user: JwtPayload,
  ) {
    const findExpense = await this.expenseRepository.findOne({
      where: {
        expenseId: id,
        user: {
          userId: user.id,
        },
      },
    });

    if (!findExpense) throw new HttpException('Expense not found', 404);

    await this.expenseRepository.update(
      {
        expenseId: id,
        user: {
          userId: user.id,
        },
      },
      updateExpenseDto,
    );

    return {
      message: 'Expense updated successfully',
      body: null,
      status: 200,
    };
  }

  async remove(id: number, user: JwtPayload) {
    const findExpense = await this.expenseRepository.findOne({
      where: {
        expenseId: id,
        user: {
          userId: user.id,
        },
      },
    });

    if (!findExpense) throw new HttpException('Expense not found', 404);

    await this.expenseRepository.delete({
      expenseId: id,
      user: {
        userId: user.id,
      },
    });

    return {
      message: 'Expense deleted successfully',
      body: true,
      status: 200,
    };
  }
}
