import { PartialType } from '@nestjs/mapped-types';
import { CreateRequerenteDto } from './create-requerente.dto';

export class UpdateRequerenteDto extends PartialType(CreateRequerenteDto) {}
