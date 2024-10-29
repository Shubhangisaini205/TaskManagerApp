const { Schema, model, default: mongoose } = require("mongoose");

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { strict: true, timestamps: true });

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
