import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

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

const LocalModal = ({ showModal, close, job, deleteJob }) => {
  return(
    <Modal
      show={showModal}
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
      { Auth.isAuthenticated() && <Modal.Footer>
        { !Auth.getCurrentUser().certLv.level >= job.reqCertLv.level - 1 && <Link to={`/messages/${job.center.id}`}><Button bsSize="large" block>Apply</Button></Link> }
        { Auth.getPayload().userId === job.center.id &&
          <Link to={`/jobs/${job.id}/edit`}>
            <Button>Edit</Button>
          </Link> }
        { Auth.getPayload().userId === job.center.id && <Button onClick={() => deleteJob(job)}>Delete</Button> }
      </Modal.Footer>}
    </Modal>
  );
};

export default LocalModal;
