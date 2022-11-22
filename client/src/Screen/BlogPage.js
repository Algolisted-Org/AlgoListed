import React from 'react'
import styled from 'styled-components'
import LeftMenu from '../Components/LeftMenu'
import BlogsMain from '../Components/BlogsMain'
import CCHeader from '../Components/CCHeader'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogPage = () => {
    const [constFooter, setConstFooter] = useState(!true);
    const params = useParams();
    const { blogname } = params;

    console.log(blogname);

    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with 
                width more than 1100px, a standard laptop or tablet landscape. 
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <CCHeader /> 
                <BlogsMain blogname={blogname}/>
                <LeftMenu marked={"graph-theory"}/>

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
  width: 100vw;
  padding: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;

  img{
    width: calc(100% - 80px);
    margin: 40px;
    border-radius: 5px;
    display: block;
  }

  @media only screen and (min-width: 1099px){
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