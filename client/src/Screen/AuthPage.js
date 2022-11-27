import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'

const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
          console.log(email);
          console.log(password);
    
          setEmail("");
          setPassword("");
    
          fetch('https://algorithmist-api.onrender.com/auth/user-signup', {
              method: 'post',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                  email: (email.toLowerCase()),
                  password,
              })
          }).then(response => response.json())
              .then(user => {
                  console.log(user);
              })
      }


    return ( 
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with 
                width more than 1100px, a standard laptop or tablet landscape. 
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <h1>Signup</h1>
                <div className="form">
                    <input type="email" placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}  />
                    <input type="text" placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => handleSignUp()}>Signup</button>
                </div>
            </Container>
        </GrandContainer>
    )
}

export default AuthPage

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

    padding: 20px;

    a{
      color: #18489f;
    }

    input{
        padding: 5px 10px; 
        margin: 10px;
        margin-left: 0;
        font-size: 0.7rem;
        padding: 5px;
    }
    button{
        margin-top: 10px;
        display: block;

    }
`
