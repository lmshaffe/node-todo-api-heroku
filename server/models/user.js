const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const _ = require('lodash')

var secret = process.env.JWT_SECRET

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

//override method to not return fields like password and token
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObj = user.toObject();

  return _.pick(userObj, ['_id', 'email'])
}

//not using arrow function because we need binding to this keyword
UserSchema.methods.generateAuthToken = function () {
  var user = this
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, secret).toString()
secret
  user.tokens.push({access, token})

  return user.save().then(() => {
    return token
  })
}

UserSchema.methods.removeToken = function(token) {
  var user = this

  return user.update({
    $pull: {
      tokens: {token}
    }
  })
}

UserSchema.statics.findByToken = function (token) {
  var User = this
  var decoded;

  try {
    decoded = jwt.verify(token, secret)
  } catch(e) {
    // return new Promise((resolve, reject) => {
    //   reject()
    // })
    return Promise.reject()
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this

  return User.findOne({email}).then((user) => {
    if (!user) return Promise.reject()

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (!res) reject()
        resolve(user)
      })
    })
  })
}

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})


var User = mongoose.model('User', UserSchema)

module.exports = {User}
// var user = new User({
//   email: 'lee@example.com    '
// })
//
// user.save().then((doc) => {
//   console.log('Saved user', doc)
// }, (err) => {
//   console.log('Unable to save user', err);
// })
