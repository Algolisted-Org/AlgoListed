import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import data from './allBlogsDatabase.json'

const RightMenu = ({blogid}) => {
  console.log(blogid);
  console.log(data[blogid]);

  return (
    <Container>
      <div className="blog-contributors">
        <div className="top-title">Blog Contributors</div>
        <div className="top-desc">
          This blog is has being written by <a href="/">Atanu Nayak</a> and a lot of resources are contributed 
          by the community.
        </div>
        <div className="hold-contributors">
            {
              data[blogid].authorImageLink.map((item, index) => {
                return (<a className="contributor" href={data[blogid].authorLink[index]} target={"_blank"} key={index}><img src={item} alt="" /></a>);
              })
            }
        </div>
        
        <div className="btns">
          <button className="full-btn cl-2">Add content to this blog or Report a bug</button>
          <button className="full-btn cl-1">Become a Technical Content Writer</button>
        </div>
      </div>
      
      <div className="similar-questions">
        <div className="top-title">Similar Questions</div>
        <div className="top-desc">
          Blog contains similar questions to be solved at bottom of the page. The questions are generally taken from
          highly rated leetcode blogs, linkedin or contributed by our contributors.
        </div>
        <div className="question">
          <div className="text">Solve : <a href="/">Number of Islands</a></div>
        </div>
        <div className="question">
          <div className="text">Solve : <a href="/">Course Schedule I</a></div>
        </div>
        <div className="question">
          <div className="text">Solve : <a href="/">Rotting Oranges</a></div>
        </div>
        <div className="show-all-problems">Show All Problems, Related to this blog</div>
      </div>
      {/* <div className="subscribe-box">
        <div className="top-title">Subscribe to Algorithmist,</div>
        <div className="top-desc">Get the best, coolest, and latest in design and no-code delivered to your inbox each week.</div>
        <input type="text" className='input-email' placeholder='atanu.nayak03@gmail.com'/>
        <div className="submit-btn">Subscribe Blogs</div>
        <div className="bottom-desc">
          You can unsubscribe at any time, no hard feelings.
          <a href="/">Privacy policy</a>
        </div>
      </div> */}
      <div className="ask-query">
        <div className="top-title">Ask query about the topic</div>
        <div className="top-desc">If you have a question or doubt, other readers may be able to help you. Additionally, a notification will be sent to the creators of the blog, who can address it for you.</div>
        {/* <input type="text" className='input-query' placeholder='Enter your doubt . . .'/> */}
        <div className="submit-btn">Ask doubt to community</div>
        <div className="bottom-desc">Go to<a href='/' >Ask doubts to community</a> section, to ask, discuss and solve queries related to the blog topic.</div>
      </div>
    </Container>
  )
}

export default RightMenu

const Container = styled.div`
  width: calc(100vw - 1100px);
  max-width: 360px;
  height: 100%;
  margin-top: 55px;
  position: relative;
  border-left: 1px solid rgba(230, 230, 230, 1);
  background-color: white;
  padding: 10px 18px 60px 10px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1380px){
    width: calc(100vw - 920px);
  }   

  @media only screen and (max-width: 1200px){
      display: none;
  }  

  div{
    .top-title{
        font-size: 1.05rem;
        font-weight: 500;
    }
  
    .top-desc{
      font-size: 0.8rem;
      font-weight: 200;
      margin-top: 5px;
    }
  }


  .blog-contributors{
    margin: 20px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #d6d9de;

    .hold-contributors{
      margin-top: 7.5px;
      display: flex;
      flex-wrap: wrap;

      .contributor{
        background-color: pink;
        overflow: hidden;
        height: 42px;
        width: 42px;
        margin: 0 7.5px 7.5px 0;
        border-radius: 100px;
        border: 1px solid #b7a6a6;

        img{
          height: 100%;
        }
      }
    }

    .btns{
      margin-top: 30px;

      .full-btn{
        padding: 12.5px;
        font-size: 0.75rem;
        margin: 10px 0;
      }

      .cl-1{
        background-color: black;
        color: white;
        font-weight: 200;
      }

      .cl-2{
        background-color: #f3f0f0;
      }

    }
  }

  .subscribe-box{
    /* display: none; */
    width: 100%;
    background-color: #eef0f3;
    padding: 25px;
    /* margin: 10px 0; */
    position: sticky;
    top: 390px;

    .top-title{
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 3.5px;
    }

    .top-desc{
      font-size: 0.9rem;
      font-weight: 200;
      line-height: 1.75rem;
    }

    .input-email{
      width: 100%;
      padding: 10px;
      font-size: 0.8rem;
      font-weight: 400;
      letter-spacing: 0.08rem;
      margin: 20px 0 7.5px 0;
    }

    .submit-btn{
      width: 100%;
      padding: 10px;
      font-size: 0.8rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
      background-color: black;
      color: white;
      text-align: center;
      cursor: pointer;
    }

    .bottom-desc{
      font-size: 0.7rem;
      margin-top: 10px;

      a{
        color: inherit;
        text-decoration: underline;
        margin-left: 5px;
      }
    }
  }

  .ask-query{
    /* display: none; */
    width: 100%;
    background-color: #eef0f3;
    padding: 10px;
    /* margin: 10px 0; */
    position: sticky;
    top: 390px;
    border-radius: 5px;

    .top-title{
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 3.5px;
    }

    .top-desc{
      font-size: 0.8rem;
      font-weight: 200;
      margin-top: 5px;
    }

    .submit-btn{
      width: 100%;
      padding: 10px;
      font-size: 0.8rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
      /* background-color: #dc7070; */
      background-color: #66a2d3;
      color: white;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
      margin: 15px 0;
    }

    .bottom-desc{
      font-size: 0.7rem;
      margin-top: 10px;

      a{
        color: inherit;
        text-decoration: underline;
        margin-left: 5px;
      }
    }
  }

  
  

  .similar-questions{
    margin: 20px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #d6d9de;
    position: sticky;
    top: 65px;

    .question{
      background-color: #ebf2fd;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;

      .text{
        font-size: 0.8rem;

        a{
          font-weight: 400;
          color: #6c6bb3;
          text-decoration: none;
        }
      }

    }

    .show-all-problems{
      font-size: 0.8rem;
      color: purple;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  
`