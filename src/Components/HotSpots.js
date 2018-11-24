import React, { Component } from 'react';

class HotSpots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render(){

    return(
      <div>
      {this.props.filteredVenues && this.props.filteredVenues.map((place) =>(
      <ol>
        <li>{place.name}</li>
        <li>This is a venue list</li>
      </ol>
      ))}
      </div>

    )
  }
}

export default HotSpots;