# Welcome to storefront-backend 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> A node express server application providing restful api endpoints to manage products and user orders for an online store.

## Prerequisites

* npm >= 6.9.0
* node >= 12.0.0

* yarn

## Install
Run the following command in the projects root folder to install dependencies. All provided yarn commands are run at the root level of the project.
```sh
yarn install
```

## Database Setup (for both development and test databases)
The server application is configured to run with a Postgresql database running with the following settings:
* Host: 127.0.0.1
* Port: 5432
* Database user: "shopping_user"
* Database name: "shopping"
* Test database name: "shopping_test"

To set up the database (dev + test), use the following commands in postgresql environment:
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
To start the server appplication run the following command. 

```sh
yarn watch
```
The application is configured to run on localhost port 3000 - http://localhost:3000.

## Run tests
To run available tests, use following command.

```sh
yarn test
```
This temporarily modifies the ENV key in environment variables from 'dev' to 'test' and runs migrations to setup the test database to be used for testing.
The test database is pulled down after tests are complete.

## Run build
The following command can be used to compile and build the project from typescript to javascript.

```sh
yarn build
```
Once the build is complete the built project can be found in the dist folder. To start the built application you can run the following command in the root folder of the project.
```sh
node dist/.
```

## Author

👤 **Amy Turnah**

* Github: [@amexaCree](https://github.com/amexacree)


## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
