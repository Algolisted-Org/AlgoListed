import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { resourcesFilters } from '../Components/resourcesFilters'

const Resources = () => {
  const [allResources, setAllResources] = useState([]);
  const [filter, setFilter] = useState("All Resources");

  useEffect(() => {
    axios.get("https://algorithmist.cyclic.app/resources/all")
      .then((res) => {
        setAllResources(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.textContent);
  };

  const filters = resourcesFilters.map((item) => {
    return (
      <div
        onClick={(e) => {
          handleFilter(e);
        }}
        key={item.id}
        className={item.text == filter ? "filter selected" : "filter"}
      >
        {item.text}
      </div>
    );
  });

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
          <h1 className='main-heading'>Resources</h1>
          <p className="heading-supporter">
            Here we list notes, codes, and other resources that are related to a particular youtube educator like Striver, Tourist, Priyansh Agarwal, Love Babbar, Kunal Kushwaha, Anuj Bhaiya, Luv, etc. This would significantly increase the productivity of the students who want to learn from a particular playlist of videos.
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              Want to contribute a resource or have any suggestion about the website <a href="/">click here</a>
            </div>
          </div>

          <Filters>
            {filters}
          </Filters>
          <Sort>
            <div className="box">
              <div className="text">By Relevence</div>
              <FilterListIcon />
            </div>
            <InfoIcon style={{ fill: '#333' }} />
          </Sort>

          {
            allResources.length === 0 ? (
              <>
                <LinearProgress />
                <RightBottomMessage>We are currently working on the server, this page will not load.</RightBottomMessage>
              </>
            ) : (
              <div className="resources-container">
                {
                  allResources.map((item, index) => {
                    if (filter == "All Resources" || item.creator == filter) {
                      return (
                        <div className="resource">
                          <div className="img-container">
                            <img src={item.imgLink} alt="" />
                          </div>
                          <a href={item.link} target={"_blank"} className="title">{item.title}</a>
                          <div className="short-desc">{item.description}</div>
                          <div className="tags">
                            <div className="main-tag">{item.creator}</div>
                            <div className="tag">{item.creator}</div>
                          </div>
                        </div>
                      )
                    }
                    else return (<></>)
                  })
                }
              </div>
            )
          }
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

      .resources-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        margin-top: 10px;

        .resource{
          width: calc(33% - 30px);
          min-height: 140px;
          /* background-color: white; */
          border-top: 1px solid rgb(232, 232, 232);
          padding-top: 20px;
          margin: 10px 0 30px 0;

          .img-container{
            width: 100%;
            height : 166px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            overflow: hidden;
            border-radius: 10px;

            img{
              width: 100%;
              display: block;
              border-radius: 10px;
            }
          }

          .title{
              font-size: 0.85rem;
              font-weight: 500;
              color: #374151;
              cursor: pointer;
              text-decoration: none;
              width: 100%;
              
              &:hover{
                color: cornflowerblue;
                /* transition-duration: 150ms; */
              }
          }


          .short-desc{
            font-size: 0.75rem;
            font-weight: 200;
            letter-spacing: 0.06rem;
          }

          .tags{
              display: flex;
              flex-wrap: wrap;
              margin-top: 10px;

              .main-tag{
                  font-size: 0.7rem;
                  padding: 2.5px 12.5px;
                  border-radius: 100px;
                  background-color: #f3e8ff;
                  color: rgb(107, 33, 168);
                  font-weight: 400;
                  margin: 5px 5px 0 0;
              }

              .tag{
                  font-size: 0.7rem;
                  padding: 2.5px 12.5px;
                  border-radius: 100px;
                  background-color: #eeeeee;
                  font-weight: 300;
                  margin: 5px 5px 0 0;
              }
          }
        }
      }
    }
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 80px 0 10px 0;

  .filter {
    padding: 7.5px 15px;
    font-size: 0.8rem;
    border: 1px solid #b9afaf;
    border-radius: 500px;
    margin: 0px 5px 5px 0px;
    font-weight: 300;

    &:hover {
      border-color: #201f1f;
      background-color: #201f1f;
      color: #ebdddd;
      transition-duration: 250ms;
      cursor: pointer;
    }
  }

  .selected {
    /* background-color: #ded7d7;
    color: #111; */
    border-color: #201f1f;
    background-color: #201f1f;
    color: #ebdddd;
  }
`;

const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;

  .box {
    padding: 5px 10px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 100px;
    background-color: white;
    border: 1px solid #b9afaf;
    box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
    margin-right: 5px;

    .text {
      font-size: 0.8rem;
      font-weight: 300;
      margin: 0 7.5px;
    }
  }
`;

const RightBottomMessage = styled.div`
  position: fixed; 
  right: 10px;
  bottom: 10px;
  background-color: black;
  border-radius: 4px;
  padding: 10px;
  font-size: 0.75rem;
  color: white;
  font-weight: 200;
  max-width: 300px;
`