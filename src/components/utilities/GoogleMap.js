/* global google */
import React from 'react';

class GoogleMap extends React.Component {
  constructor() {
    super();

    this.state = {
      markers: []
    };
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.props.jobs[0].center.location,
      zoom: 8
    });
    const bounds = new google.maps.LatLngBounds();
    this.props.jobs.forEach(job => {
      const newMarker = new google.maps.Marker({
        map: this.map,
        position: job.center.location
      });
      this.state.markers.push(newMarker);
      bounds.extend(job.center.location);
    });
    this.map.fitBounds(bounds);
  }

  componentWillUnmount() {
    console.log('Unmounting map');
    // this.marker.setMap(null);
    // this.marker = null;
    this.map = null;
  }

  checkBounds() {
    const bounds = new google.maps.LatLngBounds();
    this.state.markers.forEach(marker => {
      // console.log('marker', marker);
      if(!marker.position) return false;
      const latLng = { lat: marker.position.lat(), lng: marker.position.lng() };
      bounds.extend(latLng);
    });
    this.map.fitBounds(bounds);
  }

  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element}>Google Map goes here...</div>
    );
  }
}

export default GoogleMap;
