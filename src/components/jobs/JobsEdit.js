import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import JobForm from './JobForm';
import Auth from '../../lib/Auth';

const Background = styled.div`
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/images/talia-cohen.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

class JobsEdit extends React.Component {

  state = {
    job: {},
    certs: []
  };

  componentWillMount() {
    Axios
      .get('/api/certifications')
      .then(res => this.setState({ certs: res.data }))
      .catch(err => console.log(err));

    Axios
      .get(`/api/jobs/${this.props.match.params.id}`)
      .then(res => this.setState({ job: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const job = Object.assign({}, this.state.job, { [name]: value });
    this.setState({ job }, () => console.log(this.state.job));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/jobs/${this.props.match.params.id}`, this.state.job,  {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/jobs'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Background>
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2">
              {this.state.job.id && <JobForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                certs={this.state.certs}
                job={this.state.job}/>}
            </div>
          </div>
        </div>
      </Background>
    );
  }
}

export default JobsEdit;
