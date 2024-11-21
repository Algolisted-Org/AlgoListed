import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from "axios";

const Contributors = () => {
    const [temp, setTemp] = useState([1, 2, 2,3,3,4,4, 3,3,2,2,1]);
    
    useEffect(() => {
      document.title = "Contributors | Organisation Information - Algolisted";
    }, []);

    const [contributorsList, setContributorsList] = useState(null);

    useEffect(() => {
      axios.get("https://api.github.com/repos/Nayaker/Algorithmist/contributors")
        .then((res) => {
          setContributorsList(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>All Contributors</h1>
            <p className="heading-supporter">
                Welcome to the page dedicated to our contributors! Here, you will find information about the talented and dedicated individuals who have contributed to the success of our project. From their areas of expertise and accomplishments, to their involvement in our project, this page serves as a comprehensive resource for all things related to our contributors.
                <br /><br />
                We are incredibly grateful for the hard work and dedication of each and every one of our contributors, and we value their contributions greatly. Their skills, knowledge, and expertise have helped to shape and improve our project in countless ways.
                <br /><br />
                Thank you to all of our contributors for your invaluable support. We look forward to continuing to work with you and to the many great things we will accomplish together in the future.
            </p>
            <div className="hold-contributors">
            {
              contributorsList != null && contributorsList.map((item, index) => {
                return (
                  <a className="contributor" href={item.html_url} target={"_blank"} key={index} rel="noreferrer">
                    <img src={item.avatar_url} alt="" />
                  </a>
                )
              })
            }
          </div>


        </Container>
    )
}

export default Contributors


const Container = styled.div`
    width: 100%;
    b{
        font-weight: 500;
    }

    .hold-contributors{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      width: 60% !important;
      margin: auto !important;
      margin-top: 40px !important;
      max-width: 75%;

      .contributor{
        background-color: pink;
        overflow: hidden;
        height: 48px;
        width: 48px;
        margin: 0 7.5px 7.5px 0;  
        border-radius: 100px;
        border: 1px solid #b7a6a6;

        img{
          height: 100%;
        }
      }
    }
`