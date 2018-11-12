import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount(){
    this.loadMap()
  }

  loadMap = () =>{
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCBQ02-hmbnLp46PzACc8j-65bCRJ19u5c&callback=initMap")
    window.initMap = this.initMap
  }
  initMap=()=> {
    var map = new window.google.maps.Map(document.getElementById('map'),{
      center: {lat: 38.9749, lng: -76.5087},
      zoom: 10
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
