import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';

const CCHeader = () => {
  return (
    <Container>
      <div className="search-box">
        <div className="icon">
          <SearchIcon/>
        </div>
        <input type="text" className="input" placeholder='Search for algorithm or datastructure'/>
      </div>

      <div className="right-icons">
        <div className="icon-box">
          <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"}>
            <GitHubIcon/>
          </a>
        </div>
        <div className="icon-box">
            <NotificationsIcon/>
        </div>
        <div className="icon-box">
            <PersonIcon/>
        </div>
      </div>

    </Container>
  )
}

export default CCHeader

const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 55px;
    width: calc(100vw - 200px);
    /* background-color: orange; */
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    position: fixed;
    top: 0;
    left: 200px;
    z-index: 2;
    background-color: white;
    align-items: center;
    
    .search-box{
      width: 50%;
      border-radius: 100px;
      border: 1px solid rgba(230, 230, 230, 1);
      height: 80%;

      display: flex;
      align-items: center;
      padding: 10px 15px;

      .icon{
        margin-top: 7.5px;
        margin-right: 10px;
      }

      input{
        border: none;
        flex: 1;
        font-weight: 400;
      }
    }

    .right-icons{
      position: absolute;
      right: 25px;
      display: flex;
      align-items: center;

      a{
        margin-top: 4px;
        padding: 0;
      }
      
      .icon-box{
        height: 32.5px;
        aspect-ratio: 1/1;
        display: grid;
        place-items: center;
        border-radius: 10px;
        border: 1px solid #dfe3e7;
        margin-left: 10px;
        cursor: pointer;

        svg{
          font-size: 20px;
          fill: #514d4d;
        }

        &:hover{
          background-color: #f2ecf9;
          transition-duration: 250ms;
        }
      }
    }

`