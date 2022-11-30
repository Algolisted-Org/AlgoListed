import React from 'react'
import styled from 'styled-components'


const Issues = () => {
  const inframe_height = 9100;

  return (
    <Container>
      <h1>Website Issues</h1>
      <div className="desc">
        If you think there is something which if missing or needs to been reviewed or you found
        a bug then on the website you can enter that here.
        <input type="text" placeholder='Enter issue' />
        You can also become a open source contributor on Github if you can solve of the bottom issues. <br />
        <a href="/issues">Just follow this youtube video</a>.
      </div>
      <div className="item">1. Code should be text and not an image</div>
      <div className="item">2. Proper URL for blogs</div>
      {/* <iframe src="https://docs.google.com/document/d/e/2PACX-1vSMwNEetMaiHQIq3KyPSjc4-SwLm2F47tfVJt6MZ53khcITtOsKEU2jPBgGqywODrDBDg7_7hoQztJV/pub?embedded=true"></iframe> */}
      <iframe height={`${inframe_height}`} src="https://docs.google.com/document/d/e/2PACX-1vQJMBgUdtjuyW6eywS7L_-QB6NNGGMUS9PIeS28ifpwJ0ZwK3TTvVmB2-566TBeJlWKhT9TcY8LhHGR/pub?embedded=true"></iframe>
    </Container>
  )
}

export default Issues
const Container = styled.div`
  padding: 20px;
  position: relative;;
  height: 100vh;

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

  iframe{
    border: none;
    width: 60%;
    /* height: 100%; */
    /* height: 9100px; */
    overflow-y: hidden;
  }

`