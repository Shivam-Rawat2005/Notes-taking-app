import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Screens
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ToDoListScreen from "./screen/ToDoListScreen";
import AddTask from "./screen/AddTask";

// Context
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <Routes>
            {/* Redirect "/" to /login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* App Routes */}
            <Route path="/todos" element={<ToDoListScreen />} />
            <Route path="/add-task" element={<AddTask />} />

            {/* Fallback Route (Prevents blank black screen) */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
