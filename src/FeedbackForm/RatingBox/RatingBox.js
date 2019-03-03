import React, { Component } from 'react';
import './RatingBox.css';

export default class RatingBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      stars: [1,2,3,4,5],
    };        
  }

  render() {
    const {rating} = this.props;
    const {stars} = this.state;
    return (
      <div className="app-fb-rating">
        {
          stars.map((s,i) =>  <img key={i} alt="rating" src={(s > rating)?"/img/star.png":"/img/active_star.png"} onClick={() => this.props.onRate(s)} />)          
        }        
      </div>
    )
  }
}
