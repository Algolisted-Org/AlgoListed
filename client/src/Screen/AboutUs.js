import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import groupPhoto from '../Images/aboutUsImg.jpeg'

const AboutUs = () => {
    useEffect(() => {
		document.title = "About Us | Organisation Information - Algolisted";
	}, []);

    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>About Us</h1>
            <p className="heading-supporter">
            Welcome to Algolisted, a one-person project created by Atanu Nayak from Jadavpur University. Despite being a solo endeavor, Algolisted is a comprehensive productivity tool for coders that offers a wide range of resources to help them improve their skills and stay up-to-date with the latest industry trends. From coding tutorials to expert insights, Algolisted provides everything needed to succeed in the world of programming.
            </p>
            <p className="heading-supporter">
            At Algolisted, we believe that every coder should have access to high-quality resources and tools, regardless of their background or financial status. That's why all of our resources are completely free. Whether you're just starting out in coding or are a seasoned professional, Algolisted has something for everyone.


            </p>
            <p className="heading-supporter">
            We understand that coding can be a challenging and time-consuming pursuit. That's why Algolisted is designed to be as user-friendly and efficient as possible, helping coders get the most out of their time. Our easy-to-use interface and comprehensive resources will help you achieve your coding goals and become a better coder.
            </p>
            <p className="heading-supporter">
            At Algolisted, we're committed to delivering the best possible experience to our users. We're constantly updating and improving the website to meet the needs of the modern coder. So if you're looking to improve your coding skills or find a better way to manage your productivity, look no further than Algolisted. We're here to help you succeed in the exciting world of coding.
            </p>
            {/* <img src={groupPhoto} alt="" /> */}
            <p className="heading-supporter">
            Thank you for choosing Algolisted, and we look forward to supporting you on your journey to success.
            </p>
            <p className="heading-supporter">
                Visit my Linkedin : <a href="https://www.linkedin.com/in/atanu-nayak-profile/" target="_blank">Click Here</a>
            </p>

            {/* <p className="heading-supporter">
                So if you're looking to improve your coding skills, stay up-to-date with the latest industry trends, or just want to find a better way to manage your productivity, look no further than Algolisted. We're here to help you succeed in the exciting world of coding.
            </p>
            <p className="heading-supporter">
                Thank you for choosing Algolisted. We hope that our website helps you achieve all of your coding goals and we look forward to supporting you on your journey to success.
            </p> */}
        </Container>
    )
}

export default AboutUs


const Container = styled.div`
    width: 100%;

    img{
        width: 440px;
        margin: 20px 0;
    }
`