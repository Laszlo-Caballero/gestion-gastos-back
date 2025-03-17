import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/types';
import { MaximumQuantity } from 'src/maximum-quantity/entities/maximum-quantity.entity';
import { Expense } from 'src/expense/entities/expense.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectRepository(MaximumQuantity)
    private maximumQuantityRepository: Repository<MaximumQuantity>,
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { password, username } = createAuthDto;

    const findUsername = await this.userRepository.findOne({
      where: { username },
    });

    if (findUsername) throw new HttpException('Username already exists', 400);

    const hashPassword = await hash(password, 10);

    const user = this.userRepository.create({
      username,
      password: hashPassword,
    });

    const saveUser = await this.userRepository.save(user);

    const payload = {
      username: saveUser.username,
      id: saveUser.userId,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'User created',
      body: {
        user: saveUser,
        token,
      },
      status: 201,
    };
  }

  async login(createAuthDto: CreateAuthDto) {
    const { password, username } = createAuthDto;

    const findUser = await this.userRepository.findOne({
      where: { username },
    });

    if (!findUser) throw new HttpException('User not found', 404);

    const comparePassword = await compare(password, findUser.password);

    if (!comparePassword) throw new HttpException('Invalid credentials', 401);

    const payload = {
      username: findUser.username,
      id: findUser.userId,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'User logged in',
      status: 200,
      body: {
        user: findUser,
        token,
      },
    };
  }

  async resumen(user: JwtPayload) {
    const lastQuantity = await this.maximumQuantityRepository.findOne({
      where: {
        user: {
          userId: user.id,
        },
      },
      order: {
        maximumQuantityId: 'DESC',
      },
    });

    const expenses = await this.expenseRepository.findOne({
      where: {
        user: {
          userId: user.id,
        },
      },
      order: {
        expenseId: 'DESC',
      },
    });

    return {
      message: 'Resumen',
      status: 200,
      body: {
        lastQuantity,
        expenses,
      },
    };
  }

  async user(user: JwtPayload) {
    const findUser = await this.userRepository.findOne({
      where: {
        userId: user.id,
      },
    });

    if (!findUser) throw new HttpException('User not found', 404);

    return {
      message: 'User retrieved successfully',
      body: findUser,
      status: 200,
    };
  }
}
