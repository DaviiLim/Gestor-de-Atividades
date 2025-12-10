import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Req } from '@nestjs/common';
import { ChamadosService } from './chamados.service';
import { CreateChamadoDto } from './dto/create-chamado.dto';
import { UpdateChamadoDto } from './dto/update-chamado.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chamados')
@UseGuards(JwtAuthGuard)
export class ChamadosController {
  constructor(private readonly chamadosService: ChamadosService) {}

  @Post()
  create(@Body() createChamadoDto: CreateChamadoDto, @Req() req) {
     const tecnicoId = req.user.id; 
    return this.chamadosService.create(createChamadoDto, tecnicoId);
  }

  @Get()
  findAll() {
    return this.chamadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.chamadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateChamadoDto: UpdateChamadoDto) {
    return this.chamadosService.update(+id, updateChamadoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.chamadosService.remove(+id);
  }

  @Patch('fechar/:id')
  fecharChamado(
    @Param('id') id: number,
    @Req() req) {
    const tecnicoId = req.user.id; 
    return this.chamadosService.fecharChamado(id, tecnicoId);
  }
}
