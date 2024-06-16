import React from "react";
import "../css/App.css";

class Players extends React.Component {
  render() {
    return (
      <div>
        <table className="players-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Количество</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.props.players.map(player => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.count}</td>
                <td>
                  <button className="update" onClick={() => this.props.onUpdatePlayer(player)}>Обновить</button>
                  <button className="delete" onClick={() => this.props.onDeletePlayer(player.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Players;
