import React from 'react';
import Axios from 'axios';
import _ from 'lodash';

import JobScroller from './JobScroller';
import JobFilter from './JobFilter';
import GoogleMap from '../utilities/GoogleMap';
import LocalModal from '../utilities/LocalModal';
import Auth from '../../lib/Auth';

import { Tabs, Tab } from 'react-bootstrap';

class JobIndex extends React.Component {

  state = {
    jobs: [],
    filteredJobs: [],
    selectedJob: null,
    showModal: false,
    filterJobs: [0, 1, 2, 3, 4, 5],
    countries: [],
    filterCountries: [],
    regions: [],
    filterRegions: []
  };

  openCloseModal = (job) => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal, selectedJob: job };
    });
  }

  setJobFilter = ( { target: { value } }) => {
    if (!value) return null;
    const filterJobs = _.xor(this.state.filterJobs, [parseInt(value)]);
    this.setState({ filterJobs }, () => this.handleFilter());
  }

  setCountryFilter = (value) => {
    this.setState({ filterCountries: value }, () => this.handleFilter());
  }

  setRegionFilter = (value) => {
    this.setState({ filterRegions: value }, () => this.handleFilter());
  }

  handleFilter = () => {
    const selectedLocations = this.state.filterCountries.concat(this.state.filterRegions);
    const filteredJobs = this.state.jobs.filter(job => {
      return (
        (this.state.filterJobs.includes(job.reqCertLv.level) || this.state.filterJobs.length < 1)
        && (selectedLocations.find(location => location.label === job.center.country || location.label === job.center.region) || selectedLocations.length < 1)
      );
    });
    this.setState({ filteredJobs });
  }

  deleteJob = (job) => {
    Axios
      .delete(`/api/jobs/${job.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      });
    this.openCloseModal(job);

    const jobs = _.reject(this.state.jobs, {'id': job.id} );
    const filteredJobs = _.reject(this.state.filteredJobs, {'id': job.id} );
    this.setState({ jobs, filteredJobs });
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
        countries = _.sortBy(_.uniqBy(countries, 'label'), ['label']);
        regions = _.sortBy(_.uniqBy(regions, 'label'), ['label']);
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
    return (
      <div className="container">
        <div className="row">

          { this.state.selectedJob &&
            <LocalModal
              showModal={this.state.showModal}
              close={this.openCloseModal}
              job={this.state.selectedJob}
              deleteJob={this.deleteJob} /> }

          <main className="col-sm-7">

            {this.state.jobs[0] &&
              <GoogleMap
                jobs={this.state.filteredJobs}
                modal={this.openCloseModal} />}

          </main>

          <section className="col-sm-5 margin">

            <Tabs defaultActiveKey={2} id="job-data-tabs">
              <Tab eventKey={1} title="Filter Jobs" className="mobile">
                { this.state.certs &&
                  <JobFilter
                    setJobFilter={this.setJobFilter}
                    certs={this.state.certs}
                    filterJobs={this.state.filterJobs}
                    countries={this.state.countries}
                    setCountryFilter={this.setCountryFilter}
                    filterCountries={this.state.filterCountries}
                    regions={this.state.regions}
                    setRegionFilter={this.setRegionFilter}
                    filterRegions={this.state.filterRegions} />}
              </Tab>

              <Tab eventKey={2} title="View Jobs">
                <JobScroller
                  jobs={this.state.filteredJobs}
                  modal={this.openCloseModal} />
              </Tab>
            </Tabs>



          </section>
        </div>
      </div>
    );
  }
}

export default JobIndex;
