import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import data from '../ScrapedData/striverSDEsheetScrapedData.json'
// import data2 from '../ScrapedData/babbarSDEsheetData.json'
import babbarData from '../ScrapedData/babbarSDEnew.json'
import axios from "axios";

const PushDataToMongoDB = () => {
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
    useEffect(() => {
        for(let i = 0; i<babbarLen; i++){
            if(babbarData[i].difficulty == undefined){
            // if(babbarData[i].problemTag == undefined){
                babbarData[i].difficulty = 'Medium'
                // console.log(babbarData[i]);
            }
        }
        for(let i = 0; i<babbarLen; i++){
            if(babbarData[i].companyTag == undefined){
            // if(babbarData[i].problemTag == undefined){
                babbarData[i].companyTag = [];
                // console.log(babbarData[i]);
            }
        }
        // console.log(babbarData);
        // tagsArray.length = 0;
        // let tagsLen = babbarData[i].tags.length;
        // for(let j = 0; j<tagsLen; j++){
        //     tagsArray.push(babbarData[i].tags[j][0]);
        // }
    }, [])

    useEffect(() => {
        let babbarLen = babbarData.length;
        let elem = {};
        for(let i = 0; i<babbarLen; i++){
            let tagsLen = babbarData[i].problemTag.length;
            for(let j = 0; j<tagsLen; j++){
                if(elem[babbarData[i].problemTag[j]]) {
                    elem[babbarData[i].problemTag[j]]++; 
                }
                else elem[babbarData[i].problemTag[j]] = 1;
            }
                
        }
        console.log(elem);
    }, [babbarData])
    

    

    
    const handlePostBabbar = async() => {
        for(let i = 0; i<babbarLen; i++){
            tagsArray.length = 0;
            tagsArray.push(babbarData[i].difficulty);
            let tagsLen = babbarData[i].problemTag.length;
            for(let j = 1; j<tagsLen; j++){
                tagsArray.push(babbarData[i].problemTag[j]);
            }
            // console.log("Position : ", i, " -> ", babbarData[i].title, babbarData[i].problemlink, babbarData[i].problemTag[0], tagsArray);

            // console.log(tagsArray);
            await fetch('http://localhost:8000/coding-questions/create', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
    
                body: JSON.stringify({
                    quesName : babbarData[i].title, 
                    quesLink : babbarData[i].problemlink,
                    specialTag : babbarData[i].problemTag[0],
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
    //         // console.log(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // }, [])
    

    // let same = true;
    // const handleCheckSame = () => {
    //     for(let i = 0; i<len; i++){
    //         console.log(data[i].title, newData[i].quesName, data[i].title == newData[i].quesName);
    //         same &= data[i].title == newData[i].quesName;
    //     }

    //     console.log("All data same : ", same);
    // }

  return (
    <Conatiner>
        <h1>Push Data To MongoDB</h1>
        {/* <button onClick={() => handlePost()}>Click me Striver SDE</button> */}
        {/* <button onClick={() => handleCheckSame()}>Click me to check</button> */}

        {/* <button onClick={() => handlePostBabbar()}>Click me for Babbar SDE</button> */}
        {/* <button onClick={() => handleCheckSame()}>Click me to check for babbar</button> */}
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