import styled from 'styled-components';

const SplashImage = styled.div`
  background-image: url(${props => props.image });
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: flex-end;
`;

export default SplashImage;
