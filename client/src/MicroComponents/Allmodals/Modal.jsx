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
   global-container
    "
        >
          <div className="global-custom-container">
            <div
              className={`global-boxmodal ${showModal ? 'show-modal' : 'hide-modal'}`}
           
            >
              <button className="global-btn" onClick={onClose}>
                <IoMdClose size={18} />
              </button>
              <div className="global-custom-text">{label}</div>
            </div>
            {/*body*/}
            <div className="global-body">{body}</div>
            {/*footer*/}
            <div className="global-biggerfooter">
              <div
                className="
                global-footer
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