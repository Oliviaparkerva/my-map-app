import React, {Component} from 'react';

class MyMap extends Component{

	constructor(props) {
        super(props)
        this.allMarkers = [];
    }
   
	render(){
		return(
			<div id="map-container" >
	  			<div id="map" role="application" aria-label="map"></div>
			</div>

		)
	}
}

export default MyMap;