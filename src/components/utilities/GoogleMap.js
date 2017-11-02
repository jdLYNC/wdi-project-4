/* global google */
import React from 'react';
import mapStyles from '../misc/MapStyles';

class GoogleMap extends React.Component {

  componentDidUpdate() {
    this.removeMarkers();
    this.createMarkers();
  }

  removeMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  createMarkers() {
    this.bounds = new google.maps.LatLngBounds();
    this.props.jobs.forEach(job => {
      const newMarker = new google.maps.Marker({
        map: this.map,
        position: job.center.location,
        icon: {
          url: '../../assets/images/dive-flag.png',
          scaledSize: new google.maps.Size(60, 30)
        }
      });
      google.maps.event.addListener(newMarker, 'click', () => {
        this.props.modal(job);
      });
      this.markers.push(newMarker);
      this.bounds.extend(job.center.location);
    });
    this.map.fitBounds(this.bounds);
  }

  componentDidMount() {
    this.markers = [];
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.props.jobs[0].center.location || { lat: 51, lng: 0 },
      zoom: 10,
      minZoom: 1,
      maxZoom: 14,
      styles: mapStyles,
      backgroundColor: '#a5e8f7',
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false
    });
    this.createMarkers();
  }

  componentWillUnmount() {
    console.log('Unmounting map');
    this.removeMarkers();
    this.bounds = null;
    this.map = null;
  }

  checkBounds() {
    const bounds = new google.maps.LatLngBounds();
    this.markers.forEach(marker => {
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
