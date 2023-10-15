import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'

const CreateCustomCodingSheets = () => {
    const [needDarkMode, setNeedDarkMode] = useState(false);
    
    useEffect(() => {
        let selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme === 'dark') setNeedDarkMode(true);
      }, []);
    
      useEffect(() => {
        document.title = "Contest Archive - Algolisted";
      }, []);
    
      console.log("needDarkMode : ", needDarkMode);
      const toggleDarkMode = () => {
        setNeedDarkMode(!needDarkMode);
      };

    return ( 
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with 
                width more than 1100px, a standard laptop or tablet landscape. 
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                {
                    needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
                }
                {
                    needDarkMode ? <LeftMenuDark marked={"coding-sheets"} /> : <LeftMenu marked={"coding-sheets"} />
                }
                {/* ---> change this all-blogs to your desired page-id */}

                <div className="cc-middle-content">
                    <h1 className='main-heading'>Create Custom Coding Sheets</h1>
                    <p className="heading-supporter">
                        In this feature, you can make lists of coding problems you like and easily share them with your friends. This helps you remember your favorite problems and lets you share the list link with others. Plus, if you share a link to a problem, we'll automatically scrape information about that problem and show it in your list with visualizations.
                    </p>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            Curious about how to use it? Watch our <a href="/">youtube video</a> to see how it's done!
                        </div>
                    </div> 

                    <UserSheetsList>
                        <h3>Your Sheets</h3>
                        <div className="list">
                            <div className="sheet-container"></div>
                            <div className="sheet-container"></div>
                            <div className="sheet-container"></div>
                            <div className="sheet-container"></div>
                        </div>
                    </UserSheetsList>
                </div>
            </Container>
        </GrandContainer>
    )
}

export default CreateCustomCodingSheets

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
    @media only screen and (max-width: 1099px){
        display: none;
    }

    display: flex;
    justify-content: space-between;
    padding-left: 200px;

    a{
      color: #18489f;
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
          color: #292929;
      }

      .heading-supporter{
          font-size: 1.05rem;
          margin-bottom: 10px;
          font-weight: 400;
          color: #696168;

          a{
            color: #18489f;
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          }
      }

      .message{
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: #d5f7e1;
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 10px 0;

        .text{
            font-size: 0.8rem;
            color: #13803b;
            font-weight: 300;
            
        }
      }
    }
`

const UserSheetsList = styled.div`
    margin-top: 30px;

    h3{
        font-size: 1.25rem;
        font-weight: 500;
    }

    .list{
        display: flex;
        flex-wrap: wrap;

        .sheet-container{
            height: 200px;
            width: calc(50% - 10px);
            /* background-color: black; */
            margin: 10px 10px 0 0;
            border-radius: 10px;
            border: 1px solid #e7dcdc;
        }

    }
`