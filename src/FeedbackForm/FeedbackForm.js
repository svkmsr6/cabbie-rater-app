import React, { Component } from 'react';
import SelectDriver from './SelectDriver/SelectDriver';
import RatingBox from './RatingBox/RatingBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FeedbackForm.css';

const notify = msg => toast(msg, {
  position: toast.POSITION.TOP_RIGHT,
  className: 'app-alert'
});

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
     const fetchPromise = fetch('https://svk-cabbie-app.herokuapp.com/api/drivers')
     return fetchPromise.then(resp => resp.json());
  }

  updateDriverRating(request){
     const fetchPromise = fetch(
      'https://svk-cabbie-app.herokuapp.com/api/drivers',{
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
    this.setState(oldState => {
      let newState = {...oldState};
      newState.selected = newState.drivers.find(d => d.id === parseInt(val,10));
      return newState;
    })
  }

  updateRating(rating){
    this.setState({ rating });
  }

  submitRating(){
    if(!this.state.selected){
      notify('Please select a driver!');
    } else if(this.refs.name.value.length === 0 || this.refs.email.value.length === 0){
      notify('Please ensure a name and an email!');
    } else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.refs.email.value))){
      notify('Please enter a valid email!');
    } else {
      const {id, rating, rides} = this.state.selected;
      const newRating = parseFloat(((rating*rides + this.state.rating)/(rides + 1)).toFixed(2), 10);
      const request = {
        id,
        rating: newRating,
        rides: rides + 1
      }
     
     this.updateDriverRating(request)
     .then(data => {
       console.log('Rating updated',data);
       this.getAllDrivers()
        .then(data => this.setState({
          drivers: data.results
        },() => {
          this.props.onSubmit()
        }))
        .catch(err => console.log('Fetch Error',err))
      })
     .catch(err => console.log('Update Error', err))
    }
     

  }

  render() {
    const {drivers, selected, rating} = this.state;
    return (
      <div className="app-fb-form">
        <ToastContainer />
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
