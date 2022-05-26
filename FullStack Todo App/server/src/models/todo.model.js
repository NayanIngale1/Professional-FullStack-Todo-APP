const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: String, required: false },
    subTasks: [
      {
        id: { type: String },
        title: { type: String },
        status: { type: Boolean },
      },
    ],
    tags: {
      Official: { type: Boolean },
      Personal: { type: Boolean },
      Others: { type: Boolean },
    },
  },
  { versionKey: false, timestamps: true }
);

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
