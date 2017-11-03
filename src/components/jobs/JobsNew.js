import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Auth from '../../lib/Auth';

const Background = styled.div`
  z-index: -1;
  width: 100vw;
  height: 93vh;
  background-image: url('../../assets/images/ahmed-saffu.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Form = styled.form`
  background-color: white;
  padding: 5vh;
  margin-top: 10vh;
  border-radius: 5vh;
`;

class JobsNew extends React.Component {

  state = {
    newJob: {
      description: '',
      center: Auth.getPayload().userId,
      reqCertLv: ''
    },
    certs: [],
    errors: {}
  };

  componentWillMount() {
    Axios
      .get('/api/certifications')
      .then(res => this.setState({ certs: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const newJob = Object.assign({}, this.state.newJob, { [name]: value });
    const errors = {};
    this.setState({ newJob, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/jobs', this.state.newJob,  {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/jobs'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <Background>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <FormGroup>
                  <ControlLabel>What level instructor do you require?</ControlLabel>
                  <FormControl componentClass="select" name="reqCertLv" defaultValue={false}>
                    <option value={false} disabled>Select the required certification level</option>
                    {this.state.certs.map(cert => <option key={cert.id} value={cert.id}>{cert.title}</option>)}
                  </FormControl>
                </FormGroup>
                {this.state.errors.reqCertLv && <small className="error-text">Please select the required instructor level</small>}
                <FormGroup>
                  <ControlLabel>Describe the role</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="description"
                    style={{height: '30vh' }}
                    placeholder={this.state.errors.description ? this.state.errors.description : 'Enter job description'}/>
                </FormGroup>
                <button className="btn btn-lg btn-default btn-block">Post job!</button>
              </Form>
            </div>
          </div>
        </div>
      </Background>
    );
  }
}

export default JobsNew;
