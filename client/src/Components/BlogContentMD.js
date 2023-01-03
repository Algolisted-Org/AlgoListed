import { React, useState, useEffect } from 'react';
import styled from 'styled-components'
import ShowContributors from './ShowContributors'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import data from './mdfileDB.json'
import Avatar from '@material-ui/core/Avatar';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Markdown from 'markdown-to-jsx';
import BlogResources from './BlogResources';


const BlogContentMD = ({ blogid,  blogname }) => {
    const [ShowReply, setShowReply] = useState(false);
    const [post, setPost] = useState("");
    const [blogData, setBlogData] = useState(data[blogid]);
    
    const file_name = blogData.file_name;
    
    // console.log(blogid);
    // console.log(data[blogid]);

    useEffect(() => {
        import(`../MarkdownFiles/${file_name}`)
            .then(res => {
            fetch(res.default)
                .then(res => res.text())
                .then(res => setPost(res))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });
    // console.log(post);

    return (
        <Container>
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
                
                <div className="mark-down-file-content">
                    <Markdown>
                        {post}  
                    </Markdown>
                </div>

                <BlogResources ResourceType={1}  blogname={blogname}/>

                <div className="page-section">
                    <div className="new-part-heading" id='ask'>Ask doubts to community</div>
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

export default BlogContentMD

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

        @media only screen and (max-width: 1380px){
            padding: 80px 30px 30px 50px;
            width: 720px;
        }  
        
        @media only screen and (max-width: 1200px){
            width : calc(100vw - 200px);
            padding: 80px 120px 50px 120px;
        }

        @media only screen and (max-width: 1100px){
            width: 100%;
            padding: 80px 30px 50px 30px;
            overflow: hidden;
        }
        
        .main-heading{
            font-size: 1.65rem;
            font-weight: 600;
            color: #292929;

            @media only screen and (max-width: 1100px){
                font-size: 1.5rem;
                font-weight: 600;
            }
        }

        .heading-supporter{
            font-size: 1.05rem;
            margin-bottom: 10px;
            font-weight: 400;
            color: #696168;

            @media only screen and (max-width: 1100px){
                font-size: 1rem;
                font-weight: 400;
            }
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
                margin-bottom: 5px;
                background-color: #eef0f3;
                /* color: white; */
            }

            @media only screen and (max-width: 1100px){
                margin-bottom: -30px;
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
            font-size: 0.9rem;
            font-weight: 200;
            margin-bottom: 5px;
            letter-spacing: 0.05rem;
            line-height: 1.45rem;
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

        .mark-down-file-content{
            min-height: 1000px;
            font-weight: 200;
            font-size: 0.9rem;
            letter-spacing: 0.05rem;

            img{
                width: 100%;
                margin: 15px 0;
                display: block;
            }

            .small-img{
                width: 45%;
                min-width: 200px;

                @media only screen and (max-width: 1100px){
                    width: 100%;
                }
            }

            h1, h2, h3, h4, h5, h6, p, div, span, b{
                font-family: 'Poppins', sans-serif;
                letter-spacing: 0.03rem;
            }

            code {
                background-color: #eee;
                padding: 2.5px 7.5px;
                border-radius: 5px;
                font-size: 0.8rem;
            }

            pre {
                background-color: #f6f8fa;
                padding: 16px;
                border-radius: 15px;
                font-weight: 200;
                margin: 20px 0;
                font-size: 0.8rem;
                line-height: 1.45rem;
                letter-spacing: 0.07rem;
                overflow: hidden;
                font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
                
                @media only screen and (max-width: 1100px){
                    overflow-x: scroll;
                    border-radius: 5px;
                }

                code{
                    background-color: transparent;
                    padding: 0;
                }
            }
            
            

            h1, h2, h3, h4, h5, h6{
                font-weight: 500;
                margin: 50px 0 10px 0;
            }

            p, li{
                font-weight: 200;
                font-size: 0.9rem;
                line-height: 1.5rem;
                margin-bottom: 10px;
                letter-spacing: 0.05rem;
            }

            ul{
                margin-left: 5%;
                width: 95%;

                li{
                    margin: 15px;
                }
            }

            b{
                font-weight: 500;
                margin: 15px 0;
            }
            
        }
        
        .page-section{
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