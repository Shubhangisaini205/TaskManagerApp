const TaskModel = require("../models/task.model");
const { successResponse, errorResponse } = require("../utils/helpers");

// Create a new task
const createTask = async (req, res) => {
  const { title, description, userId } = req.body;
  if (!title) {
    return errorResponse(res, "Title is required", null, 400);
  }
  try {
    const newTask = new TaskModel({ title, description, userId });
    await newTask.save();
    successResponse(res, "Task created successfully", newTask, 201);
  } catch (error) {
    errorResponse(res, "Error creating task", error);
  }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
  const { search, sort } = req.query;
  
  try {
    const query = { userId: req.body.userId };

    if (search) {
      const searchRegex = new RegExp(search, 'i'); 
      query.title = searchRegex; 
    }
    const tasks = await TaskModel.find(query);
    if (sort) {
      if (sort === 'asc') {
        tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sort === 'desc') {
        tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
      }
    }
    successResponse(res, "Tasks retrieved successfully", tasks);
  } catch (error) {
    errorResponse(res, "Error retrieving tasks", error);
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const taskData = req.body;

  try {
    const updatedTaskData = await TaskModel.findByIdAndUpdate(id, taskData);
    if (!updatedTaskData) {
      return errorResponse(res, "Task not found", null, 404);
    }
    successResponse(res, "Task updated successfully", updatedTaskData);
  } catch (error) {
    errorResponse(res, "Error updating task", error);
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return errorResponse(res, "Task not found", null, 404);
    }
    successResponse(res, "Task deleted successfully", deletedTask);
  } catch (error) {
    errorResponse(res, "Error deleting task", error);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
