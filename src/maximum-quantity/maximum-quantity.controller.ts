import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaximumQuantityService } from './maximum-quantity.service';
import { CreateMaximumQuantityDto } from './dto/create-maximum-quantity.dto';
import { UpdateMaximumQuantityDto } from './dto/update-maximum-quantity.dto';

@Controller('maximum-quantity')
export class MaximumQuantityController {
  constructor(private readonly maximumQuantityService: MaximumQuantityService) {}

  @Post()
  create(@Body() createMaximumQuantityDto: CreateMaximumQuantityDto) {
    return this.maximumQuantityService.create(createMaximumQuantityDto);
  }

  @Get()
  findAll() {
    return this.maximumQuantityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maximumQuantityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaximumQuantityDto: UpdateMaximumQuantityDto) {
    return this.maximumQuantityService.update(+id, updateMaximumQuantityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maximumQuantityService.remove(+id);
  }
}
