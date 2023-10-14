import "../../Allcss/Modal.css";
import { useState,useRef,useEffect} from "react";
import Input from "../input";
import { Modal } from "./Modal";

function AdduserModal({
  addUser,
  setadduser,
  allcountries,
  retrivelocalstorage,
  setretrivestorage,
}) {
  const [validation, setvalidation] = useState(false);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  useEffect(() => {
    if (input1Ref.current) {
      input1Ref.current.focus();
    }
  }, []);
    
  const handleKeyPress = (e, nextInputRef) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      nextInputRef.current.focus(); 
    }
  };
  const onclose = () => {
    setadduser(false);
  };
  const [credential, setcredential] = useState({
    name: "",
    imgurl: "",
  });

  const chnagecred = (e) => {
    setcredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handlesubmit = async () => {
    if (credential.name.trim() === "") {
      setvalidation(true);
    } else {
      const retrievedData = localStorage.getItem("myArray");
      let updatedArray = [];
      
      if (retrievedData) {
        updatedArray = JSON.parse(retrievedData);
      }
      
      updatedArray.push({
        username: credential.name,
        image_url: credential.imgurl,
      });
      
      console.log(updatedArray);
      setretrivestorage(updatedArray);
      localStorage.setItem("myArray", JSON.stringify(updatedArray));
      alert("added user");
      setcredential({
        name: "",
        imgurl: ""
      });
      setadduser(false);
    }
  };
  
  const body = (
    <>
      <Input
        type="text"
        label="Name"
        value={credential.name}
        refer={input1Ref}
        name="name"
        onChange={chnagecred}
        onKeyPress={(e) => handleKeyPress(e, input2Ref)}
      />
      {validation && <h6>Enter User name</h6>}
      <Input
        type="url"
        label="Image-url"
        value={credential.imgurl}
        refer={input2Ref}
        name="imgurl"
        onChange={chnagecred}
        onKeyPress={(e) => handleKeyPress(e,input3Ref)}
      />
      <button className="global-Add" ref={input3Ref} onClick={handlesubmit}>
        Add
      </button>
    </>
  );

  return (
    <Modal
      isOpen={addUser}
      onClose={onclose}
      body={body}
      label="Add your friend!"
    />
  );
}

export default AdduserModal;