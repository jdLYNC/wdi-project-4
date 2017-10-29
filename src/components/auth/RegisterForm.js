import React from 'react';
import FieldGroup from './FieldGroup';
import { ButtonToolbar, ControlLabel, ToggleButtonGroup, ToggleButton, FormGroup, FormControl } from 'react-bootstrap';

const RegisterForm = ({ handleChange, certs, centerReg, handleSubmit }) => {
  // console.log(centerReg);
  return(
    <form className="form" onChange={handleChange} onSubmit={handleSubmit}>
      <h2>Create an Account</h2>
      <FieldGroup
        name="name"
        type="text"
        label="Name"
        placeholder="Scuba Steve"
      />
      <FieldGroup
        name="email"
        type="email"
        label="Email"
        placeholder="steve@diveboard.com"
      />
      <FieldGroup
        name="password"
        type="password"
        label="Password"
        placeholder="********"
      />
      <FieldGroup
        name="passwordConfirmation"
        type="password"
        label="Confirm Password"
        placeholder="********"
      />

      <FormGroup>
        <ControlLabel>Account Type</ControlLabel>
        <ButtonToolbar>
          <ToggleButtonGroup
            type="radio"
            name="center">
            <ToggleButton value={false}>Diver</ToggleButton>
            <ToggleButton value={true}>Dive Center</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </FormGroup>

      { !centerReg && <FormGroup>
        <ControlLabel>Certification Level</ControlLabel>
        <FormControl componentClass="select" name="certLv">
          {certs.map(cert => (
            <option key={cert.id} value={cert.id}>{cert.title}</option>
          ))}
        </FormControl>
      </FormGroup>}

      { centerReg && <FieldGroup
        name="address"
        type="text"
        label="Address"
        placeholder="198-76 Blue Lagoon, Laguna Beach, CA 92651"
      />}

      <button className="btn btn-lg btn-default btn-block">Join Diveboard!</button>

    </form>
  );
};

export default RegisterForm;
