import React from 'react'
import styled from 'styled-components'

const BlogIdeas = () => {
  return (
    <Container>
        <h1>Blog Ideas</h1>
        <div className="desc">
          <b>Important : </b> We only take ideas that are actually required by the coders community and 
          not yet present on the website. The idea should be related to computer science, not necessarily
          DSA it can also be theoritical subjects, like Computer organisation.

          <input type="text" placeholder='Enter your Blog Idea' />

        </div>
        <div className="item">1. Binary Search in Competative Coding - Simplified</div>
        <div className="item">2. The theory subject topics can have things like Notes PDF, Interview problems, Semester Questions.</div>
        <div className="item">3. Full OOPS explained with notes - interview and semester questions.</div>
    </Container>
  )
}

export default BlogIdeas

const Container = styled.div`
  padding: 20px;

  .desc{
    font-size: 1rem;
    font-weight: 200;
    margin-bottom: 50px;
    max-width: 800px;

    b{
      font-weight: 400;
    }

    input{
      display: block;
      padding: 10px 15px;
      margin: 15px 0;
      width: 360px;
    }
  }

  .item{
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 2.5rem;
    max-width: 800px;
  }
`