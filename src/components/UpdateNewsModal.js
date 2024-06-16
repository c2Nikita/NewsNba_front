import React, { useState } from "react";
import "../App.css";

const UpdateNewsModal = ({ news, onClose, onUpdateNews }) => {
  const [title, setTitle] = useState(news.title);
  const [text, setText] = useState(news.text);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdateNews(news.id, { title, text });
      setError(null); // Очистим ошибку при успешном обновлении
    } catch (err) {
      setError(err.message); // Установим сообщение об ошибке
    }
  };

  return (
    <div className="modal">
    <div className="modal-content">
    <span className="close" onClick={onClose}>&times;</span>
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2>Обновить новость</h2>
        </div>
        <div className="modal-body">
          <label>Заголовок:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <label>Текст:</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} required></textarea>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="modal-footer">
          <button type="submit">Обновить</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateNewsModal;
