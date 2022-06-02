# Pipedrive integration API

This API is integrated with [Pipedrive](https://developers.pipedrive.com/docs/api/v1) software for create e and search of users' deals.

## Technology used

- NodeJs
- TypeScript
- PostgreSQ
- Prisma ORM
- ExpressL
- Jest
- Axios
- Cors

## What you can do?

- Create, update and delete your user
- Login into to the application, generating a token witch is required to do actions in the api endpoints, with the duration of 5 hours.
- Create deals using the Pipedrive api
- Read all the deals you've made
- Read only deals with "won" status

## How to use the app

Run `npm install` after cloning the repository to install all the dependecies

Run `npm run test` to run unitary tests

Start a PostgreSQL database in you environment in the port 5432

Run `npm run dev` to start the server in the host **http://localhost:3333**

## Endpoints (Using Insomnia or Postman)

`http://localhost:3333/user`: Use this endpoint to create your user.

Data:

- name (Required): Your name
- email (Required): Your email
- password (Required): Your your password

**Use Post, Read, Put or Delete methods in this very same endpoint to to create, read update or delete your user.**

`http://localhost:3333/login`: Use this endpoint to create your login.

Data:

- email (Required): Your email
- password (Required): Your password
 
**Use this endpoint with the method post, be sure to have created your user before logging in. After that, for all endpoints with you try to access, put the Bearer Token you'll receive in the Authorization tab to able to access.**

`http://localhost:3333/deals`: Use this endpoint to create your deals.

Data:

- title (Required): Name of your deal
- description (Required): Details about your deal
- value (Required): How much you're spending
- status (Required): Defaults: "open", "won", "lost", "deleted"

**Use Post or Read methods in this very same endpoint to to create or read your deals.**

`http://localhost:3333/deals/all`: Unlike the previous endpoint, this one bring all the deals you have, not only the ones with "won" status.

Data:

- None

**Use method Get in this one, make sure to have some deals made so you can read them!**

<h4 align="center"> <em>&lt;/&gt;</em> by <a href="https://github.com/mauFade" target="_blank">Mauricio Cardoso</a> </h4>
