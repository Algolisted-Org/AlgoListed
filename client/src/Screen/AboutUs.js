import React from 'react'
import styled from 'styled-components'
import groupPhoto from '../Images/aboutUsImg.jpeg'

const AboutUs = () => {
    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>About Us</h1>
            <p className="heading-supporter">
                Welcome to Algolisted! We are a group of top college students from institutions such as Jadavpur University, IITs, and BITs in India. Our passion for technology and drive to succeed led us to create Algolisted, a productivity tool for coders.
            </p>
            <p className="heading-supporter">
                But we don't just stop there. We also offer a range of resources to help coders improve their skills and stay up-to-date with the latest industry trends. From coding tutorials to expert insights, we provide everything you need to succeed in the world of programming.
            </p>
            <p className="heading-supporter">
                So why choose Algolisted? It's simple. We are a team of dedicated and talented individuals who are committed to delivering the best possible experience to our users. We are constantly updating and improving our website to ensure that it meets the needs of the modern coder.
            </p>

            <p className="heading-supporter">
                Additionally, we believe that every coder should have access to high quality resources and tools, regardless of their background or financial status. That's why we offer all of our resources for free. Whether you're just starting out in coding or are a seasoned professional, we have something for everyone.
            </p>
            
            <img src={groupPhoto} alt="" />

            <p className="heading-supporter">
                We also understand that coding can be a challenging and time-consuming pursuit. That's why we've designed Algolisted to be as user-friendly and efficient as possible. Our easy-to-use interface and comprehensive resources will help you get the most out of your time, so you can focus on what matters most: becoming a better coder.
            </p>

            <p className="heading-supporter">
                So if you're looking to improve your coding skills, stay up-to-date with the latest industry trends, or just want to find a better way to manage your productivity, look no further than Algolisted. We're here to help you succeed in the exciting world of coding.
            </p>

            <p className="heading-supporter">
                Thank you for choosing Algolisted. We hope that our website helps you achieve all of your coding goals and we look forward to supporting you on your journey to success.
            </p>


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