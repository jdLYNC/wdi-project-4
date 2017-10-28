import React from 'react';
import SplashImage from '../utilities/SplashImage';

import styled from 'styled-components';
const TitleHeader = styled.h2`
  margin-top: 5vh;
  font-size: 3em;
  color: white;
`;

const AboutHeader = styled.h2`
  margin-top: 15vh;
`;

const AboutText = styled.p`
  margin-top: 5vh;
  margin-bottom: 15vh;
  font-size: 1.1em;
`

const LandingPage = () => {
  return(
    <section>
      <SplashImage image="assets/images/denys-nevozhai.jpg">
        <div className="col-sm-6"><TitleHeader>DiveBoard</TitleHeader></div>
      </SplashImage>
      <div className="container">
        <div className="col-sm-12">
          <AboutHeader>A better job site for divers...</AboutHeader>
          <AboutText>
            Finding a job in the diving industry is a exhausting.  If your tired of wasting time scrolling thorugh PADI classifieds and Divezone then try Diveboard!  Diveboard allows you to filter jobs to only the regions you{'\''}re interested in, and only the jobs that are right for you!  So if you{'\''}re looking to start your next adventure, try Diveboard, a better jobsite for divers...
          </AboutText>
        </div>
      </div>
      <SplashImage image ="assets/images/sam-soffes.jpg"></SplashImage>
    </section>
  );
};

export default LandingPage;
