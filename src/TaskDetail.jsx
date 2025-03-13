import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function TaskDetail({ tasks, setTasks }) {
  const { taskId } = useParams();
  const index = parseInt(taskId);
  const task = tasks[index];

  const [editText, setEditText] = useState(task ? task.text : "");
  const navigate = useNavigate();

  if (!task) {
    return (
      <div className="bg-black text-white font-sans min-h-screen flex justify-center items-center p-5">
        <div className="bg-[#111] p-5 w-full max-w-[500px] box-border rounded-lg shadow-lg">
          <h1 className="text-blue-500 text-3xl font-bold mb-5">
            Задача не найдена
          </h1>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Вернуться к списку задач
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (editText.trim() !== "") {
      const updatedTasks = tasks.map((t, i) =>
        i === index ? { ...t, text: editText } : t
      );
      setTasks(updatedTasks);
      navigate("/");
    }
  };

  return (
    <div className="bg-black text-white font-sans min-h-screen flex justify-center items-center p-5">
      <div className="bg-[#111] p-5 w-full max-w-[500px] box-border rounded-lg shadow-lg">
        <h1 className="text-blue-500 text-3xl font-bold mb-5">Детали задачи</h1>
        <div className="bg-[#222] p-3 rounded">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Редактировать задачу"
            className="w-full p-2 border border-blue-500 text-white rounded focus:outline-none bg-transparent"
          />
          <button
            onClick={handleSave}
            className="mt-3 p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Сохранить изменения
          </button>
        </div>
        <Link
          to="/"
          className="mt-5 inline-block text-blue-500 hover:text-blue-600"
        >
          Вернуться к списку задач
        </Link>
      </div>
    </div>
  );
}

export default TaskDetail;
