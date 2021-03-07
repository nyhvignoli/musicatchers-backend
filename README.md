<a name="languages"></a>
# MusiCatchers - Backend
- [Português](#pt-readme)
- [English](#en-readme)

<a id="pt-readme"></a>
### PT | [EN](#en-readme)
Estrutura de back-end do Projeto Full Stack do bootcamp da escola Labenu.
Trata-se de um site para streaming de músicas.

### Menu
<a name="pt-menu"></a>
- [Requisitos Básicos](#requisitos)
- [Instruções Gerais](#instrucoes)
- [Scripts](#pt-scripts)
- [Funcionalidades](#funcionalidades)
- [Bibliotecas e Frameworks](#bibliotecas)

<a id="requisitos"></a>
## Requisitos Básicos:
* Git
* Node
* Typescript
* MySQL

<a id="instrucoes"></a>
## Instruções Gerais:
* Clone esse repositório no diretório de sua escolha com o comando `git clone <url>`.
* Abra o projeto na sua IDE favorita.
* Rode o comando `npm install` **ou** `npm i` para instalar as dependências do projeto.
* Crie um arquivo `.env` com as suas informações:
```
# Database
DB_HOST = host do banco de dados
DB_USER = user do banco de dados
DB_PASSWORD = senha
DB_NAME = nome do banco de dados

# JasonWebToken
JWT_KEY = chave para gerar o jason web token
JWT_EXPIRES_IN = tempo de expiração do token

# Bcrypt
BCRYPT_COST = 12
```

<a id="pt-scripts"></a>
## Scripts:
* `npm run tables` para criar as tabelas.
* `npm run test` para rodar os cases de teste.
* `npm run dev` para iniciar a aplicação com hot reload.

<a id="funcionalidades"></a>
## Funcionalidades
* Cadastro
* Login
* Pegar informações da(o) usuária(o) que estiver logada(o).
* Criar música
* Listar todas as músicas
* Exibir detalhes de uma música específica
* Listar todos os generos musicais
* Criar playlist
* Adicionar música à playlist escolhida

<a id="bibliotecas"></a>
## Bibliotecas e Frameworks
* cors
* express
* knex
* mysql
* dotenv
* uuid
* jsonwebtoken
* bcryptjs
* jest

---

<a id="en-readme"></a>
### EN | [PT](#pt-readme)

<a name="pt-menu"></a>
- [Minimum Requirements](#requirements)
- [Instructions](#instructions)
- [Scripts](#scripts)
- [Features](#features)
- [Libs and Frameworks](#libs)

<a id="requirements"></a>
## Minimum Requirements:
* Git
* Node
* Typescript
* MySQL

<a id="instructions"></a>
## Instructions:
* Clone this repository in a directory of your choice running `git clone <url>` command.
* Open the project on your favorite IDE.
* Run the `npm install` command **or** `npm i` to install all the dependencies.
* Create a `.env` file with your environment variables:
```
# Database
DB_HOST = database host
DB_USER = database user name
DB_PASSWORD = user password
DB_NAME = database name

# JasonWebToken
JWT_KEY = key to generate jason web token
JWT_EXPIRES_IN = token expires at

# Bcrypt
BCRYPT_COST = 12
```

<a id="scripts"></a>
## Scripts:
* `npm run tables` to create tables.
* `npm run test` to run test cases.
* `npm run dev` to start the application with hot reload.

<a id="features"></a>
## Features
* Signup
* Login
* Get current user infos
* Create music
* Display all musics
* Display details of an especific music
* Get all music genres
* Create playlist
* Add track to a playlist

<a id="libs"></a>
## Libs and Frameworks
* cors
* express
* knex
* mysql
* dotenv
* uuid
* jsonwebtoken
* bcryptjs
* jest
