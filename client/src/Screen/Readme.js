import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import Markdown from 'markdown-to-jsx';

const Readme = () => {
    const file_name = 'README.md';
    const [post, setPost] = useState("");
    useEffect(() => {
        import(`../MarkdownFiles/${file_name}`)
            .then(res => {
            fetch(res.default)
                .then(res => res.text())
                .then(res => setPost(res))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });

    console.log(post);

    return ( 
        <GrandContainer>
            <Container>
                <CCHeader />
                <LeftMenu marked={"all-blogs"} /> {/* ---> change this as well */}
                <div className="cc-middle-content">
                    <Markdown>
                        {post}
                    </Markdown>
                </div>
            </Container>
        </GrandContainer>
    )
}

export default Readme

const GrandContainer = styled.div`
    img{
        width: 100%;
        margin: 5px 0;
    }

    h1, h2, h3, h4, h5, h6, p, div, span, b{
        font-family: 'Poppins', sans-serif;
    }

    h1, h2, h3, h4, h5, h6{
        font-weight: 500;
        margin-bottom: 5px;
    }

    p{
        font-weight: 200;
    }

    b{
        font-weight: 500;
    }
    font-weight: 200;

`


const Container = styled.div`
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
    }
`
