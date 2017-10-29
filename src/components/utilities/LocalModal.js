import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Thumbnail = styled.div`
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100px;
  width: 200px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LocalModal = ({ show, close, job }) => {
  return(
    <Modal
      show={show}
      onHide={() => close(job)}
      container={this}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header closeButton>
        <ThumbnailContainer>
          <Thumbnail image={job.center.image}></Thumbnail>
        </ThumbnailContainer>
        <Modal.Title id="contained-modal-title">{job.center.name}</Modal.Title>
        <Modal.Title id="contained-modal-title">{job.center.address}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {job.description}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => close(job)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocalModal;
