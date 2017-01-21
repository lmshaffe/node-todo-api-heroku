var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

module.exports = {Todo}

// var newTodo2 = new Todo({
//   text: '   Edit my code   '
// })
//
// newTodo2.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (err) => {
//   console.log('Unable to save todo');
// })
