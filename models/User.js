const { ObjectId } = require('mongoose').Types;
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: 'username is required',
    },
    email: {
      type: String,
      required: 'email address is required',
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address'],
    },
    thoughts:[ {
      type: Schema.Types.ObjectID,
      ref: 'thoughts',
      },
     ],
     friends:[ {
      type: Schema.Types.ObjectID,
      ref: 'friends',
      },
     ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;