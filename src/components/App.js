import React, {Component} from 'react';
import Restaurants from './Restaurants';
import Header from './Header.js';
import Footer from './Footer.js';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            'places': [
                {
                "name": "Knijp Restaurants De",
                "address": "Van Baerlestraat 134",
                "id": "5788eacb498edc44c9878419",
                "lat": 52.3547688,
                "lng": 4.8808336,
                },

                {
                "name": "Sluizer",
                "address": "Utrechtsestraat 41-45",
                "id": "4dd40320d4c05dc63ad02838",
                "lat": 52.36440296826621,
                "lng": 4.8980745269399355,
                },

                {
                "name": "Gambola Restaurants",
                "address": "H.J.E. Wenckebachweg 49-b",
                "id": "4a2706c0f964a520d68b1fe3",
                "lat": 52.36551,
                "lng": 4.832001,
                },

                {
                "name": "Restaurant Spelt",
                "address": "Nieuwe Spiegelstraat 5-a",
                "id": "4a270874f964a520c6901fe3",
                "lat": 52.365010844641084,
                "lng": 4.890189417381281,
                },

                {
                "name": "Restaurant Stork",
                "address": "Gedempt Hamerkanaal 201",
                "id": "4d29fb563c7954810d63dc9b",
                "lat": 52.38217574223757,
                "lng": 4.920325240631022,
                },

                {
                "name": "Indonesisch Restaurant Sarang Mas",
                "address": "Rokin 84",
                "id": "4a27075bf964a520a98d1fe3",
                "lat": 52.369809,
                "lng": 4.891778,
                },

                {
                "name": "Argentinos Restaurant San Thomas",
                "address": "Martelaarsgracht 7",
                "id": "4a27075df964a520af8d1fe3",
                "lat": 52.37789566813741,
                "lng": 4.896605410231052,
                },

                {
                "name": "Restaurant Silk Road",
                "address": "Piet Heinkade 11",
                "id": "4c740ea71b30a0936b99eb09",
                "lat": 52.37806935643362,
                "lng": 4.914193145426006,
                },

                {
                "name": "Restaurant Surya",
                "address": "Ceintuurbaan 147",
                "id": "4e6df2f2d22d7dd4d9dc0c3f",
                "lat": 52.353228387311184,
                "lng": 4.893747393514379,
                },

                {
                "name": "Restaurant Stedelijk",
                "address": "Museumplein 10",
                "id": "504f42a5e4b09745bf98d6e7",
                "lat": 52.35760798899323,
                "lng": 4.8796719137489015,
                }
                ],
            'map': '',
            'summary': '',
            'venueMarker': ''
        };

        this.initMap = this.initMap.bind(this);
        this.openSummary = this.openSummary.bind(this);
        this.closeSummary = this.closeSummary.bind(this);
        
    }

    componentDidMount() {
        window.initMap = this.initMap;
        googleMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyDFiiICjdgDQ0rakupVm97VQeKEwkgZx1Y&callback=initMap')
    }

    
    initMap() {
        const self = this;
        const view = document.getElementById('map');
        view.style.height = window.innerHeight + "px";
        const map = new window.google.maps.Map(view, {
            center: {lat: 52.3702157, lng: 4.895167900000001},
            zoom: 13,
        });

        const Summary = new window.google.maps.InfoWindow();

        this.setState({
            'map': map,
            'summary': Summary
        });

        const places = [];
        this.state.places.forEach((place) => {
            const fullName = place.name + ' - ' + place.address;
            const newMarker = new window.google.maps.Marker({
                map: map,
                fullName: fullName,
                position: new window.google.maps.LatLng(place.lat, place.lng),
                animation: window.google.maps.Animation.DROP
            });

            newMarker.addListener('click', function () {
                self.openSummary(newMarker);
            });

            place.fullName = fullName;
            place.newMarker = newMarker;
            place.display = true;
            places.push(place);
        });
        this.setState({
            'places': places
        });
    }

foursquareAPI(newMarker) {
        const self = this;
        const url = "https://api.foursquare.com/v2/venues/search?client_id=YUS153VX5Z5ZAMACWQW0UVIN4URVXU2BUUJDZ5BL40FTMFG2&client_secret=UKS5NQUWGVXEWTPBTG05B2K3VXESWWG0RXUSSDNSBKTYMDZ2&v=20180802&ll=52.3702157,4.895167900000001&limit=1"; 
        fetch(url).then ((response) => {
                    if (response.status !== 200) {
                        self.state.summary.setContent("Couldn't load the data");
                        return;
                    }

                    response.json().then((data) => {
                        const locationInfo = data.response.venues[0];
                        const venuePage = '<br/><a href="https://foursquare.com/v/'+ locationInfo.id +'" target="_blank">Find our more Info on Foursquare website!</a>';
                        self.state.summary.setContent(locationInfo.name + venuePage); 

                      
                    });
                }
            )
        .catch((e) => {
            alert("Information cannot be loaded");
        });
    }

    closeSummary() {
        if (this.state.venueMarker) {
            this.state.venueMarker.setAnimation(null);
        }
        this.setState({
            'venueMarker': ''
        });
        this.state.summary.close();
    }

    openSummary(newMarker) {
        this.closeSummary();
        this.state.summary.open(this.state.map, newMarker);
        newMarker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'venueMarker': newMarker
        });
        this.state.map.setCenter(newMarker.getPosition());
        this.state.map.panBy(0, -120);  
        this.foursquareAPI(newMarker);
    }



    render() {
        return (
            <div aria-label="Map" role="Application">
            <Header />
                <Restaurants places={this.state.places} 
                              openSummary={this.openSummary}
                              closeSummary={this.closeSummary} />
                <div id="map"></div>
            <Footer />
            </div>
        );
     }
}


export default App;

 
function googleMap(src) {
    const getName = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        alert("Google Maps is not loaded");
    };
    getName.parentNode.insertBefore(script, getName);
    }
    
