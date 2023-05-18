// requiring mongoose
const { Schema, model } = require('mongoose');

// requiring reaction file
const reactionSchema = require('./Reaction');

// requiring dateformat file
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// model
const Thought = model('Thought', thoughtSchema);

// exporting
module.exports = Thought;