import React from 'react';
import Axios from 'axios';

import JobScroller from './JobScroller';
import GoogleMap from '../utilities/GoogleMap';

class JobIndex extends React.Component {

  state = {
    jobs: []
  };

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
          <aside className="col-sm-2">
            Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside Aside
          </aside>
          <main className="col-sm-7">
            <div className="row">
              <GoogleMap
                jobs={this.state.jobs} />
            </div>
            <div className="row">
              <JobScroller
                jobs={this.state.jobs} />
            </div>
          </main>
          <section className="col-sm-3">
            <JobScroller
              jobs={this.state.jobs} />
          </section>
        </div>
      </div>
    );
  }
}

export default JobIndex;
