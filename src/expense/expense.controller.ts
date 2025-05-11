import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/types/types';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Request() req: RequestWithUser,
  ) {
    return this.expenseService.create(createExpenseDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.expenseService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Request() req: RequestWithUser,
  ) {
    return this.expenseService.update(+id, updateExpenseDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.expenseService.remove(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('import/csv')
  @UseInterceptors(FileInterceptor('file'))
  importCsv(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Request() req: RequestWithUser,
  ) {
    return this.expenseService.importCsv(file, req.user);
  }
}
