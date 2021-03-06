const mongoose = require('mongoose');
const db = require('../index.js');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registed_date: {
    type: Date,
    default: Date.now
  },
});

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======')
    next()
  } else {
    console.log('models/user.js hashPassword in pre save');

    this.password = this.hashPassword(this.password)
    next()
  }
})


const User = mongoose.model('User', userSchema);

module.exports = User;
