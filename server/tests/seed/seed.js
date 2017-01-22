const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('../../models/todo')
const {User} = require('../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()

var secret = process.env.JWT_SECRET

const users = [{
  _id: userOneId,
  email: 'lee@example.com',
  password: 'password1',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, secret).toString()
  }]
}, {
  _id: userTwoId,
  email: 'dex@example.com',
  password: 'password2',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, secret).toString()
  }]
}]

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 789,
  _creator: userTwoId
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var user1 = new User(users[0]).save()
    var user2 = new User(users[1]).save()

    // Promise.all callback won't run until all promises are resolved in array
    return Promise.all([user1, user2])
  }).then(() => done())
}

module.exports = {
  todos,
  users,
  populateTodos,
  populateUsers
}
