import React, { useEffect, useState } from "react";
import styled from "styled-components";



const SearchBar = ({needDarkMode, tagdat,tags,settagdata}) => {
    const [inpy,setinpu]=useState("");
    
    useEffect(()=>{
            const searchdata=setTimeout((inpu)=>{
                    if(!inpy){
                       settagdata([...tags])
                    }
                    else{
                      const taging=tagdat.filter((each)=>each.toLowerCase().includes(inpy.toLowerCase()))
                      
                      settagdata(taging)
                    }
            },[1000])
           return ()=> clearTimeout(searchdata)
    },[inpy])

  return (
    <SearchBarWrapper needDarkMode={needDarkMode}>
      <SearchInput needDarkMode={needDarkMode} type="text" onChange={(e)=>setinpu(e.target.value)} placeholder="Search Tags..." />
    </SearchBarWrapper>
  );
};

export default SearchBar;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.needDarkMode ? '#404249' : '#ffffff')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.needDarkMode ? 'transparent' : '#ccc')};
  width: 100%; 
  margin: 5px 10px 5px 0px;
  border-radius: 100px;
  font-size: 0.7rem;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding:2px;
  padding-left:4px;
  font-size: 12px;
  outline: none;
  background: transparent; 
  width: 100%;
  height:20px;
  color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
  &::placeholder {
    color: #aaa; 
  }
`;


