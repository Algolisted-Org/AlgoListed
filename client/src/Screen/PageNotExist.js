import React from 'react'
import styled, { keyframes } from 'styled-components'

import BirdCellImage from '../Images/bird-cells.svg';
import WaveImage from '../Images/wave.svg';

const PageNotExist = () => {
  return (
    <GrandContainer>
      <MessageContainer >
        <ButtonLink href='/'>Back to Home Page</ButtonLink>
        <h1>404 Page Not Found</h1>
        <p>Oops! The page you are looking for doesn't exist.</p>
      </MessageContainer>

      <div>
        <BirdContainer $duration='15s' $delay='0'>
          <Bird $duration='1s' $delay='-0.5s'></Bird>
        </BirdContainer>
        <BirdContainer $duration='16s' $delay='1s'>
          <Bird $duration='0.9s' $delay='-0.75s'></Bird>
        </BirdContainer>
        <BirdContainer $duration='14.6s' $delay='9.5s'>
          <Bird $duration='1.25s' $delay='-0.25s'></Bird>
        </BirdContainer>
        <BirdContainer $duration='16s' $delay='10.25s'>
          <Bird $duration='1.1s' $delay='-0.5s'></Bird>
        </BirdContainer>
      </div>

      <Ocean>
        <Wave></Wave>
      </Ocean>
    </GrandContainer>
  )
}



export default PageNotExist

const GrandContainer = styled.div`
  background: linear-gradient(180deg, #cae5f6 0%, #f2cae1 70%);
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const MessageContainer = styled.div`
  z-index: 2;
`;

const ButtonLink = styled.a`
  text-decoration: none;
  display: inline-block;
  background: linear-gradient(100deg, #57BBC1 0%, #8bb1d9 80%);

  border-color: transparent;
  color: white;
  cursor: pointer;
  margin: 10px auto;
  padding: 10px 20px;
  font-weight: 400;
  letter-spacing: 0.07rem;
  border: 1px solid #90B6D7;
`;

const FlyAnimation = keyframes`
  0% { transform: scale(0.3) translateX(-10vw); }
  10% { transform: translateY(2vh) translateX(10vw) scale(0.4); }
  20% { transform: translateY(0vh) translateX(30vw) scale(0.5); }
  30% { transform: translateY(4vh) translateX(50vw) scale(0.6); }
  40% { transform: translateY(2vh) translateX(70vw) scale(0.6); }
  50% { transform: translateY(0vh) translateX(90vw) scale(0.6); }
  60% { transform: translateY(0vh) translateX(110vw) scale(0.6); }
  100% { transform: translateY(0vh) translateX(110vw) scale(0.6); }
`;

const FlyCycleAnimation = keyframes`
  100% { background-position: -900px 0; }
`

const BirdContainer = styled.div`
  position: absolute;
  top: 20%;
  left: -10%;
  transform: scale(0) translateX(-10vw);
  will-change: transform;
  animation-name: ${FlyAnimation};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: ${props => props.$duration};
  animation-delay: ${props => props.$delay};
`;

const Bird = styled.div`
  background-image: url(${BirdCellImage});
  background-size: auto 100%;
  width: 88px;
  height: 125px;
  will-change: background-position;
  animation-name: ${FlyCycleAnimation};
  animation-timing-function: steps(10);
  animation-iteration-count: infinite;
  animation-duration: ${props => props.$duration};
  animation-delay: ${props => props.$delay};
`;

const Ocean = styled.div`
  height: 100px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #8bb1d9;
`;

const WaveAnimation = keyframes`
  0% { margin-left: 0;}
  100% {  margin-left: -1600px; }
`

const Wave = styled.div`
  background: url(${WaveImage}) repeat-x;
  position: absolute;
  bottom: 100px;
  width: 6400px;
  height: 198px;
  animation: ${WaveAnimation} 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
`