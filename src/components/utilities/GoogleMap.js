/* global google */
import React from 'react';
import mapStyles from '../misc/mapStyles';

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
      zoom: 10,
      minZoom: 2,
      styles: mapStyles,
      backgroundColor: '#a5e8f7',
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false
    });
    const bounds = new google.maps.LatLngBounds();
    this.props.jobs.forEach(job => {
      const newMarker = new google.maps.Marker({
        map: this.map,
        position: job.center.location,
        icon: {
          url: '../../assets/images/dive-flag.png',
          scaledSize: new google.maps.Size(60, 30)
        }
      });
      this.state.markers.push(newMarker);
      bounds.extend(job.center.location);
    });
    this.map.fitBounds(bounds);
  }

  componentWillUnmount() {
    console.log('Unmounting map');
    this.state.markers.forEach(marker => {
      marker.setMap(null);
    });
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
      <div className="google-map" ref={element => this.mapCanvas = element}>
      </div>
    );
  }
}

export default GoogleMap;
