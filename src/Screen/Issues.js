import React from 'react'
import styled from 'styled-components'


const Issues = () => {
  return (
    <Container>
        <h1>Website Issues</h1>
        <div className="desc">
          If you think there is something which if missing or needs to been reviewed or you found
          a bug then on the website you can enter that here. 
          <input type="text" placeholder='Enter issue'/>
          You can also become a open source contributor on Github if you can solve of the bottom issues. <br />
          <a href="/issues">Just follow this youtube video</a>.
        </div>
        <div className="item">1. Code should be text and not an image</div>
        <div className="item">2. Proper URL for blogs</div>
    </Container>
  )
}

export default Issues
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