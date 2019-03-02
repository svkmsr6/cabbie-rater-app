import React, { Component } from 'react';
import FeedbackForm from './FeedbackForm/FeedbackForm';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <img className="app-icon" src="/img/taxi_icon.png" alt="logo" />
          <span className="app-text">CABBIE RATER</span>
        </header>
        <FeedbackForm />
      </div>
    );
  }
}

export default App;
