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

      <div className="spot">
        <div className="book-top">
          <ul>
            <li>{this.props.greeting}</li>
            <li>"hi this is a list item'</li>
          </ul>
        </div>
      </div>


    )
  }
}

export default HotSpots;