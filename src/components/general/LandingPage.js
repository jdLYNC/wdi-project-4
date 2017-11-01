import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import SplashImage from './SplashImage';
import RegisterForm from '../auth/RegisterForm';
import Auth from '../../lib/Auth';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const TitleHeader = styled.h2`
  margin-top: 5vh;
  font-size: 4.5em;
  color: white;
`;

const AboutHeader = styled.h2`
  margin-top: 15vh;
`;

const AboutText = styled.p`
  margin-top: 5vh;
  margin-bottom: 15vh;
  font-size: 1.1em;
`;

class LandingPage extends React.Component {

  state = {
    newUser: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      center: false,
      // certLv: '',
      address: '',
      location: ''
    },
    locationDetails: {},
    certs: [],
    errors: {}
  };


  componentDidMount() {
    Axios
      .get('/api/certifications')
      .then(res => this.setState({ certs: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value }}) => {
    const newUser = Object.assign({}, this.state.newUser, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ newUser, errors }, () => console.log(this.state.newUser));
  }

  handleAddressChange = (address) => {
    this.setState({newUser: { address }});
  }

  handleSelect = (address) => {
    const newUser = Object.assign(this.state.newUser, { address });
    this.setState({ newUser });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    //   query: {
    //     address: this.state.newUser.address
    //   },
    //   key: 'AIzaSyAKoE_jY6PNxyupg_GsKz80YLv0wfChnGs'
    // })
    //   .then(res => console.log(res));

    if(this.state.newUser.address) {
      // let country = null;
      // let iso = null;
      geocodeByAddress(this.state.newUser.address)
        .then(results => {
          console.log(results);

          const locationDetails = {
            country: results.slice(-1)[0].address_components.slice(-1)[0].long_name,
            iso: results.slice(-1)[0].address_components.slice(-1)[0].short_name          };

          this.setState({ locationDetails });

          // country = results.slice(-1)[0].address_components.slice(-1)[0].long_name;
          // iso = results.slice(-1)[0].address_components.slice(-1)[0].short_name;
          // console.log('country is ', country);
          // return getLatLng(results[0]);
        // })
        // .then(latLng => {
        //   console.log('latLng be like', latLng);
        //   const region = this.getRegion(iso);

          return getLatLng(results[0]);

        })
        .then(latLng => {

          const location = {
            location: latLng
          };

          const locationDetails = Object.assign({}, this.state.locationDetails, location);
          this.setState({ locationDetails }, this.getRegion)
        })
        // .then(() => {
        //   this.postUser();
        // })
        .catch(error => console.error('Error', error));
    } else this.postUser();
  }

  getRegion = () => {
    Axios.get(`http://restcountries.eu/rest/v2/alpha/${this.state.locationDetails.iso}?fields=region`)
      .then(res => {
        const location = {
          region: res.data.region
        };

        const locationDetails = Object.assign({}, this.state.locationDetails, location);
        this.setState({ locationDetails }, () => {
          const newUser = Object.assign({}, this.state.newUser, this.state.locationDetails);
          this.setState({ newUser }, this.postUser);
        });

      });
  }

  postUser = () => {
    console.log('data submitted to api/register ====>>>>', this.state.newUser);
    Axios.post('/api/register', this.state.newUser)
      .then(() => {
        this.setState({ newUser: {
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          center: null,
          certLv: '',
          address: '',
          location: ''
        } });
        this.props.history.push('/');
      })
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  };

  // handleRadioClick = ({ target: { value }}) => {
  //   const newUser = Object.assign({}, this.state.newUser, { center: value });
  //   this.setState({ newUser, activeRegister: true });
  // }

  render() {
    console.log(this.state.newUser);
    return(
      <section>

        <SplashImage
          image="assets/images/denys-nevozhai.jpg"
          align="flex-end">
          <div className="col-sm-6"><TitleHeader>Diveboard</TitleHeader></div>
        </SplashImage>

        <div className="container">
          <div className="col-sm-12">
            <AboutHeader>A better job site for divers...</AboutHeader>
            <AboutText>
            Finding a job in the diving industry is a exhausting.  If your tired of wasting time scrolling thorugh PADI classifieds and Divezone then try Diveboard!  Diveboard allows you to filter jobs to only the regions you{'\''}re interested in, and only the jobs that are right for you!  So if you{'\''}re looking to start your next adventure, try Diveboard, a better jobsite for divers...
            </AboutText>
          </div>
        </div>

        <SplashImage image ="assets/images/sam-soffes.jpg" align="center">
          <div className="col-sm-6">
          </div>
          <div className="col-sm-5">
            {!Auth.isAuthenticated() && <RegisterForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              certs={this.state.certs}
              centerReg={this.state.newUser.center}
              newUser={this.state.newUser}
              handleAddressChange={this.handleAddressChange}
              handleSelect={this.handleSelect}
              errors={this.state.errors}
            ></RegisterForm>}
          </div>
        </SplashImage>

      </section>
    );
  }
}

export default LandingPage;
