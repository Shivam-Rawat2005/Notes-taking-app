import { useContext, useState, useEffect } from "react";
import TaskContext from "../context/TaskContext";
import { useNavigate, useLocation } from "react-router-dom";

const AddTask = () => {
  const { addNewTask, editTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const location = useLocation();

  // If coming for edit, we will receive task in location.state
  const editingTask = location.state?.task || null;

  const [task, setTask] = useState({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
  });

  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (editingTask) {
      editTask({ ...editingTask, ...task });
    } else {
      addNewTask({
        ...task,
        createdDate: new Date().toISOString(),
      });
    }

    navigate("/todos");
  };

  return (
    <div className="form-wrapper">
      <style>{`
        .form-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #000;
        }

        .task-card-form {
          background: #1a1a1a;
          padding: 2rem;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.3);
          color: #fff;
        }

        .task-card-form h3 {
          margin-bottom: 1rem;
          font-size: 1.6rem;
        }

        .input-box, .textarea-box {
          width: 100%;
          background: #242424;
          color: #fff;
          border-radius: 10px;
          padding: 12px;
          font-size: 1rem;
          margin-bottom: 15px;
          border: 1px solid #333;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.4);
        }

        .textarea-box {
          height: 160px;
          resize: vertical;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          background: linear-gradient(to right, #ff9800, #ff5722);
          border: none;
          color: #fff;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
        }

        .submit-btn:hover {
          opacity: .9;
        }
      `}</style>

      <div className="task-card-form">
        <h3>{editingTask ? "Edit Task" : "Add New Task"}</h3>

        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            className="input-box"
            name="title"
            placeholder="Task title..."
            value={task.title}
            onChange={handleInputChange}
            required
          />

          <textarea
            className="textarea-box"
            name="description"
            placeholder="Task details..."
            value={task.description}
            onChange={handleInputChange}
            required
          />

          <button className="submit-btn">
            {editingTask ? "Update Task" : "Save Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
