const { Schema, model } = require('mongoose');

const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    options: [
      {
        type: String,
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model('Question', QuestionSchema);
