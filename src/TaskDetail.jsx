import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function TaskDetail({ tasks, onSaveEdit }) {
  const { taskId } = useParams();
  const task = tasks[parseInt(taskId)];
  const [editText, setEditText] = useState(task);
  const navigate = useNavigate();
  if (!task) {
    return <div>Задача не найдена</div>;
  }

  const handleSave = () => {
    if (editText.trim() !== "") {
      onSaveEdit(taskId, editText);
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
