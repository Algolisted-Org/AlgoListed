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
                <div className="user">
                    <img className='user-img' src="https://finclubju.com/assets/profile/team/atanu-nayak.jpg" alt="" />
                    <div className="profile-links">
                        <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target={"_blank"} className="profile-link"><img className='profile-img' src="https://cdn-icons-png.flaticon.com/512/355/355994.png" alt="" /></a>
                    </div>
                    <div className="name">Atanu Nayak</div>
                    <div className="team">Product Building Head <br /> CSE Jadavpur University</div>
                </div>
                <div className="user">
                    <img className='user-img' src="https://media-exp1.licdn.com/dms/image/D4D03AQGf20qUFHNvAQ/profile-displayphoto-shrink_400_400/0/1666778019755?e=1674691200&v=beta&t=7Z0Am95mjYWz_PDYRGYimEv1fZbmsFuAnVOfMkDEXV4" alt="" />
                    <div className="profile-links">
                        <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target={"_blank"} className="profile-link"><img className='profile-img' src="https://cdn-icons-png.flaticon.com/512/355/355994.png" alt="" /></a>
                    </div>
                    <div className="name">Ritika Gupta</div>
                    <div className="team">Product Dev Mentor <br /> Uber SDE II</div>
                </div>
                <div className="user">
                    <img className='user-img' src="https://media-exp1.licdn.com/dms/image/D4D03AQGMbRu5KDzWfQ/profile-displayphoto-shrink_400_400/0/1665347098068?e=1674691200&v=beta&t=KtmE2wcmsrt_2fB_P7yoiIczRiG_Ra9omU1riG6lifg" alt="" />
                    <div className="profile-links">
                        <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target={"_blank"} className="profile-link"><img className='profile-img' src="https://cdn-icons-png.flaticon.com/512/355/355994.png" alt="" /></a>
                    </div>
                    <div className="name">Ritika Gupta</div>
                    <div className="team">Social Media Management<br /> Chem IIT Delhi</div>
                </div>
                <div className="user">
                    <img className='user-img' src="https://media-exp1.licdn.com/dms/image/C5603AQFXKBLVtzliTA/profile-displayphoto-shrink_400_400/0/1641810501980?e=1674691200&v=beta&t=lhfbMlf1-_4tIxH16-0iBDDadr-CkT8xNnBhOix5p6c" alt="" />
                    <div className="profile-links">
                        <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target={"_blank"} className="profile-link"><img className='profile-img' src="https://cdn-icons-png.flaticon.com/512/355/355994.png" alt="" /></a>
                    </div>
                    <div className="name">Om Mittal</div>
                    <div className="team">Technical Content Head <br /> CSE Jadavpur University</div>
                </div>
                <div className="user">
                    <img className='user-img' src="https://media-exp1.licdn.com/dms/image/D4D03AQEtNGyYYAd7ag/profile-displayphoto-shrink_400_400/0/1667193299990?e=1674691200&v=beta&t=rgEdcB_uvMQA2uMyptZAQhs5dCrE88tzGAB-DyJmUto" alt="" />
                    <div className="profile-links">
                        <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target={"_blank"} className="profile-link"><img className='profile-img' src="https://cdn-icons-png.flaticon.com/512/355/355994.png" alt="" /></a>
                    </div>
                    <div className="name">Ayush Kumar Pandit</div>
                    <div className="team">Open Source Head <br /> Jadavpur University</div>
                </div>
                <div className="user">
                    <img className='user-img' src="https://media-exp1.licdn.com/dms/image/D4E35AQExby8oPKhm2w/profile-framedphoto-shrink_400_400/0/1657177913508?e=1669590000&v=beta&t=wy0qGMWSODyGNObjillJ4IDmXo28uCIE5o711w0JyEU" alt="" />
                    <div className="profile-links">
                        <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target={"_blank"} className="profile-link"><img className='profile-img' src="https://cdn-icons-png.flaticon.com/512/355/355994.png" alt="" /></a>
                    </div>
                    <div className="name">Soumyajit Naskar</div>
                    <div className="team">Resources Section Head <br /> CSE Jadavpur University</div>
                </div>
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