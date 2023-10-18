import React, { useEffect, useState } from "react";
import styled from "styled-components";



const SearchBar = ({tagdat,tags,settagdata}) => {
    const [inpy,setinpu]=useState("");
    console.log(inpy,tagdat)
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
    <SearchBarWrapper>
      <SearchInput type="text" onChange={(e)=>setinpu(e.target.value)} placeholder="Search Tags..." />
    </SearchBarWrapper>
  );
};

export default SearchBar;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 160px; 
  margin-right:10px;
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

  &::placeholder {
    color: #aaa; 
  }
`;