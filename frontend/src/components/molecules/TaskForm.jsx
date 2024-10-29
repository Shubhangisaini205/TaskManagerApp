import React, { useState } from "react";

function TaskForm({ initialTask, onSave }) {
  const [localTask, setLocalTask] = useState(initialTask);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalTask({ ...localTask, [name]: value });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <input
        placeholder="Title"
        value={localTask.title}
        onChange={handleChange}
        name="title"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Description"
        value={localTask.description}
        onChange={handleChange}
        name="description"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={localTask.status}
        onChange={handleChange}
        name="status"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button
        onClick={() => onSave(localTask)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
      >
        Save
      </button>
    </div>
  );
}

export default TaskForm;
