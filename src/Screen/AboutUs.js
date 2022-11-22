import React from 'react'
import styled from 'styled-components'

const AboutUs = () => {
    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>About Us</h1>
            <p className="heading-supporter">
                We are an Open Source community of coders. Lorem ipsum random text now, A remarkable about page is genuine, approachable, and distinguished. It should give the visitor a glimpse into what working with you might be like. You can include personal interests, stories, and photos that convey the unique story of your business. You may also include information about who’s on your team and what their roles are. 
            </p>

            <div className="sub-heading">What do we do ?</div>
            <p className="heading-supporter">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolor voluptate! Voluptate nostrum beatae, modi, vero dolorem cum, fuga recusandae odio sapiente ipsum labore quam.
            </p>
            <p className="heading-supporter">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolor voluptate! Voluptate nostrum beatae, modi, vero dolorem cum, fuga recusandae odio sapiente ipsum labore quam.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolor voluptate! Voluptate nostrum beatae, modi, vero dolorem cum, fuga recusandae odio sapiente ipsum labore quam.
            </p>
            <p className="heading-supporter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, unde.
            </p>

            <div className="sub-heading">Types of contributors we have</div>
            <img src="https://external-preview.redd.it/qAinwhq9CP_hMz93BBh5dFEexYRJH4V7zHrhdWIswes.jpg?auto=webp&s=bc4459faf8abfeea29c104bcbfd4ed555075ace0" alt="" />
            <p className="heading-supporter">
                We have mainly three types of contributors, namely open source contributors, blogs contributor - Technical Content Writer and resources contributors.
            </p>
            <p className="heading-supporter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, repudiandae voluptates nulla a repellendus quis voluptatem? Perferendis tempora libero porro alias reiciendis mollitia vel magnam ipsam qui. Officiis nemo, quod magnam ab maiores corrupti similique quia sit tenetur rerum ad eaque, error quas natus blanditiis, quam iusto? Ullam, voluptatibus consequatur.
            </p>

            <div className="sub-heading">Our core team</div>
            <p className="heading-supporter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem blanditiis est molestiae suscipit, nihil perferendis!
                <br /> <a href="/organisation-information/core-team">Know more about the Core Team</a>
            </p>


        </Container>
    )
}

export default AboutUs


const Container = styled.div`
    width: 100%;

    img{
        height: 300px;
        margin: 20px 0;
    }
`