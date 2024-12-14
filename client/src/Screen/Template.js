import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
import SimpleFooter from '../Components/SimpleFooter'

const Template = () => {
  const [needDarkMode, setNeedDarkMode] = useState(false);

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === 'dark') setNeedDarkMode(true);
  }, []);

  useEffect(() => {
    document.title = "Template Page - Algolisted";
  }, []);

  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  return (
    <GrandContainer needDarkMode={needDarkMode}>
      <MobContainer>
        We are still working on Responsive Version of the website, please view the site with
        width more than 1100px, a standard laptop or tablet landscape.
        <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
      </MobContainer>
      <Container needDarkMode={needDarkMode}>
        {
          needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
        }
        {
          needDarkMode ? <LeftMenuDark marked={"contests-archive"} /> : <LeftMenu marked={"contests-archive"} />
        }
        {/* ---> change this all-blogs to your desired page-id */}

        <div className="cc-middle-content">
          <h1 className='main-heading'>Template Name Here</h1>
          <p className="heading-supporter">
            Random Text : We have beginner friendly website contents, no fancy texts and informations. We just give as much information required by the first time reading users, because we firmly believe that when you want to learn a language you don't study it from a dictionary.
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              Text here : We are constantly looking for good blogs. Want to be a technical content writer <a href="/">click here</a>
            </div>
          </div>
        </div>
        <SimpleFooter />
      </Container>
    </GrandContainer>
  )
}

export default Template

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
    position: relative;
    padding-bottom: 80px;

    @media only screen and (max-width: 1099px){
        display: none;
    }

    display: flex;
    justify-content: space-between;
    padding-left: 200px;
    

    background-color: ${(props) => (props.needDarkMode ? '#313338' : 'transparent')};

    a{
      color: ${(props) => (props.needDarkMode ? '#6d93d8' : '#18489f')};
    }

    input{
      background-color: transparent;
    }

    .cc-middle-content{
      min-height: 100vh;
      width: 100%;
      /* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
      padding: 80px 120px 50px 120px;
      position: relative;
      width: 100%;
      max-width: 1360px;
      min-width: 850px;
      margin: auto;

      @media only screen and (max-width: 1200px){
        padding: 80px 50px 50px 50px;
      }


      .main-heading{
          font-size: 1.65rem;
          font-weight: 600;
          color: ${(props) => (props.needDarkMode ? '#e5e6e8' : '#292929')};
      }

      .heading-supporter{
          font-size: 1.05rem;
          margin-bottom: 10px;
          font-weight: 400;
          color: ${(props) => (props.needDarkMode ? '#ffffffa6' : '#696168')};

          a{
            color: ${(props) => (props.needDarkMode ? '#18489f' : '#18489f')};
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          }
      }

      .message{
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: ${(props) => (props.needDarkMode ? '#444754' : '#d5f7e1')};
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 10px 0;

        .text{
            font-size: 0.8rem;
            color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#13803b')};
            font-weight: 300;

            b{
                font-weight: 500;
                color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#13803b')};
            }
        }
      }
    }
`