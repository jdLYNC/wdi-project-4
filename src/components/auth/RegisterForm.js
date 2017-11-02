import React from 'react';
import FieldGroup from '../utilities/form/FieldGroup';
import { ButtonToolbar, ControlLabel, ToggleButtonGroup, ToggleButton, FormGroup, FormControl } from 'react-bootstrap';
import GooglePlaceSelect from '../utilities/form/GooglePlaceSelect';
import DragDrop from '../utilities/DragDrop';

const RegisterForm = ({ certs, handleChange, handleSubmit, handleAddressChange, handleSelect, newUser, errors, flashMessage }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return(
    <form
      className="form"
      onChange={handleChange}
      onSubmit={handleSubmit}
      noValidate>

      <h2>Create an Account</h2>

      <FieldGroup
        name="name"
        type="text"
        label="Name"
        placeholder="Scuba Steve"
        value={newUser.name}
        error={errors.name}
      />

      <FieldGroup
        name="email"
        type="email"
        label="Email"
        placeholder="steve@diveboard.com"
        value={newUser.email}
        error={errors.email}
      />

      <FieldGroup
        name="password"
        type="password"
        label="Password"
        placeholder="********"
        value={newUser.password}
        error={errors.password}
      />

      <FieldGroup
        name="passwordConfirmation"
        type="password"
        label="Confirm Password"
        placeholder="********"
        value={newUser.passwordConfirmation}
        error={errors.passwordConfirmation}
      />

      <FormGroup>
        <ControlLabel>Account Type</ControlLabel>
        <ButtonToolbar>
          <ToggleButtonGroup
            type="radio"
            name="center"
            defaultValue={''}>
            <ToggleButton value={''}>Diver</ToggleButton>
            <ToggleButton value={'true'}>Dive Center</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </FormGroup>

      { !newUser.center &&
        <FormGroup>
          <ControlLabel>Certification Level</ControlLabel>
          <FormControl componentClass="select" name="certLv" defaultValue={false}>
            <option value={false} disabled>Select your certification level</option>
            {certs.map(cert => (
              <option key={cert.id} value={cert.id}>{cert.title}</option>
            ))}
          </FormControl>
        </FormGroup> }

      { newUser.center &&
        <GooglePlaceSelect
          address={newUser.address}
          handleAddressChange={handleAddressChange}
          handleSelect={handleSelect}/> }

      { newUser.center &&
        <FormGroup>
          <ControlLabel>Image/Logo</ControlLabel>
          <DragDrop onChange={handleChange} value={newUser.image}/>
        </FormGroup> }

      <button
        className="btn btn-lg btn-default btn-block"
        disabled={formInvalid}>Join Diveboard!</button>

      { flashMessage &&
        <div className="flashMessage">{flashMessage}</div> }

    </form>
  );
};

export default RegisterForm;
