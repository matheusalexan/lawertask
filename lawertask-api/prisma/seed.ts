import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lawertask.com' },
    update: {},
    create: {
      email: 'admin@lawertask.com',
      password: hashedPassword,
      name: 'Administrador',
    },
  });

  console.log('✅ Usuário admin criado:', admin.email);

  // Criar clientes de exemplo
  const clientes = await Promise.all([
    prisma.client.upsert({
      where: { email: 'joao@exemplo.com' },
      update: {},
      create: {
        name: 'João Silva',
        email: 'joao@exemplo.com',
        phone: '(11) 99999-9999',
      },
    }),
    prisma.client.upsert({
      where: { email: 'maria@exemplo.com' },
      update: {},
      create: {
        name: 'Maria Santos',
        email: 'maria@exemplo.com',
        phone: '(11) 88888-8888',
      },
    }),
    prisma.client.upsert({
      where: { email: 'pedro@exemplo.com' },
      update: {},
      create: {
        name: 'Pedro Oliveira',
        email: 'pedro@exemplo.com',
        phone: '(11) 77777-7777',
      },
    }),
  ]);

  console.log('✅ Clientes criados:', clientes.length);

  // Criar tarefas de exemplo
  const tarefas = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Revisar contrato comercial',
        description: 'Analisar e revisar o contrato comercial do cliente João Silva',
        status: 'TODO',
        priority: 'HIGH',
        dueDate: new Date('2024-01-15'),
        clientId: clientes[0].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Preparar documentação para processo',
        description: 'Organizar toda a documentação necessária para o processo da Maria Santos',
        status: 'DOING',
        priority: 'MEDIUM',
        dueDate: new Date('2024-01-20'),
        clientId: clientes[1].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Consultoria jurídica',
        description: 'Realizar consultoria jurídica para Pedro Oliveira sobre questões trabalhistas',
        status: 'DONE',
        priority: 'LOW',
        dueDate: new Date('2024-01-10'),
        clientId: clientes[2].id,
      },
    }),
  ]);

  console.log('✅ Tarefas criadas:', tarefas.length);
  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 