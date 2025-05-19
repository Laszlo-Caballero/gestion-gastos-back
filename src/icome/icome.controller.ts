import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IcomeService } from './icome.service';
import { CreateIcomeDto } from './dto/create-icome.dto';
import { UpdateIcomeDto } from './dto/update-icome.dto';
import { RequestWithUser } from 'src/types/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('icome')
export class IcomeController {
  constructor(private readonly icomeService: IcomeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createIcomeDto: CreateIcomeDto,
    @Request() req: RequestWithUser,
  ) {
    return this.icomeService.create(createIcomeDto, req.user);
  }

  @Get()
  findAll() {
    return this.icomeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.icomeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIcomeDto: UpdateIcomeDto) {
    return this.icomeService.update(+id, updateIcomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.icomeService.remove(+id);
  }
}
