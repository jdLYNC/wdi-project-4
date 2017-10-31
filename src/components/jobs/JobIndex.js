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
    filterParams: [0, 1, 2, 3, 4, 5]
  };

  openClose = (job) => {
    this.setState(prevState => {
      return { show: !prevState.show, selectedJob: job };
    });
  }

  handleFilter = ({ target: { value } }) => {
    if (!value) return null;
    console.log(value);
    const filterParams = _.xor(this.state.filterParams, [parseInt(value)]);
    const filteredJobs = this.state.jobs.filter(job => {
      return filterParams.includes(job.reqCertLv.level);
    });
    console.log(filteredJobs);
    this.setState({ filterParams, filteredJobs }, () => console.log(this.state.filteredJobs));
  }

  // handleFilter = ({ target: { value }}) => {
  //   console.log(value);
  //   this.setState(prevState => {
  //     return {
  //       filterParams: _.xor(prevState.filterParams, [parseInt(value)]),
  //       filteredJobs: _.filter(this.state.jobs, (job) => {
  //         this.state.filterParams.includes(job.reqCertLv.level);
  //       }) };
  //   });
  // }

  // handleFilter2 = () => {
  //   console.log(this.state.filterParams);
  //   console.log('handleFilter2, the rehandling');
  //   this.setState({ filteredJobs: _.filter(this.state.jobs, job => {
  //     this.state.filterParams.includes(job.reqCertLv.level);
  //   })});
  // }

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
      .then(res => this.setState({ jobs: res.data, filteredJobs: res.data }))
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
          {/* <aside className="col-sm-2">
            Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside
          </aside> */}
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
              handleFilter={this.handleFilter}
              certs={this.state.certs}
              filterParams={this.state.filterParams}></JobFilter>}
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
