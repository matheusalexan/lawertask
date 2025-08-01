# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-01-XX

### Adicionado
- **Backend (NestJS)**
  - Sistema de autenticação JWT completo
  - CRUD completo de tarefas (Create, Read, Update, Delete)
  - Gestão de clientes
  - Validação de dados com class-validator
  - Documentação Swagger da API
  - Configuração do Prisma ORM com PostgreSQL
  - Testes unitários para serviços
  - Script de seed para dados iniciais
  - Estrutura modular organizada

- **Frontend (Next.js)**
  - Interface responsiva com Tailwind CSS
  - Sistema de autenticação integrado
  - Dashboard com estatísticas em tempo real
  - Páginas de listagem, criação e edição de tarefas
  - Formulários com validação usando React Hook Form + Zod
  - Navegação intuitiva com menu lateral
  - Contexto de autenticação global
  - Componentes reutilizáveis
  - Testes unitários para componentes

- **Funcionalidades Principais**
  - Login/logout de usuários
  - Dashboard com métricas de tarefas
  - Gestão completa de tarefas (CRUD)
  - Associação de tarefas com clientes
  - Sistema de prioridades (Baixa, Média, Alta)
  - Status de progresso (A Fazer, Em Andamento, Concluída)
  - Datas de vencimento
  - Interface moderna e intuitiva

### Tecnologias Implementadas
- **Backend**: NestJS, TypeScript, Prisma, PostgreSQL, JWT, Swagger, Jest
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, React Hook Form, Zod, Axios
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: JWT com bcrypt para senhas
- **Testes**: Jest para backend e frontend

### Arquitetura
- **Backend**: Arquitetura modular com separação de responsabilidades
- **Frontend**: App Router do Next.js 14 com componentes funcionais
- **Banco**: Schema relacional otimizado com relacionamentos
- **API**: RESTful com documentação automática

### Dados Iniciais
- Usuário administrador: admin@lawertask.com / admin123
- 3 clientes de exemplo
- 3 tarefas de exemplo com diferentes status e prioridades

### Documentação
- README completo com instruções de instalação
- Documentação da API via Swagger
- Comentários no código
- Estrutura de pastas organizada

---

## Próximas Versões

### [1.1.0] - Planejado
- Filtros avançados para tarefas
- Sistema de busca
- Paginação
- Exportação de dados
- Notificações em tempo real

### [1.2.0] - Planejado
- Upload de arquivos
- Sistema de comentários
- Relatórios avançados
- Integração com calendário
- API para mobile

### [2.0.0] - Planejado
- Múltiplos usuários e permissões
- Workspaces para escritórios
- Integração com sistemas externos
- Dashboard avançado com gráficos
- Automação de tarefas 