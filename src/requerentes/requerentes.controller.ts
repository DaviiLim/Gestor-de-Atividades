import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRequerenteDto } from './dto/create-requerente.dto';
import { UpdateRequerenteDto } from './dto/update-requerente.dto';
import { RequerentesService } from './requerentes.service';

@Controller('requerentes')
export class RequerentesController {
  constructor(private readonly requerentesService: RequerentesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRequerenteDto: CreateRequerenteDto) {
    return this.requerentesService.create(createRequerenteDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.requerentesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.requerentesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateRequerenteDto: UpdateRequerenteDto) {
    return this.requerentesService.update(+id, updateRequerenteDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.requerentesService.remove(+id);
  }
}
