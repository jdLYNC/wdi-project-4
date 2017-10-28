import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import SplashImage from './SplashImage';
import RegisterForm from '../auth/RegisterForm';

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
      center: null,
      certLv: '',
      address: '',
      location: ''
    },
    certs: []
  };


  componentDidMount() {
    Axios
      .get('/api/certifications')
      .then(res => this.setState({ certs: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value }}) => {
    const newUser = Object.assign({}, this.state.newUser, { [name]: value });
    this.setState({ newUser });
  }

  handleSubmit = (e) => {
    console.log('submitting');
    e.preventDefault();
    Axios.post('/api/register', this.state.newUser)
      .then(() => {
        this.props.history.push('/login');
      })
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  // handleRadioClick = ({ target: { value }}) => {
  //   const newUser = Object.assign({}, this.state.newUser, { center: value });
  //   this.setState({ newUser, activeRegister: true });
  // }

  render() {
    console.log(this.state);
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
          <div className="col-sm-6">
            <RegisterForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              certs={this.state.certs}
              centerReg={this.state.newUser.center}
            ></RegisterForm>
          </div>
        </SplashImage>

      </section>
    );
  }
}

export default LandingPage;
