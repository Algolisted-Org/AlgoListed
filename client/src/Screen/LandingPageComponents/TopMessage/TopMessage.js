import React from "react";
import styled from "styled-components";

function TopMessage() {
  return (
    <TopMsg>
      <div className="text">
        The is website is under constant development, if there is something you
        can contribute the website with <a href="/work-with-us"> click here</a>.
      </div>
    </TopMsg>
  );
}

export default TopMessage;

const TopMsg = styled.div`
  height: 40px;
  width: 100vw;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ebebeb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e7c9c9;
  @media only screen and (max-width: 600px) {
      padding:10px;
      text-align:center
    }

  .text {
    font-size: 0.8rem;
    font-weight: 300;
    @media only screen and (max-width: 600px) {
      font-size: 0.7rem;
      font-weight: 300;
    }

    a {
      text-decoration: none;
    }
  }
`;
