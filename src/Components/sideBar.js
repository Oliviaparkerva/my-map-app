import React, { Component } from 'react';
import '../App.css';
import HotSpots from './HotSpots';

class Sidebar extends Component {

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
            id="input-box"
            aria-label="Venue Filter"
            size="30"
            type="text"
            placeholder="Search by Name or Category"
            value={this.props.query}
            onChange={(event) => this.props.showResults(event.target.value)
            }
          />
        </div>
        <div className="search-venue-results">
          <HotSpots
            filteredVenues={this.props.filteredVenues}
            handleListSelection={this.props.handleListSelection} 
          />
        </div>
      </div>
    )
  }

}

export default Sidebar;