import React, { Component } from 'react'

export default class SelectDriver extends Component {
  render() {
    return (
        <select 
        //style={{ textColor: (this.state.selected === null)?'black':'grey'}}
        defaultValue={null}
        onChange={e => this.props.onSelectDriver(e.target.value)}
        >
          <option 
            selected={this.props.selected === null} 
            value={null} 
            disabled
         >
         --Select driver--
         </option>
          {
            this.props.drivers
            .map((driver,idx) => (
              <option 
                key={idx}                   
                value={driver.id}
              >
                {`${driver.lname},${driver.fname} (${driver.rating}★/${driver.rides} rides)`}                           
              </option>
            ))
          }
        </select>
    )
  }
}
