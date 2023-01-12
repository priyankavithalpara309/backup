import logo from "./logo.svg";
import "./App.css";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import Modal from "./components/Modal/Modal";
import React, { Component } from "react";

class App extends Component {
  state = {
    modalIsOpen: false,
    toggleDiv: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        {this.state.toggleDiv ? (
          <div
            style={{
              background: "red",
              width: "100px",
              height: "100px",
              margin: "auto",
            }}
          ></div>
        ) : null}

        {this.state.modalIsOpen ? (
          <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        ) : null}

        {this.state.modalIsOpen ? (
          <Backdrop show={this.state.modalIsOpen} />
        ) : null}

        <button
          className="Button"
          onClick={() =>
            this.setState((prevState) => ({ toggleDiv: !prevState.toggleDiv }))
          }
        >
          Toggle
        </button>
        <br />
        <br />
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animations List</h3>
        <List />
      </div>
    );
  }
}

export default App;
