import React, { useState } from "react";
import "../App.css";

const UpdatePlayerModal = ({ player, onClose, onUpdatePlayer }) => {
  const [name, setName] = useState(player.name);
  const [count, setCount] = useState(player.count);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePlayer(player.id, { name, count });
  };

  return (
    <div className="modal">
    <div className="modal-content">
    <span className="close" onClick={onClose}>&times;</span>
      <form onSubmit={handleSubmit}>
        <label>Имя игрока:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Количество:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button type="submit">Обновить</button>
        <button type="button" onClick={onClose}>Отмена</button>
      </form>
    </div>
    </div>
  );
};

export default UpdatePlayerModal;
