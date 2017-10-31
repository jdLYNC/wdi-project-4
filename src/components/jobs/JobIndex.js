import React from 'react';
import Axios from 'axios';
import _ from 'lodash';

import JobScroller from './JobScroller';
import JobFilter from './JobFilter';
import GoogleMap from '../utilities/GoogleMap';
import LocalModal from '../utilities/LocalModal';
import Auth from '../../lib/Auth';

class JobIndex extends React.Component {

  state = {
    jobs: [],
    filteredJobs: [],
    show: false,
    selectedJob: null,
    filterParams: [0, 1, 2, 3, 4, 5],
    countries: [],
    selectedCountries: [],
    regions: [],
    selectedRegions: []
  };

  openClose = (job) => {
    this.setState(prevState => {
      return { show: !prevState.show, selectedJob: job };
    });
  }

  setJobFilter = ( { target: { value } }) => {
    if (!value) return null;
    const filterParams = _.xor(this.state.filterParams, [parseInt(value)]);
    this.setState({ filterParams }, () => this.handleFilter());
  }

  setCountryFilter = (value) => {
    this.setState({ selectedCountries: value }, () => this.handleFilter());
  }

  setRegionFilter = (value) => {
    this.setState({ selectedRegions: value }, () => this.handleFilter());
  }

  handleFilter = () => {
    const selectedLocations = this.state.selectedCountries.concat(this.state.selectedRegions);
    const filteredJobs = this.state.jobs.filter(job => {
      return (
        (this.state.filterParams.includes(job.reqCertLv.level)
        || this.state.filterParams.length < 1)
        && (selectedLocations.find(location => location.label === job.center.country
        || location.label === job.center.region)
        || selectedLocations.length < 1)
      );
    });
    this.setState({ filteredJobs });
  }

  deleteJob = (job) => {
    Axios
      .delete(`/api/jobs/${job.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      });
    this.openClose(job);
    const remainingJobs = _.reject(this.state.jobs, {'id': job.id} );
    this.setState({
      jobs: remainingJobs,
      filteredJobs: remainingJobs
    });
  }

  componentWillMount() {

    Axios
      .get('/api/jobs')
      .then(res => {
        let countries = res.data.map(job => {
          return { value: job.center.country, label: job.center.country };
        });
        let regions = res.data.map(job => {
          return { value: job.center.region, label: job.center.region };
        });
        countries = _.uniqBy(countries, 'value');
        countries = _.sortBy(countries, ['label']);
        regions = _.uniqBy(regions, 'value');
        regions = _.sortBy(regions, ['label']);
        this.setState({
          jobs: res.data,
          filteredJobs: res.data,
          countries: countries,
          regions: regions });
      })
      .catch(err => console.log(err));

    Axios
      .get('/api/certifications')
      .then(res => this.setState({ certs: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    console.log('selectedRegions ===>>>', this.state.selectedRegions);
    return (
      <div className="container">
        <div className="row">
          {this.state.selectedJob && <LocalModal
            show={this.state.show}
            close={this.openClose}
            job={this.state.selectedJob}
            deleteJob={this.deleteJob}></LocalModal>}

          <main className="col-sm-7">
            {this.state.jobs[1] && <GoogleMap
              jobs={this.state.filteredJobs}
              show={this.state.show}
              close={this.openClose}/>}
          </main>
          <section className="col-sm-5">
            { this.state.certs && <JobFilter
              setJobFilter={this.setJobFilter}
              certs={this.state.certs}
              filterParams={this.state.filterParams}
              countries={this.state.countries}
              setCountryFilter={this.setCountryFilter}
              selectedCountries={this.state.selectedCountries}
              regions={this.state.regions}
              setRegionFilter={this.setRegionFilter}
              selectedRegions={this.state.selectedRegions}></JobFilter>}
            <JobScroller
              jobs={this.state.filteredJobs}
              modal={this.openClose}/>
          </section>
        </div>
      </div>
    );
  }
}

export default JobIndex;
