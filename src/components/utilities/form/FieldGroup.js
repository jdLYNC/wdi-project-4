import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FieldGroup = ({ label, error, ...props }) => {
  return(
    <FormGroup validationState={ error ? 'error' : null }>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {error && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export default FieldGroup;
