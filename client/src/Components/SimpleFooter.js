import React, { useState, useEffect, CSSProperties } from "react";
import styled from "styled-components";

const SimpleFooter = () => {
  return (
    <Container>
        <div className="links">
            <a href="" className="link">Core Team</a>
            <a href="" className="link">Contributors</a>
            <a href="" className="link">About Us</a>
            <a href="" className="link">Verify Contributors</a>
            <a href="" className="link">Privacy Policies</a>
            <a href="" className="link">Disclaimer</a>
        </div>
        {/* <div className="company-info">
            <a className="text">English (IN)</a>
            <a className="text">© 2023 Algolisted v2.17</a>
        </div> */}
    </Container>
  )
}

export default SimpleFooter

const Container = styled.div`
    width: 100%;
    margin-top: 60px;

    .links{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        a{
            color: rgb(142, 142, 142);
            font-size: 0.7rem;
            margin: 0 10px;
            text-decoration: none;

            &:hover{
                text-decoration: underline;
            }
        }

    }

    .company-info{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 10px;

        .text{
            color: rgb(142, 142, 142);
            font-size: 0.7rem;
            margin: 0 10px;
        }
    }

    @media only screen and (max-width: 1100px) {
        width: 90%;
        margin: 20px auto 15px auto;
        
        .links, .company-info{
            a, .text{
                font-size: 0.6rem;
                margin-top: 10px;
            }
        }
    }
`