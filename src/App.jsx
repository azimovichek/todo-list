import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
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

  return (
    <div>
      <h1>ToDo List</h1>
      <div>
        <input
          type="text"
          placeholder="Добавить задачу"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <span>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Сохранить</button>
              </span>
            ) : (
              <span>
                {task}
                <button onClick={() => startEdit(index, task)}>
                  Редактировать
                </button>
                <button onClick={() => deleteTask(index)}>Удалить</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
