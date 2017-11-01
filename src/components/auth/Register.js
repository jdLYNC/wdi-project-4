import React from 'react';
import Axios from 'axios';
import RegisterForm from './RegisterForm';
import { geocodeByAddress } from 'react-places-autocomplete';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {

  state = {
    newUser: {},
    locationDetails: {},
    errors: {},
    certs: []
  };

  defaultState() {
    const newUser = {
      name: '', email: '', password: '', passwordConfirmation: '', center: false, address: '', location: {}
    };
    const locationDetails = {};
    const errors = {};
    this.setState({ newUser, locationDetails, errors });
  }

  componentWillMount() {
    this.defaultState();
  }

  componentDidMount() {
    Axios
      .get('/api/certifications')
      .then(res => this.setState({ certs: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value }}) => {
    const newUser = Object.assign({}, this.state.newUser, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ newUser, errors });
  }

  handleAddressChange = (address) => {
    this.setState({ newUser: { address } });
  }

  handleSelect = (address) => {
    const newUser = Object.assign(this.state.newUser, { address });
    this.setState({ newUser });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(this.state.newUser.center) {
      geocodeByAddress(this.state.newUser.address)
        .then(results => {
          const locationDetails = {
            country: results.slice(-1)[0].address_components.slice(-1)[0].long_name,
            iso: results.slice(-1)[0].address_components.slice(-1)[0].short_name,
            location: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }
          };
          this.getRegion(locationDetails.iso)
            .then(region => {
              locationDetails.region = region;
              const newUser = Object.assign({}, this.state.newUser, {
                country: locationDetails.country,
                iso: locationDetails.iso,
                region: locationDetails.region,
                location: locationDetails.location
              });
              this.setState({ newUser });
              this.postUser();
            });
        })
        .catch(error => console.error('Error', error));
    } else this.postUser();
  }

  getRegion = (iso) => {
    return Axios.get(`http://restcountries.eu/rest/v2/alpha/${iso}?fields=region`)
      .then(res => {
        return res.data.region;
      });
  }

  postUser = () => {
    console.log('data submitted to api/register ====>>>>', this.state.newUser);
    Axios.post('/api/register', this.state.newUser)
      .then(res => {
        this.defaultState();
        this.setState({
          flashMessage: res.data.message
        });
        this.props.history.push('/');
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  };

  render() {
    return (
      <RegisterForm
        certs={this.state.certs}
        newUser={this.state.newUser}
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        handleAddressChange={this.handleAddressChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        flashMessage={this.state.flashMessage}
      />
    );
  }
}

export default withRouter(Register);
