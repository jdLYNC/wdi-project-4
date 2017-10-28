import React from 'react';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Auth from '../../lib/Auth';

const NavBar = ({ handleChange, handleSubmit }) => {
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
          <LinkContainer to="/"><NavItem>Messages</NavItem></LinkContainer>
        </Nav>
        {!Auth.isAuthenticated() && <Navbar.Form pullRight>
          <form onChange={handleChange} onSubmit={handleSubmit}>
            <FormGroup>
              <FormControl type="email" name="email" placeholder="Enter email" />
              {' '}
              <FormControl type="password" name="password" placeholder="Enter password" />
            </FormGroup>
            {' '}
            <Button type="submit">Login</Button>
          </form>
        </Navbar.Form>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
