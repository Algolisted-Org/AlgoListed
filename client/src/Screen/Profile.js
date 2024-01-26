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
            <div className="section">
                <h2>Notable Projects</h2>

                <div className="project">
                    <h3>1. algolisted.com 
                        <span>Web Application</span> 
                        <span>Open Sourced</span> 
                    </h3>
                    <p className="desc">
                    Algolisted is a platform dedicated to analyzing contests on platforms like LeetCode and Codeforces. It offers a range of features, including trackers and visualization charts, to enhance learning productivity. Notably, we have introduced a resume-based question generator powered by <b>OpenAI</b>, allowing users to receive interview questions tailored to their resumes. This innovative tool facilitates effective interview preparation.
                    </p>
                    <p className="desc">
                    The primary technology stack employed in constructing the website is <b>MERN</b>. <b>Python</b> and <b>Flask</b> were utilized for scraping and processing data. The deployment was executed through <b>Google Firebase</b>, <b>cyclic.sh</b>, and <b>Vercel</b>.
                    </p>
                    {/* <p className="desc">
                        <b className='highlight'>Data Encryption</b> : To safeguard API data, I implemented a custom <b>npm package</b> called <b>easy-api-encryptor</b>. The encryption algorithm is elucidated in the subsequent section of the projects.
                    </p>
                    <p className="desc">
                        <b className='highlight'>Scalability Measures</b>: Implemented effective scalability strategies for the website, employing a <b>CDN</b> to cache and swiftly deliver static assets near users, thereby reducing server load and improving latency. Furthermore, we've integrated caching mechanisms platforms like <b>Redis</b> to alleviate the database load, resulting in enhanced response times. To optimize traffic distribution and ensure smooth operations, we've introduced a fundamental load balancer, leveraging the capabilities of <b>NGINX</b>, across multiple server instances.
                    </p> */}
                    <p className="desc">
                        <b className='highlight'>Project Statistics</b> : We obtain website statistics using <b>Google Firebase Analytics</b>, with the site consistently drawing over 3,000 page views monthly. Regarding GitHub statistics, the website has been open-sourced, boasting 37 contributors from 12 countries and the successful resolution of 85 issues.
                    </p>
                </div>

                <div className="project">
                    <h3>2. Slurp Software
                        <span>Web Application</span> 
                        <span>Profitable Software</span> 
                    </h3>
                    <p className="desc">
                        "Slurp" is currently in the development phase, essentially designed as a restaurant management system incorporating QR code functionality and real-time updates.
                    </p>
                    <p className="desc">
                        The primary technology stack employed in constructing the website is <b>MERN</b>.The deployment was executed through <b>Google Firebase</b> and <b>cyclic.sh</b>.
                    </p>
                </div>

                <div className="project">
                    <h3>3. Vision Bridge [ Hackathon Winning Project ]
                        <span>Machine Learning</span> 
                        <span>Web Simulator</span> 
                    </h3>
                    <p className="desc">
                        Engineered software for visually impaired users, featuring ML models with over 85% accuracy. Includes currency recognition, traffic identification, obstacle detection, emotion analysis, and text scanning. Voice input and automatic ML model selection enhance user experience. Technologies: React, Flask, TensorFlow, OpenCV.
                    </p>
                    <p className="desc">
                        Utilizes React for frontend, Flask for server, and TensorFlow/OpenCV for ML. Ensures seamless integration of voice input and ML capabilities for optimal accessibility.
                    </p>
                </div>

                <div className="project">
                    <h3>4. Leetcode Friends Live Contest Ranking 
                        <span>Chrome Extension</span> 
                    </h3>
                    <p className="desc">
                        Engineered software for visually impaired users, featuring ML models with over 85% accuracy. Includes currency recognition, traffic identification, obstacle detection, emotion analysis, and text scanning. Voice input and automatic ML model selection enhance user experience. Technologies: React, Flask, TensorFlow, OpenCV.
                    </p>
                    <p className="desc">
                        Utilizes React for frontend, Flask for server, and TensorFlow/OpenCV for ML. Ensures seamless integration of voice input and ML capabilities for optimal accessibility.
                    </p>
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
                font-size: 1rem;
                margin-right: 20px;
                text-decoration: none;
                color: #1f468c;
                font-weight: 400;
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
                font-size: 1.5rem;
                margin: -5px 10px 0 0;
            }

            .tag{
                font-size: 0.85rem;
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
    
    .section{
        margin-top: 120px;

        h2{
            font-size: 2.25rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15rem;
            margin-bottom: -15px;
        }

        .project{
            margin-top: 50px;
            h3{
                font-size: 1.5rem;
                font-weight: 600;
                letter-spacing: 0.07rem;
                display: flex;
                align-items: center;

                span{
                    font-size: 0.8rem;
                    letter-spacing: 0.03rem;
                    margin-left: 10px;
                    font-weight: 400;
                    padding: 3.5px 10px;
                    border-radius: 100px;
                    border: 1px solid #cbceee;
                    background-color: #eaecff;
                }

                margin-bottom: 15px;
            }

            .desc{
                font-size: 1rem;
                line-height: 1.85rem;
                font-weight: 400;
                letter-spacing: 0.07rem;
                margin-top: 15px;
                margin-left: 27.5px;

                b{
                    font-weight: 500;
                    background-color: #95c0e430;
                    padding: 0 5px;
                }
                
                .highlight{
                    font-weight: 600;
                    background-color: #9acd3236;
                    padding: 0 5px;
                }
            }
        }

    }
`