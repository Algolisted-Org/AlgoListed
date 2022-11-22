import React, { useState } from 'react'
import styled from 'styled-components'

const VerifyUser = () => {
  return (
    <Container>
        <div className="name">Congratulations, Atanu Nayak!</div>
        <div className="work">Technical content writter and resources contributor.</div>
        <div className="review">
          <b>Review from core team,</b> <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat excepturi iure voluptates doloribus tenetur voluptas culpa praesentium possimus rerum. Quasi quam distinctio voluptates cumque atque vitae nam ullam laboriosam deserunt!
        </div>
        <div className="handle-links">
          <div className="handle"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" /></div>
          <div className="handle"><img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="" /></div>
          <div className="handle"><img src="https://d2fltix0v2e0sb.cloudfront.net/dev-black.png" alt="" /></div>
        </div>
        <div className='company-tag'>Algorithmist.</div>
    </Container>
  )
}

export default VerifyUser

const Container = styled.div`
    width: 100%;
    min-height: 500px;
    border: 8px solid #2d9b42;
    margin: 30px 0;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f8f8;

    div{
      max-width: 75%;
      text-align: center;
    }

    .name{
      font-size: 2rem;
      font-weight: 500;
    }

    .work{
      font-size: 1.15rem;
      font-weight: 400;
      color: #696169;
      margin: 5px 0;
    }

    .review{
      font-size: 1.15rem;
      margin-top: 40px;
      font-weight: 300;

      b{
        font-weight: 500;
      }
    }

    .handle-links{
      display: flex;
      flex-wrap: wrap;
      margin-top: 100px;

      .handle{
        width: 35px;
        height: 35px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 100px;
        margin: 2.5px;

        img{
          width: 100%;
        }
      }
    }

    .company-tag{
        font-size: 1.25rem;
        font-weight: 600;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

    
`