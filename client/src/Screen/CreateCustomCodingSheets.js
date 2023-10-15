import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
import VisibilityIcon from '@material-ui/icons/Visibility';
import GradeIcon from '@material-ui/icons/Grade';
import CallMadeIcon from '@material-ui/icons/CallMade';

const CreateCustomCodingSheets = () => {
    const [needDarkMode, setNeedDarkMode] = useState(false);
    
    useEffect(() => {
        let selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme === 'dark') setNeedDarkMode(true);
      }, []);
    
      useEffect(() => {
        document.title = "Contest Archive - Algolisted";
      }, []);
    
      console.log("needDarkMode : ", needDarkMode);
      const toggleDarkMode = () => {
        setNeedDarkMode(!needDarkMode);
      };

    return ( 
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with 
                width more than 1100px, a standard laptop or tablet landscape. 
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                {
                    needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
                }
                {
                    needDarkMode ? <LeftMenuDark marked={"coding-sheets"} /> : <LeftMenu marked={"coding-sheets"} />
                }
                {/* ---> change this all-blogs to your desired page-id */}

                <div className="cc-middle-content">
                    <h1 className='main-heading'>Create Custom Coding Sheets</h1>
                    <p className="heading-supporter">
                        In this feature, you can make lists of coding problems you like and easily share them with your friends. This helps you remember your favorite problems and lets you share the list link with others. Plus, if you share a link to a problem, we'll automatically scrape information about that problem and show it in your list with visualizations.
                    </p>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            Curious about how to use it? Watch our <a href="/">youtube video</a> to see how it's done!
                        </div>
                    </div> 

                    <UserSheetsList>
                        <h3>Your Sheets</h3>
                        <div className="list">
                            <div className="sheet-container">
                                <div className="title">Binary Search for Beginners <CallMadeIcon/> </div>
                                <div className="desc">Explore 'Binary Search for Beginners,' a comprehensive guide by a seasoned LeetCode enthusiast. Discover over 50 LeetCode questions and hone your binary search skills, making complex problem-solving seem like a breeze. Perfect for newcomers seeking a solid foundation in this essential algorithm.</div>
                                <div className="info">
                                    <div className="one-info">
                                        <b>Questions count : </b>
                                        0
                                    </div>
                                    <div className="one-info">
                                        <b>Latest Edit : </b>
                                        20 Oct 2023
                                    </div>
                                </div>
                                <div className="btns">
                                    <div className="btn">Edit Sheet Content</div>
                                    <div className="right">
                                        <div className="analytics">
                                            <VisibilityIcon/>
                                            <div className="stats">1,342</div>
                                        </div>
                                        <div className="analytics">
                                            <GradeIcon/>
                                            <div className="stats">127</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </UserSheetsList>
                    <UserSheetsLikedList>
                        <h3>Sheets you Star Marked</h3>
                        <div className="list">
                            <div className="sheet-container">
                                <div className="title">Binary Search for Beginners <CallMadeIcon/> </div>
                                <div className="info">
                                    <div className="one-info">
                                        Author{" "}
                                        <b>@Arsh Goyal</b>
                                    </div>
                                    <div className="author-links">
                                        <img className='author-img' src="https://yt3.googleusercontent.com/ytc/APkrFKbsYv4EsFtPfuUp7Xk9ULYrDBLJ9tgN7SrOyB1Fbw=s900-c-k-c0x00ffffff-no-rj" alt="" />
                                        <div className="other-links">
                                            <img src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png" alt="" />
                                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052" alt="" />
                                            <div className="text">Follow for Updates</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="desc">Explore 'Binary Search for Beginners,' a comprehensive guide by a seasoned LeetCode enthusiast. Discover over 50 LeetCode questions and hone your binary search skills, making complex problem-solving seem like a breeze. Perfect for newcomers seeking a solid foundation in this essential algorithm.</div>
                                <Progress>
                                    {/* <div className="text">Solved : </div> */}
                                    <div className="value">Solved : 17%</div>
                                    <div className="bar">
                                        <div
                                            className="fill"
                                            style={{ width: '17%' }}
                                        ></div>
                                    </div>
                                </Progress>
                                <div className="sheets-info">
                                    <div className="sheet-info">
                                        <div className='info-about'>Total Questions</div>
                                        <p>30</p>
                                    </div>
                                    <div className="sheet-info">
                                        <div className='info-about'>Last Update</div>
                                        <p>13 Oct 2023</p>
                                    </div>
                                    <div className="sheet-info">
                                        <div className='info-about'>Sheet Views</div>
                                        <p>1342</p>
                                    </div>
                                    <div className="sheet-info">
                                        <div className='info-about'>Stars</div>
                                        <p>127</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sheet-container">
                                <div className="title">Binary Search for Beginners <CallMadeIcon/> </div>
                                <div className="info">
                                    <div className="one-info">
                                        Author{" "}
                                        <b>@Arsh Goyal</b>
                                    </div>
                                    <div className="author-links">
                                        <img className='author-img' src="https://yt3.googleusercontent.com/ytc/APkrFKbsYv4EsFtPfuUp7Xk9ULYrDBLJ9tgN7SrOyB1Fbw=s900-c-k-c0x00ffffff-no-rj" alt="" />
                                        <div className="other-links">
                                            <img src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png" alt="" />
                                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052" alt="" />
                                            <div className="text">Follow for Updates</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="desc">Explore 'Binary Search for Beginners,' a comprehensive guide by a seasoned LeetCode enthusiast. Discover over 50 LeetCode questions and hone your binary search skills, making complex problem-solving seem like a breeze. Perfect for newcomers seeking a solid foundation in this essential algorithm.</div>
                                <Progress>
                                    {/* <div className="text">Solved : </div> */}
                                    <div className="value">Solved : 17%</div>
                                    <div className="bar">
                                        <div
                                            className="fill"
                                            style={{ width: '17%' }}
                                        ></div>
                                    </div>
                                </Progress>
                                <div className="sheets-info">
                                    <div className="sheet-info">
                                        <div className='info-about'>Total Questions</div>
                                        <p>30</p>
                                    </div>
                                    <div className="sheet-info">
                                        <div className='info-about'>Last Update</div>
                                        <p>13 Oct 2023</p>
                                    </div>
                                    <div className="sheet-info">
                                        <div className='info-about'>Sheet Views</div>
                                        <p>1342</p>
                                    </div>
                                    <div className="sheet-info">
                                        <div className='info-about'>Stars</div>
                                        <p>127</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </UserSheetsLikedList>
                </div>
            </Container>
        </GrandContainer>
    )
}

export default CreateCustomCodingSheets

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
    }
`

const UserSheetsList = styled.div`
    margin-top: 30px;

    h3{
        font-size: 1.25rem;
        font-weight: 500;
    }

    .list{
        display: flex;
        flex-wrap: wrap;

        .sheet-container{
            width: calc(50% - 10px);
            /* background-color: black; */
            margin: 10px 10px 0 0;
            border-radius: 10px;
            border: 1px solid #e7dcdc;
            padding: 10px;

            .title{
                font-weight: 500;
                display: flex;
                align-items: center;
                cursor: pointer;

                svg{
                    font-size: 1rem;
                    margin-left: 5px;
                }

                &:hover{
                    transition-duration: 250ms;
                    color: cornflowerblue;

                    svg{
                        fill: cornflowerblue;
                    }
                }
            }

            .desc{
                font-size: 0.85rem;
                font-weight: 200;
                margin-top: 5px;
            }

            .info{
                margin: 10px 0;
                .one-info{
                    font-size: 0.85rem;
                    font-weight: 200;

                    b{
                        font-weight: 500;
                    }
                }
            }

            .btns{
                display: flex;
                align-items: flex-end;
                justify-content: space-between;

                .btn{
                    padding: 5px 10px;
                    font-size: 0.75rem;
                    font-weight: 300;
                    background-color: cornflowerblue;
                    color: white;
                    border-radius: 10px;
                    margin-top: 10px;
                }

                .right{
                    display: flex;
                    margin-right: 10px;

                    .analytics{
                        display: flex;
                        align-items: center;
                        margin-left: 10px;

                        svg{
                            font-size: 1rem;
                            fill: #434343;
                        }

                        .stats{
                            font-size: 0.75rem;
                            margin-left: 2.5px;
                            color: #434343;
                        }
                    }
                    
                }
            }
        }

    }
`

const UserSheetsLikedList = styled.div`
    margin-top: 30px;

    h3{
        font-size: 1.25rem;
        font-weight: 500;
    }

    .list{
        display: flex;
        flex-wrap: wrap;

        .sheet-container{
            width: calc(50% - 10px);
            /* background-color: black; */
            margin: 10px 10px 0 0;
            border-radius: 10px;
            border: 1px solid #e7dcdc;
            padding: 10px;

            .title{
                font-weight: 500;
                display: flex;
                align-items: center;
                cursor: pointer;

                svg{
                    font-size: 1rem;
                    margin-left: 5px;
                }

                &:hover{
                    transition-duration: 250ms;
                    color: cornflowerblue;

                    svg{
                        fill: cornflowerblue;
                    }
                }
            }

            .desc{
                font-size: 0.85rem;
                font-weight: 200;
                margin-top: 5px;
            }

            .info{
                margin: 10px 0;
                .one-info{
                    font-size: 0.85rem;
                    font-weight: 200;
                    display: flex;
                    align-items: center;
                    margin: 10px 0 0 0;

                    b{
                        font-weight: 500;
                        margin-left: 5px;
                    }
                }

                .author-links{
                    margin-top: 10px;
                    position: relative;
                    height: 80px;
                    display: flex;
                    align-items: center;

                    .author-img{
                        height: 75px;
                        width: 75px;
                        border-radius: 50%;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }

                    .other-links{
                        max-width: calc(100% - 10px);
                        margin-left: 10px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        padding: 0 15px 0 80px;
                        background-color: #f3f1f1;
                        border-radius: 10px;

                        img{
                            height: 15px;
                            margin-right: 15px;
                        }

                        .text{
                            font-size: 0.7rem;
                            border-left: 1px solid black;
                            padding-left: 10px;
                        }
                    }
                }
            }

            .sheets-info{
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                width: 100%;
                background-color: #64e1b5;
                height: 50px;
                border-radius: 10px;
                margin-top: 10px;

                .sheet-info{
                    width: 25%;
                    height: 100%;
                    border-right: 1px solid white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;

                    .info-about{
                        font-size: 0.65rem;
                    }

                    p{
                        font-size: 0.95rem;
                        font-weight: 500;
                    }
                }

                &:last-child {
                    border-right: none;
                }
            }
        }

    }
`

const Progress = styled.div`
	display: flex;
	align-items: center;
	margin: 20px 0 20px 0;

	.text {
		font-size: 0.75rem;
		font-weight: 500;
	}

	.value {
		margin: 0 10px 0 0px;
		font-size: 0.65rem;
		font-weight: 500;
		padding: 2.5px 7.5px;
		text-align: center;
		background-color: #f3f4f7;
        letter-spacing: 0.05rem;
		border-radius: 50px;
        border: 1px solid #e7dcdc;
	}

	.bar {
		/* width: 400px; */
		height: 10px;
		border-radius: 100px;
		background-color: whitesmoke;
		border: 1px solid pink;
		flex: 1;
		overflow: hidden;

		.fill {
			transition: width 0.25s linear;
			height: 100%;
			border-radius: 100px;
			background-color: #64e1b5;
		}
	}

	@media only screen and (max-width: 1100px) {
		margin: 20px 0 0 0;

		.value {
			margin: 0 10px 0 0;
			font-size: 0.7rem;
			font-weight: 500;
			letter-spacing: 0.15rem;
			padding: 5px 7px;
			width: 70px;
			text-align: center;
			background-color: #f3f4f7;
			border-radius: 50px;
		}

		.bar {
			/* width: 400px; */
			height: 8px;
			border-radius: 100px;
			background-color: whitesmoke;
			border: 1px solid pink;
			flex: 1;
			overflow: hidden;

			.fill {
				transition: width 0.25s linear;
				height: 100%;
				border-radius: 100px;
				background-color: #ffa500;
			}
		}
	}	


`;