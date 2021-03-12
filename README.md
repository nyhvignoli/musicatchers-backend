<a name="languages"></a>
# MusiCatchers - Backend

<a id="pt-readme"></a>
### Português | [English](#en-readme)
Estrutura de back-end do Projeto Full Stack do bootcamp da escola Labenu.
Trata-se de uma API com funcionalidades básicas de um site para streaming de músicas.

<a name="pt-menu"></a>
- [Requisitos Básicos](#requisitos)
- [Primeiros Passos](#primeiros-passos)
- [Scripts Disponíveis](#pt-scripts)
- [Funcionalidades](#funcionalidades)
- [Bibliotecas e Frameworks](#bibliotecas)
- [Documentação](https://documenter.getpostman.com/view/13242412/Tz5p6dMa)

<a id="requisitos"></a>
## Requisitos Básicos:
* Git
* Node
* Typescript
* MySQL

<a id="primeiros-passos"></a>
## Primeiros Passos:
* Clone esse repositório no diretório de sua escolha com o comando `git clone <url>`.
* Abra o projeto na sua IDE favorita.
* Rode o comando `npm install` **ou** `npm i` para instalar as dependências do projeto.
* Crie um arquivo `.env` na pasta raíz do projeto com as suas informações:
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
## Scripts Disponíveis:
* `npm run tables` para criar as tabelas.
* `npm run populate` para popular a tabela de gêneros musicais.
* `npm run test` para rodar os cases de teste.
* `npm run start` para iniciar a aplicação.
* `npm run dev` para iniciar a aplicação em modo de desenvolvimento, com hot reload.
* `npm run build` para construir a aplicação para produção na pasta `build`.

<a id="funcionalidades"></a>
## Funcionalidades:
* Cadastro
* Login
* Pegar informações da(o) usuária(o) que estiver logada(o)
* Criar música
* Listar todas as músicas
* Exibir detalhes de uma música específica
* Listar todos os generos musicais
* Criar playlist
* Adicionar música à playlist escolhida
* Listar todas as músicas da playlist escolhida

Visite [MusiCatchers API](https://documenter.getpostman.com/view/13242412/Tz5p6dMa) para ver exemplos de requisições.

<a id="bibliotecas"></a>
## Bibliotecas e Frameworks:
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
### [Português](#pt-readme) | English
Back-end structure of the Full Stack Project developed at Labenu School bootcamp.
An API with basic features of an music streaming website.

<a name="pt-menu"></a>
- [Minimum Requirements](#requirements)
- [Getting Started](#getting-started)
- [Available Scripts](#scripts)
- [Features](#features)
- [Libs and Frameworks](#libs)
- [Documentation](https://documenter.getpostman.com/view/13242412/Tz5p6dMa)

<a id="requirements"></a>
## Minimum Requirements:
* Git
* Node
* Typescript
* MySQL

<a id="getting-started"></a>
## Getting Started:
* Clone this repository in a directory of your choice running `git clone <url>` command.
* Open the project on your favorite IDE.
* Run the `npm install` command **or** `npm i` to install all the dependencies.
* On the root directory of the project, create a `.env` file with your environment variables:
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
## Available Scripts:
* `npm run tables` to create tables.
* `npm run populate` to populate the music genre table.
* `npm run test` to run test cases.
* `npm run start` to start the application.
* `npm run dev` to start the application on development mode, with hot reload.
* `npm run build` to build the aplication for production to the `build` folder.

<a id="features"></a>
## Features:
* Signup
* Login
* Get current user infos
* Create music
* Display all musics
* Display details of an especific music
* Get all music genres
* Create playlist
* Add track to a playlist
* Display all tracks of an especific playlist

Check out the [MusiCatchers API](https://documenter.getpostman.com/view/13242412/Tz5p6dMa) for requests examples.

<a id="libs"></a>
## Libs and Frameworks:
* cors
* express
* knex
* mysql
* dotenv
* uuid
* jsonwebtoken
* bcryptjs
* jest
