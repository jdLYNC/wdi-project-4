import React from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Select from 'react-select';

const JobFilter = ({ setJobFilter, certs, filterJobs, countries, filterCountries, setCountryFilter, filterRegions, regions, setRegionFilter }) => {

  console.log('value', filterCountries);
  return(
    <aside>
      <h2>Filter results</h2>
      <ButtonToolbar>
        <ToggleButtonGroup type="checkbox" value={filterJobs}>
          {certs.map(cert => <ToggleButton key={cert.id} value={cert.level} onClick={setJobFilter}>{cert.title}</ToggleButton>)}
        </ToggleButtonGroup>
      </ButtonToolbar>
      <Select
        placeholder="Select Region"
        name="filterRegion"
        value={filterRegions}
        multi={true}
        options={regions}
        onChange={setRegionFilter}
        disabled={!!filterCountries[0]}
      />
      <Select
        placeholder="Select Country"
        name="filterCountry"
        value={filterCountries}
        options={countries}
        multi={true}
        onChange={setCountryFilter}
        disabled={!!filterRegions[0]}
      />
    </aside>
  );
};

export default JobFilter;
