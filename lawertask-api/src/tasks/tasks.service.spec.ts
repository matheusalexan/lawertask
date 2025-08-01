import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    client: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar uma nova tarefa com sucesso', async () => {
      const createTaskDto = {
        title: 'Teste',
        description: 'Descrição teste',
        dueDate: '2024-01-01',
        clientId: 'client-id',
      };

      const mockClient = { id: 'client-id', name: 'Cliente Teste' };
      const mockTask = { id: 'task-id', ...createTaskDto, client: mockClient };

      mockPrismaService.client.findUnique.mockResolvedValue(mockClient);
      mockPrismaService.task.create.mockResolvedValue(mockTask);

      const result = await service.create(createTaskDto);

      expect(result).toEqual(mockTask);
      expect(mockPrismaService.client.findUnique).toHaveBeenCalledWith({
        where: { id: 'client-id' },
      });
      expect(mockPrismaService.task.create).toHaveBeenCalled();
    });

    it('deve lançar erro quando cliente não for encontrado', async () => {
      const createTaskDto = {
        title: 'Teste',
        description: 'Descrição teste',
        dueDate: '2024-01-01',
        clientId: 'client-id',
      };

      mockPrismaService.client.findUnique.mockResolvedValue(null);

      await expect(service.create(createTaskDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as tarefas', async () => {
      const mockTasks = [
        { id: '1', title: 'Tarefa 1' },
        { id: '2', title: 'Tarefa 2' },
      ];

      mockPrismaService.task.findMany.mockResolvedValue(mockTasks);

      const result = await service.findAll();

      expect(result).toEqual(mockTasks);
      expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
        include: { client: true },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('deve retornar uma tarefa específica', async () => {
      const mockTask = { id: 'task-id', title: 'Tarefa Teste' };

      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);

      const result = await service.findOne('task-id');

      expect(result).toEqual(mockTask);
      expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({
        where: { id: 'task-id' },
        include: { client: true },
      });
    });

    it('deve lançar erro quando tarefa não for encontrada', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);

      await expect(service.findOne('task-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
}); 