import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from '../common/dto/create-task.dto';
import { UpdateTaskDto } from '../common/dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { clientId, ...taskData } = createTaskDto;

    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return this.prisma.task.create({
      data: {
        ...taskData,
        dueDate: new Date(taskData.dueDate),
        clientId,
      },
      include: {
        client: true,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    const { clientId, ...taskData } = updateTaskDto;

    if (clientId) {
      const client = await this.prisma.client.findUnique({
        where: { id: clientId },
      });

      if (!client) {
        throw new NotFoundException('Cliente não encontrado');
      }
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        ...taskData,
        ...(taskData.dueDate && { dueDate: new Date(taskData.dueDate) }),
        ...(clientId && { clientId }),
      },
      include: {
        client: true,
      },
    });
  }

  async remove(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Tarefa removida com sucesso' };
  }

  async getTaskStats() {
    const [total, todo, doing, done] = await Promise.all([
      this.prisma.task.count(),
      this.prisma.task.count({ where: { status: 'TODO' } }),
      this.prisma.task.count({ where: { status: 'DOING' } }),
      this.prisma.task.count({ where: { status: 'DONE' } }),
    ]);

    return {
      total,
      todo,
      doing,
      done,
    };
  }
} 