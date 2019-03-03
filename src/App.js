import React, { Component } from 'react';
import FeedbackForm from './FeedbackForm/FeedbackForm';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      submitted: false
    }
  }
  render() {
    return (
      <div className="app">
        <header className="app-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <img className="app-icon" src="/img/taxi_icon.png" alt="logo" />
          <span className="app-text">CABBIE RATER</span>
        </header>
        {
          (!this.state.submitted)?
          <FeedbackForm onSubmit={() => this.setState(oldState => {
            let newState = { ...oldState };
            newState.submitted = !newState.submitted;
            return newState;
          })} />:
          <div className="app-fb-msg">
              THANK YOU
          </div>
        }
        
      </div>
    );
  }
}

export default App;
