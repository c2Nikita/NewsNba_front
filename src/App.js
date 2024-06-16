import React from "react";
import Info from "./components/info";
import Players from "./components/players";
import News from "./components/news";
import Modal from "./components/modal";
import AddNewsModal from "./components/AddNewsModal";
import UpdatePlayerModal from "./components/UpdatePlayerModal";
import UpdateNewsModal from "./components/UpdateNewsModal";
import "./App.css";
import "./css/Error.css";

class App extends React.Component {
  state = {
    players: [],
    news: [],
    error: undefined,
    dataType: "",
    isModalOpen: false,
    isNewsModalOpen: false,
    isUpdatePlayerModalOpen: false,
    isUpdateNewsModalOpen: false,
    playerToUpdate: null,
    newsToUpdate: null,
  };

  getData = async (choice) => {
    try {
      const api_url = await fetch(`http://localhost:8080/api/${choice}`);
      const data = await api_url.json();
      console.log(data);

      if (choice === "players") {
        this.setState({
          players: data,
          news: [],
          error: "",
          dataType: "players"
        });
      } else if (choice === "news") {
        this.setState({
          players: [],
          news: data,
          error: "",
          dataType: "news"
        });
      }
    } catch (error) {
      this.setState({
        players: [],
        news: [],
        error: "Ошибка при получении данных",
        dataType: ""
      });
    }
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  openNewsModal = () => {
    this.setState({ isNewsModalOpen: true });
  };

  closeNewsModal = () => {
    this.setState({ isNewsModalOpen: false });
  };

  openUpdatePlayerModal = (player) => {
    this.setState({ isUpdatePlayerModalOpen: true, playerToUpdate: player });
  };

  closeUpdatePlayerModal = () => {
    this.setState({ isUpdatePlayerModalOpen: false, playerToUpdate: null });
  };

  openUpdateNewsModal = (news) => {
    this.setState({ isUpdateNewsModalOpen: true, newsToUpdate: news });
  };

  closeUpdateNewsModal = () => {
    this.setState({ isUpdateNewsModalOpen: false, newsToUpdate: null });
  };

  addPlayerFromModal = async (playerName) => {
    const playerData = { name: playerName };
    try {
      const response = await fetch(`http://localhost:8080/api/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(playerData)
      });
      const data = await response.json();
      console.log("Player added:", data);
      this.getData("players");
      this.closeModal();
    } catch (error) {
      console.error("Error adding player:", error);
      this.setState({ error: "Ошибка при добавлении игрока" });
    }
  };

  addNewsFromModal = async (title, text, playerId) => {
    const newsData = {
      title,
      text,
      player: {
        id: playerId
      }
    };

    try {
      const response = await fetch(`http://localhost:8080/api/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newsData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при добавлении новости');
      }

      const data = await response.json();
      console.log("Новость добавлена:", data);
      this.getData("news");
      this.closeNewsModal();
    } catch (error) {
      console.error("Ошибка при добавлении новости:", error);
      throw error; // Пробросим ошибку, чтобы обработать ее в компоненте
    }
  };

  updatePlayer = async (playerId, updatedPlayer) => {
    try {
      const response = await fetch(`http://localhost:8080/api/players/${playerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPlayer)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при обновлении игрока');
      }

      const data = await response.json();
      console.log("Player updated:", data);
      this.getData("players");
      this.closeUpdatePlayerModal();
    } catch (error) {
      console.error("Ошибка при обновлении игрока:", error);
      this.setState({ error: "Ошибка при обновлении игрока" });
    }
  };

  updateNews = async (newsId, updatedNews) => {
    try {
      const response = await fetch(`http://localhost:8080/api/news/${newsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedNews)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при обновлении новости');
      }

      const data = await response.json();
      console.log("News updated:", data);
      this.getData("news");
      this.closeUpdateNewsModal();
    } catch (error) {
      console.error("Ошибка при обновлении новости:", error);
      this.setState({ error: "Ошибка при обновлении новости" });
    }
  };

  deletePlayer = async (playerId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/players/${playerId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении игрока');
      }

      console.log("Player deleted:", playerId);
      this.getData("players");
    } catch (error) {
      console.error("Ошибка при удалении игрока:", error);
      this.setState({ error: "Ошибка при удалении игрока" });
    }
  };

  deleteNews = async (newsId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/news/${newsId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении новости');
      }

      console.log("News deleted:", newsId);
      this.getData("news");
    } catch (error) {
      console.error("Ошибка при удалении новости:", error);
      this.setState({ error: "Ошибка при удалении новости" });
    }
  };

  render() {
    return (
      <div>
        <Info />
        <button onClick={() => this.getData("players")}>Получить Игроков</button>
        <button onClick={() => this.getData("news")}>Получить Новости</button>
        <button onClick={this.openModal}>Добавить Игрока</button>
        <button onClick={this.openNewsModal}>Добавить Новость</button>
        {this.state.dataType === "players" && (
          <Players players={this.state.players} onDeletePlayer={this.deletePlayer} onUpdatePlayer={this.openUpdatePlayerModal} />
        )}
        {this.state.dataType === "news" && (
          <News news={this.state.news} onDeleteNews={this.deleteNews} onUpdateNews={this.openUpdateNewsModal} />
        )}
        {this.state.error && <p className="error">{this.state.error}</p>}
        {this.state.isModalOpen && (
          <Modal onClose={this.closeModal} onAddPlayer={this.addPlayerFromModal} />
        )}
        {this.state.isNewsModalOpen && (
          <AddNewsModal onClose={this.closeNewsModal} onAddNews={this.addNewsFromModal} />
        )}
        {this.state.isUpdatePlayerModalOpen && (
          <UpdatePlayerModal onClose={this.closeUpdatePlayerModal} player={this.state.playerToUpdate} onUpdatePlayer={this.updatePlayer} />
        )}
        {this.state.isUpdateNewsModalOpen && (
          <UpdateNewsModal onClose={this.closeUpdateNewsModal} news={this.state.newsToUpdate} onUpdateNews={this.updateNews} />
        )}
      </div>
    );
  }
}

export default App;
