import "../../Allcss/Modal.css"
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
export const Modal = ({ isOpen, body, footer, label, onClose }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  return (
    <>
      {showModal && (
        <div
          className="
   container
    "
        >
          <div className="custom-container">
            <div
              className={`boxmodal ${showModal ? 'show-modal' : 'hide-modal'}`}
           
            >
              <button className="modal-btn" onClick={onClose}>
                <IoMdClose size={18} />
              </button>
              <div className="custom-text">{label}</div>
            </div>
            {/*body*/}
            <div className="modal-body">{body}</div>
            {/*footer*/}
            <div className="biggerfooter">
              <div
                className="
               footer
              "
              >
                {footer}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
