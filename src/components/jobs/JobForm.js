import React from 'react';
import styled from 'styled-components';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const Form = styled.form`
  background-color: white;
  padding: 5vh;
  margin-top: 10vh;
  border-radius: 5vh;
`;


const JobForm = ({ handleChange, handleSubmit, certs, job, errors }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return(
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <ControlLabel>What level instructor do you require?</ControlLabel>
        <FormControl componentClass="select" name="reqCertLv" defaultValue={job.reqCertLv.id} onChange={handleChange}>
          {certs.map(cert => <option key={cert.id} value={cert.id}>{cert.title}</option>)}
        </FormControl>
      </FormGroup>
      {errors.reqCertLv && <small className="error-text">Please select the required instructor level</small>}
      <FormGroup>
        <ControlLabel>Describe the role</ControlLabel>
        <FormControl componentClass="textarea" name="description" style={{height: '30vh' }} value={job.description} onChange={handleChange} placeholder={errors.description ? errors.description : 'Enter job description'}/>
      </FormGroup>
      <button className="btn btn-lg btn-default btn-block" disabled={formInvalid}>Post job!</button>
    </Form>
  );
};

export default JobForm;
