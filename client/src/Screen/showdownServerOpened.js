import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LeftMenuDark from '../Components/LeftMenuDark';
import CCHeaderDark from '../Components/CCHeaderDark';

const ShowdownServerOpened = () => {
    useEffect(() => {
      document.title = "Local Showdown Server - Algolisted";
    }, []);
    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with
                width more than 1100px, a standard laptop or tablet landscape.
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <CCHeaderDark />
                <LeftMenuDark marked={"showdown-server"} />
                <div className="cc-middle-content">
                    <a href='/showdown-server' className="back-btn">
                        <ArrowBackIosIcon/>    
                    </a> 
                    <h1 className='main-heading'>Hello World! <div className="head-tag">@iamatanunayak's server</div></h1>
                    <p className="heading-supporter">
                        {/* <img className='circle' draggable="false" src="https://media.tenor.com/SbpquMdX92cAAAAC/among-us.gif" alt="" /> */}
                        Now, you can host coding competitions with your friends and select questions randomly from specific topics like binary search, recursion or graphs from platforms like Codeforces or LeetCode. Algolisted AI ensures each question is rephrased, preventing direct searches, and the competition concludes with a thrilling leaderboard showcasing your friends' coding skills!
                    </p>
                    {/* <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            <b>For the developers working on this feature : </b>Our goal is to develop a functionality akin to <a href="https://skribbl.io/" target='_blank'>skribbl.io</a>. In essence, a user will be able to initiate a server without any login, modify settings within it, and subsequently share a link with their friends for them to join.
                        </div>
                    </div> */}
                    <CleanLine />
                    <div className="room-info-section">
                        <h3>Room Settings</h3>
                        <div className="collection">
                            <div className="contain-info room-id">Room Id : <b>id-4398921a-iamatanunayak</b></div>
                            {/* <div className="contain-info">Platform : <b>Codeforces</b></div> */}
                        </div>
                        <div className="collection">
                            <div className="contain-info problem-count">Problem Count</div>
                            <div className="contain-info problem-topic">Problem Topics</div>
                            <div className="contain-info problem-rating">Problem Ratings</div>
                        </div>
                        <div className="start-in">
                            <div className="start-text">Competition starts in : </div>
                            <div className="time-digit">9</div>
                            <div className="time-digit">9</div>
                        </div>
                        <div className="info">
                            <InfoIcon />
                            <div className="text">
                                The room admin has not started the challenge yet!
                            </div>
                        </div>
                    </div>
                    <CleanLine />
                    <div className="room-info-section">
                        <h3>Server Lobby</h3>
                        <div className="collection">
                          <div className="friend admin">
                            <img className="profile-pic" src="https://www.icegif.com/wp-content/uploads/2023/01/icegif-1171.gif" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @iamatanunayak
                              </a>
                              <div className="global-rank">
                                <i>Server Admin</i>
                              </div>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @jake
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @eh-randomuser
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @violet
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @mike
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @rizzab39
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @pewpewpew
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @mrbeast
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @honeysingh
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @ikka
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                          <div className="friend">
                            <img className="profile-pic" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="" />
                            <div className="user-data">
                              <a className="username">
                                @ridermeww1
                              </a>
                              <div className="global-rank">
                                {/* Global Rank : <b>#{eachuser.global_rank}</b> and Solved : <b>{eachuser.solved}</b> */}
                              </div>
                            </div>
                          </div>
                            {/* <div className="contain-info">Platform : <b>Codeforces</b></div> */}
                        </div>
                    </div>
                    <CleanLine />
                    <Filters2>
                        <div className="filter selected">A</div>
                        <div className="filter">B</div>
                        <div className="filter">C</div>
                        <div className="filter">Submit Code</div>
                        <div className="filter">Standings</div>
                    </Filters2>
                    <div className="problem">
                        <h3>A. AvtoBus</h3>
                        <p>Spring has come, and the management of the AvtoBus bus fleet has given the order to replace winter tires with summer tires on all buses.</p>
                        <p>You own a small bus service business and you have just received an order to replace 𝑛 tires. You know that the bus fleet owns two types of buses: with two axles (these buses have 4 wheels) and with three axles (these buses have 6 wheels).</p>
                        <p>You don't know how many buses of which type the AvtoBus bus fleet owns, so you wonder how many buses the fleet might have. You have to determine the minimum and the maximum number of buses that can be in the fleet if you know that the total number of wheels for all buses is 𝑛.</p>
                        <h4>Input</h4>
                        <p>The first line contains an integer 𝑡(1≤𝑡≤1000) — the number of test cases. The following lines contain description of test cases.</p>
                        <p>The only line of each test case contains one integer 𝑛(1≤𝑛≤1018) — the total number of wheels for all buses.</p>
                        <h4>Output</h4>
                        <p>For each test case print the answer in a single line using the following format.</p>
                        <p>Print two integers 𝑥 and 𝑦(1≤𝑥≤𝑦) — the minimum and the maximum possible number of buses that can be in the bus fleet.</p>
                        <p>If there is no suitable number of buses for the given 𝑛, print the number −1 as the answer.</p>
                        <h4>Example</h4>
                        <div className="sample-result">
                          <div className="result-container">
                            <h4>Input</h4>
                            <div className="result">4 <br /> 4 <br /> 7 <br /> 24 <br /> 998244353998244352</div>
                          </div>
                          <div className="result-container">
                            <h4>Output</h4>
                            <div className="result">1 1 <br /> -1 <br /> 4 6 <br /> 166374058999707392 249561088499561088 <br /></div>
                          </div>
                        </div>
                        <h4>Note</h4>
                        <p>In the first test case the total number of wheels is 4. It means that there is the only one bus with two axles in the bus fleet.</p>
                        <p>In the second test case it's easy to show that there is no suitable number of buses with 7 wheels in total.</p>
                        <p>In the third test case the total number of wheels is 24. The following options are possible:</p>
                        <p>
                          <ul>
                            <li>Four buses with three axles.</li>
                            <li>Three buses with two axles and two buses with three axles.</li>
                            <li>Six buses with two axles.</li>
                          </ul>
                        </p>
                        <p>So the minimum number of buses is 4 and the maximum number of buses is 6.</p>
                    </div>
                </div>
            </Container>
        </GrandContainer>
    )
}

export default ShowdownServerOpened

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
    background-color: #313338;

    a{
      color: #18489f;
    }

    svg{
      fill: #b7b8ba;
    }

    .circle{
        border-radius: 1000px;
        padding: 5px;
        height: 120px;
        border: 1px solid #dababa;
        background-color: #e5e5e5;
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
          color: #e5e6e8;
          display: flex; 
          align-items: center;

          .head-tag{
            display: inline;
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.25rem 0.5rem;
            border-radius: 100px;
            background-color: #a5bb26;
            margin-left: 10px;

            img{
                position: absolute;
                height: 2rem;
                margin-top: -7.5px;
                margin-left: -5px;
            }
          }
      }


      .heading-supporter{
          font-size: 1.05rem;
          margin-bottom: 10px;
          font-weight: 400;
          color: #ffffffa6;
          display: flex;
          align-items: center;

          a{
            color: #18489f;
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          }

          img{
            margin-right: min(5%, 25px);
          }
      }

      .message{
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: #444754;
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 50px 0;

        .text{
            font-size: 0.8rem;
            color: #b7b8ba;
            font-weight: 300;
            
            b{
                font-weight: 500;
                color: #b7b8ba;
            }
        }   
      }


      h3{
        font-size: 1.15rem;
        font-weight: 500;
        margin-bottom: 5px;
        color: #e5e6e8;
      }

      .room-info-section{
        .collection{
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;

            .contain-info{
                height: 40px;
                min-width: 40px;
                background-color: #444754;
                /* border: 1px solid black; */
                margin-right: 10px;
                margin-top: 10px;
                border-radius: 5px;
                padding: 10px;
                color: #e5e6e8;

                display: flex;
                align-items: center;
                justify-content: space-between;

                font-size: 0.8rem;

                b{
                  font-weight: 500;
                  margin-left: 5px;
                  color: white;
                }
            }
            
            .friend{
              height: 42px;
              min-width: 50px;
              border-radius: 20px;
              border: 1px solid #808080;
              margin-top: 10px;
              margin-right: 10px;
              padding: 2.5px;
              padding-right: 5px;
              display: flex;
              align-items: center;
              text-decoration: none;
              position: relative;
              cursor:pointer;
              background-color: #555059;
              
              .profile-pic{
                height: 35px;
                width: 35px;
                border-radius: 100%;
                border: 1px solid white;
                background-color: white;
              }
              
              .user-data{
                margin: 0 5px;
                
                .username{
                  font-size: 0.7rem;
                  font-weight: 600;
                  color: #e0e9d9;
                }
  
                .global-rank{
                  font-size: 0.7rem;
                }
              }

              box-shadow: #00000014 0px 10px 30px 5px;

              .clear-btn{
                position: absolute;
                right: -3.5px;
                top: -5px;
                height: 20px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                border: 1px solid black;
                display: grid;
                place-items: center;
                background-color: white;

                svg{
                  font-size: 15px;
                }
              }
            }

            .admin{
              height: 72px;
              min-width: 75px;
              border-radius: 100px;
              border: 5px solid white;
              margin-top: 10px;
              margin-right: 10px;
              padding: 5px;
              padding-right: 15px;
              background-color: #56e504;
              text-decoration: none;
              position: relative;
              cursor:pointer;
              cursor: pointer;
              box-shadow: #00000021 0px 7px 29px 0px;
              transition-duration: 250ms;
              
              .profile-pic{
                height: 52px;
                width: 52px;
                border-radius: 100%;
                border: 1px solid black;
                background-color: white;
              }
              
              .user-data{
                margin: 0 5px;
                
                .username{
                  font-size: 0.7rem;
                  font-weight: 600;
                  color: black;
                }
  
                .global-rank{
                  font-size: 0.7rem;
                }
              }

              .username{
                color: white;
              }

              box-shadow: #ffffff21 0px 10px 30px 5px;
            }
        }
        
        .start-in{
            margin-top: 10px;
            
            display: flex;
            align-items: center;

            .start-text{
                font-size: 0.85rem;
                font-weight: 400;
                color: #e5e6e8;
            }

            .time-digit{
                height: 40px;
                width: 40px;
                background-color: white;
                border: 1px solid #cbc7c7;
                margin-left: 10px;
                border-radius: 5px;

                display: grid;
                place-items: center;
                font-size: 1.5rem;
                font-weight: 600;
            }
        }

        .info{
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            /* border: 1px solid black; */
            margin-top: 20px;

            svg{
                margin-right: 2.5px;
                font-size: 1rem;
            }

            .text{
                font-size: 0.75rem;
                font-weight: 200;
                color: #e5e6e8;
            }
            
        }
      }

      .problem{
        h3{
            font-size: 1rem;
            margin-bottom: 10px;
            margin-top: 30px;
            color: #e5e6e8;
        }

        p{
            font-size: 0.9rem;
            font-weight: 300;
            margin-bottom: 10px;
            color: #e5e6e8;
        }

        h4{
          font-size: 0.9rem;
          margin-bottom: 10px;
          font-weight: 500;
          margin-top: 30px;
          color: #e5e6e8;
        }

        li{
          margin-left: 35px;
          margin-bottom: 5px;
          color: #e5e6e8;
        }

        .sample-result{
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          
          .result-container{
            width: 49%;

            h4{
              margin-top: 0px;
            }
            
            .result{
              padding: 10px;
              width: 100%;
              border: 1px solid #4b4d51;
              min-height: 50px;
              background-color: #2b2d31;
              border-radius: 5px;
              font-size: 0.85rem;
              font-weight: 400;
              font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
              -webkit-font-smoothing: subpixel-antialiased;
              color: white;
              line-height: 2rem;
              letter-spacing: 0.07rem;
            }
          }

        }
      }
    }
`
const CleanLine = styled.div`
  height: 0.1px;
  width: 100%;
  background-color: grey;
  margin: 40px 0 15px 0;
`

const Filters2 = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10px 0 10px 0;

	.filter {
		padding: 7.5px 15px;
		font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.07rem;
		border: 1px solid #b9afaf;
		border-radius: 10px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
		color: white;

    svg{
      font-size: 1rem;
      margin-bottom: -0.2rem;
      margin-left: 5px;
      fill: #71c929;
    }

		&:hover {
			transition-duration: 250ms;
			cursor: pointer;
      border-color: rgb(185, 175, 175);
      background-color: #e5e5e5;
      color: #201f1f;
		}
	}

	.selected {
		/* background-color: #ded7d7;
    color: #111; */
		border-color: rgb(185, 175, 175);
		background-color: white;
		color: #201f1f;
	}


	@media only screen and (max-width: 1100px) {
		margin: 10px 0 10px 0;

		.filter {
			padding: 5px 15px;
			font-size: 0.7rem;
			margin: 0px 5px 5px 0px;
		}

		.selected {
			/* background-color: #ded7d7;
      color: #111; */
			border-color: #201f1f;
			background-color: #201f1f;
			color: #ebdddd;
		}
	}

  
`;