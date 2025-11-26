# TaskMaster

TaskMaster é um template de aplicação fullstack voltado para estudos de **arquitetura**, **DDD** e **separação de regras de negócio**.  
O projeto é um **monorepo com Turborepo** que contém:

- **Backend** – API em **Next.js** (Route Handlers / server)
- **Web** – aplicação web em **Next.js**
- **Mobile** – aplicação mobile em **React Native**
- **Core** – núcleo de regras de negócio e testes (Domain-Driven Design + Clean Architecture)
- **db** – pasta de banco de dados compartilhado (dentro de `apps/db`)

O foco não é só “fazer funcionar”, mas mostrar **como organizar bem o domínio**, com **entidades ricas**, **objetos de valor**, **casos de uso** e **inversão de dependência**.

---

## Funcionalidades do template

O template já inclui o fluxo básico de conta de usuário:

- Criação de conta (registro)
- Autenticação (login)
- Edição de dados de usuário (ex.: alteração de nome de usuário)

Essas funcionalidades são implementadas usando o **Core compartilhado**, consumido por:

- Backend (API)
- Web (interface web)
- Mobile (aplicativo React Native)

---

## Tecnologias utilizadas

- **Monorepo & Build**
  - [Turborepo](https://turbo.build/)
- **Backend**
  - [Nest.js](https://nestjs.com/)
  - [Prisma](https://www.prisma.io/) (ORM)
- **Web**
  - [Next.js](https://nextjs.org/)
- **Mobile**
  - [React Native](https://reactnative.dev/)
- **Domínio & Arquitetura**
  - Domain-Driven Design (DDD)
  - Clean Architecture
  - Inversão de dependência (camadas de aplicação dependem do Core, e não o contrário)
- **Testes**
  - Testes unitários no Core com **100% de cobertura**

---

## Estrutura geral do monorepo

Visão simplificada:

```txt
.
├── apps
│   ├── backend      # API em Nest.js
│   ├── web          # Frontend web em Next.js
│   ├── mobile       # App mobile em React Native
│   └── db           # Banco de dados compartilhado
└── packages
    └── core         # Núcleo de domínio, casos de uso e testes unitários
```

## Setup do ambiente

1. **Instalar dependências na raiz do monorepo**

Na raiz do projeto, instale as dependências:

```bash
npm install
```

2. **Configurar variáveis de ambiente (.env)**

Cada app possui um arquivo `.env.example`.
Basta copiar/renomear para `.env`

> ⚠️ O conteúdo padrão já funciona em desenvolvimento

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
```

> ⚠️ Você não precisa alterar nada dentro desses arquivos para rodar o projeto em modo de desenvolvimento.

3. **Gerar Prisma Client e rodar migrations (Backend)**

Entre na pasta do backend e rode o comando do Prisma:

```bash
cd apps/backend
npx prisma migrate dev
```

Isso vai:

- Aplicar as migrations do banco de dados;
- Gerar o Prisma Client usado pelo backend.

4. **Rodar o projeto**

De volta à raiz do monorepo, execute:

```bash
npm run dev
```

> Ajuste o comando acima se o monorepo usar outro script para iniciar todas as apps (por exemplo, `turbo dev`).

---

### Observação sobre o app Mobile

Para rodar o app mobile, é necessário ajustar o script `dev` no `package.json` do projeto mobile:

1. Abra `apps/mobile/package.json`.
2. Localize o script de desenvolvimento que está como "\_dev".
3. Renomeie/ajuste para que o script `dev` seja o alvo correto, por exemplo:

```jsonc
{
  "scripts": {
    "dev": "expo start --ios", // para iOS
    // "dev": "expo start --android" // para Android
  },
}
```

4. Se quiser rodar no **Android**, basta trocar o comando do script `dev` para apontar para o Android:

```jsonc
{
  "scripts": {
    "dev": "expo start --android",
  },
}
```

Depois disso, para iniciar somente o app mobile:

```bash
cd apps/mobile
npm run dev
```
