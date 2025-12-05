import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRequerenteDto } from './dto/create-requerente.dto';
import { UpdateRequerenteDto } from './dto/update-requerente.dto';
import { RequerentesService } from './requerentes.service';

@Controller('requerentes')
@UseGuards(JwtAuthGuard)
export class RequerentesController {
  constructor(private readonly requerentesService: RequerentesService) {}

  @Post()
  create(@Body() createRequerenteDto: CreateRequerenteDto) {
    return this.requerentesService.create(createRequerenteDto);
  }

  @Get()
  findAll() {
    return this.requerentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requerentesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequerenteDto: UpdateRequerenteDto) {
    return this.requerentesService.update(+id, updateRequerenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requerentesService.remove(+id);
  }
}
