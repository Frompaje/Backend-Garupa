# Serviço de Transferência - Backend

## 📜 Descrição

Este projeto implementa um serviço de transferência financeira
full-stack, onde os usuários podem criar transferências e verificar
datas de vencimento.

## Deploy 🌍
Se você não quiser baixar e configurar o projeto localmente, disponibilizamos o serviço completo online!

- **Frontend**: Acesse 👉 [garupa.vercel.app](https://garupa.vercel.app)
- **Backend** e **Banco**: Hospedados na Railway, garantindo tudo funcionando direitinho. 🚀

## ⚙️ Funcionalidades

Criar Transferência: O serviço backend receberá uma requisição para criar uma transferência de um determinado valor (com até 2 casas decimais). O valor e as contas de origem e destino serão validados, e a transferência será registrada.

Verificar Data de Vencimento: O backend validará a data de vencimento, caso seja fornecida. Se a data for anterior à data atual, a transferência será rejeitada.

Persistência de Dados: Todas as transferências serão armazenadas em um banco de dados, permitindo a consulta e auditoria de todas as transações realizadas.

## Pré-requisitos 🛠️
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- 🟢 **Node.js** (versão LTS recomendada).
- 📦 **Gerenciador de pacotes** npm.
- 🖥️ **Git** para clonar o repositório.
- 🐳  **Docker** para gerenciar o banco de dados com facilidade. 

## Dependências

- <b>Express:</b> Framework minimalista e flexível para construir APIs e servidores web em Node.js. <br>
- <b>pg:</b> Driver PostgreSQL para Node.js, utilizado para conectar e realizar operações em um banco de dados PostgreSQL. <br>
- <b>typescript:</b> Linguagem de programação que adiciona tipagem estática ao JavaScript, melhorando a segurança e a legibilidade do código. <br>
- <b>zod:</b> Biblioteca de validação e esquema de tipos, usada para validar dados de entrada e garantir que os dados estejam em conformidade com um formato esperado. <br>
- <b>uuid:</b> Biblioteca para gerar identificadores únicos universais (UUID), útil para identificar de forma única registros ou transações no sistema. <br>
- <b>dotenv:</b> Biblioteca para carregar variáveis de ambiente a partir de um arquivo .env, útil para configurar dados sensíveis como credenciais de banco de dados e chaves de API. <br>
- <b>vitest:</b> Framework de testes para JavaScript e TypeScript, otimizado para testes rápidos e integrados, utilizado para testar o backend do sistema.<br>
- <b>vitest-mock-extended:</b> Biblioteca para mocks avançados durante testes com Vitest, permitindo simulações mais precisas e extensas de funções e objetos.<br>
- <b>pino:</b> Biblioteca de logging para Node.js, altamente performática e configurável, utilizada para gerar logs estruturados e facilitar o rastreamento de eventos no backend do sistema.<br>

## 🚀 Como rodar

É necessário criar uma cópia deste repositório com o git para a sua máquina local.
Após clonar o projeto, crie seu arquivo `.env` e coloque as variavies ambiente

```ts
PORT=
PG_USERNAME=
PG_PASSWORD=
PG_DATABASE=
```

Com as variáveis configuradas, execute o comando abaixo no terminal para instalar as dependências do projeto

```
npm i
```

Depois de instalar as dependências, vamos iniciar o serviço do banco de dados com o Docker. Para isso, execute o seguinte comando no seu terminal:

```
docker compose up
```

Agora, para iniciar o projeto, rode o comando abaixo no terminal:

```
npm run dev
```

## 🌐 Rotas

#### API Endpoints

> <b> Esta rota é responsável pela criação de novas transferências. Ao fazer uma requisição POST para esse endpoint, você cria uma nova transferência com os dados fornecidos no corpo da requisição. </b>

#### POST http://localhost:3333/transfers

<b>Request Body: </b>

```ts
{
    "externalId":"123",
    "amount":"100.50",
    "expectedOn":"2024-12-30T14:00:00Z" // VALOR OPCIONAL ,
}
```

<b>Response: </b>

```ts
  Transfer created successfully
```

<br>

> <b>Essa rota permite que você recupere as informações de uma transferência existente, especificando seu id na URL.</b>

#### GET http://localhost:3333/transfers/:id

<b>Request Params: </b>

```ts
{
    "id":"065bdd01-3b88-4bb3-af9b-fc71fa728f81",
}
```

<b>Response: </b>

```ts
{
    "transfer": {
        "id": "065bdd01-3b88-4bb3-af9b-fc71fa728f81",
        "external_id": "333222",
        "amount": "30000.00",
        "expected_on": null,
        "status": "Em analise",
        "created_at": "2025-01-02T19:14:59.927Z",
        "updated_at": null
    }
}
```
