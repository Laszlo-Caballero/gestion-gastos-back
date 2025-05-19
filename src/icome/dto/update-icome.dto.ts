import { PartialType } from '@nestjs/mapped-types';
import { CreateIcomeDto } from './create-icome.dto';

export class UpdateIcomeDto extends PartialType(CreateIcomeDto) {}
