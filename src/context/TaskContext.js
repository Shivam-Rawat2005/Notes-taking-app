import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ for filtering
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      try {
        const response = await api.get("/notes");
        setTaskList(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    };
    fetchTasks();
  }, [user]);

  // Add Task
  const addNewTask = async (task) => {
    try {
      const response = await api.post("/notes", task);
      setTaskList((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/notes/${taskId}`);
      setTaskList((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  // Edit Task
  const editTask = async (task) => {
    try {
      const response = await api.put(`/notes/${task._id}`, task);
      setTaskList((prev) =>
        prev.map((t) => (t._id === response.data._id ? response.data : t))
      );
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  // Toggle Completed
  const toggleComplete = async (taskId) => {
    try {
      const response = await api.patch(`/notes/toggle/${taskId}`);
      setTaskList((prev) =>
        prev.map((t) => (t._id === taskId ? response.data : t))
      );
    } catch (error) {
      console.error("Error toggling task:", error.response?.data || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setTaskList([]);
  };

  return (
    <TaskContext.Provider
      value={{
        taskList,
        addNewTask,
        deleteTask,
        editTask,
        toggleComplete,
        user,
        setUser,
        logout,
        searchQuery,       // ✅ export search text
        setSearchQuery,    // ✅ export setter
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
