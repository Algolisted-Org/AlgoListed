import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCRightMenu from '../Components/CCRightMenu'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';

const Resources = () => { 
    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with 
                width more than 1100px, a standard laptop or tablet landscape. 
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <CCHeader />
                <LeftMenu marked={"resources"} />
                <div className="cc-middle-content">
                    <h1 className='main-heading'>Resources <div className="head-tag">coming soon</div> </h1>
                    <p className="heading-supporter">
                        Here we have resources like notes and other important tools for computer related subjects. We are
                        collecting the resources from students, various websites like linkedin. 
                    </p>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            Want to contribute a Brain Teaser or have any suggestion about the website <a href="/">click here</a>
                        </div> 
                    </div> 


                </div>
            </Container>
        </GrandContainer>
    )
}

export default Resources

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
          display: flex; 
          align-items: center;

          .head-tag{
            display: inline;
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.25rem 0.5rem;
            border-radius: 100px;
            background-color: #e5e5e5;
            margin-left: 10px;
          }
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

      iframe{
        border-radius: 5px;
        border: none;
      }

      .questions{
        margin-top: 75px;

        .ques-box{
          width: max(860px, 60vw);
          max-width: 1200px;
          padding: 20px;
          /* background-color: white; */
          border-bottom: 1px solid #e5e7ed;
          /* border-radius: 10px; */
          margin-bottom: 50px;
        

          .q-elem{
            display: flex;
            align-items: flex-start;
            position: relative;
  
            .q-num{
              position: absolute;
              left: -1.75rem;
              font-size: 0.95rem;
              background-color: #70a936;
              height: 1.15rem;
              width: 1.15rem;
              display: grid;
              place-items: center;
              margin-right: 10px;
              color: white;
              border-radius: 4px;
              margin-top: 2.5px;
              font-family: sohne-var, "Helvetica Neue", Arial, sans-serif;
            }
            .q-text{
              font-size: 1rem;
              width: calc(100% - 1.75rem);
              line-height: 1.75rem;
            }
          }
  
          .q-tags{
              display: flex;
              flex-wrap: wrap;
              margin: 30px 0 20px 0;
  
              .q-tag{
                  font-size: 0.75rem;
                  padding: 5px 15px;
                  border-radius: 100px;
                  background-color: #e5e5e5;
                  font-weight: 300;
                  margin: 5px 5px 0 0;
              }
          }
  
          .ans{
            font-size: 1rem;
            font-weight: 300;
            line-height: 1.75rem;
            color: #686169;

            b{
              color: #222;
              font-weight: 500;
            }
          }
        }
      }
    }
`

const GapLine = styled.div`
  display: block;
  height: 10px;
`