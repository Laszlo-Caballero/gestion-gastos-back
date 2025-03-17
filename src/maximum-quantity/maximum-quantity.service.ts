import { HttpException, Injectable } from '@nestjs/common';
import { CreateMaximumQuantityDto } from './dto/create-maximum-quantity.dto';
import { UpdateMaximumQuantityDto } from './dto/update-maximum-quantity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MaximumQuantity } from './entities/maximum-quantity.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { JwtPayload } from 'src/types/types';

@Injectable()
export class MaximumQuantityService {
  constructor(
    @InjectRepository(MaximumQuantity)
    private maximumQuantityRepository: Repository<MaximumQuantity>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    createMaximumQuantityDto: CreateMaximumQuantityDto,
    user: JwtPayload,
  ) {
    const findUser = await this.userRepository.findOneBy({
      userId: user.id,
    });

    if (!findUser) throw new HttpException('User not found', 404);

    const newMaximumQuantity = await this.maximumQuantityRepository.create({
      ...createMaximumQuantityDto,
      user: findUser,
    });

    const saveMaximumQuantity =
      await this.maximumQuantityRepository.save(newMaximumQuantity);

    return {
      message: 'Maximum quantity created successfully',
      body: saveMaximumQuantity,
      status: 201,
    };
  }

  async findAll(user: JwtPayload) {
    const maximumQuantities = await this.maximumQuantityRepository.find({
      where: {
        user: {
          userId: user.id,
        },
      },
    });

    return {
      message: 'Maximum quantities retrieved successfully',
      body: maximumQuantities,
      status: 200,
    };
  }

  async findOne(id: number, user: JwtPayload) {
    const findMaximumQuantity = await this.maximumQuantityRepository.findOne({
      where: {
        maximumQuantityId: id,
        user: {
          userId: user.id,
        },
      },
    });

    if (!findMaximumQuantity)
      throw new HttpException('Maximum quantity not found', 404);

    return {
      message: 'Maximum quantity retrieved successfully',
      body: findMaximumQuantity,
      status: 200,
    };
  }

  async update(
    id: number,
    updateMaximumQuantityDto: UpdateMaximumQuantityDto,
    user: JwtPayload,
  ) {
    const findMaximumQuantity = await this.maximumQuantityRepository.findOne({
      where: {
        maximumQuantityId: id,
        user: {
          userId: user.id,
        },
      },
    });

    if (!findMaximumQuantity)
      throw new HttpException('Maximum quantity not found', 404);

    const extraMaximumQuantity =
      (updateMaximumQuantityDto.quantity || findMaximumQuantity.quantity) -
      findMaximumQuantity.quantity;

    const newExtra = findMaximumQuantity.extra - extraMaximumQuantity;

    await this.maximumQuantityRepository.update(
      {
        maximumQuantityId: id,
        user: {
          userId: user.id,
        },
      },
      { ...updateMaximumQuantityDto, extra: newExtra < 0 ? 0 : newExtra },
    );
    return {
      message: 'Maximum quantity updated successfully',
      status: 200,
      body: null,
    };
  }

  //TODO: Is requierd this metod?
  remove(id: number) {
    return `This action removes a #${id} maximumQuantity`;
  }
}
