# node-todo-api-heroku

My node-todo-api project, but designed to be deployed to heroku. The base Heroku URL I have created 
is ``https://young-citadel-38771.herokuapp.com`` **Please Note** the root path does nothing. You must access through the API.

---
## Basic API

##### Standard todo object fields
``text`` **String** the text that describes what it is you want to do. **Required**, minLength: 1, trim: true

``completed`` **Boolean** whether the text task is completed or not. default: false

``completedAt`` **Number** Timestamp of when the task was completed. default: null **This cannot be modified by the client**

```javascript
{
  todos: [
  {
    text: "Mow the lawn",
    completed: false,
    completedAt: null
  },
  {
    text: "Take out the trash",
    completed: true,
    completedAt: 1485051437005
  }]
}
```
#### GET

``/todos`` returns list of all todo objects
  
``/todos/:id`` returns todo object of the id provided

#### POST

``/todos`` create new todo item. In the request body, set raw json object with at least the text field

#### PATCH

``/todos/:id`` update the todo item of the id specified. In the request body, set raw json object of what you want to change. 
completedAt cannot be modified by client

#### DELETE

``/todos/:id`` delete the item of the id specified
