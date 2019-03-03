import React, { Component } from 'react';
import SelectDriver from './SelectDriver/SelectDriver';
import RatingBox from './RatingBox/RatingBox';
import './FeedbackForm.css';

export default class FeedbackForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      drivers:[],
      selected: null,
      rating: 0
    };    
  }

  getAllDrivers(){
     const fetchPromise = fetch('http://svk-cabbie-app.herokuapp.com/api/drivers')
     return fetchPromise.then(resp => resp.json());
  }

  updateDriverRating(request){
     const fetchPromise = fetch(
      'http://svk-cabbie-app.herokuapp.com/api/drivers',{
      method:'PATCH',
      headers:new Headers({
        'Content-type':'application/json'
      }),
      body: JSON.stringify(request)
   });
     return fetchPromise.then(resp => resp.json());
  }

  componentDidMount(){
    this.getAllDrivers()
    .then(data => this.setState({drivers: data.results}))
    .catch(err => console.log('Fetch Error',err))
  }

  onHandleChange(val){
    //hconsole.log(val);
    this.setState(oldState => {
      let newState = {...oldState};
      newState.selected = newState.drivers.find(d => d.id === parseInt(val,10));
      //newState.rating = (newState.selected.rating) || null;
      return newState;
    })
  }

  updateRating(rating){
    this.setState({ rating });
  }

  submitRating(){
    if(!this.state.selected){
      alert('Please select a driver!')
    } else {
     const {id, rating} = this.state.selected;
     const newRating = parseFloat(((this.state.rating + rating)/2).toFixed(2), 10);
     const request = {
       id,
       rating: newRating
     }
     
     this.updateDriverRating(request)
     .then(data => {
       console.log('Rating updated',data);
       this.getAllDrivers()
        .then(data => this.setState({drivers: data.results}))
        .catch(err => console.log('Fetch Error',err))
      })
     .catch(err => console.log('Update Error', err))
    }
     

  }

  render() {
    const {drivers, selected, rating} = this.state;
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
          <RatingBox 
             rating={rating}
             onRate={rating => this.updateRating(rating)}
          />
        </div>
        <div className="app-fb-btn">
          <button onClick={() => this.submitRating()}>SUBMIT RATING</button>
        </div>
      </div>
    )
  }
}
