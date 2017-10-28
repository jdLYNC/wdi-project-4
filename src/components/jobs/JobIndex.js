import React from 'react';
import Axios from 'axios';

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
            MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main MAIN main </div>
            <div className="row">
              index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index index
            </div>
          </main>
          <section className="col-sm-3">

          </section>section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION section SECTION
        </div>
      </div>
    );
  }
}

export default JobIndex;
