import React, { useState } from "react";


const AddNewsModal = ({ onClose, onAddNews }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddNews(title, text, playerId);
      setError(null); // Очистим ошибку при успешном добавлении
    } catch (err) {
      setError(err.message); // Установим сообщение об ошибке
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Добавить Новость</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Заголовок</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Текст</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} required></textarea>
          </div>
          <div>
            <label>ID Игрока</label>
            <input type="text" value={playerId} onChange={(e) => setPlayerId(e.target.value)} required />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewsModal;
