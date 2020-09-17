const { Schema, model } = require('mongoose');
const moment = require('moment');


const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: 'Username is Required',
        trim: true,
      },
      email: {
        type: String,
        required: 'Email is Required',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ]
      // friends: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: ‘User’
      //   }
      // ]
    },
    // {
    //   toJSON: {
    //     virtuals: true,
    //     getters: true
    //   },
    //   id: false
    // }
  );

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;