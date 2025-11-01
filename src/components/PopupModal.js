import React from "react";

const PopupModal = ({ task, onClose, theme }) => {
  if (!task) return null;

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

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
          color: theme === "dark" ? "#f1f1f1" : "#111",
          padding: "30px",
          borderRadius: "12px",
          width: "80%",
          maxWidth: "600px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          position: "relative",
          animation: "popIn 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: theme === "dark" ? "#fff" : "#111",
          }}
        >
          ✖
        </button>

        <h2
          style={{
            marginBottom: "15px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {task.title}
        </h2>

        <p
          style={{
            whiteSpace: "pre-wrap", // keeps new lines
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {task.description || "No description provided."}
        </p>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", opacity: 0.7 }}>
          Created: {formatDateTime(task.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default PopupModal;
