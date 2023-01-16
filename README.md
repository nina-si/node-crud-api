# NodeJS CRUD API

A simple Node.js application with CRUD operations.

## IMPORTANT

- Don't forget to rename `.env.example` file before starting app. It was recommended not to push `.env` file to Github due to security issues.

- Please pay attention that you pass the body for request in the right format.  
  For example, there should be **NO comma** after the last property in JSON:

  ![Wrong format](https://github.com/nina-si/node-crud-api/raw/develop/src/assets/error.JPG)

- For checking scenarios, where user is not found, you can generate a valid userID [here](https://www.uuidgenerator.net/version4)

## Before running:

1. Clone repository:  
   `git clone https://github.com/nina-si/node-crud-api.git`
2. Move to folder:  
   `cd node-crud-api`
3. Switch to develop branch:  
   `git checkout develop`
4. Install dependencies:  
   `npm install`
5. Rename file `.env.example` to `.env`
6. You can also change the port number in `.env` file

## To run locally:

1. Run script:  
   `npm run start:dev`
2. You'll see a base endpoint in console, for example http://localhost:3000

## To run in production mode:

1. Run script:  
   `npm run start:prod`

## To run tests:

1. Run script:  
   `npm run test`

There are tests for getting empty users list, creating a new user and updating an existing user.

## Responses implementation:

It is convenient to use [Postman](https://www.postman.com/downloads/) to check server responses.

### GET request:

1. Send a `GET` request to endpoint `/api/users` to get the list of all users (it is empty at the beginning), for example: http://localhost:3000/api/users.  
   You can also open this link in the browser.

2. Send a `GET` request to endpoint `/api/users/{userID}` to get information about existing user.

### POST request:

1. Send a `POST` request to endpoint `/api/users`, for example: http://localhost:3000/api/users.  
    Don't forget to fill in a body for request, for example (all properties are required):

   `{
    "username": "NN",
    "age": 25,
    "hobbies": ["reading"]
}`

![POST example](https://github.com/nina-si/node-crud-api/raw/develop/src/assets/post-example.JPG)

### PUT request:

1. Send a `PUT` request to endpoint `/api/users/{userID}`.  
    You can take a userID from `GET` response.  
    Don't forget to fill in a body for request, for example:

   `{
 "username": "TEST"
}`  
   Changes will be saved only for valid properties values (for example, if you provide a number instead of string in `username` field, changes will not be applied).

### DELETE request:

1. Send a `DELETE` request to endpoint `/api/users/{userID}`.  
   You can take a userID from `GET` response.  
   You don't need to fill in a body for this request.
