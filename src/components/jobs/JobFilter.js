import React from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const JobFilter = ({ handleFilter }) => {
  return(
    <aside>
      <h2>Filter results</h2>
      <ButtonToolbar>
        <ToggleButtonGroup type="checkbox" defaultValue={[0, 1, 2, 3, 4, 5]}>
          <ToggleButton value={0} onClick={handleFilter}>Divemaster</ToggleButton>
          <ToggleButton value={1} onClick={handleFilter}>Assistant Instructor</ToggleButton>
          <ToggleButton value={2} onClick={handleFilter}>Open Water Scuba Instructor</ToggleButton>
          <ToggleButton value={3} onClick={handleFilter}>Master Scuba Diver Trainer</ToggleButton>
          <ToggleButton value={4} onClick={handleFilter}>Staff Instructor</ToggleButton>
          <ToggleButton value={5} onClick={handleFilter}>Course Director</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </aside>
  );
};

export default JobFilter;
