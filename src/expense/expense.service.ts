import { HttpException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtPayload } from 'src/types/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, user: JwtPayload) {
    const findUser = await this.userRepository.findOneBy({ userId: user.id });

    if (!findUser) throw new HttpException('User not found', 404);

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
    const findUser = await this.userRepository.findOneBy({ userId: user.id });

    if (!findUser) throw new HttpException('User not found', 404);

    const expenses = await this.expenseRepository.find({
      where: { user: findUser },
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
    const findUser = await this.userRepository.findOneBy({ userId: user.id });

    if (!findUser) throw new HttpException('User not found', 404);

    const findExpense = await this.expenseRepository.findOne({
      where: { expenseId: id, user: findUser },
    });

    if (!findExpense) throw new HttpException('Expense not found', 404);

    const updatedExpense = await this.expenseRepository.update(
      {
        expenseId: id,
        user: findUser,
      },
      updateExpenseDto,
    );

    return {
      message: 'Expense updated successfully',
      body: updatedExpense,
      status: 200,
    };
  }

  async remove(id: number, user: JwtPayload) {
    const findUser = await this.userRepository.findOneBy({ userId: user.id });

    if (!findUser) throw new HttpException('User not found', 404);

    const findExpense = await this.expenseRepository.findOne({
      where: { expenseId: id, user: findUser },
    });

    if (!findExpense) throw new HttpException('Expense not found', 404);

    await this.expenseRepository.delete({
      expenseId: id,
      user: findUser,
    });

    return {
      message: 'Expense deleted successfully',
      body: true,
      status: 200,
    };
  }
}
