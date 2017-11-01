import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Auth from '../../lib/Auth';
import NavLogin from '../auth/NavLogin';

const NavBar = () => {

  return(
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Diveboard</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      
      <Navbar.Collapse>

        <Nav>
          <LinkContainer to="/jobs"><NavItem>Jobs</NavItem></LinkContainer>
          { Auth.getCurrentUser() && Auth.getCurrentUser().center &&
            <LinkContainer to="/jobs/new">
              <NavItem>Post Job</NavItem>
            </LinkContainer> }
          { Auth.isAuthenticated() &&
            <LinkContainer to="/messages">
              <NavItem>Messages</NavItem>
            </LinkContainer> }
        </Nav>

        <NavLogin />

      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
