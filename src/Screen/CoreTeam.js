import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const CoreTeam = () => {
    const [temp, setTemp] = useState([1, 2, 2,3,3,4,4, 3,3,2,2,1]);

    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>Core Team</h1>
            <p className="heading-supporter">
                The main job of the core team is to verify and review the content on the website. The core team is the base for the website quality.
                Core team has different sections which are - <b>tech team</b>, <b>resources team</b> and <b>blogs team</b>. 
            </p>
            <div className="users">
                {
                    temp.map((item, index) => (
                        <>
                            <div className="user">
                                <img className='user-img' src="https://finclubju.com/assets/profile/team/atanu-nayak.jpg" alt="" />
                                <div className="profile-links">
                                    <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target={"_blank"} className="profile-link"><img className='profile-img' src="https://cdn-icons-png.flaticon.com/512/355/355994.png" alt="" /></a>
                                </div>
                                <div className="name">Atanu Nayak</div>
                                <div className="team">Tech Team</div>
                            </div>
                            <div className="user">
                                <img className='user-img' src="https://finclubju.com/assets/profile/team/soumyadeep-pal.jpg" alt="" />
                                <div className="profile-links">
                                    <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target={"_blank"} className="profile-link"><img className='profile-img' src="https://cdn-icons-png.flaticon.com/512/355/355994.png" alt="" /></a>
                                </div>
                                <div className="name">Soumyadeep Pal</div>
                                <div className="team">Secretary</div>
                            </div>
                            <div className="user">
                                <img className='user-img' src="https://finclubju.com/assets/profile/team/sanyukta-mandal.jpg" alt="" />
                                <div className="profile-links">
                                    <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target={"_blank"} className="profile-link"><img className='profile-img' src="https://cdn-icons-png.flaticon.com/512/355/355994.png" alt="" /></a>
                                </div>
                                <div className="name">Sanyukta Mandal</div>
                                <div className="team">Joint Editor</div>
                            </div>
                        </>
                    ))
                }
            </div>
        </Container>
    )
}

export default CoreTeam


const Container = styled.div`
    width: 100%;

    b{
        font-weight: 500;
    }

    .users{
        display: flex;
        flex-wrap: wrap;
        min-height: 260px;
        width: 100%;
        margin: 50px 0 50px -30px;
        
        .user{
            width: 195px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            padding-left: 0;
            position: relative;
            /* background-color: green; */
            margin: 1px;
            
            .user-img{
                width: 110px;
                height: 110px;
                border-radius: 100%;
                margin-bottom: 20px;
            }

            .profile-links{
                display: flex;
                position: absolute;
                top: 95px;
                left: 115px;

                .profile-link{
                    display: grid;
                    place-items: center;
                    border-radius: 100px;
                    overflow: hidden;

                    .profile-img{
                        margin: 0;
                        height: 28px;
                        width: 28px;
                        border-radius: 100px;
                    }
                }

                .linkedin{
                    background-color: pink;
                }
            }

            .name{
                text-align: center;
                font-weight: 500;
            }

            .team{
                text-align: center;
                font-weight: 200;
                font-size: 0.85rem;
            }
        }
    }
`