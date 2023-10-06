import "../../Allcss/Modal.css";
import { useState } from "react";
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
    }
    else{
    const finduser = allcountries?.find(
      (eachuser) => eachuser.username === credential.name
    );

    if (finduser) {
      const ispresent = retrivelocalstorage.some(
        (user) => user.username === credential.name
      );

      if (!ispresent) {
        const updatedArray = [
          ...retrivelocalstorage,
          {
            username: finduser.username,
            image_url:credential.imgurl,
            global_rank: finduser.realrank,
            solved: 1,
          },
        ];
        setretrivestorage(updatedArray);
        localStorage.setItem("myArray", JSON.stringify(updatedArray));
       alert("added user")
       setcredential({
        name:"",
        imgurl:""
       })
       setadduser(false)

      } else {
        alert("alread present")
      }
    } else {
    
       alert("not present")
     
    }
}
    
  };
  const body = (
    <>
      <Input
        type="text"
        label="Name"
        value={credential.name}
        name="name"
        onChange={chnagecred}
      />
      {validation && <h6>Enter User name</h6>}
      <Input
        type="url"
        label="Image-url"
        value={credential.imgurl}
        name="imgurl"
        onChange={chnagecred}
      />
      <button className="global-Add" onClick={handlesubmit}>
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
