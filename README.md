# node-todo-api-heroku

My node-todo-api project, but designed to be deployed to heroku. The base Heroku URL I have created
is ``https://young-citadel-38771.herokuapp.com`` **Please Note** the root path does nothing. You must access through the API.

Uses mongoose, body-parser, lodash, and express. For security, I'm using jsonwebtoken, and bcryptjs. For tests, I am using mocha, expect, and supertest.

---
## Basic API

##### Standard todo object fields
``text`` **String** the text that describes what it is you want to do. **Required**

``completed`` **Boolean** whether the text task is completed or not. default: false

``completedAt`` **Number** Timestamp of when the task was completed. default: null **This cannot be modified by the client**

``_creator`` **ObjectID** The _id of the user that created this task. This is automatically set when you make an authorized POST request to make a todo object

```javascript
{
  todos: [
  {
    text: "Mow the lawn",
    completed: false,
    completedAt: null,
    _creator: ObjectID('588511ab88cc370041e4fa80')
  },
  {
    text: "Take out the trash",
    completed: true,
    completedAt: 1485051437005,
    _creator: ObjectID('588511ab88cc370041e4fa80')
  }]
}
```

##### Standard user object fields
``email`` **String** the email of the user **Required**

``password`` **String** the password for the user. minimum length: 6

``tokens`` **Array** Contains two fields: ``access`` and ``token``. These are set when a user is created and an ``x-auth`` header is returned. You will need this ``x-auth`` value to make requests and create todo objects 

```javascript
{
  email: 'lee@test.com',
  password: 'password'
}
```
#### GET

``/todos`` returns list of all todo objects. **x-auth header required**

``/todos/:id`` returns todo object of the id provided. **x-auth header required**

``/users/me``get the _id and email back. **x-auth header required**

#### POST

``/todos`` create new todo item. In the request body, set raw json object with at least the text field. **x-auth header required**

``/users``create new user. In the request body, set raw json object with a valid email and password. **x-auth will be returned in header and you will need this for other requests**

``/users/login`` lets you login with a valid user name and password that already exists. **returns new x-auth header for the user**

#### PATCH

``/todos/:id`` update the todo item of the id specified. In the request body, set raw json object of what you want to change.
completedAt cannot be modified by client. **x-auth header required**

#### DELETE

``/todos/:id`` delete the item of the id specified. **x-auth header required**

``/users/me/token`` delete user based on x-auth header. **x-auth header required**
