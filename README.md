# LawerTask - Sistema de Gestão de Tarefas

Sistema completo de gestão de tarefas desenvolvido para escritórios de advocacia, com API REST em NestJS e interface web em Next.js.

## 🚀 Funcionalidades

### Backend (API)
- ✅ Autenticação JWT
- ✅ CRUD completo de tarefas
- ✅ Gestão de clientes
- ✅ Validação de dados
- ✅ Documentação Swagger
- ✅ Testes unitários
- ✅ Banco de dados PostgreSQL com Prisma

### Frontend (Web)
- ✅ Interface responsiva e moderna
- ✅ Dashboard com estatísticas
- ✅ Gestão completa de tarefas
- ✅ Formulários com validação
- ✅ Autenticação integrada
- ✅ Navegação intuitiva

## 🛠️ Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API
- **Jest** - Testes unitários

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Linguagem de programação
- **Tailwind CSS** - Estilização
- **React Hook Form** - Formulários
- **Zod** - Validação de esquemas
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL
- npm ou yarn

## 🚀 Instalação e Configuração

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
# Edite o arquivo .env com suas configurações de banco

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

## 🔧 Configuração do Banco de Dados

### Variáveis de Ambiente (.env)
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/lawertask?schema=public"
JWT_SECRET="sua-chave-secreta-super-segura-aqui"
JWT_EXPIRES_IN="24h"
```

### Dados Iniciais
O sistema já vem com dados de exemplo:
- **Usuário Admin**: admin@lawertask.com / admin123
- **Clientes**: João Silva, Maria Santos, Pedro Oliveira
- **Tarefas**: 3 tarefas de exemplo

## 📚 Documentação da API

Acesse a documentação Swagger em: `http://localhost:3001/api/docs`

### Endpoints Principais

#### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Registro

#### Tarefas
- `GET /api/tasks` - Listar tarefas
- `POST /api/tasks` - Criar tarefa
- `GET /api/tasks/:id` - Buscar tarefa
- `PATCH /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Excluir tarefa
- `GET /api/tasks/stats` - Estatísticas

#### Clientes
- `GET /api/clients` - Listar clientes
- `GET /api/clients/:id` - Buscar cliente

## 🧪 Testes

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

## 📱 Uso do Sistema

### 1. Acesso
- Acesse: `http://localhost:3000`
- Faça login com: admin@lawertask.com / admin123

### 2. Dashboard
- Visualize estatísticas das tarefas
- Acesse ações rápidas

### 3. Gestão de Tarefas
- **Listar**: Visualize todas as tarefas
- **Criar**: Adicione novas tarefas
- **Editar**: Modifique tarefas existentes
- **Excluir**: Remova tarefas

### 4. Funcionalidades
- Filtros por status e prioridade
- Associação com clientes
- Datas de vencimento
- Status de progresso

## 🏗️ Estrutura do Projeto

```
lawertask/
├── lawertask-api/          # Backend NestJS
│   ├── src/
│   │   ├── auth/           # Autenticação
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

## 🚀 Deploy

### Backend (Railway/Render)
1. Configure as variáveis de ambiente
2. Execute as migrações do banco
3. Execute o seed
4. Deploy da aplicação

### Frontend (Vercel)
1. Configure a variável `NEXT_PUBLIC_API_URL`
2. Deploy automático via GitHub

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**Matheus Alexandre**
- GitHub: [@matheusalexan](https://github.com/matheusalexan)

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato: matheus@exemplo.com

---

**LawerTask** - Simplificando a gestão de tarefas para escritórios de advocacia. 