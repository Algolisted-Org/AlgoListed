import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import data from '../Components/striverSDEsheetScrapedData.json'
import babbarData from '../Components/babbarSDEsheetData.json'
import axios from "axios";

const PushDataToMongoDB = () => {
    console.log(33, babbarData[33]);
    console.log(34, babbarData[34]);
    console.log(35, babbarData[35]);
    const [newData, setnewData] = useState();

    const len = data.length;
    let tagsArray = ["I am goat"];
    const handlePost = async() => {
        for(let i = 0; i<len; i++){
            tagsArray.length = 0;
            tagsArray.push(data[i].difficulty);
            let tagsLen = data[i].problemTag.length;
            for(let j = 0; j<tagsLen; j++){
                tagsArray.push(data[i].problemTag[j]);
            }
        
            // console.log(tagsArray);
    
            if(!(data[i].companyTag == undefined || data[i].companyTag.length == 0 || data[i].companyTag[0] == '')){
                // company exists
                let companyTagLen = data[i].companyTag.length;
                for(let j = 0; j<companyTagLen; j++){
                    tagsArray.push(data[i].companyTag[j]);
                }
            }
    
            await fetch('http://localhost:8000/coding-questions/create', {
                // await fetch('http://localhost:8000/coding-questions/create', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
    
                body: JSON.stringify({
                    quesName : data[i].title, 
                    quesLink : data[i].problemlink,
                    specialTag : data[i].day,
                    tags : tagsArray,
                    connectOn : "Striver's SDE Sheet", 
                    connectOnDomain : "striver-sde-sheet"
                })
            }).then(response => response.json())
                .then(apiReturn => {
                    console.log(apiReturn, "Position : ", i);
                    // alert(apiReturn.message);
                })
        }
    }

    const babbarLen = babbarData.length;
    const handlePostBabbar = async() => {
        for(let i = 0; i<babbarLen; i++){
            tagsArray.length = 0;
            let tagsLen = babbarData[i].tags.length;
            for(let j = 0; j<tagsLen; j++){
                tagsArray.push(babbarData[i].tags[j][0]);
            }
            // console.log(tagsArray);
            await fetch('http://localhost:8000/coding-questions/create', {
                // await fetch('http://localhost:8000/coding-questions/create', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
    
                body: JSON.stringify({
                    quesName : babbarData[i].quesName, 
                    quesLink : babbarData[i].quesLink,
                    specialTag : babbarData[i].specialTag,
                    tags : tagsArray,
                    "connectOn": "Love Babbar",
                    "connectOnDomain": "love-babbar",
                })
            }).then(response => response.json())
                .then(apiReturn => {
                    console.log(apiReturn, "Position : ", i);
                    // alert(apiReturn.message);
                })
        }
    }


    // useEffect(async () => {
    //     await axios.get("http://localhost:8000/coding-questions/question/striver-sde-sheet")
    //     .then((res) => {
    //         setnewData(res.data);
    //         console.log(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // }, [])
    

    let same = true;
    const handleCheckSame = () => {
        for(let i = 0; i<len; i++){
            console.log(data[i].title, newData[i].quesName, data[i].title == newData[i].quesName);
            same &= data[i].title == newData[i].quesName;
        }

        console.log("All data same : ", same);
    }

  return (
    <Conatiner>
        <h1>Push Data To MongoDB</h1>
        <button onClick={() => handlePost()}>Click me</button>
        <button onClick={() => handleCheckSame()}>Click me to check</button>

        <button onClick={() => handlePostBabbar()}>Click me to post for babbar</button>
        <button onClick={() => handleCheckSame()}>Click me to check for babbar</button>
    </Conatiner>
  )
}

export default PushDataToMongoDB

const Conatiner = styled.div`
    padding: 100px;
    
    button{
        display: block;
        width: 300px;
    }
`