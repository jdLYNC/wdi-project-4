import React from 'react';
import { FormGroup, ButtonToolbar, ControlLabel, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Select from 'react-select';

const JobFilter = ({ setJobFilter, certs, filterJobs, countries, filterCountries, setCountryFilter, filterRegions, regions, setRegionFilter }) => {

  return(
    <aside>
      <FormGroup>
        <ButtonToolbar>
          <ControlLabel>Filter by Job Type</ControlLabel>
          <ToggleButtonGroup type="checkbox" defaultValue={filterJobs}>
            {certs.map(cert =>
              <ToggleButton key={cert.id} value={cert.level} onClick={setJobFilter} block>{cert.title}</ToggleButton>
            )}
          </ToggleButtonGroup>
        </ButtonToolbar>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Filter by Region</ControlLabel>
        <Select
          placeholder="Select Region"
          name="filterRegion"
          value={filterRegions}
          multi={true}
          options={regions}
          onChange={setRegionFilter}
          disabled={!!filterCountries[0]}
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel>Filter by Country</ControlLabel>
        <Select
          placeholder="Select Country"
          name="filterCountry"
          value={filterCountries}
          options={countries}
          multi={true}
          onChange={setCountryFilter}
          disabled={!!filterRegions[0]}
        />
      </FormGroup>
    </aside>
  );
};

export default JobFilter;
