import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import SearchBar from "./searchbar";

function Tagsfilter({ tags,needDarkMode, filterdata,setfilter,data,setTags }) {
  const [tagdat,settagdata]=useState([...tags])
  const [expand, setexpand] = useState(false);
  const [ischoose,setischoose]=useState([])
  
  useEffect(() => {
    setTags(ischoose);
  }, [ischoose]);
   
   
  //  if(ischoose.length===0){
  //   setfilter(data)
  //  }
  //  useEffect(()=>{
  //   const filteredData = filterdata.filter((item) => {
  //     return ischoose.every((tag) => item.tags.includes(tag));
  //   });
  //   setfilter(filteredData)
    
  //  },[ischoose])
   
  const onclicked = () => {
    setexpand((prev) => !prev);
 
  };
  
  const handletags=(each)=>{
    if (ischoose.includes(each)) {
        setischoose((prev) => prev.filter((tag) => tag !== each));
      } else {
        setischoose((prev) => [...prev, each]);
      }
  }
 
  return (
    <>
   
  
    <Tagscompo needDarkMode={needDarkMode}>
      
      <Tags needDarkMode={needDarkMode} onClick={onclicked}>
        Filter based on Problem Tags 
        {ischoose.length>0 && <Counts>{ischoose.length}</Counts>}
        {expand ? (
          <MdOutlineExpandLess size={30} />
        ) : (
          <MdOutlineExpandMore size={30}  />
        )}
      </Tags>
      {expand && (
        <Menuexpand needDarkMode={needDarkMode} expanded={expand}>
           {
      expand && <SearchBar needDarkMode={needDarkMode} tagdat={tagdat} tags={tags} settagdata={settagdata}/>
         }
          {tagdat.length===0?<h1>Not present</h1>:tagdat.map((each, index) => (
            <MenuItem  needDarkMode={needDarkMode} 
            key={index}
            isselected={ischoose.includes(each)}
            onClick={()=>handletags(each)}
            >{each}</MenuItem>
          ))}
          
        </Menuexpand>
      )}
    </Tagscompo>
    </>
  );
}

export default Tagsfilter;

const MenuItem = styled.div`
  position: relative;
  z-index: 1;
  font-size: 0.65rem;
  background-color:${(props) => (props.needDarkMode ? "#4042490" : "#f3f4f7")};
  width: auto;
  padding: 2.5px 7.5px;
  border-radius: 500px;
  margin-top: 5px;
  margin-right: 5px;
  text-align:center;
  cursor:pointer;
  /* color: white; */
  /* color: ${(props) => (props.isselected ? "white":"black")}; */
  color: ${(props) => (props.needDarkMode ? (props.isselected ? '#fff' : '#969696') : (props.isselected ? '#333' : '#b49999'))};
  border: 1px solid ${(props) => (props.needDarkMode ? (props.isselected ? '#ffffff' : '#ffffffb9') : (props.isselected ? '#040404' : '#cac3c3b0'))};
`;

const Menuexpand = styled.div`
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 300px;
  height:200px;
  overflow-y:auto;
  position: absolute;
  top: 40px;
  right: 0px;
  display: flex;
  border: 1px solid #cccccc;
  overflow-x: hidden;
  flex-wrap: wrap;
  opacity: ${props => (props.expanded ? 1 : 0)};
  transform: translateY(${props => (props.expanded ? "0" : "-10px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
  background-color: ${(props) => (props.needDarkMode ? '#201e1e' : '#fff')};
  
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

const Tags = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* color: #555555; */
  cursor:pointer;
  color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

  svg{
    fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
  }
  /* 
  background-color: ${(props) => (props.needDarkMode ? '#201e1e' : '#f3f4f7')};
  border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')}; */
`;

const Counts = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #f3f4f7;
  border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;

const Tagscompo = styled.div`
  z-index: 1;
  height: 29px;
  padding: 5px 10px;
  font-size: 0.7rem;
  border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`;