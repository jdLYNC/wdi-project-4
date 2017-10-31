import React from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Select from 'react-select';

const JobFilter = ({ setJobFilter, certs, filterParams, countries, selectedCountries, setCountryFilter, selectedRegions, regions, setRegionFilter }) => {

  console.log('value', selectedCountries);
  return(
    <aside>
      <h2>Filter results</h2>
      <ButtonToolbar>
        <ToggleButtonGroup type="checkbox" value={filterParams}>
          {certs.map(cert => <ToggleButton key={cert.id} value={cert.level} onClick={setJobFilter}>{cert.title}</ToggleButton>)}
        </ToggleButtonGroup>
      </ButtonToolbar>
      <Select
        placeholder="Select Region"
        name="filterRegion"
        value={selectedRegions}
        multi={true}
        options={regions}
        onChange={setRegionFilter}
        disabled={selectedCountries[0]}
      />
      <Select
        placeholder="Select Country"
        name="filterCountry"
        value={selectedCountries}
        options={countries}
        multi={true}
        onChange={setCountryFilter}
        disabled={selectedRegions[0]}
      />
    </aside>
  );
};

export default JobFilter;
