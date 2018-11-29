import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Sidebar from './Components/sideBar';
import ErrorBoundary from './Components/ErrorBoundary';
import Map from './Components/Map';

class App extends Component {

   constructor(props) {
    super(props);
    this.state = {
      allVenues:[],
      filteredVenues:[],
      allMarkers:[],
      query:'',
    }
  }
 componentDidMount(){
    this.getVenues()
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
      query: "query",
      near: "Annapolis,MD",
      v:"20181211",
      limit: 20,
      categoryId:"4d4b7105d754a06374d81259"
    }
//fetch from foursquare using endpoint and parameters,check the response, set the state of all venues array to be the group out of response you want,check to make sure you set the state proper, handle an error with console.log explaining what didnt work
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({allVenues: response.data.response.groups[0].items},this.loadMap())
         //returns an array of up to 10 restaurants matching query food near annapolis according to foursquare parameters
    })
      .catch(error =>{
      console.log("ERROR"+error);
      window.alert("Could not load data from foursquare "+ error);//test by deleting character from parameters
     
    })
  }
  /*Creates my map using the latitude and longitude coordinates provided. Also allows a zoom level. Using the div id map to place my map into my page via React this creates infowindows for each venue marker*/
  initMap=()=> {
//makes map 
    const annapolis = {lat: 38.9749, lng: -76.5000};//set city center
    let map = new window.google.maps.Map(document.getElementById('map'),{
      center: annapolis,
      zoom: 18/*zoom level for a city 15 gets you major street level*/
    });
    
    let bounds= new window.google.maps.LatLngBounds();//set bounds for later zoom,pan
    let allMarkers =[];//empty markers array to populate once marker method is called
    let infowindow = new window.google.maps.InfoWindow();//create infowindow TODO:replace with popup modal on li click
    //map through array containing all my venues forEach place make a new marker, assign coordinates,and infoWindow content
    this.state.allVenues.map((place) =>{
      let coordinates =new window.google.maps.LatLng({lat:place.venue.location.lat , lng:place.venue.location.lng})
      let venueInfo= `<h3>${place.venue.name}</h3><h4>${place.venue.categories[0].shortName}</h4 <p>${place.venue.location.address}<br>${place.venue.location.formattedAddress[1]}</p><sub>information sourced via <a href="https://is.gd/MjAPXg">foursquare API</a></sub>`
      let marker = new window.google.maps.Marker({position:coordinates,map:map,id:place.venue.id,name:place.venue.name,category:place.venue.categories[0].shortName
      })
      let loc=new window.google.maps.LatLng(marker.position.lat(),marker.position.lng());//used for centering map when new marker is in focus
      bounds.extend(loc);

      allMarkers.push(marker);//add markers to allMarkers array
      this.setState({filteredMarkers:allMarkers,filteredVenues:allMarkers});
      //when marker/venue button is clicked pull up infowindow with content, make it bounce once by call null on animation directly after
      window.google.maps.event.addListener(marker,'click',()=>{
        infowindow.setContent(venueInfo)
          infowindow.open(map,marker)
          marker.setAnimation(window.google.maps.Animation.BOUNCE)
          marker.setAnimation(null)
      });
    });//end of marker method
    map.fitBounds(bounds); //# auto-zoom
    map.panToBounds(bounds); //# auto-center
    map.addListener('click', () => {
      infowindow.close(map)
    });//close info window when map is clicked
  }//end of initMap
  //click handler that matches up the list and the markers so they can both open the infowindow
  handleListSelection=(id) =>{
    this.state.filteredMarkers.map((marker)=>{
      if (marker.id=== id){
        window.google.maps.event.trigger(marker,"click");
      }
    })
  }
  //if there is a any query at all go through the markers that have been created and forEach marker see if it matches regardless of case https://is.gd/harTHX any content in the category or name of the place(venue) 
  showResults=(query)=>{
    if(query){
      this.state.filteredMarkers.map((marker)=> marker.setVisible(false));//set all markers to visible
      let queryResults = this.state.filteredMarkers.filter(place => 
          (place.name.toLowerCase().concat(place.category.toLowerCase())).includes(query.toLowerCase()));//if the query includes the name or category filter it into queryResults.
      queryResults.map((marker)=>
        marker.setVisible(true));//set queryResults to visible
      this.setState({filteredVenues:queryResults,query:query});
    }else{ 
      this.state.filteredMarkers.map((marker)=>marker.setVisible(true));//if nothings in input show all the markers
      this.setState({filteredVenues:this.state.filteredMarkers,query:""})
    }
  }
  
  render() {
    return (
      <main id="App">
        <section id="header-section">
          <header id="header">
            <h2> Annapolis Dining </h2>
          </header>
        </section>
        <section id="app-content">
          <div id="sidebar-container">
            <Sidebar id="Sidebar" 
            query={this.query}
            showResults={this.showResults} 
            filteredVenues={this.state.filteredVenues}
            allMarkers={this.state.allMarkers}
            handleListSelection= {this.handleListSelection}
            filteredMarkers={this.state.filteredMarkers}
            />    
          </div>
          <ErrorBoundary>
              <div id="map-container" >
                  <Map/>
              </div>
          </ErrorBoundary>    

        </section>
      </main>

    )
  }//end of render
}//end of constructor

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
  script.onerror= function(){
    alert("Sorry there is an error with loading the map. Check the URL and API key");
  };
}

export default App;
