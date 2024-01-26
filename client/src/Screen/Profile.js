import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LinkIcon from '@material-ui/icons/Link';
import CallMadeIcon from '@material-ui/icons/CallMade';

const Profile = () => {
    const linksData = [
        {
            id: 1,
            url: '/',
            imageSrc: 'https://www.freepnglogos.com/uploads/gmail-email-logo-png-16.png',
        },
        {
            id: 2,
            url: '/',
            imageSrc: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png',
        },
        {
            id: 3,
            url: '/',
            imageSrc: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        },
        {
            id: 4,
            url: '/',
            imageSrc: 'https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png',
        },
        {
            id: 5,
            url: '/',
            imageSrc: 'https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3628885-3030025.png',
        }
    ];

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
                    <VerifiedUserIcon />
                    <div className="tag">Web Development</div>
                    <div className="tag">Cloud Architecture</div>
                    <div className="tag">Machine Learning</div>
                    <div className="tag">Problem Solving Expert</div>
                </div>
            </div>
            <div className="table-of-contents">
                <h2>Table of Contents</h2>
                <div className="links">
                    <a href="/"><LinkIcon /> Work Experience</a>
                    <a href="/"><LinkIcon /> NOTABLE PROJECTS</a>
                    <a href="/"><LinkIcon /> Open Source Contributions</a>
                    <a href="/"><LinkIcon /> Achievements</a>
                </div>
            </div>
            <div className="section">
                <h2><LinkIcon /> Notable Projects</h2>

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
                        The Chrome extension, "Leetcode Friends Live Contest Ranking," enables users to view the rankings of their friends in a LeetCode contest. This extension fulfills a high demand as it addresses a missing feature on the LeetCode website during contests.
                    </p>
                </div>

                <div className="project">
                    <h3>5. easy-api-encryptor
                        <span>NPM Package</span>
                    </h3>
                    <p className="desc">
                        <b className='highlight'>NPM Package</b> : "easy-api-encryptor" is a lightweight package facilitating seamless encryption and decryption of data between Node.js and React.js. Ensure secure communication in your applications with minimal setup, making it easy to protect sensitive information during transit.
                    </p>
                    <p className="desc">
                        <b className='highlight'>Encryption Algorithm</b> : The encryption model employed here involves a simple yet effective technique of <b>adding a cyclic value of 15 to each character in the input string</b>. This process applies uniformly to both lowercase and uppercase characters, creating a straightforward and <b>reversible encryption mechanism</b>. The cyclic nature ensures that the shift wraps around, allowing for a seamless transformation while maintaining the integrity of the original character set. While this encryption model may not provide advanced security, it serves as a illustrative example for educational purposes or basic data obfuscation.
                    </p>
                </div>
            </div>
            <div className="section">
                <h2><LinkIcon /> Open Source Contributions</h2>
            </div>
            <div className="section">
                <h2><LinkIcon /> ACHIEVEMENTS</h2>
            </div>
            <LinksFixed>
                {linksData.map(link => (
                    <a key={link.id} href={link.url} className="link">
                        <img src={link.imageSrc} alt="" />
                    </a>
                ))}
            </LinksFixed>
            <Promotion>
                Create a similar page with <b>business.algolisted.com/build-portfolio</b> <CallMadeIcon/>
            </Promotion>
            <PromotionFooter>
                Developed and maintained by <b>business.algolisted.com/build-portfolio</b> - a <i>algolisted.com</i> product
            </PromotionFooter>
        </Container>
    )
}

export default Profile

const Container = styled.div`
    position: relative;
    padding: 100px 200px;
    padding-bottom: calc(0.8rem + 240px);


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
            font-size: 5rem;
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

    .table-of-contents{
        margin-top: 60px;
        margin-bottom: -60px;

        h2{
            font-size: 1.25rem;
            font-weight: 600;
            /* text-transform: uppercase; */
            letter-spacing: 0.05rem;
            /* color: #85c4eb; */

            svg{
                font-size: 2rem;
            }
        }

        .links{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-left: 15px;
            /* margin-top: 10px; */

            a{
                display: flex;
                align-items: center;
                text-decoration: none;
                margin-top: 20px;
                text-transform: uppercase;
                /* color: cornflowerblue; */
                font-size: 0.85rem;
                font-weight: 500;
                letter-spacing: 0.1rem;

                svg{
                    margin-right: 10px;
                }
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
            /* color: #85c4eb; */

            svg{
                font-size: 2rem;
            }
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

const LinksFixed = styled.div`
    position: fixed;
    left: 0;
    top: 200px;
    width: 50px;
    background-color: whitesmoke;
    border: 1px solid #cecaca;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow: hidden;

    .link{
        width: 100%;
        aspect-ratio: 1/1;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 12.5px;

        img{
            width: 100%;
        }

        &:hover{
            background-color: #e5e5e5;
            transition-duration: 250ms;
        }
    }

    .link:not(:last-child) {
        border-bottom: 1px solid #cecaca;
    }
`

const Promotion = styled.div`
    position: fixed;
    right: 20px;
    top: 20px;
    /* height: 50px; */
    /* width: 220px; */
    /* background-color: whitesmoke; */
    /* border: 1px solid #cecaca; */
    background-color: #ffffffb5;
    font-size: 0.75rem;
    padding: 10px;
    cursor: pointer;
    color: cornflowerblue;

    display: flex;
    align-items: center;

    b{
        font-weight: 600;
        color: cornflowerblue;
        margin: 0 3.5px;
    }
    
    svg{
        font-size: 0.85rem;
        fill: cornflowerblue;
    }
`

const PromotionFooter = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;

    padding: 25px 0;

    font-size: 0.85rem;
    cursor: pointer;
    /* color: cornflowerblue; */
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #f2f2f2;

    b{
        font-weight: 600;
        color: cornflowerblue;
        margin: 0 3.5px;
    }

    i{
        font-weight: 600;
        margin: 0 3.5px;
    }
    
    svg{
        font-size: 0.85rem;
        fill: cornflowerblue;
    }
`