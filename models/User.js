const mongoose = require('mongoose');

//User Schema
const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: String,
    password: String,
    role: { type: String, default: 'user' }, // Default role is 'user'
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports=User;