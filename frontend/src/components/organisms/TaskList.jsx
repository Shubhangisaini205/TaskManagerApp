import React, { useEffect, useState } from "react";
import Modal from "../atoms/Modal";
import TaskListHeader from "../molecules/TaskListHeader";
import TaskCard from "../molecules/TaskCard";
import TaskForm from "../molecules/TaskForm";
import { getTasks, editTask, deleteTask, addTask } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // If dropped outside any droppable area
    if (!destination) return;

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get task and update its status based on the new droppable area
    const draggedTask = tasks.find((task) => task._id === draggableId);
    const updatedTask = { ...draggedTask, status: destination.droppableId };

    // Update task in the backend and state
    editTask(draggedTask._id, updatedTask)
      .then(() => fetchTasks())
      .catch((error) => console.error("Error updating task status:", error));
  };

  const closeModal = () => setIsModalOpen(false);

  const handleApiCall = async (
    apiFunc,
    successMessage,
    errorMessage,
    onSuccess = null
  ) => {
    try {
      const response = await apiFunc();
      toast.success(response?.data?.message || successMessage);
      if (onSuccess) onSuccess(response);
    } catch (error) {
      toast.error(error.response?.data?.message || errorMessage);
      console.error(errorMessage, error);
    }
  };

  const handleAddTask = () => {
    openModal(
      "Add New Task",
      <TaskForm
        initialTask={{ title: "", description: "", status: "To Do" }}
        onSave={(newTaskData) =>
          handleApiCall(
            () => addTask(newTaskData),
            "Task created successfully",
            "Error adding task",
            () => {
              closeModal();
              fetchTasks();
            }
          )
        }
      />
    );
  };

  const handleEditTask = (task) => {
    openModal(
      "Edit Task",
      <TaskForm
        initialTask={task}
        onSave={(updatedTaskData) =>
          handleApiCall(
            () => editTask(task._id, updatedTaskData),
            "Task updated successfully",
            "Error updating task",
            () => {
              closeModal();
              fetchTasks();
            }
          )
        }
      />
    );
  };

  const handleDeleteTask = (task) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      handleApiCall(
        () => deleteTask(task._id),
        "Task deleted successfully",
        "Error deleting task",
        fetchTasks
      );
    }
  };

  const handleViewDetails = (task) => {
    openModal(
      "Task Details",
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h3 className="font-bold text-2xl text-blue-600 mb-2">{task.title}</h3>
        <p className="mt-2 text-gray-700">{task.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Created at:{" "}
          <span className="font-semibold">
            {new Date(task.createdAt).toLocaleString()}
          </span>
        </p>
        <button
          onClick={closeModal}
          className="mt-4 w-full px-4 py-2 text-white bg-gray-400 rounded-md transition duration-200 ease-in-out"
        >
          Cancel
        </button>
      </div>
    );
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "recent")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Task Manager
      </h1>

      <TaskListHeader
        onAddTask={() => handleAddTask()}
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
        sortOrder={sortOrder}
        onSort={(e) => setSortOrder(e.target.value)}
      />

      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {["To Do", "In Progress", "Done"].map((status) => (
          <div key={status} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-bold text-center text-blue-600">
              {status}
            </h2>
            {filteredTasks
              .filter((task) => task.status === status)
              .map((task, index) => (
                <TaskCard
                  key={index}
                  task={task}
                  onView={() => handleViewDetails(task)}
                  onEdit={() => handleEditTask(task)}
                  onDelete={() => handleDeleteTask(task)}
                />
              ))}
          </div>
        ))}
      </div> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {["To Do", "In Progress", "Done"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 bg-white rounded-lg shadow-md"
                >
                  <h2 className="mb-4 text-lg font-bold text-center text-blue-600">
                    {status}
                  </h2>
                  {filteredTasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onView={() => handleViewDetails(task)}
                              onEdit={() => handleEditTask(task)}
                              onDelete={() => handleDeleteTask(task)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default TaskList;
