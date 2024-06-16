import React from "react";

class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.newsMethod}>
      <input type = "text" name ="choice" placeholder="Выбор"/>
      <button>Получить информацию</button>
      </form>
    );
  }
}

export default Form;
