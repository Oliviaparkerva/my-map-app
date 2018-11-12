import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state={
    venues:[]
  }

  componentDidMount(){
    this.getVenues()
    this.loadMap()
  }
/*call my script that pull from googleapi using my key and access initMap function throught the window document */
  loadMap = () =>{
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCBQ02-hmbnLp46PzACc8j-65bCRJ19u5c&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues =() =>{
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters={
      client_id:"GLHBZMDEYLLEB10I1KEDT5MA1ZLMXDTHTULGTL3FN01BJOFI",
      client_secret:"MMZZMCZSG34D3LMGQLY3RLTCTMCPTL2U5TMXX3N5ZULHLGJ3",
      query: "comics",
      near: "Annapolis,MD",
      v:"20181211"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response =>{
        this.setState({
          venue: response.data.response.groups[0].items
        })
    }).catch(error =>{
      console.log("ERROR"+error)
    })


  }



  /*Creates my map using the latitude and longitude coordinates I provide. Also allows a zoom level. Using the div id map to place my map into my page via React*/
  initMap=()=> {
    var annapolis = {lat: 38.9749, lng: -76.5087};

    var map = new window.google.maps.Map(document.getElementById('map'),{
      center: annapolis,
      zoom: 10/*zoom level for a city 15 gets you street level*/
    })

    var marker = new window.google.maps.Marker({
      position:annapolis,
      map:map

    })

  }

  render() {
    return (
      <main>
        <div id="map">
        </div>
      </main>
    )
  }

}

/*
Add a script function outside of our react class that creates a script tag and places inside our index.
*/

function loadScript(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src=url
  script.async=true
  script.defer=true
  index.parentNode.insertBefore(script,index)
}


export default App;
