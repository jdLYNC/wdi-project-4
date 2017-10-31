import React from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.section`
  width: 100%;
  height: 59vh;
  background-color: #FAFAFA;
  overflow: scroll;
  margin: 5vh 0;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const JobScroller = ({ jobs, modal }) => {
  return(
    <ScrollContainer onScroll={(e) => console.log(e.nativeEvent.target.children)}>
      {jobs.map(job => (
        <JobRow key={job.id} onClick={() => modal(job)}>
          <Thumbnail image={job.center.image}></Thumbnail>
          <JobRowInfo>
            <p>{job.center.name}</p>
            <p>{job.reqCertLv.title}</p>
          </JobRowInfo>
        </JobRow>
      ))}
    </ScrollContainer>
  );
};

export default JobScroller;
