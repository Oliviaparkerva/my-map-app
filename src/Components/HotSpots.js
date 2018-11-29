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
        <ul id="venue-results">
          {this.props.filteredVenues && this.props.filteredVenues.map((place, id) =>{
            return(
              <li key={id} onClick={event =>this.props.handleListSelection(place.id)}><button>
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



