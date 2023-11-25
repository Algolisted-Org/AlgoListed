// Modal.js
import React from "react";
import styled from "styled-components";

const StyledModal = ({ body, onClose }) => {
  //  get user info  to add the user profile image or
  const modalContentId = "modalContent";

  return (
    <ModalWrapper>
      <ModalContent
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby={modalContentId}
      >
        <CloseButton onClick={onClose} aria-label="Close">
          &times;
        </CloseButton>
        <UserAvatar
          src="https://images.unsplash.com/photo-1700348306221-e46870b0b587?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="User Avatar"
        />
        {body}
      </ModalContent>
    </ModalWrapper>
  );
};

export default StyledModal;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 150;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 20rem;
  max-width: 30rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;