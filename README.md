# Welcome to storefront-backend 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> A node express server application providing restful api endpoints to manage products and user orders for an online store.

## Prerequisites

* npm >= 6.9.0
* node >= 12.0.0

* yarn

## Install

```sh
yarn install
```

## Database Setup
The server application is configured to run with a Postgresql database running with the following settings:
* Host: 127.0.0.1
* Port: 3001
* Database user: "shopping_user"
* Database name: "shopping"
* Test database name: "shopping_test"

To set up the database, use the following commands in postgresql environment:
```sh
  CREATE USER shopping_user WITH PASSWORD 'yourpasswordhere';
  CREATE DATABASE shopping; 
  GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
  CREATE DATABASE shopping_test;
  GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;
```

> A .env file should also be created containing variables with names matching those seen
in the database.json file and containing all the settings above.

## Environment variables
A .env file is required to hold environment variables for project. Create a .env file and copy the
following into it.
```sh
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=yourpassword123
ENV=dev
BCRYPT_PASSWORD=your-secret-hash-password-123
SALT_ROUNDS=10
TOKEN_SECRET=wicked-witch-of-the-west
```

## Usage

```sh
yarn watch
```
> This starts server appplication which is configured to run at http://localhost:3000.



## Run tests

```sh
yarn test
```

## Run build

```sh
yarn build
```



## Author

👤 **Amy Turnah**

* Github: [@amexaCree](https://github.com/amexacree)


## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
