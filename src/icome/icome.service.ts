import { HttpException, Injectable } from '@nestjs/common';
import { CreateIcomeDto } from './dto/create-icome.dto';
import { UpdateIcomeDto } from './dto/update-icome.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Icome } from './entities/icome.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { MaximumQuantity } from 'src/maximum-quantity/entities/maximum-quantity.entity';
import { JwtPayload } from 'src/types/types';

@Injectable()
export class IcomeService {
  constructor(
    @InjectRepository(Icome)
    private icomeRepository: Repository<Icome>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(MaximumQuantity)
    private maximumQuantityRepository: Repository<MaximumQuantity>,
  ) {}

  async create(createIcomeDto: CreateIcomeDto, user: JwtPayload) {
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

    const newIcome = this.icomeRepository.create({
      ...createIcomeDto,
      user: findUser,
    });

    if (findMaximumQuantity.extra > 0) {
      const newExtra = findMaximumQuantity.extra - createIcomeDto.amount;
      await this.maximumQuantityRepository.update(
        {
          maximumQuantityId: findMaximumQuantity.maximumQuantityId,
        },
        {
          extra: newExtra > 0 ? newExtra : 0,
        },
      );
    }

    const savedIcome = await this.icomeRepository.save(newIcome);

    return {
      message: 'Icome created successfully',
      body: savedIcome,
      status: 201,
    };
  }

  findAll() {
    return `This action returns all icome`;
  }

  findOne(id: number) {
    return `This action returns a #${id} icome`;
  }

  update(id: number, updateIcomeDto: UpdateIcomeDto) {
    return `This action updates a #${id} icome`;
  }

  remove(id: number) {
    return `This action removes a #${id} icome`;
  }
}
