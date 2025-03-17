import { PartialType } from '@nestjs/mapped-types';
import { CreateMaximumQuantityDto } from './create-maximum-quantity.dto';

export class UpdateMaximumQuantityDto extends PartialType(CreateMaximumQuantityDto) {}
