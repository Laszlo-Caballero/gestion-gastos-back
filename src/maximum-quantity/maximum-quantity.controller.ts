import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MaximumQuantityService } from './maximum-quantity.service';
import { CreateMaximumQuantityDto } from './dto/create-maximum-quantity.dto';
import { UpdateMaximumQuantityDto } from './dto/update-maximum-quantity.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/types/types';

@Controller('maximum-quantity')
export class MaximumQuantityController {
  constructor(
    private readonly maximumQuantityService: MaximumQuantityService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createMaximumQuantityDto: CreateMaximumQuantityDto,
    @Request() req: RequestWithUser,
  ) {
    return this.maximumQuantityService.create(
      createMaximumQuantityDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.maximumQuantityService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('last')
  findLast(@Request() req: RequestWithUser) {
    return this.maximumQuantityService.findLast(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.maximumQuantityService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaximumQuantityDto: UpdateMaximumQuantityDto,
    @Request() req: RequestWithUser,
  ) {
    return this.maximumQuantityService.update(
      +id,
      updateMaximumQuantityDto,
      req.user,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maximumQuantityService.remove(+id);
  }
}
