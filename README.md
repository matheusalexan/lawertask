# LawerTask - Sistema de Gestão de Tarefas

Sistema de gestão de tarefas desenvolvido para escritórios de advocacia, com API REST em NestJS e interface web em Next.js.

## Visão Geral

O LawerTask é uma aplicação web completa que permite gerenciar tarefas associadas a clientes, com sistema de autenticação, dashboard de estatísticas e interface responsiva.

## Funcionalidades

### Backend (API)
- Autenticação JWT com bcrypt
- CRUD completo de tarefas
- Gestão de clientes
- Validação de dados com class-validator
- Documentação automática com Swagger
- Testes unitários
- Banco de dados PostgreSQL com Prisma ORM

### Frontend (Web)
- Interface responsiva com Tailwind CSS
- Dashboard com estatísticas em tempo real
- Gestão completa de tarefas (CRUD)
- Formulários com validação
- Sistema de autenticação integrado
- Navegação intuitiva

## Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js para construção de aplicações escaláveis
- **TypeScript** - Linguagem de programação tipada
- **Prisma** - ORM moderno para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **Swagger** - Documentação da API
- **Jest** - Framework de testes

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Linguagem de programação tipada
- **Tailwind CSS** - Framework CSS utilitário
- **React Hook Form** - Biblioteca para formulários
- **Zod** - Validação de esquemas
- **Axios** - Cliente HTTP
- **Lucide React** - Biblioteca de ícones

## Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL 12 ou superior
- npm ou yarn

## Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/matheusalexan/lawertask.git
cd lawertask
```

### 2. Configure o Backend

```bash
cd lawertask-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Configure o banco de dados
npm run db:generate
npm run db:push

# Execute o seed para criar dados iniciais
npm run db:seed

# Inicie o servidor de desenvolvimento
npm run start:dev
```

### 3. Configure o Frontend

```bash
cd ../lawertask-web

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## Configuração do Banco de Dados

### Variáveis de Ambiente (.env)
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/lawertask?schema=public"
JWT_SECRET="sua-chave-secreta-aqui"
JWT_EXPIRES_IN="24h"
```

### Dados Iniciais
O sistema inclui dados de exemplo para demonstração:
- **Usuário Admin**: admin@lawertask.com / admin123
- **Clientes**: João Silva, Maria Santos, Pedro Oliveira
- **Tarefas**: 3 tarefas de exemplo com diferentes status

## Documentação da API

Acesse a documentação Swagger em: `http://localhost:3001/api/docs`

### Endpoints Principais

#### Autenticação
- `POST /auth/login` - Autenticação de usuário
- `POST /auth/register` - Registro de novo usuário

#### Tarefas
- `GET /api/tasks` - Listar todas as tarefas
- `POST /api/tasks` - Criar nova tarefa
- `GET /api/tasks/:id` - Buscar tarefa específica
- `PATCH /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Excluir tarefa
- `GET /api/tasks/stats` - Obter estatísticas

#### Clientes
- `GET /api/clients` - Listar todos os clientes
- `GET /api/clients/:id` - Buscar cliente específico

## Testes

### Backend
```bash
cd lawertask-api
npm run test
npm run test:cov
```

### Frontend
```bash
cd lawertask-web
npm run test
```

## Uso do Sistema

### 1. Acesso
- URL: `http://localhost:3000`
- Credenciais: admin@lawertask.com / admin123

### 2. Dashboard
- Visualização de estatísticas das tarefas
- Acesso rápido às principais funcionalidades

### 3. Gestão de Tarefas
- **Listagem**: Visualizar todas as tarefas em cards
- **Criação**: Adicionar novas tarefas com formulário completo
- **Edição**: Modificar tarefas existentes
- **Exclusão**: Remover tarefas com confirmação

### 4. Funcionalidades
- Associação de tarefas com clientes
- Sistema de prioridades (Baixa, Média, Alta)
- Status de progresso (A Fazer, Em Andamento, Concluída)
- Datas de vencimento
- Interface responsiva para desktop e mobile

## Estrutura do Projeto

```
lawertask/
├── lawertask-api/          # Backend NestJS
│   ├── src/
│   │   ├── auth/           # Módulo de autenticação
│   │   ├── tasks/          # Módulo de tarefas
│   │   ├── clients/        # Módulo de clientes
│   │   ├── prisma/         # Configuração do banco
│   │   └── common/         # DTOs e utilitários
│   ├── prisma/
│   │   ├── schema.prisma   # Schema do banco
│   │   └── seed.ts         # Dados iniciais
│   └── package.json
├── lawertask-web/          # Frontend Next.js
│   ├── src/
│   │   ├── app/            # Páginas da aplicação
│   │   ├── components/     # Componentes React
│   │   ├── contexts/       # Contextos (Auth)
│   │   ├── services/       # Serviços de API
│   │   └── types/          # Tipos TypeScript
│   └── package.json
└── README.md
```

## Deploy

### Backend (Railway/Render)
1. Configure as variáveis de ambiente
2. Execute as migrações do banco
3. Execute o seed
4. Deploy da aplicação

### Frontend (Vercel)
1. Configure a variável `NEXT_PUBLIC_API_URL`
2. Deploy automático via GitHub

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato através do email: matheus@exemplo.com

---

**LawerTask** - Simplificando a gestão de tarefas para escritórios de advocacia. 
