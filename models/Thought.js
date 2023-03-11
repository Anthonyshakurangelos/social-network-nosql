const { Schema, model } = require('mongoose');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    username: {
      type: String,
      required: true,
    },
    // startDate: {
        //   type: Date,
        //   default: Date.now(),
        // },
        createAt: {
            type: Date,
            default: Date.now,
            // Sets a default value of 12 weeks from now
            //   default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
            
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        reactions: [reactionSchema],
    },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
