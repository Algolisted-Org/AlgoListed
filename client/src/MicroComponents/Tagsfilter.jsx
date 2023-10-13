import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

function Tagsfilter({ tags,filterdata,setfilter }) {
  const [expand, setexpand] = useState(false);
   const [showAll, setShowAll] = useState(false);
   const [ischoose,setischoose]=useState([])
   console.log(ischoose)
   useEffect(()=>{
    const filteredData = filterdata.filter((item) => {
        return item.tags.some((tag) => ischoose.includes(tag));
      });
      setfilter(filteredData)
   
   },[ischoose])
   
  const onclicked = () => {
    setexpand((prev) => !prev);
    setShowAll((prev) => !prev);
  };
   const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };
  const handletags=(each)=>{
    if (ischoose.includes(each)) {
        setischoose((prev) => prev.filter((tag) => tag !== each));
      } else {
        setischoose((prev) => [...prev, each]);
      }
  }
 
  return (
    <Tagscompo>
      <Tags  onClick={onclicked}>
        <p style={{ color: 'var(--body_background5)' }}> Filter based on Problem Tags </p>
        {ischoose.length>0 && <Counts>{ischoose.length}</Counts>}
        {expand ? (
          <MdOutlineExpandLess size={30} />
        ) : (
          <MdOutlineExpandMore size={30}  />
        )}
      </Tags>
      {expand && (
        <Menuexpand expanded={expand}>
          {tags.slice(0, showAll ? tags.length : 5).map((each, index) => (
            <MenuItem 
            key={index}
            isselected={ischoose.includes(each)}
            onClick={()=>handletags(each)}
            >{each}</MenuItem>
          ))}
          {tags.length > 5 && (
            <ShowMoreButton onClick={handleToggleShowAll}>
              {showAll ? "Show Less" : "Show More"}
            </ShowMoreButton>
          )}
        </Menuexpand>
      )}
    </Tagscompo>
  );
}

export default Tagsfilter;

const MenuItem = styled.div`
  font-size: 12px;
  background-color:${(props) => (props.isselected ? "#3498db" : "white")};
  padding: 5px 10px;
  border-radius: 1000px;
  margin: 5px;
  cursor:pointer;
  color: ${(props) => (props.isselected ? "white":"black")};
  border: 1px solid black;
  
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  font-size: 14px;
  cursor: pointer;
  padding: 5px;
  margin: 10px 0;
`;

const Menuexpand = styled.div`
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 300px;
  height: auto;
  position: absolute;
  top: 60px;
  left: -3px;
  display: flex;
  flex-wrap: wrap;
  opacity: ${props => (props.expanded ? 1 : 0)};
  transform: translateY(${props => (props.expanded ? "0" : "-10px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const Tags = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #555555;
  cursor:pointer;
`;

const Counts = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;

const Tagscompo = styled.div`
  height: 29px;
  padding: 5px 10px;
  font-size: 0.7rem;
  border: 1px solid #d0d5db;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`;
