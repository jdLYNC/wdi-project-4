import React from 'react';
import FieldGroup from './FieldGroup';
import { ButtonToolbar, ControlLabel, ToggleButtonGroup, ToggleButton, FormGroup, FormControl } from 'react-bootstrap';
import PlacesAutocomplete from 'react-places-autocomplete';
import DragDrop from '../utilities/DragDrop';

const RegisterForm = ({ handleChange, certs, centerReg, handleSubmit, newUser, handleAddressChange, handleSelect }) => {
  // console.log(centerReg);

  const inputProps = {
    name: 'address',
    value: newUser.address,
    onChange: handleAddressChange
  };

  const AutocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"/>{suggestion}</div>);

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

      <PlacesAutocomplete
        inputProps={inputProps}
        autocompleteItem={AutocompleteItem}
        onSelect={handleSelect}/>

      <DragDrop onChange={handleChange} value={newUser.image}/>

      <button className="btn btn-lg btn-default btn-block">Join Diveboard!</button>

    </form>
  );
};

export default RegisterForm;
