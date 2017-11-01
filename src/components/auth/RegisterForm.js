import React from 'react';
import FieldGroup from './FieldGroup';
import { ButtonToolbar, ControlLabel, ToggleButtonGroup, ToggleButton, FormGroup, FormControl } from 'react-bootstrap';
import PlacesAutocomplete from 'react-places-autocomplete';
import DragDrop from '../utilities/DragDrop';

const RegisterForm = ({ handleChange, certs, handleSubmit, newUser, handleAddressChange, handleSelect, errors }) => {
  // console.log);

  const inputProps = {
    name: 'address',
    value: newUser.address,
    onChange: handleAddressChange
  };

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  const AutocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"/>{suggestion}</div>);

  return(
    <form className="form" onChange={handleChange} onSubmit={handleSubmit} noValidate>
      <h2>Create an Account</h2>
      <FieldGroup
        name="name"
        type="text"
        label="Name"
        placeholder="Scuba Steve"
        value={newUser.name}
      />
      {errors.name && <small className="error-text">{errors.name}</small>}

      <FieldGroup
        name="email"
        type="email"
        label="Email"
        placeholder="steve@diveboard.com"
        value={newUser.email}
      />
      {errors.email && <small className="error-text">{errors.email}</small>}

      <FieldGroup
        name="password"
        type="password"
        label="Password"
        placeholder="********"
        value={newUser.password}
      />
      {errors.password && <small className="error-text">{errors.password}</small>}

      <FieldGroup
        name="passwordConfirmation"
        type="password"
        label="Confirm Password"
        placeholder="********"
        value={newUser.passwordConfirmation}
      />
      {errors.passwordConfirmation && <small className="error-text">{errors.passwordConfirmation}</small>}

      <FormGroup>
        <ControlLabel>Account Type</ControlLabel>
        <ButtonToolbar>
          <ToggleButtonGroup
            type="radio"
            name="center"
            defaultValue={''}
            onChange={value => handleChange({ target: { name: 'center', value }})}>
            <ToggleButton value={''}>Diver</ToggleButton>
            <ToggleButton value={'1'}>Dive Center</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </FormGroup>

      { !newUser.center && <FormGroup>
        <ControlLabel>Certification Level</ControlLabel>
        <FormControl componentClass="select" name="certLv">
          {certs.map(cert => (
            <option key={cert.id} value={cert.id}>{cert.title}</option>
          ))}
        </FormControl>
      </FormGroup>}

      { newUser.center && <FormGroup>
        <ControlLabel>Center Address</ControlLabel>
        <PlacesAutocomplete
          inputProps={inputProps}
          autocompleteItem={AutocompleteItem}
          onSelect={handleSelect}/>
      </FormGroup> }

      { newUser.center && <FormGroup>
        <ControlLabel>Image/Logo</ControlLabel>
        <DragDrop onChange={handleChange} value={newUser.image}/>
      </FormGroup> }

      <button className="btn btn-lg btn-default btn-block" disabled={formInvalid}>Join Diveboard!</button>

    </form>
  );
};

export default RegisterForm;
