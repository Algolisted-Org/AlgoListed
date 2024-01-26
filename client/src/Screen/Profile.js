import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const Profile = () => {
    return (
        <Container>
            <div className="intro">
                <h3>Hello there, I am</h3>
                <h1>Atanu Nayak</h1>
                <div className="links">
                    <a href="/">nayak.primary@gmail.com</a>
                    <a href="/">+91 9306191179</a>
                </div>
                <p className="desc">
                    Presently, I am in my third year pursuing computer science at Jadavpur University in Kolkata, India. My interests lie in constructing scalable cloud architectures, developing scalable websites, and implementing time-optimized algorithms. Over the recent months, I have delved into the realms of machine learning and cloud architecture. I pride myself on being a proficient problem solver, holding the title of an Expert on Codeforces and achieving the status of a knight on LeetCode.
                </p>
                <div className="tags">
                    <VerifiedUserIcon/>
                    <div className="tag">Web Development</div>
                    <div className="tag">Cloud Architecture</div>
                    <div className="tag">Machine Learning</div>
                    <div className="tag">Problem Solving Expert</div>
                </div>
            </div>

        </Container>
    )
}

export default Profile

const Container = styled.div`
    padding: 100px 200px;

    *{
        /* font-family: 'Open Sans', sans-serif; */
        font-family: 'Montserrat', sans-serif;
        color: #1e293b;
    }
    
    .intro{
        h3{
            font-size: 1.35rem;
            font-weight: 500;
            letter-spacing: 0.15rem;
            margin-bottom: 10px;
        }

        h1{
            font-size: 4rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5rem;
            margin-bottom: 15px;
        }

        .links{
            display: flex;
            align-items: center;
            margin-bottom: 35px;

            a{
                font-size: 0.9rem;
                margin-right: 10px;
                text-decoration: none;
                color: cornflowerblue;
                font-weight: 500;
            }
        }

        .desc{
            font-size: 1.15rem;
            line-height: 2rem;
            font-weight: 400;
            letter-spacing: 0.08rem;
        }

        .tags{
            margin-top: 20px;
            display: flex;
            align-items: center;

            svg{
                font-size: 2rem;
                margin: -5px 10px 0 0;
            }

            .tag{
                font-size: 0.9rem;
                font-weight: 600;
                padding: 5px 15px;
                margin-right: 10px;
                color: #c9b11a;
                border: 2px solid #f4ddb54f;
                border-radius: 100px;
                background-color: #a9f4cf47;
            }
        }
    }   
`