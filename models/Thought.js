const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: "Please enter a reaction",
      maxlength: [280, "Thought must be 280 characters or less (don't over think it!)"]
    },
    username: {
      type: String,
      required: "Username is Required"

    },
    createdAt: {
      type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: 'Thought is Required',
        minlength: 1,
        maxlength: [280, "Thought must be 280 characters or less (don't over think it!)"]
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
     username: {
       type: String,
       required: 'Please enter your Username'
     },
     reactions: [ReactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('reactionsCount').get(function() {
  return this.reactions.length;
});

module.exports = Thought;