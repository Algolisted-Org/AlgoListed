import React from 'react'
import styled from 'styled-components'
import LeftMenu from '../Components/LeftMenu'
import CCHeader from '../Components/CCHeader'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-scroll'
// import BlogContent from '../Components/BlogContent';
// import RightMenu from '../Components/RightMenu'
import BlogContentMD from '../Components/BlogContentMD';
import logo from "../Images/logo.png";
import MobileNavbar from '../Components/MobileNavbar';
import axios from "axios";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import data from '../Components/allBlogsDatabase.json'

const BlogPage = () => {
    const [constFooter, setConstFooter] = useState(!true);
    const [resourceData, setResourceData] = useState([]);
    const params = useParams();
    const { blogname, blogid } = params;

    console.log(blogname, blogid);

    const ResourceType = 1;

    const contentInformation = [
        {
            "name": "Similar Questions",
            "text": "Blog contains similar questions to be solved at bottom of the page. The questions are generally taken from highly rated leetcode blogs, linkedin or contributed by our contributors.",
            "type": "Solve",
            "scroll_text": "Show All Problems, Related to this blog",
        },
        {
            "name": "Relevant resources for the blog",
            "text": "This section includes a collection of resources, such as source codes and links to other relevant blogs, contributed by experienced individuals on the topic.",
            "type": "Resource",
            "scroll_text": "Show All Resources, Related to this blog",
        }
      ]


      useEffect(() => {
        axios
            .get(`https://algolisted.tonmoy1912.in/blog-resources/blog/${blogname}`)
            .then((res) => {
                setResourceData(res.data);
            })
            .catch((err) => console.log(err));
      }, []);

    return (
        <GrandContainer>
            <MobContainer>
                <MobileNavbar/>
                <BlogContentMD blogid={blogid} blogname={blogname}/>
            </MobContainer>
            <Container>
                <CCHeader /> 
                <LeftMenu marked={"all-blogs"} />
                <div className="blogs-main">
                    <BlogContentMD blogid={blogid} blogname={blogname}/>
                    <RightMenu>
                        <div className="blog-contributors">
                            <div className="top-title">Blog Contributors</div>
                            <div className="top-desc">
                              This blog is has being written by <a href="https://www.linkedin.com/in/atanu-nayak-profile/" target='_blank' rel="noreferrer">Atanu Nayak</a> and a lot of resources are contributed 
                              by the community.
                            </div>
                            <div className="hold-contributors">
                                {
                                data[blogid].authorImageLink.map((item, index) => {
                                    return (<a className="contributor" href={data[blogid].authorLink[index]} target={"_blank"} key={index} rel="noreferrer"><img src={item} alt="" /></a>);
                                })
                                }
                            </div>
                            
                            <div className="btns">
                            <a href={`https://github.com/Nayaker/AlgoListed/blob/main/client/src/MarkdownFiles/Blog${blogid}.md`} target={"_blank"} className="full-btn cl-2" rel="noreferrer">Add content to this blog or Report a bug</a>
                            <button className="full-btn cl-1">Become a Technical Content Writer</button>
                            </div>
                        </div>
                        <div className="sticky-top">
                            <div className="similar-questions">
                            <div className="top-title">{contentInformation[ResourceType].name}</div>
                            <div className="top-desc">
                                {contentInformation[ResourceType].text}
                            </div>
                            {
                                resourceData.length > 0 && resourceData.map((item, index) => {
                                if(index < 2){
                                    return (
                                    <div className="question">
                                        <div className="text">{contentInformation[ResourceType].type} : <a href={item.resourceLink}>{item.resourceName}</a></div>
                                    </div>
                                    )
                                }
                                else return (<></>)
                                })
                            }
                            <div className="show-all-problems"><Link to='rev' spy={true} smooth={true} offset={2600} duration={1000}>{contentInformation[ResourceType].scroll_text}</Link></div>
                            </div>
                            <div className="ask-query">
                            <div className="top-title">Ask query about the topic</div>
                            <div className="top-desc">If you have a question or doubt, other readers may be able to help you. Additionally, a notification will be sent to the creators of the blog, who can address it for you.</div>
                            <div className="btn"><Link to='ask'spy={true} smooth={true} offset={3000} duration={1000}>
                            <div className="submit-btn" >Ask doubt to community</div>
                            </Link>
                            
                            </div>
                            
                            <div className="bottom-desc">Go to<Link to='ask' spy={true} smooth={true} offset={3000} duration={1000}>Ask doubts to community</Link> section, to ask, discuss and solve queries related to the blog topic.</div>
                            </div>
                        </div>
                    </RightMenu>
                </div>

                {/* <BlogsMain blogname={blogname}/> */}

                {
                    constFooter ? (
                        <PageOneFooter>
                            <p>
                                We use cookies to improve user experience and analyze website traffic. By clicking “Accept“, you agree to our website's cookie use as described in our Cookie Policy. You can change your cookie settings at any time by clicking “Preferences.”
                            </p>
                            <div>
                                <button className="accept-btn btn" onClick={() => setConstFooter(false)}>Accept</button>
                                <button className="accept-btn btn" onClick={() => setConstFooter(false)}>Preferences</button>
                            </div>
                        </PageOneFooter>) : (
                        <></>
                    )
                }
            </Container>
        </GrandContainer>
    )
}

export default BlogPage

const GrandContainer = styled.div`

`

const MobContainer = styled.div`
  

  @media only screen and (min-width: 1101px){
    display: none;
  }
`

const Container = styled.div`
    @media only screen and (max-width: 1100px){
        display: none;
    }

    display: flex;
    justify-content: space-between;
    padding-left: 200px; // width of left menu

    .blogs-main{
        flex: 1;
        min-height: 100vh;
        display: flex;
        justify-content: space-between;
    }
`

const PageOneFooter = styled.div`
    height: 60px;
    background-color: #efeff2;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;


    p{
        font-size: 0.7rem;
        width: 70%;
    }

    .btn{
        padding: 8px 15px;
        border: none;
        background-color: black;
        color: white;
        cursor: pointer;
        font-size: 0.65rem;
        display: inline;
    }

    .accept-btn{
        margin-right: 10px;
    }

    .reject-btn{

    }

    @media only screen and (max-width: 600px){
        display: none;
    }

`

const RightMenu = styled.div`
  width: calc(100vw - 1100px);
  max-width: 360px;
  height: 100%;
  margin-top: 55px;
  position: relative;
  border-left: 1px solid rgba(230, 230, 230, 1);
  background-color: white;
  padding: 10px 18px 60px 10px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1380px){
    width: calc(100vw - 920px);
  }   

  @media only screen and (max-width: 1200px){
      display: none;
  }  

  div{
    .top-title{
        font-size: 1.05rem;
        font-weight: 500;
    }
  
    .top-desc{
      font-size: 0.8rem;
      font-weight: 200;
      margin-top: 5px;
    }
  }


  .blog-contributors{
    margin: 20px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #d6d9de;

    .hold-contributors{
      margin-top: 7.5px;
      display: flex;
      flex-wrap: wrap;

      .contributor{
        background-color: pink;
        overflow: hidden;
        height: 42px;
        width: 42px;
        margin: 0 7.5px 7.5px 0;
        border-radius: 100px;
        border: 1px solid #b7a6a6;

        img{
          height: 100%;
        }
      }
    }

    .btns{
      margin-top: 30px;

      .full-btn{
        padding: 12.5px;
        font-size: 0.75rem;
        margin: 10px 0;
        text-decoration: none;
        color: inherit;
      }

      .cl-1{
        /* background-color: black; */
        color: white;
        font-weight: 200;
        background: linear-gradient(135deg,#000000,#000000,#000000,#686866,#000000,#000000,#000000,#000000);
        background-size: 600% 600%;

        -webkit-animation: AnimationName 20s ease infinite;
        -moz-animation: AnimationName 20s ease infinite;
        animation: AnimationName 20s ease infinite;
      }

      @-webkit-keyframes AnimationName {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
      }
      @-moz-keyframes AnimationName {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
      }
      @keyframes AnimationName {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
      }

      .cl-2{
        background-color: #f3f0f0;
      }

    }
  }

  .subscribe-box{
    /* display: none; */
    width: 100%;
    background-color: #eef0f3;
    padding: 25px;
    /* margin: 10px 0; */
    position: sticky;
    top: 390px;

    .top-title{
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 3.5px;
    }

    .top-desc{
      font-size: 0.9rem;
      font-weight: 200;
      line-height: 1.75rem;
    }

    .input-email{
      width: 100%;
      padding: 10px;
      font-size: 0.8rem;
      font-weight: 400;
      letter-spacing: 0.08rem;
      margin: 20px 0 7.5px 0;
    }

    .submit-btn{
      width: 100%;
      padding: 10px;
      font-size: 0.8rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
      background-color: black;
      color: white;
      text-align: center;
      cursor: pointer;
    }

    .bottom-desc{
      font-size: 0.7rem;
      margin-top: 10px;

      a{
        color: inherit;
        text-decoration: underline;
        margin-left: 5px;
      }
    }
  }

  .ask-query{
    /* display: none; */
    width: 100%;
    background-color: #eef0f3;
    padding: 10px;
    /* margin: 10px 0; */
    /* position: sticky; */
    /* top: 390px; */
    border-radius: 5px;

    .top-title{
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 3.5px;
    }

    .top-desc{
      font-size: 0.8rem;
      font-weight: 200;
      margin-top: 5px;
    }

    .submit-btn{
      width: 100%;
      padding: 10px;
      font-size: 0.8rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
      /* background-color: #dc7070; */
      background-color: #66a2d3;
      color: white;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
      margin: 15px 0;
    }

    .bottom-desc{
      font-size: 0.7rem;
      margin-top: 10px;

      a{
        color: inherit;
        text-decoration: underline;
        margin-left: 5px;
      }
    }
  }

  
  .sticky-top{
    position: sticky;
    top: 65px;
  }

  .similar-questions{
    margin: 5px 0 20px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #d6d9de;

    .question{
      background-color: #ebf2fd;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;

      .text{
        font-size: 0.8rem;

        a{
          font-weight: 400;
          color: #6c6bb3;
          text-decoration: none;
        }
      }

    }

    .show-all-problems{
      font-size: 0.8rem;
      color: purple;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  
`