import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import data from '../ScrapedData/striverSDEsheetScrapedData.json'
// import data2 from '../ScrapedData/babbarSDEsheetData.json'
import babbarData from '../ScrapedData/babbarSDEnew.json'
import apnaCollegeData from '../ScrapedData/ApnaCollege.json'
import frazData from '../ScrapedData/Fraz.json'
import blind75Data from '../ScrapedData/NeetcodeBlind75.json'
import lctopInterviewData from '../ScrapedData/LeetodeTopInterviewQuestions.json'

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
        // console.log(elem);
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

    console.log(apnaCollegeData);

    useEffect(() => {
        let len = apnaCollegeData.length;
        for(let i = 0; i<len; i++){
            if(i<26){
                apnaCollegeData[i].specialTag = 'Arrays';
            }
            else if(i < 48){
                apnaCollegeData[i].specialTag = 'Strings';
            }
            else if(i < 58){
                apnaCollegeData[i].specialTag = '2D Arrays';
            }
            else if(i < 81){
                apnaCollegeData[i].specialTag = 'Searching & Sorting';
            }
            else if(i < 102){
                apnaCollegeData[i].specialTag = 'Backtracking';
            }
            else if(i < 128){
                apnaCollegeData[i].specialTag = 'Linked List';
            }
            else if(i < 155){
                apnaCollegeData[i].specialTag = 'Stacks & Queues';
            }
            else if(i < 177){
                apnaCollegeData[i].specialTag = 'Greedy';
            }
            else if(i < 210){
                apnaCollegeData[i].specialTag = 'Binary Trees';
            }
            else if(i < 231){
                apnaCollegeData[i].specialTag = 'Binary Search Trees';
            }
            else if(i < 259){
                apnaCollegeData[i].specialTag = 'Heaps & Hashing';
            }
            else if(i < 299){
                apnaCollegeData[i].specialTag = 'Graphs';
            }
            else if(i < 305){
                apnaCollegeData[i].specialTag = 'Tries';
            }
            else if(i < 358){
                apnaCollegeData[i].specialTag = 'Dynamic Programming';
            }
            else if(i < 368){
                apnaCollegeData[i].specialTag = 'Bit Manipulation';
            }
            else if(i < 374){
                apnaCollegeData[i].specialTag = 'Segment Trees';
            }
        }
        // console.log(apnaCollegeData);
    }, [apnaCollegeData])

    const handlePostApnaCollege = async() => {
        let len = apnaCollegeData.length;
        for(let i = 0; i<len; i++){
            tagsArray.length = 0;
            tagsArray.push(apnaCollegeData[i].difficulty);
            let tagsLen = apnaCollegeData[i].problemTag.length;
            for(let j = 0; j<tagsLen; j++){
                tagsArray.push(apnaCollegeData[i].problemTag[j]);
            }
            // console.log("Position : ", i, " -> ", babbarData[i].title, babbarData[i].problemlink, babbarData[i].problemTag[0], tagsArray);

            // console.log(tagsArray);
            await fetch('http://localhost:8000/coding-questions/create', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
    
                body: JSON.stringify({
                    quesName : apnaCollegeData[i].title, 
                    quesLink : apnaCollegeData[i].problemlink,
                    specialTag : apnaCollegeData[i].specialTag,
                    tags : tagsArray,
                    "connectOn": "Apna College",
                    "connectOnDomain": "apna-college",
                })
            }).then(response => response.json())
                .then(apiReturn => {
                    console.log(apiReturn, "Position : ", i);
                    // alert(apiReturn.message);
                })
        }
    }
    
    console.log(frazData);

    const specialTags = [
        'Arrays', 'Recursion', 'Dynamic Programming', 'Strings', 'Maths', 'Greedy',
        'DFS', 'Tree', 'Hashing', 'Binary Search', 'BFS', 'Two Pointers', 'Stack', 
        'Data Structure', 'Graph', 'Bit Manipulation', 'LinkedList', 'Heap', 'Sliding Window'
    ]

    useEffect(() => {
        let len = frazData.length;
        let count = 0;
        for(let i = 0; i<len; i++){
            frazData[i].specialTag = specialTags[count];

            console.log("Log : ", i ," : ", specialTags[count], " -> ", frazData[i].title);

            if(frazData[i].title == 'Max Value of Equation'){
                count++;
            }
            else if(frazData[i].title == 'N-Queens'){
                count++;
            }
            else if(frazData[i].title == 'Minimum Cost to Cut a Stick'){
                count++;
            }
            else if(frazData[i].title == 'Substring with Concatenation of All Words'){
                count++;
            }
            else if(frazData[i].title == 'Number of Digit One'){
                count++;
            }
            else if(frazData[i].title == 'Create Maximum Number'){
                count++;
            }
            else if(frazData[i].title == 'Remove Boxes'){
                count++;
            }
            else if(frazData[i].title == 'Redundant Connection II'){
                count++;
            }
            else if(frazData[i].title == 'Design HashMap'){
                count++;
            }
            else if(frazData[i].title == 'Shortest Subarray with Sum at Least K'){
                count++;
            }
            else if(frazData[i].title == 'Reachable Nodes In Subdivided Graph'){
                count++;
            }
            else if(frazData[i].title == 'Subarrays With K Different Integers'){
                count++;
            }
            else if(frazData[i].title == 'Evaluate Reverse Polish Notation'){
                count++;
            }
            else if(frazData[i].title == 'Design Browser History'){
                count++;
            }
            else if(frazData[i].title == 'Time Needed to Inform All Employees'){
                count++;
            }
            else if(frazData[i].title == 'Sum of Two Integers'){
                count++;
            }
            else if(frazData[i].title == 'K-th Smallest Prime Fraction'){
                count++;
            }
            else if(frazData[i].title == 'Sliding Window Median'){
                count++;
            }
        }
        
        console.log(frazData);
    }, [frazData])

    const handlePostFraz = async() => {
        let len = frazData.length;
        for(let i = 0; i<len; i++){
            tagsArray.length = 0;
            tagsArray.push(frazData[i].difficulty);
            let tagsLen = frazData[i].problemTag.length;
            for(let j = 0; j<tagsLen; j++){
                tagsArray.push(frazData[i].problemTag[j]);
            }
            // console.log("Position : ", i, " -> ", babbarData[i].title, babbarData[i].problemlink, babbarData[i].problemTag[0], tagsArray);

            // console.log(tagsArray);
            await fetch('http://localhost:8000/coding-questions/create', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
    
                body: JSON.stringify({
                    quesName : frazData[i].title, 
                    quesLink : frazData[i].problemlink,
                    specialTag : frazData[i].specialTag,
                    tags : tagsArray,
                    "connectOn": "Fraz SDE Sheet",
                    "connectOnDomain": "fraz-sde-sheet",
                })
            }).then(response => response.json())
                .then(apiReturn => {
                    console.log(apiReturn, "Position : ", i);
                    // alert(apiReturn.message);
                })
        }
    }

    console.log(blind75Data);

    const handlePostBlind75 = async() => {
        let len = blind75Data.length;
        for(let i = 0; i<len; i++){
            tagsArray.length = 0;
            let tagsLen = blind75Data[i].problemTag.length;
            for(let j = 0; j<tagsLen; j++){
                tagsArray.push(blind75Data[i].problemTag[j]);
            }
            // console.log("Position : ", i, " -> ", babbarData[i].title, babbarData[i].problemlink, babbarData[i].problemTag[0], tagsArray);

            // console.log(tagsArray);
            await fetch('http://localhost:8000/coding-questions/create', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
    
                body: JSON.stringify({
                    quesName : blind75Data[i].title, 
                    quesLink : blind75Data[i].problemlink,
                    specialTag : blind75Data[i].difficulty,
                    tags : tagsArray,
                    "connectOn": "Blind 75",
                    "connectOnDomain": "blind-75",
                })
            }).then(response => response.json())
                .then(apiReturn => {
                    console.log(apiReturn, "Position : ", i);
                    // alert(apiReturn.message);
                })
        }
    }


    console.log(lctopInterviewData);

    const handlePostLctopInterviewData = async() => {
        let len = lctopInterviewData.length;
        for(let i = 0; i<len; i++){
            tagsArray.length = 0;
            let tagsLen = lctopInterviewData[i].problemTag.length;
            for(let j = 0; j<tagsLen; j++){
                tagsArray.push(lctopInterviewData[i].problemTag[j]);
            }
            // console.log("Position : ", i, " -> ", babbarData[i].title, babbarData[i].problemlink, babbarData[i].problemTag[0], tagsArray);

            // console.log(tagsArray);
            await fetch('http://localhost:8000/coding-questions/create', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
    
                body: JSON.stringify({
                    quesName : lctopInterviewData[i].title, 
                    quesLink : lctopInterviewData[i].problemlink,
                    specialTag : lctopInterviewData[i].difficulty,
                    tags : tagsArray,
                    "connectOn": "Leetcode Top Interview Questions",
                    "connectOnDomain": "leetcode-top-interview-questions",
                })
            }).then(response => response.json())
                .then(apiReturn => {
                    console.log(apiReturn, "Position : ", i);
                    // alert(apiReturn.message);
                })
        }
    }


    useEffect(async () => {
        await axios.get("http://localhost:8000/coding-questions/question/striver-sde-sheet")
        .then((res) => {
            setnewData(res.data);
            // console.log(res.data);
        })
        .catch((err) => console.log(err));
    }, [])
    

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
        {/* <button onClick={() => handlePost()}>Click me Striver SDE</button> */}
        {/* <button onClick={() => handleCheckSame()}>Click me to check</button> */}

        {/* <button onClick={() => handlePostBabbar()}>Click me for Babbar SDE</button> */}
        {/* <button onClick={() => handleCheckSame()}>Click me to check for babbar</button> */}
        {/* <button onClick={() => handlePostApnaCollege()}>Click me for Apna College SDE</button>
        <button onClick={() => handlePostFraz()}>Fraz</button>
        <button onClick={() => handlePostBlind75()}>Push Blind 75</button>
        <button onClick={() => handlePostLctopInterviewData()}>Leetcode Top Questions</button> */}
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