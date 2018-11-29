import React, { Component } from 'react';

class HotSpots extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){

    return(
      <div>
        <ul id="venue-results" role="list">
          {this.props.filteredVenues && this.props.filteredVenues.map((place, id) =>{
            return(
              <li aria-labelledby="venue-results" role="list-item" key={id} onClick={event =>this.props.handleListSelection(place.id)}><button role="button">
              {place.name}</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default HotSpots;



