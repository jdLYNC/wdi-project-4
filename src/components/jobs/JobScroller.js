import React from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.section`
  width: 100%;
  height: 73vh;
  background-color: #FAFAFA;
  overflow: scroll;
  margin: 0;
  @media (max-width: 500px) {
    height: 44vh;
  }
`;

const JobRow = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  margin: 5px 0;
  background-color: white;
  font-size: 1.2em;
`;

const Thumbnail = styled.div`
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100px;
  width: 200px;
`;

const JobRowInfo = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 72vh;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 3em;
  border-radius: 50px;
  padding: 0;
  line-height: 0;
  color: rgba(0,0,0,0.7);
  outline: none;
  border: none;
  @media (max-width: 500px) {
    top: 42vh;
    font-size: 4em;
  }
`;

const scrollJobs = () => {
  const objDiv = document.getElementById('scroll');
  setTimeout(() => clearInterval(scrollTimer), 330);
  const scrollTimer = setInterval(() => {
    objDiv.scrollTop = objDiv.scrollTop + 10;
  }, 10);
};

const JobScroller = ({ jobs, modal }) => {
  return(
    <ScrollContainer id="scroll">
      {jobs.map(job => (
        <JobRow key={job.id} onClick={() => modal(job)}>
          <Thumbnail image={job.center.image}></Thumbnail>
          <JobRowInfo>
            <p><strong>{job.reqCertLv.title}</strong></p>
            <p>{job.center.country}</p>
          </JobRowInfo>
        </JobRow>
      ))}
      { jobs.length > 3 && <ScrollButton onClick={scrollJobs}>
        <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
      </ScrollButton> }
    </ScrollContainer>
  );
};

export default JobScroller;
