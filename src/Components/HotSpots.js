import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

class HotSpots extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render(){

    return(
      <div>
        <ul>
          {this.props.filteredVenues && this.props.filteredVenues.map((place, id) =>{
            return(
              <li key={id} onClick={event =>this.props.handleListSelection(place.id)}>
              {place.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default HotSpots;



