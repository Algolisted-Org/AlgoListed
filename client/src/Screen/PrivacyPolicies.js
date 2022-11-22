import React from 'react'
import styled from 'styled-components'

const PrivacyPolicies = () => {
    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>Privacy Policies</h1>
            <p className="heading-supporter">
                We are an Open Source community of coders. Lorem ipsum random text now, A remarkable about page is genuine, approachable, and distinguished. It should give the visitor a glimpse into what working with you might be like. You can include personal interests, stories, and photos that convey the unique story of your business. You may also include information about who’s on your team and what their roles are. 
            </p>

            <div className="sub-heading">What, when, where? We collect information</div>
            <p className="heading-supporter">
                We collect information to improve Our services for you as well as for Our other users. Information you provide during sign-up.
            </p>
            <p className="heading-supporter">
                We collect your basic data during sign-up to identify you and to provide you better results. Basic information like E-mail id. 
            </p>
            <p className="heading-supporter">
                E-mail ID is used for your further login to your account and it remains with us up to the termination of your account by you sometimes We also terminate your account from Our services to make Our platform free of spam and safe for other users. 
            </p>

            <div className="sub-heading">During commenting, reviewing, and sharing</div>
            <p className="heading-supporter">
            We use your E-mail ID, name, and your content to show it to the other users as it helps us to provide trustworthy information about a topic or content to others on which you have commented or reviewed.
            </p>
            <p className="heading-supporter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, repudiandae voluptates nulla a repellendus quis voluptatem? Perferendis tempora libero porro alias reiciendis mollitia vel magnam ipsam qui. Officiis nemo, quod magnam ab maiores corrupti similique quia sit tenetur rerum ad eaque, error quas natus blanditiis, quam iusto? Ullam, voluptatibus consequatur.
            </p>
            <div className="sub-heading">What, when, where? We collect information</div>
            <p className="heading-supporter">
                We collect information to improve Our services for you as well as for Our other users. Information you provide during sign-up.
            </p>
            <p className="heading-supporter">
                We collect your basic data during sign-up to identify you and to provide you better results. Basic information like E-mail id. 
            </p>
            <p className="heading-supporter">
                E-mail ID is used for your further login to your account and it remains with us up to the termination of your account by you sometimes We also terminate your account from Our services to make Our platform free of spam and safe for other users. 
            </p>

            <div className="sub-heading">During commenting, reviewing, and sharing</div>
            <p className="heading-supporter">
            We use your E-mail ID, name, and your content to show it to the other users as it helps us to provide trustworthy information about a topic or content to others on which you have commented or reviewed.
            </p>
            <p className="heading-supporter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, repudiandae voluptates nulla a repellendus quis voluptatem? Perferendis tempora libero porro alias reiciendis mollitia vel magnam ipsam qui. Officiis nemo, quod magnam ab maiores corrupti similique quia sit tenetur rerum ad eaque, error quas natus blanditiis, quam iusto? Ullam, voluptatibus consequatur.
            </p>



        </Container>
    )
}

export default PrivacyPolicies


const Container = styled.div`
    width: 100%;

    img{
        height: 300px;
        margin: 20px 0;
    }
`