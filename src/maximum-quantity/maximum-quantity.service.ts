import { Injectable } from '@nestjs/common';
import { CreateMaximumQuantityDto } from './dto/create-maximum-quantity.dto';
import { UpdateMaximumQuantityDto } from './dto/update-maximum-quantity.dto';

@Injectable()
export class MaximumQuantityService {
  create(createMaximumQuantityDto: CreateMaximumQuantityDto) {
    return 'This action adds a new maximumQuantity';
  }

  findAll() {
    return `This action returns all maximumQuantity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maximumQuantity`;
  }

  update(id: number, updateMaximumQuantityDto: UpdateMaximumQuantityDto) {
    return `This action updates a #${id} maximumQuantity`;
  }

  remove(id: number) {
    return `This action removes a #${id} maximumQuantity`;
  }
}
