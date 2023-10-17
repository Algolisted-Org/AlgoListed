import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';

const Development = () => {
  // 1. .env-file for API authentication 
  // const api = "Flask based";
  // useEffect(() => {
  //     axios
  //       .get('http://127.0.0.1:5000/', {
  //         headers: {
  //           'blocked-origin': authKey,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  // }, []);

  // 2. Days between two dates
  // const givenDate = new Date('2023-10-01T09:30:00'); // Assuming UTC time
  // const currentDate = new Date(); // Current date and time

  // console.log(givenDate);
  // console.log(currentDate);

  // const timeDifference = currentDate - givenDate;

  // const hoursDifference = timeDifference / (1000 * 60 * 60);
  // console.log(`Hours Difference: ${hoursDifference}`);

  // const daysDifference = hoursDifference / 24;
  // console.log(`Days Difference: ${daysDifference}`);

  // 2. Are you allowed to call the API?

  // var isWeekly = true;

  const [sheetId, setSheetId] = useState('');
  const [ownerId, setOwnerId] = useState('7');
  const [sheetName, setSheetName] = useState('');
  const [sheetDesc, setSheetDesc] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const [sheets, setSheets] = useState([]);

  const [problemLink, setProblemLink] = useState('');
  const [problemLinksArray, setProblemLinksArray] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const curr_time = new Date();
    setLastUpdated(curr_time);

    const uniqueId = Date.now().toString();
    setSheetId(uniqueId);

    // Prepare the data to send in the POST request
    const data = {
      sheetId,
      ownerId,
      sheetName,
      sheetDesc,
      lastUpdated,
    };

    try {
      const response = await fetch('http://localhost:8000/problem-sheets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Success");
        // Handle success (e.g., show a success message)
      } else {
        console.error('Failed to create problem sheet');
        // Handle the error (e.g., show an error message)
      }
    } catch (error) {
      console.error(error);
      // Handle network or other errors
    }
  };

  const handleGetSheets = () => {
    // Make an HTTP request to your server to fetch questions
    fetch(`http://localhost:8000/problem-sheets/get-by-owner/${ownerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response data is an array of questions
        setSheets(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching sheets:', error);
      });
  };

  const handleAddProblemLink = () => {
    if (problemLink.trim() !== '') {
      setProblemLinksArray([...problemLinksArray, problemLink]);
      setProblemLink('');
    }
  };

  const handleUpdateSheet = () => {
    const problemIds = problemLinksArray;

    const apiUrl = 'http://localhost:8000/problem-sheets/update';
    const requestBody = JSON.stringify({
      sheetId: sheetId,
      problemIds: problemIds,
    });
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  


  return (
    <Container>
      <div className="collection">
        <h1>1. Auth Key | From .env file</h1>
        <ul>
          <li>The variable name in .env file should start with REACT_APP_ and after that only one word, no underscore etc. E.g., REACT_APP_APIKEYCONTESTANALYSIS</li>
          <li>You need to re-start the client!</li>
        </ul>
        {/* <p>This is my API key : {process.env.REACT_APP_APIKEYCONTESTANALYSIS}</p> */}
      </div>
      <div className="collection">
        <h1>2. Time difference between two dates </h1>
        <ul>
          <li>The code in the /development file is solid - have tested that it passes leap year and all such sort of stuff!</li>
        </ul>
      </div>
      <div className="collection">
        <h1>3. Are you allowed to call the API ? </h1>
        <ul>
          <li>The code in the /development file is solid - have tested that it passes leap year and all such sort of stuff!</li>
        </ul>
      </div>
      <div className="collection">
        <h1>4. Testing Backend - Temp </h1>
        <ul>
          <li>Here I am testing the create coding sheets code</li>
        </ul>
        <div>
          <h2>Create Problem Sheet</h2>
          <h4>User is logged in id = {ownerId}</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Sheet Name:</label>
              <input
                type="text"
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
              />
            </div>
            <div>
              <label>Sheet Description:</label>
              <input
                type="text"
                value={sheetDesc}
                onChange={(e) => setSheetDesc(e.target.value)}
              />
            </div>
            <button type="submit">Create Problem Sheet</button>
          </form>
        </div>
        <button onClick={handleGetSheets}>Get Sheets</button>
        <h1>Problem Links</h1>
      <input
        type="text"
        placeholder="Enter problem link"
        value={problemLink}
        onChange={(e) => setProblemLink(e.target.value)}
      />
      <button onClick={handleAddProblemLink}>Add</button>
      <ul>
        {problemLinksArray.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
      <div>
        <label>Sheet ID:</label>
        <input
          type="text"
          value={sheetId}
          onChange={(e) => setSheetId(e.target.value)}
        />
      </div>
      <button onClick={handleUpdateSheet}>Update</button>
    </div>
    </Container>
  )
}

export default Development;

const Container = styled.div`
  padding: 20px;

  h1{
    font-size: 1.75rem;
    font-weight: 500;
  }
  ul{
    margin: 10px 0;
    margin-left: 40px;
  }
  p, li{
    font-size: 0.9rem;
    font-weight: 300;
  }

  .collection{
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2d0d0;
  }
`