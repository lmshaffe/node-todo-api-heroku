const {MongoClient, ObjectID} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server');

  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: ObjectID('5883a6dfe4ac88b9762a8c8a')}, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   })

  db.collection('Users').findOneAndUpdate({
    _id: ObjectID('58838a42d19665cb241e6dad')}, {
      $set: {
        name: 'Dexter'
      },
      $inc: {
        age: 1
      }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  })

  // db.close();
});
