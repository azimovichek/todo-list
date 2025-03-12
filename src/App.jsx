import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskDetail from "./TaskDetail";

function App() {
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEdit = (index, task) => {
    setEditIndex(index);
    setEditText(task);
  };

  const saveEdit = (index) => {
    if (editText.trim() !== "") {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? editText : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditText("");
    }
  };

  const handleSaveEdit = (taskId, newText) => {
    const updatedTasks = tasks.map((task, index) =>
      index === parseInt(taskId) ? newText : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <div className="bg-black text-white font-sans min-h-screen flex justify-center items-center p-5">
        <div className="bg-[#111] p-5 w-full max-w-[500px] box-border rounded-lg shadow-lg">
          <h1 className="text-blue-500 text-3xl font-bold mb-5">ToDo List</h1>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[500px] mb-5"
          >
            <input
              type="text"
              placeholder="Добавить задачу"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 p-2 border border-blue-500 text-white rounded-l focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white border-none rounded-r cursor-pointer hover:bg-blue-600 transition-colors"
            >
              Добавить
            </button>
          </form>

          <ul className="w-full max-w-[500px] space-y-2 max-h-[300px] overflow-y-auto">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="bg-[#222] p-3 rounded flex justify-between items-center"
              >
                {editIndex === index ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 p-1 border border-blue-500 text-white rounded focus:outline-none"
                    />
                    <button
                      onClick={() => saveEdit(index)}
                      className="p-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
                    >
                      Сохранить
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex justify-between items-center">
                    <Link
                      to={`/task/${index}`}
                      className="text-white break-words whitespace-normal overflow-hidden max-w-[200px]"
                    >
                      {task}
                    </Link>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(index, task);
                        }}
                        className="p-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(index);
                        }}
                        className="p-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-red-600 transition-colors"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Маршруты */}
      <Routes>
        <Route
          path="/task/:taskId" // Маршрут для страницы с деталями задачи
          element={<TaskDetail tasks={tasks} onSaveEdit={handleSaveEdit} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
