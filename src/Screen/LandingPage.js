import React from 'react'
import styled from 'styled-components'

const LandingPage = () => {
  return (
    <Container>
      <WhatWeDo>
        <h1>About Algorithmist</h1>
        <p>
          Before we start just a brief history, this website was a pure blogging website of
          <a href="/">Atanu Nayak</a>. Later on after good amount of growth, this website was
          changed from nayak-blogs to algorithmist, which is a <b>OPEN SOURCE BLOG X RESOURCES PLATFORM</b> for 
          programmers. Now these is a whole core team and a club of open source contributors
          for the website.
        </p>
        <img src="https://assets.sutori.com/user-uploads/image/95c3779d-f471-476a-976c-5a60a3909f6b/502120a116747ea7d5936de044d5441b.gif" alt="" />
        <h1>What do we do ? - Module 1</h1>
        <p>1. Write blogs about different algoritms, data structures and computer science topics.</p>
        <p>2. We also list questions from different coding platforms like leetcode and codeforces for the user to get the beginner to medium level problems. </p>
        <p>3. In theory subjects like OOPS we have class notes, semester exam questions and interview problems</p>
        <p>4. We have content contributors who write blogs from their own knowledge then they keep editing the blog with the best resources available on internet.</p>

        <h1>What do we do ? - Module 2</h1>
        <p>
          1. Place where you can see all the current coding contests/ hackethrons/ etc relating to coding. - 
          open sourced, hence is constantly on an update by team and users.
        </p>

        <h1>What do we do ? - Module 3</h1>
        <p>
          1. Place where you can see all the current job hirings/ intership opportunities relating to coding. - 
          open sourced, hence is constantly on an update by team and users.
        </p>

        <h1>Might not work on this - Module 4</h1>
        <p>1. An open ended clean UI platform where people can add questions after their interview</p>

        <h1>Might not work on this - Module 5</h1>
        <p>1. A platform to get 1 - to - 1 paid mentorship from working professionals. <a href="https://topmate.io/">https://topmate.io/</a></p>
      </WhatWeDo>

      
      <div className="temp">
        <h1>Algorithmist</h1>
        <p>Project under development, I am <a href="/">Atanu Nayak</a> founder.</p>

        <a href="blogs/all-shortest-path-algorithms">Blog Graph</a>
        <a href="/blog/ideas">Blog Ideas</a>
        <a href="/issues">Website Issues</a>
      </div>
    </Container>
  )
}

export default LandingPage

const Container = styled.div`
  .temp{
    padding: 20px;
    p{
      margin-bottom: 20px;
    }
  
    a{
      font-size: 0.8rem;
      padding: 2.5px 10px;
      border: 1px solid black;
      margin-right: 15px;
      text-decoration: none;
    }
  }
`

const WhatWeDo = styled.div`
  padding-bottom: 100px;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    font-size: 2.25rem;
    font-weight: 600;
    margin-top: 25px;
  }

  p{
    margin: 10px 0;
    width: 800px;
    font-weight: 200;
    text-align: center;
  }

  img{
    border-radius: 5px;
  }
  
  /* background-color: pink; */
`