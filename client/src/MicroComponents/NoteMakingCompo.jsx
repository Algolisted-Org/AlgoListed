import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

const NoteMaking = ({ name }) => {
  const [allNotes, setAllNotes] = useState([]);
  const [notevalue, setNoteValue] = useState('');
  const [specificNotes, setSpecificNotes] = useState([]);
  const [click, setNotClick] = useState(true);
  const [clickedItemIndex, setClickedItemIndex] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('All-notes')) || [];
    setAllNotes([...savedNotes]);
    if (savedNotes.length) {
      const specific = savedNotes.filter((each) => each.contestName === name);
      setSpecificNotes([...specific]);
    }
  }, [name]);

  useEffect(() => {
    if (specificNotes.length > 0) {
      setClickedItemIndex(0);
    }
  }, [specificNotes]);

  const deleteNotes = (index) => {
    const filteredNotes = specificNotes.filter((_, i) => i !== index);
    setSpecificNotes([...filteredNotes]);
      setClickedItemIndex(null);
  };

  const add = () => {
    if (notevalue.trim() !== '') {
      const newNote = {
        contestName: name,
        content: notevalue,
      };
      setSpecificNotes((prevSpecificNotes) => [...prevSpecificNotes, newNote]);
      const updatedNotes = [...allNotes, newNote];
      setAllNotes(updatedNotes);
      localStorage.setItem('All-notes', JSON.stringify(updatedNotes));
      setNoteValue('');
    }
  };

  return (
    <Wrapper>
      <LeftSection>
        <ToDoContainer>
          <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <Btn onClick={() => setNotClick(false)}>Add new Notes</Btn>
          </div>
          <ToDoList>
            {specificNotes?.map((notes, index) => (
              <ToDoItem key={index} 

                onClick={()=>{
                setNoteValue(notes.content)
              setClickedItemIndex(index)}
              
                }
                 style={{
                  backgroundColor: clickedItemIndex === index ? '#f0f0f0' : 'inherit',
                }}
                >
                {notes.content}
                <MdDelete
                  onClick={() => deleteNotes(index)}
                  style={{ position: 'absolute', top: 14, right: 16, cursor: 'pointer' }}
                />
              </ToDoItem>
            ))}
          </ToDoList>
        </ToDoContainer>
      </LeftSection>
      <RightSection>
        <NotesInputContainer>
          <TextInput value={click ? notevalue : ''} onChange={(e) => setNoteValue(e.target.value)} placeholder="Add New Notes" />
          <AddButton onClick={add}>{click ? 'Edit' : 'Add'}</AddButton>
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
  border-right: 2px solid #ccc;
  flex: 1;
  overflow-y: auto;
`;

const TextInput = styled.textarea`
  width: calc(100% - 20px);
  padding: 10px;
  box-sizing: border-box;
  height: calc(100% - 40px);
  resize: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const RightSection = styled.div`
  flex: 1;
`;

const ToDoContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Btn = styled.button`
  background-color: #3498db;
  color: white;
  padding: 5px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  border: 0;
  outline: 0;
  font-weight: bold;
  margin-bottom: 2px;
`;

const ToDoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 3px;
`;

const ToDoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  transition: background-color 0.3s;
  position: relative;
  z-index: 0;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NotesInputContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  height: 100%;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2980b9;
  }
`;
