
import React from 'react';

class Markers extends React.Component {

    render() {
        return (
            <li role="button" className="box" 
            onClick={this.props.openSummary.bind(this, this.props.data.newMarker)}
            tabIndex="0"
            onKeyPress={this.props.openSummary.bind(this, this.props.data.newMarker)} >
            {this.props.data.fullName}
            </li>
        );
    }
}

export default Markers;