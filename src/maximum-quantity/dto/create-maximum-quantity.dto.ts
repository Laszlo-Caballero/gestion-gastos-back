import { IsNumber, IsPositive } from 'class-validator';

export class CreateMaximumQuantityDto {
  @IsNumber()
  @IsPositive()
  quantity: number;
}
