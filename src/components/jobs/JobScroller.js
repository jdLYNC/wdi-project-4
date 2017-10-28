import React from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.section`
  width: 100%;
  height: 400px;
  overflow: scroll;
  background-color: lightGrey;
`;

const JobRow = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  margin: 5px 0;
  background-color: white;
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
`;


const JobScroller = ({ jobs }) => {
  return(
    <ScrollContainer>
      {jobs.map(job => (
        <JobRow key={job.id}>
          <Thumbnail image={job.center.image}></Thumbnail>
          <JobRowInfo>
            <h3>{job.center.name}</h3>
            <p>{job.reqCertLv.title}</p>
          </JobRowInfo>
        </JobRow>
      ))}
    </ScrollContainer>
  );
};

export default JobScroller;
