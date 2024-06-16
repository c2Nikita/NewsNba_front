import React from "react";
import "../css/App.css";

const News = ({ news, onDeleteNews, onUpdateNews }) => {
  return (
    <div>
      <table className="news-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Текст</th>
            <th>ID Игрока</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.text}</td>
              <td>{item.player.id}</td>
              <td>
                <button className="update" onClick={() => onUpdateNews(item)}>Обновить</button>
                <button className="delete" onClick={() => onDeleteNews(item.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default News;
