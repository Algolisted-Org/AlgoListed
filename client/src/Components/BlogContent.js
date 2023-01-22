import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import ShowContributors from './ShowContributors'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import data from './blogDatabase.json'
import Avatar from '@material-ui/core/Avatar';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const BlogContent = ({ blogid }) => {
    console.log("I am Atanu Nayak");
    console.log(blogid);
    console.log(data[blogid]);
    const [ShowReply, setShowReply] = useState(false);

    const [blogData, setBlogData] = useState(data[blogid]);


    return (
        <Container>
            {/* <Alert>
                fafanfafkfa
            </Alert> */}
            <div className="left">
                {/* <ShowContributors /> */}
                <h1 className='main-heading'>{blogData.title}</h1>
                <p className="heading-supporter">{blogData.titleSupport}</p>
                <div className="gap-5px-tb"></div>
                <div className="tags">
                    {
                        blogData.tags.map((item, index) => {
                            return <div className="tag" key={index}>{item}</div>
                        })
                    }
                </div>
                <div className="big-margin"></div>

                {/* Seperate random doc called; */}
                <iframe height={blogData.docHeightPx} src={`${blogData.docLinkIframe}`}></iframe>

                <div className="page-section">
                    <div className="new-part-heading">Beginner to medium level Problems</div>
                    <div className="para-1">
                        These question are sorted in a really nice manner. It helps you to start solving the problems from the very basic and then takes you to medium level problems. Here we clubbed the resources we have got from leetcode blogs, codeforces blogs and the knowlege from the contributors of the blog.
                    </div>
                    <div className="message">
                        <div className="text">
                            Want add a question link of this topic or point out any wrong info of tags. <a href="/">click here</a>
                        </div>
                    </div>
                    <div className="table">
                        <div className="link-row">
                            <div className="link-row-left">
                                <div className="count">1</div>
                                <div className="main-row-content">
                                    <a href="https://leetcode.com/problems/friend-circles/">BFS Implementaion</a>
                                    <div className="tags">
                                        <div className="tag">GeeksforGeeks</div>
                                        <div className="tag">Implementation</div>
                                        <div className="tag">TCS Ninjs</div>
                                        <div className="tag">Wipro</div>
                                    </div>
                                </div>
                            </div>
                            <div className="done-btn">
                                <CheckCircleOutlineIcon className='done' />
                            </div>
                        </div>
                        <div className="link-row">
                            <div className="link-row-left">
                                <div className="count">2</div>
                                <div className="main-row-content">
                                    <a href="https://leetcode.com/problems/friend-circles/">01 Matrix</a>
                                    <div className="tags">
                                        <div className="tag">Leetcode</div>
                                        <div className="tag">Atlassian</div>
                                        <div className="tag">Google</div>
                                        <div className="tag">TCS Ninja</div>
                                    </div>
                                </div>
                            </div>
                            <div className="done-btn">
                                <CheckCircleOutlineIcon className='done' />
                            </div>
                        </div>
                        <div className="link-row">
                            <div className="link-row-left">
                                <div className="count">3</div>
                                <div className="main-row-content">
                                    <a href="https://leetcode.com/problems/friend-circles/">Number of Islands</a>
                                    <div className="tags">
                                        <div className="tag">Leetcode</div>
                                        <div className="tag">Bloomberg</div>
                                    </div>
                                </div>
                            </div>
                            <div className="done-btn">
                                <CheckCircleOutlineIcon />
                            </div>
                        </div>
                        <div className="link-row">
                            <div className="link-row-left">
                                <div className="count">4</div>
                                <div className="main-row-content">
                                    <a href="https://leetcode.com/problems/friend-circles/">Rotting Oranges</a>
                                    <div className="tags">
                                        <div className="tag">Leetcode</div>
                                        <div className="tag">Amazon</div>
                                        <div className="tag">Uber</div>
                                        <div className="tag">Microsoft Engage</div>
                                    </div>
                                </div>
                            </div>
                            <div className="done-btn">
                                <CheckCircleOutlineIcon />
                            </div>
                        </div>
                        <div className="link-row">
                            <div className="link-row-left">
                                <div className="count">5</div>
                                <div className="main-row-content">
                                    <a href="https://leetcode.com/problems/friend-circles/">Course Schedule I</a>
                                    <div className="tags">
                                        <div className="tag">Leetcode</div>
                                        <div className="tag">Salesforce</div>
                                        <div className="tag">Twitter</div>
                                    </div>
                                </div>
                            </div>
                            <div className="done-btn">
                                <CheckCircleOutlineIcon />
                            </div>
                        </div>
                        <div className="link-row">
                            <div className="link-row-left">
                                <div className="count">6</div>
                                <div className="main-row-content">
                                    <a href="https://leetcode.com/problems/friend-circles/">Flood Fill</a>
                                    <div className="tags">
                                        <div className="tag">Leetcode</div>
                                        <div className="tag">Uber</div>
                                        <div className="tag">Microsoft</div>
                                        <div className="tag">Google</div>
                                    </div>
                                </div>
                            </div>
                            <div className="done-btn">
                                <CheckCircleOutlineIcon />
                            </div>
                        </div>
                        <div className="link-row no-bottom-border">
                            <div className="link-row-left">
                                <div className="count">7</div>
                                <div className="main-row-content">
                                    <a href="https://leetcode.com/problems/friend-circles/">King Escape</a>
                                    <div className="tags">
                                        <div className="tag">Codeforces</div>
                                        <div className="tag">Lyft Level 5 Challenge</div>
                                    </div>
                                </div>
                            </div>
                            <div className="done-btn">
                                <CheckCircleOutlineIcon />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-section">
                    <div className="new-part-heading">Ask doubts to community</div>
                    <div className="para-1">
                        You can ask any questions or doubts you have about the blog topic in this section. Please note that this section is for asking questions and seeking clarification, not for making complimentary comments about the blog. If you have a question or doubt, a notification will be sent to the blog creators so they can address it. Please refrain from using this section for flattering comments.
                    </div>
                    <div className="message">
                        <div className="text">
                            We are constanly building the site, ask doubts to community feature will be added soon.
                        </div>
                    </div>
                    {/* <div className="my_thread">
                        <div className="avatar"><Avatar /></div>
                        <input type="text" placeholder='Create your query thread . . . ' />
                    </div>
                    <div className="other-threads">
                        <div className="thread">
                            <div className="avatar">
                                <Avatar src="https://assets.leetcode.com/users/nero7s/avatar_1630046745.png" />
                            </div>
                            <div className="text">
                                <div className="name">Gaurav Prasad</div>
                                <div className="query">What is the time complexity of Dijikstra's algorithm? I mean I know it O(n^2) how?</div>
                                <div className="options">
                                    <div className="opt">Reply</div>
                                    <div className="opt">Show 3 Replies</div>
                                </div>
                                <div className="my-reply">
                                    <div className="avatar"><Avatar className='avatar-svg' /></div>
                                    <input type="text" placeholder='Reply to this thread . . . ' />
                                </div>
                                <div className="other-replies">
                                    <div className="reply">
                                        <div className="avatar">
                                            <Avatar src="https://assets.leetcode.com/users/_luser/avatar_1589608245.png" />
                                        </div>
                                        <div className="text">
                                            <div className="name">Varshini Mohan</div>
                                            <div className="query">Time complexity of Dijkstra's algorithm is O(N2) because of the use of doubly nested for loops. It depends on how the table is manipulated.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="reviews">
                                <ArrowDropUpIcon />
                                <div className="count">12</div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* <div className="right">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque harum exercitationem quasi tempore architecto, recusandae excepturi. Libero, possimus distinctio maxime magni neque facilis nulla vel iste itaque in eos animi reprehenderit, quisquam error temporibus soluta voluptates expedita, quibusdam officiis nostrum iure illum! Dolores numquam rerum facilis placeat animi blanditiis eius? Quasi reiciendis cumque at ex eaque aut labore aliquam. Odit alias laborum modi cumque reiciendis quo dolor aspernatur officia exercitationem placeat fugit molestias, mollitia natus ipsam laboriosam maiores atque consequuntur asperiores. Nulla dolore assumenda, repellendus sed officiis tenetur quia in, ullam mollitia non nobis aspernatur! Perspiciatis reprehenderit commodi blanditiis? Vitae.</div> */}
        </Container>
    )
}

export default BlogContent

const Container = styled.div`
    min-height: 100vh;
    /* width: calc(100vw - 200px); */
    /* width: 900px; */
    /* background-color: black; */
    /* margin: auto; */
    /* border-right: 1px solid black; */
    
    display: flex;
    justify-content: space-between;
    
    .left{
        /* background-color: pink; */
        width: max(900px, 60vw);
        padding: 80px 120px 50px 120px;
        overflow: hidden;

        iframe{
            z-index: -100;
            background-color: transparent;
            border: none;
            /* width: 100%; */
            width: 660px;
            /* height: 100%; */
            /* height: 9100px; */
            overflow-y: hidden;
        }

        @media only screen and (max-width: 1380px){
            padding: 80px 30px 30px 50px;
            width: 720px;
        }  
        
        @media only screen and (max-width: 1200px){
            width : calc(100vw - 200px);
            padding: 80px 120px 50px 120px;
        }
        
        .main-heading{
            font-size: 1.65rem;
            font-weight: 600;
            color: #292929;
        }

        .heading-supporter{
            font-size: 1.05rem;
            margin-bottom: 10px;
            font-weight: 400;
            color: #696168;
        }

        .theory-blog-part{
            margin-bottom: 70px;
        }

        .sub-heading{
            display: flex;
            align-items: flex-center;
            flex-direction: row;
            margin: 50px 0 0 0;

            .number{
                font-size: 0.8rem;
                background-color: #70a936;
                height: 1.15rem;
                width: 1.15rem;
                display: grid;
                place-items: center;
                margin-right: 5px;
                color: white;
                border-radius: 4px;
                margin-top: 3.5px;
                font-family: sohne-var, "Helvetica Neue", Arial, sans-serif;
            }

            .text{
                font-size: 1.05rem;
                margin-bottom: 10px;
                font-weight: 400;
            }
        }

        .tags{
            display: flex;
            flex-wrap: wrap;

            .tag{
                font-size: 0.7rem;
                padding: 5px 15px;
                border-radius: 5px;
                margin-right: 5px;
                background-color: #8a89d1;
                color: white;
            }
        }


        .gap-15px-tb{
            height: 15px;
        }

        .gap-5px-tb{
            height: 5px;
        }

        .big-margin{
            height: 50px;
        }

        .para-1{
            font-size: 0.95rem;
            font-weight: 200;
            margin-bottom: 5px;
        }

        .para-2{
            margin-bottom: 5px;
            margin-left: 30px;
            display: flex;
            align-items: flex-start;
            overflow: hidden;

            .sym{
                font-size: 2rem;
                margin: -0.8rem 0;
                margin-right: 5px;
            }

            .text{
                font-size: 0.95rem;
                font-weight: 200;
            }
        }
        
        .para-3{
            margin-top: 30px;
            margin-bottom: 10px;

            .text{
                font-size: 0.95rem;
                font-weight: 200;
                display: inline-block;
                
                b{
                    font-weight: 500;
                }
            }
        }

        .img-1{
            height: 160px;
            margin: 20px 0;
        }

        .img-2{
            width: 90%;
            margin: 20px 0;
            border-radius: 4px;
        }

        .new-part-heading{
            margin: 70px 0 20px 0;
            font-size: 1rem;
            font-weight: 500;
            padding: 10px 15px;
            background-color: #e5e5e5;
            
            min-width: 300px;
            text-align: center;
            border-radius: 5px;
        }

        .message{
            display: inline-block;
            /* display: flex; */
            /* align-items: center; */
            background-color: #d5f7e1;
            border-radius: 5px;
            padding: 10px;
            margin: 20px 0 0 0;

            .text{
                font-size: 0.8rem;
                color: #13803b;
                font-weight: 300;
                
            }
        }
        
        .page-section{

            .table{
                margin: 15px 0;
                min-height: 100px;
                width: 100%;
                /* background-color: #fbf7f7; */
                border: 1px solid #d1d5db;
                border-radius: 5px;
                padding: 0 15px;
                display: flex;
                flex-direction: column;
                background-color: white;

                .link-row{
                    padding: 20px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #d1d5db;
                    
                    .link-row-left{
                        display: flex;
                        align-items: center;
                        
                        .count{
                            font-size: 1.25rem;
                            font-family: Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
                            margin-right: 20px;
                            font-weight: 500;
                        }

                        .main-row-content{
                            a{
                                font-size: 0.9rem;
                                font-weight: 500;
                                text-decoration: none;
                                /* color: inherit; */

                                &:hover{
                                    text-decoration: underline;
                                }
                            }
                            
                            .tags{
                                margin: 0;
                                margin-top: 5px;
                                
                                .tag{
                                    background-color: #f3f4f7;
                                    color: inherit;
                                    padding: 2.5px 7.5px;
                                    border-radius: 100px;
                                }
                            }
                        }

                        
                    }

                    .done-btn{
                        .MuiSvgIcon-root{
                            fill: #b5a6a6;
                            font-size: 2.25rem;

                            &:hover{
                                transition-duration: 250ms;
                                fill: orange;
                                cursor: pointer;
                            }
                        }

                        .done{
                            fill: orange;
                        }
                    }

                }
                
                .no-bottom-border{
                    border-bottom: 1px solid transparent;
                }
            }

            .my_thread{
                display: flex;
                margin: 40px 0 10px 0;
                align-items: center;

                .avatar{
                    svg{
                        font-size: 2rem;
                        fill: grey;
                    }    
                }

                input{
                    border: none;
                    border-bottom: 1px solid black;
                    width: 100%;
                    font-size: 0.85rem;
                    margin: 0 10px;
                    padding-bottom: 5px;
                }
            }

            .other-threads{
                margin: 30px 0 0 0;

                .thread{
                    display: flex;
                    margin: 30px 0;
                    align-items: flex-start;
                    position: relative;

                    .avatar{
                        svg{
                            font-size: 2rem;
                            fill: grey;
                        }    
                    }

                    .text{
                        margin: 0 10px 0 10px;

                        .name{
                            font-size: 0.85rem;
                            font-weight: 500;
                            display: block;
                            margin-bottom: 2.5px;
                        }
                        .query{
                            font-size: 0.85rem;
                            font-weight: 200;
                        }
                        .options{
                            display: flex;
                            align-items: center;

                            .opt{
                                font-size: 0.75rem;
                                margin-right: 15px;
                                margin-top: 7.5px;
                                margin-left: -2.5px;
                                padding: 2.5px 5px;
                                border-radius: 5px;
                                
                                &:hover{
                                    background-color: #e5e5e5;
                                    transition-duration: 250ms;
                                    cursor: pointer;
                                }
                            }
                        }

                        .my-reply{
                            display: flex;
                            margin: 20px 0 10px 0;
                            align-items: center;

                            .avatar-svg{
                                font-size: 1rem;
                                fill: grey;
                            }

                            input{
                                border: none;
                                border-bottom: 1px solid black;
                                width: 100%;
                                font-size: 0.85rem;
                                margin: 0 10px;
                                padding-bottom: 5px;
                            }
                        }

                        .other-replies{
                            display: flex;
                            flex-direction: column;

                            .reply{
                                display: flex;
                                margin: 10px 0;
                                align-items: flex-start;
                                position: relative;

                                .avatar{
                                    svg{
                                        font-size: 2rem;
                                        fill: grey;
                                    }    
                                }

                                .text{
                                    .name{
                                        font-size: 0.85rem;
                                        font-weight: 500;
                                        display: block;
                                        margin-bottom: 2.5px;
                                    }
                                    
                                    .query{
                                        font-size: 0.85rem;
                                        font-weight: 200;
                                    }
                                }
                            }
                        }
                    }

                    .reviews{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-around;
                        width: 20px;
                        position: absolute;
                        right: 0;
                        top: 0;

                        svg{
                            font-size: 3rem;
                            margin: -12.5px 0;
                            fill: #c8c8c8;
                        }

                        .count{
                            font-size: 0.8rem;
                            letter-spacing: 0.07rem;
                        }
                    }
                }
            }
        }
    }

    /* .right{
        width: calc(100vw - 1100px);
        background-color: green;
        padding: 80px 20px;
    } */
    
`

const Alert = styled.div`
    position: fixed;
    height: 400px;
    width: 780px;
    left: 0;
    top: 0;
    background-color: black;
`