import React, { Component } from 'react';
import './SelectDriver.css';

export default class SelectDriver extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false
    };
  }

  render() {
    const { visible } = this.state;
    return (
      <div 
        style={{
          position:'relative'
      }}>
        <div 
          className="mac-select-driver-container" 
          onClick={() => 
            this.setState(oldState => (
            { 
            ...oldState,
            visible: !oldState.visible
          }
          ))}>
          <div 
            className="mac-select-driver"
            style={{ 
              color: (this.props.selected === null)?'#C2ADAD':'black'
            }}
          >
            <span>
              { 
              (this.props.selected)?
              `${this.props.selected.lname},${this.props.selected.fname}`:
              'Select a driver'
              }
            </span>
          </div>
          <div className="mac-select-button">
            <img 
              alt="arrow" 
              style={{
                transition: '0.2s',
                transform:(visible)?'rotate(180deg)':'rotate(360deg)'
              }} 
              src="/img/ddarrow.png" 
            />
          </div>
        </div>
        <div className="mac-driver-list" style={{display:(visible)?'block':'none'}}>
        {
          this.props.drivers
          .map((driver,idx) => (
            <div 
              key={idx} 
              onClick={() => this.setState(
                { visible: false },
                () => this.props.onSelectDriver(driver.id)
              )}>
              {`${driver.lname},${driver.fname} (${driver.rating}★/${driver.rides} rides)`}
            </div>
          ))
        }
        </div>
      </div>      
    )
  }
}
