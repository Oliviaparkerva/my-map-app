import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Sidebar from './Components/sideBar';

class App extends Component {

   constructor(props) {
    super(props);
    this.state = {
      allVenues:[],
      // filteredVenues:[],
      allMarkers:[],
      filteredMarkers:[],
      query:''
    }
  }
  
  componentDidMount(){
    this.getVenues()
    //dont call a setState here
  }

/*call my script that pull from googleapi using my key and access initMap function throught the window document */
  loadMap = () =>{
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCBQ02-hmbnLp46PzACc8j-65bCRJ19u5c&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues =(query) =>{
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters={

      client_id:"GLHBZMDEYLLEB10I1KEDT5MA1ZLMXDTHTULGTL3FN01BJOFI",
      client_secret:"MMZZMCZSG34D3LMGQLY3RLTCTMCPTL2U5TMXX3N5ZULHLGJ3",
      query: query,
      near: "Annapolis,MD",
      v:"20181211",
      limit: 20,
      categoryId:"4d4b7105d754a06374d81259"
    }
//fetch from foursquare using endpoint and parameters,check the response, set the state of all venues array to be the group out of response you want,check to make sure you set the state proper, handle an error with console.log explaining what didnt work
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response)    //data.response.groups[""0""].items
        this.setState({allVenues: response.data.response.groups[0].items},this.loadMap())
        console.log('These are all the venues:',this.state.allVenues)
      //returns an array of up to 10 restaurants matching query asian near annapolis according to foursquare parameters
    }).catch(error =>{
      console.log("ERROR"+error)
    })
  }
  /*Creates my map using the latitude and longitude coordinates provided. Also allows a zoom level. Using the div id map to place my map into my page via React this creates infowindows for each venue marker*/
  initMap=()=> {
//makes map
    const annapolis = {lat: 38.9749, lng: -76.5000};
    let map = new window.google.maps.Map(document.getElementById('map'),{
      center: annapolis,
      zoom: 14/*zoom level for a city 15 gets you street level*/
    });

    let infowindow = new window.google.maps.InfoWindow();
    let allMarkers =[];

    this.state.allVenues.map((place) =>{
        let coordinates =new window.google.maps.LatLng({lat:place.venue.location.lat , lng:place.venue.location.lng})
        let venueInfo= `<h3>${place.venue.name}</h3> <p>${place.venue.location.address}<br>${place.venue.location.formattedAddress[1]}</p>`

        let marker = new window.google.maps.Marker({position:coordinates,map:map,id:place.venue.id,name:place.venue.name,category:place.venue.categories[0].shortName
        })
        allMarkers.push(marker);//add markers to allMarkers array
        this.setState({filteredMarkers:allMarkers,filteredVenues:allMarkers})
        console.log('These are all the markers:', this.state.filteredMarkers,this.state.filteredVenues, place.venue.id)

        marker.addListener('click',() => {
          infowindow.setContent(venueInfo)
          infowindow.open(map,marker)
        })
    })//end of marker method
  //search method needs to go through all the venues and the markers and filter them if they match the query and then show the results deal with errors like if there is no match
  }//end of initMap

  // updateQuery =(query)=>{
  //   this.setState({query})
  //   this.showResults(query)
  // }
  showResults=(query)=>{
    if(query){
      this.state.filteredMarkers.map((marker)=> marker.setVisible(false));
      let queryResults = this.state.filteredMarkers.filter(place => 
          (place.name.toLowerCase().concat(place.category.toLowerCase())).includes(query.toLowerCase()));
      this.setState({filteredVenues:queryResults,query})

      queryResults.map((marker)=>marker.setVisible(true))
      console.log('these markers match',this.state.filteredVenues)
    }
  }

  render() {
    return (
      <main id="App">
        <section>
          <header id="header">
            <h2>Annapolis Asian Dining</h2>
          </header>
          <Sidebar 
          query={this.state.query}
          showResults={this.showResults} 
          filteredVenues={this.state.filteredVenues}
          allMarkers={this.state.allMarkers}
          />  
        </section>
        <section>
          <div id="map" role="application" aria-label="map"></div>
        </section>
      </main>
    )
  }

}

        {/*
Add a script function outside of our react class that creates a script tag and places inside our index.
*/}

function loadScript(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src=url
  script.async=true
  script.defer=true
  index.parentNode.insertBefore(script,index)
}


export default App;

        {/*
        display my markers by looping over our state and maping it into an array
var cityCenterMarker = new window.google.maps.Marker({
      position:annapolis,
      map:map
      })
      //take the allVenues array and map each place get the coordinates of each venue in the array,get the name and address. create markers using maps.Marker add all the markers into empty allMarkers array. add a listener so that when the marker is clicked the infowindow opens use open method for filtering also
      filtering case insensitive data https://is.gd/harTHX
*/}