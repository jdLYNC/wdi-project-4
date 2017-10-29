import React from 'react';
import Axios from 'axios';
import _ from 'lodash';

import JobScroller from './JobScroller';
import JobFilter from './JobFilter';
import GoogleMap from '../utilities/GoogleMap';
import LocalModal from '../utilities/LocalModal';

class JobIndex extends React.Component {

  state = {
    jobs: [],
    filteredJobs: [],
    show: false,
    selectedJob: null,
    filterParams: []
  };

  openClose = (job) => {
    this.setState(prevState => {
      return { show: !prevState.show, selectedJob: job };
    });
  }

  handleFilter = (e) => {
    console.log(e);
    this.setState({ filterParams: e.target.value }, console.log(this.state.filterParams));
  }

  componentWillMount() {
    Axios
      .get('/api/jobs')
      .then(res => this.setState({ jobs: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.jobs);
    return (
      <div className="container">
        <div className="row">
          {/* <aside className="col-sm-2">
            Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside
          </aside> */}
          {this.state.selectedJob && <LocalModal
            show={this.state.show}
            close={this.openClose}
            job={this.state.selectedJob}></LocalModal>}

          <main className="col-sm-7">
            { this.state.jobs[1] && <GoogleMap
              jobs={this.state.jobs}
              show={this.state.show}
              close={this.openClose}/>}
          </main>
          <section className="col-sm-5">
            <JobFilter
              handleFilter={this.handleFilter}></JobFilter>
            <JobScroller
              jobs={this.state.jobs}
              modal={this.openClose}/>
          </section>
        </div>
      </div>
    );
  }
}

export default JobIndex;
