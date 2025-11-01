import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Task from "../components/Task";
import TaskContext from "../context/TaskContext";
import ThemeContext from "../context/ThemeContext";
import PopupModal from "../components/PopupModal";

const ToDoScreen = () => {
  const { taskList, user, setUser, searchQuery, setSearchQuery } =
    useContext(TaskContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredTasks = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        transition: "all 0.3s ease",
        position: "relative",
        backgroundColor: theme === "dark" ? "#121212" : "#f9f9f9",
        color: theme === "dark" ? "#f1f1f1" : "#111",
      }}
    >
      {user && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={toggleTheme}
            style={{
              padding: "10px 14px",
              backgroundColor: theme === "dark" ? "#444" : "#ddd",
              color: theme === "dark" ? "#fff" : "#111",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      )}

      <div
        style={{
          backgroundImage: "url('/thumb-1920-1323593.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}>
          My Tasks App
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          Organize your tasks with colorful, pinnable notes
        </p>
        <button
          onClick={() => navigate("/add-task")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#7c3aed",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          + Create Your First Task
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: "1",
            maxWidth: "400px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <button
          onClick={() => navigate("/add-task")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + New Task
        </button>
      </div>

      <section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              window.innerWidth > 1024
                ? "repeat(4, 1fr)"      // fixed 4 columns on desktop
                : "repeat(auto-fit, minmax(250px, 1fr))", // responsive on mobile
            gap: "20px",
            padding: "0 20px",
          }}
        >
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`task-card ${theme === "dark" ? "dark" : "light"}`}
              >
                <Task task={task} onOpenPopup={setSelectedTask} />
              </div>
            ))
          ) : (
            <p style={{ marginTop: "20px", textAlign: "center" }}>
              No matching tasks found
            </p>
          )}
        </div>
      </section>

      {selectedTask && (
        <PopupModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          theme={theme}
        />
      )}
    </div>
  );
};

export default ToDoScreen;
