import React from "react";

function TaskListHeader({
  onAddTask,
  searchTerm,
  onSearch,
  sortOrder,
  onSort,
}) {
  return (
    <div className="mb-6">
      <button
        onClick={onAddTask}
        className="bg-blue-500 flex justify-start px-4 py-2 border rounded-md hover:bg-blue-600 mb-4"
      >
        Add Task
      </button>
      <div className="flex items-center space-x-4">
        <input
          placeholder="Search task..."
          value={searchTerm}
          onChange={onSearch}
          className="px-4 py-2 border w-full"
        />
        <select
          value={sortOrder}
          onChange={onSort}
          className="px-4 py-2 border rounded-md"
        >
          <option value="recent">Recent</option>
          <option value="old">Old</option>
        </select>
      </div>
    </div>
  );
}

export default TaskListHeader;
