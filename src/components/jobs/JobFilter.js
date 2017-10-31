import React from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const JobFilter = ({ handleFilter, certs, filterParams }) => {
  return(
    <aside>
      <h2>Filter results</h2>
      <ButtonToolbar>
        <ToggleButtonGroup type="checkbox" value={filterParams}>
          {certs.map(cert => <ToggleButton key={cert.id} value={cert.level} onClick={handleFilter}>{cert.title}</ToggleButton>)}
        </ToggleButtonGroup>
      </ButtonToolbar>
    </aside>
  );
};

export default JobFilter;
