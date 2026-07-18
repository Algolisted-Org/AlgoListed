import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {
    API_BASE_URL,
    saveAuthenticatedUser,
    syncLocalStorageToServer,
} from '../Utils/authSync';

const AuthPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authMode, setAuthMode] = useState("signup");
    const [authUser, setAuthUser] = useState(null);
    const [syncStatus, setSyncStatus] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("algolistedUser");

        if (storedUser) {
            setAuthUser(JSON.parse(storedUser));
        }
    }, []);

    const completeAuth = async (response) => {
        const user = await response.json();

        if (!response.ok || user.message != undefined) {
            throw new Error(user.message || "Authentication failed.");
        }

        saveAuthenticatedUser(user);
        setAuthUser(user.user);
        setEmail("");
        setPassword("");
        setSyncStatus("Syncing local data...");
        await syncLocalStorageToServer(user.token);
        setSyncStatus("Local data synced successfully.");
    }

    const handleSignUp = () => {
        fetch(`${API_BASE_URL}/auth/user-signup`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: (email.toLowerCase()),
                password,
            })
        }).then(completeAuth)
            .then(() => {
                alert("User Created Successfully!");
            })
            .catch((error) => {
                setSyncStatus(error.message);
                alert(error.message);
            })
    }

    const handleLogin = () => {
        fetch(`${API_BASE_URL}/auth/user-login`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: (email.toLowerCase()),
                password,
            })
        }).then(completeAuth)
            .then(() => {
                alert("Logged in successfully!");
            })
            .catch((error) => {
                setSyncStatus(error.message);
                alert(error.message);
            })
    }

    const handleManualSync = () => {
        setSyncStatus("Syncing local data...");

        syncLocalStorageToServer()
            .then(() => {
                setSyncStatus("Local data synced successfully.");
            })
            .catch((error) => {
                setSyncStatus(error.message);
            });
    }


    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with
                width more than 1100px, a standard laptop or tablet landscape.
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <section className="left-section">

                </section>
                <section className="right-section">
                    {/* <span className='company-name'>Algorithmist</span> */}

                    <div className="form">
                        <div className="heading">{authMode === "signup" ? "Create an Account" : "Log In"}</div>
                        <div className="line"></div>
                        <div className="btn blue">
                            <div className="icon blue-shade"><img src="https://www.firstrust.com/getattachment/cf7dac57-a2ed-437b-8d50-9fac4634a8a2/google_logo.png?lang=en-US&width=300&height=300&ext=.png" alt="" /></div>
                            <div className="btn-text">Google Account</div>
                        </div>
                        <div className="btn dark-blue">
                            <div className="icon dark-blue-shade">
                                <LinkedInIcon/>
                            </div>
                            <div className="btn-text">Linkedin Profile</div>
                        </div>
                        <div className="btn dark">
                            <div className="icon dark-shade">
                                <GitHubIcon/>
                            </div>
                            <div className="btn-text">Github Account</div>
                        </div>

                        <p className='small-text'>or</p>

                        {authMode === "signup" && <input type="text" placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />}
                        <input type="email" placeholder='Enter Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='Enter password (8+ chars)' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={() => authMode === "signup" ? handleSignUp() : handleLogin()}>{authMode === "signup" ? "Create Profile" : "Log In"}</button>
                        <button className="link-button" onClick={() => setAuthMode(authMode === "signup" ? "login" : "signup")}>
                            {authMode === "signup" ? "Already have an account? Log in" : "Need an account? Create one"}
                        </button>
                        {authUser && <button className="sync-button" onClick={() => handleManualSync()}>Sync Local Data</button>}
                        {syncStatus && <div className="sync-status">{syncStatus}</div>}
                        <div className="desc">We are taking this information just for uniquely identifying our users. And later our giving out personal informations, or credits for work.</div>
                    </div>

                    {/* <h1>Login</h1>
                    <div className="form">
                        <input type="email" placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={() => handleLogin()}>Login</button>
                    </div> */}
                </section>
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

    display: flex;
    width: 100vw;

    a{
      color: #18489f;
    }

    section{
        width: 50%;
        padding: 20px;
    }

    .left-section{
        background: radial-gradient(92.81%48.44%at -24.53%-16.02%,#943cff 0%,rgba(255,255,255,0)100%),radial-gradient(75.78%68.16%at 56.74%-24.02%,#fd9d52 0%,rgba(255,255,255,0)100%),radial-gradient(160.86%46.39%at 177.14%-15.62%,#dd45d3 9.06%,rgba(255,255,255,0)100%),#f7fafc;
        min-height: 100vh;
    }

    .right-section{
        display: grid;
        place-items: center;

        .company-name{
            font-size: 0.8rem;
            font-weight: 600;
        }

        .form{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 460px;
            margin: auto;

            .heading{
                font-size: 1.75rem;
                font-weight: 500;
                text-align: center;
            }

            .line{
                height: 1px; 
                width: 100%;
                background-color: #e2dbdb;
                margin: 10px 0 40px 0;
            }

            .btn{
                width: 100%;
                height: 42.5px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 5px;
                background-color: #111;
                cursor: pointer;
                border-radius: 100px;
                position: relative;
                overflow: hidden;

                .icon{
                    height: 100%;
                    display: grid;
                    place-items: center;
                    position: absolute;
                    left: 0;
                    width: 60px;

                    img{
                        height: 30px;
                    }
                }

                .btn-text{
                    font-size: 0.85rem;
                    font-weight: 200;
                    color: white;

                    b{
                        font-weight: 500;
                    }
                }
            }

            

            input{
                font-size: 0.8rem;
                padding: 12.5px 20px;
                margin: 5px 0;
                width: 100%;
                border: none;
                background-color: #ececec;
                border-radius: 10px;
                letter-spacing: 0.05rem;
            }

            button{
                margin-top: 10px;
                width: 100%;
                font-size: 0.7rem;
                height: 42.5px;
                border: none;
                border-radius: 50px;
                background-color: black;
                color: #cbd1d6;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 0.25rem;
            }

            .link-button{
                background-color: transparent;
                color: #111;
                letter-spacing: 0.03rem;
                text-transform: none;
            }

            .sync-button{
                background-color: #18489f;
            }

            .sync-status{
                width: 100%;
                margin-top: 10px;
                font-size: 0.8rem;
                text-align: center;
                color: #18489f;
            }

            .small-text{
                font-size: 0.95rem;
                font-weight: 200;
                letter-spacing: 0.07rem;
                margin: 20px 0;
            }

            .desc{
                font-size: 0.75rem;
                font-weight: 200;
                letter-spacing: 0.07rem;
                margin: 20px 0;
            }

            svg{
                fill: white;
            }

            .blue{
                background-color: #a054d7;
            }

            .blue-shade{
                background-color: #7d44a6;
            }

            .dark-blue{
                background-color: #533a65;
            }

            .dark-blue-shade{
                background-color: #3c2051;
            }

            .dark{
                background-color: #211f1f;
            }

            .dark-shade{
                background-color: #000;
            }
        }
    }

    


`
