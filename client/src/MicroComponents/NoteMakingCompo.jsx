import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import ClearIcon from "@material-ui/icons/Clear";
import uniqid from "uniqid";
const NoteMaking = ({ name }) => {
  const [allNotes, setAllNotes] = useState([]);
  const [notevalue, setNoteValue] = useState("");
  const [specificNotes, setSpecificNotes] = useState([]);
  const [click, setNotClick] = useState(true);
  const [specificid, setid] = useState(setAllNotes[0]?.id);

  const [clickedItemIndex, setindex] = useState(0);

  useEffect(() => {
    console.log("allNotes : ", allNotes);
    console.log("specificNotes : ", specificNotes);
    console.log("specificid : ", specificid);
    console.log("notevalue : ", notevalue);
    console.log("click : ", click);
  }, [allNotes, specificNotes, specificid, notevalue, click])

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("All-notes")) || [];
    setAllNotes([...savedNotes]);
    if (savedNotes.length) {
      const specific = savedNotes.filter((each) => each.contestName === name);
      setSpecificNotes([...specific]);
    }
  }, [name]);

  useEffect(() => {
    if (specificNotes.length == 0) {
      setNotClick(false);
      setNoteValue("");
    }
    if (specificNotes.length > 0) {
      setNotClick(true);
      if(specificNotes.length == 1) setindex(0);
      if(specificNotes.length == 1) setid(specificNotes[0].id);
      if(specificNotes.length == 1) setNoteValue(specificNotes[0].content);
    }
  }, [specificNotes]);

  const deleteNotes = (id, name) => {
    console.log(id);
    const filteredNotes = specificNotes.filter(
      (each) => each.contestName === name && each.id !== id
    );
    console.log(filteredNotes);
    setSpecificNotes([...filteredNotes]);
    const updatedNotes = allNotes.filter((each) => each.id !== id);
    setAllNotes(updatedNotes);
    console.log(specificNotes);
    localStorage.setItem("All-notes", JSON.stringify(updatedNotes));
  };

  const add = (id) => {
    if (!click) {
      if (notevalue.trim() !== "") {
        const newNote = {
          id: uniqid(),
          contestName: name,
          content: notevalue,
        };
        setSpecificNotes((prevSpecificNotes) => [
          ...prevSpecificNotes,
          newNote,
        ]);
        const updatedNotes = [...allNotes, newNote];
        setAllNotes(updatedNotes);
        // setindex(updatedNotes.length - 1);
        localStorage.setItem("All-notes", JSON.stringify(updatedNotes));
        setNoteValue(specificNotes[0].content);
      }
    } 
    else {
      const editedNotes = specificNotes.map((note) =>
        note.id == id ? { ...note, content: notevalue } : note
      );
      setSpecificNotes(editedNotes);
      const updatedAllNotes = allNotes.map((note) =>
        note.id == id ? { ...note, content: notevalue } : note
      );
      setAllNotes(updatedAllNotes);
      localStorage.setItem("All-notes", JSON.stringify(updatedAllNotes));
    }
    setNotClick(true);
  };

  return (
    <Wrapper>
      <LeftSection>
        <ToDoContainer>
          <div style={{ position: "sticky", top: 0, zIndex: 1, background: "whi" }}>
            <Btn
              onClick={() => {
                setNotClick(false);
                setNoteValue("");
              }}
            >
              Add new Notes +
            </Btn>
          </div>
          <ToDoList>
            {specificNotes.map((notes, index) => (
              <ToDoItem
                key={index}
                onClick={() => {
                  setNoteValue(notes.content);
                  setNotClick(true);
                  setid(notes.id);
                  setindex(index);
                }}
                style={{
                  backgroundColor: clickedItemIndex === index  && click ? "#dcf8eb" : "#f0f0f0",
                  border: clickedItemIndex === index  && click ? "1px solid #d1d5db" : "1px solid #f0f0f0",
                }}
              >
                {clickedItemIndex === index && click ? (
                  <div className="editing-tag">Editing</div>
                ) : (
                  <div></div>
                )}
                {notes.content}
                <ClearIcon
                  onClick={() => deleteNotes(notes.id, notes.contestName)}
                />
              </ToDoItem>
            ))}
          </ToDoList>
        </ToDoContainer>
      </LeftSection>
      <RightSection>
        <NotesInputContainer>
          <Notice>
            You can edit a specific left note or create a new one using the 'Add
            New Note' button at the top left.
            <br />
            <br />
            <b>
              You are currently{" "}
              {click ? "editing an old note" : "adding a new note"}
            </b>
          </Notice>
          <TextInput
            value={notevalue}
            onChange={(e) => setNoteValue(e.target.value)}
            placeholder="Add New Notes"
          />
          <AddButton onClick={() => add(specificid)}>
            {click ? "Edit old Note" : "Add new Note"}
          </AddButton>
        </NotesInputContainer>
      </RightSection>
    </Wrapper>
  );
};

export default NoteMaking;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
`;

const LeftSection = styled.div`
  border-right: 1px solid #ccc;
  flex: 1;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-left: 1px solid transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #335ddc;
    border-radius: 100px;
  }
`;

const TextInput = styled.textarea`
  width: calc(100% - 5px);
  padding: 15px;
  box-sizing: border-box;
  height: calc(100% - 135px);
  resize: none;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 0.85rem;
  font-weight: 300;
  margin-top: 15px;
  margin-bottom: 5px;
  background-color: #f0f0f0;

  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-left: 0px solid transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #335ddc;
    border-radius: 100px;
  }
`;

const RightSection = styled.div`
  width: 35%;
  margin-right: 2.5px;
`;

const ToDoContainer = styled.div`
  padding: 20px 20px 0 0;
  /* background-color: #f9f9f9; */
  border-radius: 8px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  margin-bottom: 20px;
`;

const Btn = styled.button`
  background-color: #e5e5e5;
  /* color: white; */
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  border: 0;
  outline: 0;
  font-weight: 400;
  margin-bottom: 20px;
`;

const ToDoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
`;

const ToDoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 6px;
  transition: background-color 0.3s;
  position: relative;
  z-index: 0;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 300;
  padding-right: 30px;
  position: relative;

  .editing-tag {
    position: absolute;
    padding: 5px 10px;
    background-color: #fff;
    font-size: 0.7rem;
    border-radius: 100px;
    top: -17.5px;
    left: 5px;
    border: 1px solid #b6b9bf;
  }

  svg {
    font-size: 1.25rem;
    position: absolute;
    top: -7.5px;
    right: -7.5px;
    padding: 2.5px;
    background-color: white;
    border-radius: 100px;
    border: 1px solid #b7b9bf;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NotesInputContainer = styled.div`
  padding: 20px 0 0 20px;
  /* background-color: #f0f0f0; */
  border-radius: 8px;
  height: 100%;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #e5e5e5;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.75rem;
  border-radius: 10px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid #333;
    transition-duration: 250ms;
    /* background-color: #e5e5e5; */
  }
`;

const Notice = styled.div`
  font-size: 0.75rem;

  b {
    font-weight: 500;
  }
`;
