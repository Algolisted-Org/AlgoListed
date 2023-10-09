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