import React from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const JobFilter = ({ handleFilter }) => {
  return(
    <aside>
      <h2>Filter results</h2>
      <ButtonToolbar>
        <ToggleButtonGroup type="checkbox" defaultValue={[0]} onChange={handleFilter}>
          <ToggleButton value={0}>Divemaster</ToggleButton>
          <ToggleButton value={1}>Assistant Instructor</ToggleButton>
          <ToggleButton value={2}>Open Water Scuba Instructor</ToggleButton>
          <ToggleButton value={3}>Master Scuba Diver Trainer</ToggleButton>
          <ToggleButton value={4}>Staff Instructor</ToggleButton>
          <ToggleButton value={5}>Course Director</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </aside>
  );
};

export default JobFilter;
