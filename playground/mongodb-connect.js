// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
const {MongoClient, ObjectID} = require ('mongodb');

// var user = {name: 'Lee', age: 99};
// ES6 object destructuring lets you pull out properties from an object creating variables
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server');

  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: 'false'
  // }, (err, result) => {
  //   if (err) return console.log('Unable to insert todo', err);
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  // db.collection('Users').insertOne({
  //   name: 'Lee',
  //   age: 99,
  //   location: 'Tampa'
  // }, (err, result) => {
  //   if (err) return console.log('Unable to insert user', err);
  //
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  // })

  db.close();
});
