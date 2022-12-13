import React from "react";
import styled from "styled-components";

function BottomMessage() {
  return (
    <BtmMsg>
      <div className="bottom">
        Open Source Project, by
        <a
          href="https://www.linkedin.com/in/atanu-nayak-profile/"
          target="_blank"
        >
          Atanu Nayak
        </a>{" "}
        and Community
      </div>
    </BtmMsg>
  );
}

export default BottomMessage;

const BtmMsg = styled.div`
  .bottom {
    height: 60px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 200;
    background-color: #1f1c1c;
    /* TURNED OF THE ABSOLUTE PROPERTY BECAUSE I FEEL ITS NOT NEEDED  */
    /* position: absolute;
    bottom: 0; */
    width: 100vw;
    letter-spacing: 0.06rem;
    @media only screen and (max-width: 600px) {
      font-size: 0.70rem;
    }

    a {
      color: inherit;
      padding: 0 5px;
      font-weight: 400;
      text-decoration: none;
    }
  }
`;
