const { Schema, model } = require('mongoose');
const friendSchema = require('./Friend');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    
      //    add trimmed
    },
    email: {
      type: String,
      unique: true,
      required: true,
      
    //    add matching validation
    
    },
    thoughts: {
      type: String,
      required: true,
      max_length: 50,
//  Array of `_id` values referencing the `Thought` model

    },
    friends: [friendSchema],

    // friends`* Array of `_id` values referencing the `User` model

  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
