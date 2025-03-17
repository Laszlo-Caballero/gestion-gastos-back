import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  expenseName: string;

  @IsNumber()
  @IsPositive()
  expenseAmount: number;
}
