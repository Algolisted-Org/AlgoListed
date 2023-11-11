import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
import SimpleFooter from '../Components/SimpleFooter'

const CoreSubjectsTracker = () => {
    const [needDarkMode, setNeedDarkMode] = useState(!false);

    useEffect(() => {
        let selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme === 'dark') setNeedDarkMode(true);
        if (selectedTheme === 'light') setNeedDarkMode(false);
    }, [])

    console.log("needDarkMode : ", needDarkMode);
    const toggleDarkMode = () => {
        setNeedDarkMode(!needDarkMode);
    };

    useEffect(() => {
        document.title = "Core Subjects Tracker - Algolisted";
    }, []);

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
                    needDarkMode ? <LeftMenuDark marked={"core-subjects-tracker"} /> : <LeftMenu marked={"core-subjects-tracker"} />
                }
                {/* ---> change this all-blogs to your desired page-id */}

                <div className="cc-middle-content">
                    <h1 className='main-heading'>Core Subjects Tracker</h1>
                    <p className="heading-supporter">
                        We've compiled a comprehensive set of interview questions sourced from reputable websites such as GeeksforGeeks and InterviewBit. Additionally, we've incorporated core subject knowledge shared by renowned YouTubers like Striver, Fraz, etc. The questions undergo thorough parsing using AI to filter out the most relevant ones, and our AI system provides ideal candidate answers.
                    </p>
                    <h4>Resources Used</h4>
                    <div className="resources-used">
                        {/* <div className="special-thanks"><img src="https://res.cloudinary.com/adaface/image/upload/v1583493789/adaface_logo.png" alt="" /></div> */}
                        <div className="resource"><img src="https://media.licdn.com/dms/image/D5622AQES3mxq38i5Bw/feedshare-shrink_800/0/1679999565760?e=1701907200&v=beta&t=xGdQ1cBUVfIbejNMIB2VuJqqNUwvOFPMRikQFnLhUz8" alt="" /></div>
                        <div className="resource"><img src="https://yt3.googleusercontent.com/FitboDHvZPrXqXtbe1JjfeN9x_wgNxv58GDadFqIf5nu1peeADWpWdW82Sb7eBaFH-TNy9AqgbM=s900-c-k-c0x00ffffff-no-rj" alt="" /></div>
                        <div className="resource"><img src="https://cdn-1.webcatalog.io/catalog/geeksforgeeks/geeksforgeeks-icon-filled-256.png?v=1675596635395" alt="" /></div>
                        <div className="resource"><img src="data:image/png;base64,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" alt="" /></div>
                        <div className="resource">
                            <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"  style={{ marginBottom: '-7.5px' }} alt="" />
                        </div>
                    </div>
                    {/* <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            If you believe that a certain topic or question is missing from the core subject questions, please <a href="/">click here</a>
                        </div>
                    </div> */}
                </div>
                <SimpleFooter />
            </Container>
        </GrandContainer>
    )
}

export default CoreSubjectsTracker

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

      h4{
            margin-top: 40px;
            font-size: 1.05rem;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
            font-weight: 500;
      }

      .resources-used{
          display: flex;
          flex-wrap: wrap;
          margin: 20px 0;

          .resource{
              height: 50px;
              width: 50px;
              margin: 0 7.5px 7.5px 0;
              border-radius: 50%;
              background-color: black;
              border: 1px solid black;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;

              img{    
                  height: 50px;
              }
          }

          .special-thanks{
            height: 50px;
            background-color: white;
            border-radius: 100px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            margin: 0 7.5px 7.5px 0;

            img{    
                height: 30px;
                border-radius: 100px;
                margin-top: -7.5px;
            }
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
