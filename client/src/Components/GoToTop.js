import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let heightToHidden = 20;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <Wrapper>
      {isVisible && (
        <div className="top-btn" onClick={goToBtn}>
          {/* <FaArrowUp className="top-btn--icon" /> */}
          <ExpandLessIcon className="top-btn--icon" />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .top-btn {
    font-size: 2.4rem;
    width: 45px;
    height: 45px;
    color: #fff;
    background-color: #f4f3f3d6;
    border: 1px solid #dbd4d4;
    
    border-radius: 50%;
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &--icon {
      font-size: 30px;
      /* animation: gototop 1.2s linear infinite alternate-reverse; */
    }

    @media only screen and (max-width: 1100px) {
      width: 45px;
      height: 45px;
      bottom: 20px;
      right: 20px;
      border-bottom: 1px solid rgb(233, 229, 229);
background-color: #ffffffd4;
box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 5%);
-webkit-backdrop-filter: blur(8px);
backdrop-filter: blur(8px);
      
      &--icon {
        font-size: 25px;
      }
    }
  }
`;

export default GoToTop;