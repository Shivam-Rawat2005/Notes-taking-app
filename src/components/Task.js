import React, { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";

const Task = ({ task, onOpenPopup }) => {
  const { deleteTask, editTask, toggleComplete } = useContext(TaskContext);
  const [isediting, setisediting] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [error, setError] = useState("");

  const formatDateTime = (dateString) => {
    if (!dateString) return "No time available";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (!editTitle.trim() || !editDescription.trim()) {
      setError("Title and Description cannot be empty.");
      return;
    }
    editTask({ _id: task._id, title: editTitle, description: editDescription });
    setisediting(false);
    setError("");
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setEditTitle(task.title);
    setEditDescription(task.description);
    setisediting(false);
    setError("");
  };

  return (
    <>
      <style>
        {`
          :root {
            --card-bg: #ffffff;
            --card-border: #f0f0f0;
            --card-hover: #f9f9f9;
            --text: #1b1b1d;
            --text-muted: #60636c;
            --accent: #7b4bff;
            --success: #4caf50;
            --danger: #ff5d5d;
            --btn-bg: #f2f3f7;
            --shadow: 0 1px 4px rgba(0,0,0,0.04);
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --card-bg: #2d2d31;
              --card-border: #3c3c41;
              --card-hover: #3a3a3e;
              --text: #f0f0f0;
              --text-muted: #b4b8c6;
              --accent: #9f91ff;
              --success: #2ecc71;
              --danger: #ff6b6b;
              --btn-bg: #404044;
              --shadow: 0 1px 6px rgba(0,0,0,0.5);
            }
          }

          .task-input {
            width: 100%;
            background: var(--btn-bg);
            color: var(--text);
            padding: 12px;
            border-radius: 10px;
            border: 1px solid var(--card-border);
            font-size: 1rem;
            transition: 0.2s;
          }
          .task-input:focus {
            border-color: var(--accent);
            outline: none;
          }

          .task-btn {
            flex: 1;
            border: none;
            padding: 10px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: .2s;
          }
          .task-btn-edit { background: var(--btn-bg); color: var(--text); }
          .task-btn-delete { background: var(--danger); color: #fff; }
          .task-btn-save { background: var(--accent); color: #fff; }
          .task-btn-cancel { background: var(--text-muted); color: #fff; }
          .task-btn:hover { opacity: .85; }
        `}
      </style>

      <div
        style={{
          position: "relative",
          borderRadius: "14px",
          cursor: "pointer",
          padding: "18px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          boxShadow: "var(--shadow)",
          transition: ".2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "var(--card-hover)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "var(--card-bg)"}
        onClick={() => !isediting && onOpenPopup(task)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleComplete(task._id);
          }}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            backgroundColor: task.completed ? "var(--success)" : "transparent",
            border: `2px solid var(--success)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: ".2s",
          }}
        >
          {task.completed && (
            <span
              onClick={(e) => e.stopPropagation()}     // ✅ this is the fix
              style={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }}
            >
              ✔
            </span>
          )}
        </button>

        <div style={{ color: "var(--text)" }}>
          {isediting ? (
            <>
              <input
                className="task-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
              />
              <textarea
                className="task-input"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                rows="4"
                style={{ marginTop: 8 }}
              />

              {error && <div style={{ color: "var(--danger)", marginTop: 5 }}>{error}</div>}

              <div style={{ display: "flex", gap: "10px", marginTop: 10 }}>
                <button className="task-btn task-btn-save" onClick={handleSave}>Save</button>
                <button className="task-btn task-btn-cancel" onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  textDecorationLine: task.completed ? "line-through" : "none",
                  textDecorationColor: "#000",
                  textDecorationThickness: task.completed ? "4px" : "0px",
                  fontWeight: 800,
                  fontSize: "1.35rem",
                  opacity: task.completed ? 0.3 : 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {task.title}
              </div>

              <div style={{ fontSize: ".85rem", color: "var(--text-muted)", marginTop: 3 }}>
                {formatDateTime(task.createdAt)}
              </div>

              <div
                style={{
                  marginTop: 6,
                  color: "var(--text-muted)",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontSize: ".95rem",
                }}
              >
                {task.description}
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
                <button
                  className="task-btn task-btn-edit"
                  onClick={(e) => { e.stopPropagation(); setisediting(true); }}
                >
                  Edit
                </button>
                <button
                  className="task-btn task-btn-delete"
                  onClick={(e) => { e.stopPropagation(); deleteTask(task._id); }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Task;
