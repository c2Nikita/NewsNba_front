import React from "react";

class Modal extends React.Component {
  state = {
    playerName: ""
  };

  handleInputChange = (event) => {
    this.setState({ playerName: event.target.value });
  };

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.onClose}>&times;</span>
          <h2>Добавить Игрока</h2>
          <input
            type="text"
            placeholder="Введите имя игрока"
            value={this.state.playerName}
            onChange={this.handleInputChange}
          />
          <button onClick={() => this.props.onAddPlayer(this.state.playerName)}>Добавить</button>
        </div>
      </div>
    );
  }
}

export default Modal;
