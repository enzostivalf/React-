Este repositório contém o backend e o frontend. Siga as instruções abaixo para configurar e executar o projeto localmente.

## Backend

### Usando Docker

Se o Docker estiver instalado, execute o seguinte comando na raiz do projeto para subir o banco de dados:

docker compose up -d

### Usando banco de dados próprio

Se preferir utilizar um banco de dados já existente, edite o arquivo `.env` localizado na pasta `backend` com as credenciais do seu banco.

### Executando o backend

Acesse a pasta `backend` e execute os comandos:

npm install  
npm run db:migrate  
npm run start

## Frontend

Acesse a pasta `frontend` e execute os comandos:

npm install  
npm run start

## Pré-requisitos

- Node.js (versão 16 ou superior)  
- Docker e Docker Compose (caso utilize o banco de dados via container)
