import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { ControlLabel, FormGroup } from 'react-bootstrap';

const GooglePlaceSelect = ({ address, handleAddressChange, handleSelect }) => {

  const inputProps = {
    name: 'address',
    value: address,
    onChange: handleAddressChange
  };

  const AutocompleteItem = ({ formattedSuggestion: { mainText, secondaryText } }) => (
    <div>
      <i className="fa fa-globe" aria-hidden="true"></i>
      {' '}<strong>{mainText}</strong><br />
      <p>{secondaryText}</p>
    </div>
  );

  return(
    <FormGroup>
      <ControlLabel>Center Address</ControlLabel>
      <PlacesAutocomplete
        inputProps={inputProps}
        autocompleteItem={AutocompleteItem}
        onSelect={handleSelect}/>
    </FormGroup>

  );
};

export default GooglePlaceSelect;
