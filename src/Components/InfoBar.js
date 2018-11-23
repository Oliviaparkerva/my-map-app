import React, { Component } from 'react';
import '../App.css';
import HotSpots from './HotSpots';

class Infobar extends Component {

  constructor(props){
    super(props);
    this.state={
      query:'',
      queryResults:[]
    }
  }
  
  
  render() {
    

    return (
      <div>
        <div role="application" id="sidebar">
          <label>Filter your Results</label>
          <input
            aria-label="Venue Filter"
            type="text"
            placeholder="What are you looking for"
            value={this.props.query}
            onChange={(event) =>  this.props.showResults(event.target.value)}/>
        </div>
        <div className="search-venue-results">
          <HotSpots 
          />
        </div>
      </div>
    )
  }

}

export default Infobar;