import React from "react";

const TaskCard = ({ task, onView, onEdit, onDelete, formatDate }) => (
  <div className="p-4 mb-4 border rounded-md bg-gray-50">
    <h3 className="text-md font-semibold">{task.title}</h3>
    <p className="text-sm text-gray-600">{task.description}</p>
    <p className="text-xs text-gray-500 mt-2">Created at: {new Date(task.createdAt).toLocaleString()}</p>
    <div className="mt-4 flex space-x-2">
      <button
        onClick={() => onView(task)}
        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        View Details
      </button>
      <button
        onClick={() => onEdit(task)}
        className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task)}
        className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
);

export default TaskCard;
