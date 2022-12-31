import React from 'react'
import styled from 'styled-components'
import LeftMenu from '../Components/LeftMenu'
import CCHeader from '../Components/CCHeader'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogContent from '../Components/BlogContent';
import RightMenu from '../Components/RightMenu'
import BlogContentMD from '../Components/BlogContentMD';
import logo from "../Images/logo.png";
import MobileNavbar from '../Components/MobileNavbar'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const BlogPage = () => {
    const [constFooter, setConstFooter] = useState(!true);
    const params = useParams();
    const { blogname, blogid } = params;

    console.log(blogname, blogid);

    const ResourceType = 1;

    return (
        <GrandContainer>
            <MobContainer>
                <MobileNavbar/>
                <BlogContentMD blogid={blogid} />
            </MobContainer>
            <Container>
                <CCHeader /> 
                <LeftMenu marked={"all-blogs"} />
                <div className="blogs-main">
                    {/* <BlogContent blogid={blogid} /> */}
                    <BlogContentMD blogid={blogid} />
                    <RightMenu blogid={blogid} ResourceType={ResourceType}/>
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