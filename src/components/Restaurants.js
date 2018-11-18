
import React, {Component} from 'react';
import Markers from './Markers';

class Restaurants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'venueList': '',
            'query': '',
            'choices': true,
        };

        this.filterVenueList = this.filterVenueList.bind(this);
        this.toggleChoices = this.toggleChoices.bind(this);
    }

    filterVenueList(e) {
        this.props.closeSummary();
        const {value} = e.target;
        const venueList = [];
        this.props.places.forEach((place) => {
            if (place.fullName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                place.newMarker.setVisible(true);
                venueList.push(place);
            } else {
                place.newMarker.setVisible(false);
            }
        });

        this.setState({
            'venueList': venueList,
            'query': value
        });
    }


    toggleChoices() {
        this.setState({
            'choices': !this.state.choices
        });
    }

    componentWillMount() {
        this.setState({
            'venueList': this.props.places
        });
    }

    render() {
        const restaurants = this.state.venueList.map(function (listPoint, index) {
            return (
            <Markers key={index} openSummary={this.props.openSummary.bind(this)} data={listPoint}/>
            );
        }, this);

        return (
            <div className="search">
                <input role="search" aria-labelledby="filter" className="search-window" placeholder="Find Location"
                       value={this.state.query} onChange={this.filterVenueList}/>
                <ul>
                    {this.state.choices && restaurants}
                </ul>
                <button className="button" onClick={this.toggleChoices}>Hide/Show List</button>
            </div>
        );
    }
}

export default Restaurants;