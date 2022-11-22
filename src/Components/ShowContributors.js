import React from 'react'
import styled from 'styled-components'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const ShowContributors = () => {
  return (
    <Container>
        <div className="btn circle">
            <ExpandLessIcon/>
        </div>
        <div className="btn">
            <div className="text">View Blog Contributors</div>
        </div>
    </Container>
  )
}

export default ShowContributors


const Container = styled.div`
    position: fixed;
    bottom: 10px;
    right: 375px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;

    @media only screen and (max-width: 1200px){
        right: 50px;
    }  


    .btn{
        height: 50px;
        width: 180px;
        background-color: white;
        /* left: 540px; */
        border: 1px solid rgb(232, 232, 232);
        box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;
        
        &:hover{
            background-color: #faf7f7;
            transition-duration: 250ms;
        }
    }

    .circle{
        width: 50px;
    }


    .text{
        font-size: 0.7rem;
    }
`