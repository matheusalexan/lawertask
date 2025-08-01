import { IsString, IsNotEmpty, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class CreateTaskDto {
  @ApiProperty({ description: 'Título da tarefa' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Descrição da tarefa' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Status da tarefa', enum: TaskStatus })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ description: 'Prioridade da tarefa', enum: Priority })
  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @ApiProperty({ description: 'Data de vencimento' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ description: 'ID do cliente' })
  @IsString()
  @IsNotEmpty()
  clientId: string;
} 