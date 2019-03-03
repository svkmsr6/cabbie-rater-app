import React, { Component } from 'react';
import SelectDriver from './SelectDriver/SelectDriver';
import RatingBox from './RatingBox/RatingBox';
import './FeedbackForm.css';

export default class FeedbackForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      drivers:[],
      selected: { id:'' },
      rating: null
    };    
  }

  componentDidMount(){
    fetch('http://svk-cabbie-app.herokuapp.com/api/drivers')
    .then(resp => resp.json())
    .then(data => this.setState({drivers: data.results}))
    .catch(err => console.log('Fetch Error',err))
  }

  onHandleChange(val){
    //hconsole.log(val);
    this.setState(oldState => {
      let newState = {...oldState};
      newState.selected = newState.drivers.find(d => d.id === parseInt(val,10));
      newState.rating = (newState.selected.rating) || null;
      return newState;
    })
  }

  submitRating(){

  }

  render() {
    const {drivers, selected} = this.state;
    return (
      <div className="app-fb-form">
        <header>FEEDBACK FORM</header>
        <input ref="name" type="text" placeholder="Enter your name" />
        <input ref="email" type="email" placeholder="Enter your mail" />
        <div className="select-rate-container">
          <SelectDriver 
            drivers={drivers}
            selected={selected}
            onSelectDriver={
              val => this.onHandleChange(val)
            }
          />
          <RatingBox />
        </div>
        <div className="app-fb-btn">
          <button onClick={() => this.submitRating()}>SUBMIT RATING</button>
        </div>
      </div>
    )
  }
}
