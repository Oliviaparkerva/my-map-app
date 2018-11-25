import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

class HotSpots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      selectedItem: null
    };
  }

  showInfowindow = (event, id)=>{
    let result = this.props.filteredVenues.find(place =>{
      return place.id===id;
    })
    this.setState({"selectedItem":result});
  }

  render(){

    return(
      <div>
      {this.props.filteredVenues && this.props.filteredVenues.map((place, id) =>(
        <ul>
         <li 
         key={id}
         onClick={event => this.showInfowindow(event, place.id)}>{place.name}</li>
        </ul>
      ))}
      </div>

    )
  }
}

export default HotSpots;



