import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../common/dto/create-task.dto';
import { UpdateTaskDto } from '../common/dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Tarefas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas retornada com sucesso' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas das tarefas' })
  @ApiResponse({ status: 200, description: 'Estatísticas retornadas com sucesso' })
  getStats() {
    return this.tasksService.getTaskStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tarefa por ID' })
  @ApiResponse({ status: 200, description: 'Tarefa encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa excluída com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
} 