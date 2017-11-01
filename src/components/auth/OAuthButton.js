import React from 'react';
import OAuth from '../../lib/OAuth';
import queryString from 'query-string';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const OButton = styled.a`
  font-size: 2.8em;
  line-height: 0;
  margin: 0 3px;
  position: absolute;
  top: 5px;
`;

class OAuthButton extends React.Component {

  componentWillMount() {
    const { provider, location, history } = this.props;
    this.provider = OAuth.getProvider(provider);

    if(!location.search.match(/code/) || localStorage.getItem('provider') !== provider) return false;

    Axios.post(this.provider.url, this.getData())
      .then(res => Auth.setToken(res.data.token))
      .then(() => localStorage.removeItem('provider'))
      .then(() => history.replace(location.pathname))
      .then(() => history.push('/'));

  }

  getData = () => {
    const data = queryString.parse(this.props.location.search);
    data.redirectUri = window.location.origin + window.location.pathname;
    return data;
  }

  setProvider = () => {
    localStorage.setItem('provider', this.props.provider);
  }

  render() {
    return (
      <OButton
        href={this.provider.authLink}
        onClick={this.setProvider}>
        {this.props.children}
      </OButton>
    );
  }
}

export default withRouter(OAuthButton);
