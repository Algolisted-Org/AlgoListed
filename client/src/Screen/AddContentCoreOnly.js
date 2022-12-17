import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'

const AddContentCoreOnly = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creator, setCreator] = useState("");
    const [link, setLink] = useState("");
    const [imgLink, setImgLink] = useState("");
    const [type, setType] = useState("");
    const [likes, setLikes] = useState("");

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [resume, setResume] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [codingProfiles, setCodingProfiles] = useState("");
    const [medium, setMedium] = useState("");
    const [referral, setReferral] = useState("");
    const [mentorship, setMentorship] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async () => {
        console.log("handle submit called!");

        await fetch('http://localhost:8000/resources/create', {
            method: 'post',
            headers: { 'content-type': 'application/json' },

            body: JSON.stringify({
                title,
                description,
                creator,
                link,
                imgLink,
                type,
                likes,
            })
        }).then(response => response.json())
            .then(apiReturn => {
                console.log(apiReturn);
                alert(apiReturn.message);
            })

        setTitle("");
        setDescription("");
        setCreator("");
        setLink("");
        setImgLink("");
        setType("");
        setLikes("");
    }


    const handleSubmit2 = async () => {
        console.log("handle submit called!");

        await fetch('http://localhost:8000/resumes/create', {
            method: 'post',
            headers: { 'content-type': 'application/json' },

            body: JSON.stringify({
                name,
                company,
                description,
                resume,
                linkedin,
                codingProfiles,
                medium,
                referral,
                mentorship,
                category,
            })
        }).then(response => response.json())
            .then(apiReturn => {
                console.log(apiReturn);
                alert(apiReturn.message);
            })

        setName("");
        setCompany("");
        setResume("");
        setDescription("");
        setLinkedin("");
        setCodingProfiles("");
        setMedium("");
        setReferral("");
        setMentorship("");
        setCategory("");
    }

    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with
                width more than 1100px, a standard laptop or tablet landscape.
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <CCHeader />
                <LeftMenu />
                <div className="cc-middle-content">
                    <h1 className='main-heading'>Add Content</h1>
                    <p className="heading-supporter">
                        Lateron a password protection will be added to ensure the editing of content is done by only the core members of the team.
                    </p>

                    <section>
                        <h3>Resources</h3>
                        <div className="form">
                            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                            <input type="text" placeholder='Creator' value={creator} onChange={(e) => setCreator(e.target.value)} />
                            <input type="text" placeholder='Link' value={link} onChange={(e) => setLink(e.target.value)} />
                            <input type="text" placeholder='Img Link' value={imgLink} onChange={(e) => setImgLink(e.target.value)} />
                            <input type="text" placeholder='Type' value={type} onChange={(e) => setType(e.target.value)} />
                            <input type="text" placeholder='Likes' value={likes} onChange={(e) => setLikes(e.target.value)} />
                            <button onClick={handleSubmit}>Post this on MongoDB</button>
                        </div>
                    </section>

                    <section>
                        <h3>Selected Profiles</h3>
                        <div className="form">
                            <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder='company' value={company} onChange={(e) => setCompany(e.target.value)} />
                            <input type="text" placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                            <input type="text" placeholder='resume' value={resume} onChange={(e) => setResume(e.target.value)} />
                            <input type="text" placeholder='linkedin' value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                            <input type="text" placeholder='codingProfiles' value={codingProfiles} onChange={(e) => setCodingProfiles(e.target.value)} />
                            <input type="text" placeholder='medium' value={medium} onChange={(e) => setMedium(e.target.value)} />
                            <input type="text" placeholder='referral' value={referral} onChange={(e) => setReferral(e.target.value)} />
                            <input type="text" placeholder='mentorship' value={mentorship} onChange={(e) => setMentorship(e.target.value)} />
                            <input type="text" placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)} />
                            <button onClick={handleSubmit2}>Post this on MongoDB</button>
                        </div>
                    </section>
                </div>
            </Container>
        </GrandContainer>
    )
}

export default AddContentCoreOnly

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

      section{
        background-color: #f8f8f8;
        padding: 10px;
        margin: 30px 0 10px 0;
        border: 1px solid #e6e6e7;

        h3{
            font-weight: 500;
        }

        .form{
            input{
                font-size: 0.8rem;
                padding: 5px 7.5px;
                border-radius: 5px;
                width: 100%;
                margin-top: 10px;
                border-color: #eadcdc;
            }

            button{
                margin-top: 10px;
                border: 1px solid #eadcdc;
                border-radius: 5px;
                padding: 5px 7.5px;
                width: 100%;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.25rem;
                cursor: pointer;
            }
        }
      }
    }
`
