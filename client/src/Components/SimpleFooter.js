import React, { useState, useEffect, CSSProperties } from "react";
import styled from "styled-components";

const SimpleFooter = () => {
    return (
        <Container>
            <div className="links">
                {/* <a href="" className="link">Core Team</a> */}
                <a href="/organisation-information/all-contributors" className="link">Contributors</a>
                <a href="/organisation-information/about-us" className="link">About Us</a>
                <a href="/organisation-information/verify-contributor" className="link">Verify Contributors</a>
                <a href="/organisation-information/privacy-policies" className="link">Privacy Policies</a>
                <a href="/organisation-information/disclaimer" className="link">Disclaimer</a>
                <a href="https://www.figma.com/file/WxQNK11kprjLMxfvESOP8y/Algorithmist-Project?node-id=0%3A1&t=6wm3USW7eS7dBjT3-0" target={"_blank"}>Figma</a>
            </div>
            {/* <div className="company-info">
            <a className="text">Open Source project - beta version - a Nayak production</a>
        </div> */}
        </Container>
    )
}

export default SimpleFooter

const Container = styled.div`
    width: calc(100vw - 600px);
    height: 40px;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 10px 0;
    bottom: 30px;
    left: 700px; 
    right: 0; //to make the footer at center of the page
    transform: translateX(-50%);
    transition: all 0.3s ease;
    
   


    @media (max-width: 1024px) {
        position: absolute;
        left: 600px; 
        padding: 10px 0;

    }

    @media (max-width: 768px) {
        width: calc(100vw - 100px);
        left: 600px; 
        height: 80px;
        padding: 10px 0;


    }

    @media (max-width: 480px) {
        width: calc(100vw - 100px);
        // background-color: red;
        height: 80px;
    }
         @media (max-width: 320px) {
        width: calc(100vw - 100px);
        height: 120px;
        padding: 10px 0;
        background-color: white;
    }
        

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
        margin-top: 20px;

        .text{
            color: rgb(142, 142, 142);
            font-size: 0.7rem;
            margin: 0 10px;

            b{
                font-weight: 400;
            }
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