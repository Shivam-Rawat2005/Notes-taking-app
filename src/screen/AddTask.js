import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TaskContext from "../context/TaskContext";

const AddTask = () => {
  const { addNewTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      await addNewTask({ title, description });
      navigate("/todos");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  return (
    <div className="add-task-container">
      <style>{`
        .add-task-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #181818; /* calm dark gray instead of pure black */
          padding: 1rem;
        }

        .add-task-box {
          background: #1f1f1f; /* softer dark background */
          padding: 2rem;
          border-radius: 10px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          text-align: center;
          border: 1px solid #2a2a2a;
        }

        .add-task-box h2 {
          margin-bottom: 1.2rem;
          color: #e0e0e0;
          font-size: 1.6rem;
          font-weight: 600;
        }

        .add-task-box label {
          display: block;
          text-align: left;
          margin-bottom: 6px;
          color: #bbb;
          font-size: 0.9rem;
        }

        .add-task-box input,
        .add-task-box textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 16px;
          border-radius: 6px;
          border: 1px solid #333;
          background: #2a2a2a;
          color: #f5f5f5;
          font-size: 1rem;
          transition: border 0.2s ease, background 0.2s ease;
        }

        .add-task-box input:focus,
        .add-task-box textarea:focus {
          border: 1px solid #4a90e2; /* calm blue focus */
          background: #2f2f2f;
          outline: none;
        }

        .add-task-box input::placeholder,
        .add-task-box textarea::placeholder {
          color: #777;
        }

        .task-btn {
          width: 100%;
          padding: 12px;
          border-radius: 6px;
          background: #4a90e2; /* peaceful blue button */
          border: none;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .task-btn:hover {
          background: #357abd; /* darker blue on hover */
        }
      `}</style>

      <div className="add-task-box">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>

          <button type="submit" className="task-btn">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
