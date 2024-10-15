import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CCHeaderDarkPlus from "../Components/CCHeaderDarkPlus";
import CCHeaderPlus from "../Components/CCHeaderPlus";
import LeftMenu from "../Components/LeftMenu";
import LeftMenuDark from "../Components/LeftMenuDark";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GradeIcon from "@material-ui/icons/Grade";
import CallMadeIcon from "@material-ui/icons/CallMade";
import AddIcon from "@material-ui/icons/Add";
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence, onAuthStateChanged  } from "@firebase/auth";
import app from "../firebase_Auth/firebaseConfig";
import loader from "../Images/loader.svg";
 
// import { axios } from 'axios';
// const axios = require('axios');
import axios from "axios";
import SimpleFooter from "../Components/SimpleFooter";

const CreateCustomCodingSheets = ({setUserGlobal}) => {
  const [needDarkMode, setNeedDarkMode] = useState(!false);
  const [userSheet, setUserSheet] = useState([]);
  const [creatingSheet, setCreatingSheet] = useState(false)
  const [user, setUser] = useState(``);
  const [sheetName, setSheetName] = useState("");
  const [sheetDesc, setSheetDesc] = useState("");
  const [sheetId, setSheetId] = useState("");
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") setNeedDarkMode(true);
    if (selectedTheme === "light") setNeedDarkMode(false);

    // Initialize Firebase Authentication listener
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            setIsPending(true)
          try {
            console.log(user)
            console.log("https://algolisted.tonmoy1912.in/user-details/profile-update-email was called");
            const response = await axios.post(
              "https://algolisted.tonmoy1912.in/user-details/profile-update-email",
              user,
              { withCredentials: true }
            );
            setUser(response.data.user);
            localStorage.setItem('userId', response.data.user._id);
            const userId = localStorage.getItem('userId');
            console.log("We got the User ID");
            console.log(user);
            console.log(userId);
            setUserGlobal(response.data.user);
            setIsPending(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          setUser(null);
          setIsPending(false);
        }
      });      

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [setUserGlobal]);
  
  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  useEffect(() => {
    document.title = "Custom Coding Sheets - Algolisted";
  }, []);
  
  useEffect(() => {
    console.log(user);
    if (user) {
      console.log(user._id);
      getUserSheet(user._id);
    }
  }, [user]);

  

  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    // console.log(ap);
    const auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence)
    const result = await signInWithPopup(auth, provider);
    if (!result) {
        throw new Error("Could not complete login");
      }
    try {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      console.log(result.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);

      // ...
    }
    // const newObj = {
    //     "email": result.user.email,
    //     "name": result.user.name,
    //     "profilePictureURL": result.user.profilePictureURL
    // }
    try {
      console.log("https://algolisted.tonmoy1912.in/user-details/profile-create was called");
      const response = await axios.post(
        `https://algolisted.tonmoy1912.in/user-details/profile-create`,
        result.user,
        { withCredentials: true }
      );
      setIsPending(false);
      setUser(response.data.user);
      // sessionStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', response.data.user._id);
      const userId = localStorage.getItem('userId');
      console.log("We got the User ID");
      console.log(user);
      console.log(userId);
      setUserGlobal(response.data.user);
    } catch (error) {
      try {
        console.log("https://algolisted.tonmoy1912.in/user-details/profile-update-email was called");
        console.log(result.user);
        const newResponse = await axios.post(
          `https://algolisted.tonmoy1912.in/user-details/profile-update-email`,
          result.user,
          { withCredentials: true }
        );
        setUser(newResponse.data.user);
        localStorage.setItem('userId', newResponse.data.user._id);
        const userId = localStorage.getItem('userId');
        console.log(userId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSheetIdChange = (event) => {
    setSheetId(event.target.value);
  };

  const handleSheetNameChange = (event) => {
    setSheetName(event.target.value);
  };

  const handleSheetDescChange = (event) => {
    setSheetDesc(event.target.value);
  };

  const handleSubmitCreate = () => {
    console.log("Sheet Name: " + sheetName);
    console.log("Sheet Description: " + sheetDesc);
    setCreatingSheet(true);
    createNewSheet();
  };

  const createNewSheet = async () => {
    const newObj = {
      ownerId:user._id,
      sheetName,
      sheetDesc,
    };
    console.log(newObj);
    try {
      const newResponse = await axios.post(`https://algolisted.tonmoy1912.in/problem-sheets/create`, newObj, {
        withCredentials: true,
      });
      console.log(newResponse);
    } catch (error) {
      console.log(error);
    }
    
    setSheetDesc("");
    setSheetName("");
    
    setCreatingSheet(false);
    getUserSheet(user._id);
  };

  const getUserSheet = async (ownerId) => {
    console.log(`/problem-sheets/get-by-owner/${ownerId} was called!`);
    try {
      const sheetList = await axios.get(
        `https://algolisted.tonmoy1912.in/problem-sheets/get-by-owner/${ownerId}`
      );
      
      console.log(sheetList.data.sheets);
      setUserSheet(sheetList.data.sheets);
      console.log(userSheet);
    } catch (error) {
      console.log(error.message);
    }
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }


  return (
    <GrandContainer>
      <MobContainer>
        We are still working on Responsive Version of the website, please view
        the site with width more than 1100px, a standard laptop or tablet
        landscape.
        <img
          src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif"
          alt=""
        />
      </MobContainer>
      <Container needDarkMode={needDarkMode}>
        {
          needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
        }
        {
          needDarkMode ? <LeftMenuDark marked={"coding-sheets"} /> : <LeftMenu marked={"coding-sheets"} />
        }
        {/* ---> change this all-blogs to your desired page-id */}

        <div className="cc-middle-content">
          <h1 className="main-heading">Custom Coding Sheets</h1>
          <p className="heading-supporter">
            In this feature, you can make lists of coding problems you like and
            easily share them with your friends. This helps you remember your
            favorite problems and lets you share the list link with others.
            Plus, if you share a link to a problem, we'll automatically scrape
            information about that problem and show it in your list with
            visualizations.
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              Curious about how to use it? Watch our{" "}
              <a href="/">youtube video</a> to see how it's done!
            </div>
          </div>
          <UserSheetsLikedList needDarkMode={needDarkMode}>
            {!user && isPending ? (
                <div>
                <img src={loader} alt="Loading..." />
                </div>
            ) : (
                <>
                {!user && (
                    <>
                    <h3>You need to have an account to use this feature</h3>
                    <SignUpButton needDarkMode={needDarkMode} onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        <div className="text">Continue with Google</div>
                    </SignUpButton>
                    </>
                )}
                </>
            )}
            </UserSheetsLikedList>

          {/* {user && <UserSheetsList> */}
          {user && (
            <UserSheetsList needDarkMode={needDarkMode}>
              {console.log("we have a user in the house", user.name)}
              <div className="owner-detail-main">
                <img className="owner-pic" src={user.profilePictureURL} alt="" />
                <p>
                  Greetings, <b>{user.name}</b>! As of November 9th, you are now logged in. Feel free to generate a new sheet or modify an existing one. Additionally, you can share the sheet link with others for collaborative solving. Enjoy coding! 🚀
                </p>
              </div>
              <h3>Create New Sheet</h3>
              <div className="create-new-sheet">
                <div className="newSheetInput">
                  <input
                    type="text"
                    value={sheetName}
                    onChange={handleSheetNameChange}
                    placeholder="Sheet Name . . ."
                  />
                </div>
                <div className="newSheetInput">
                  <input
                    type="text"
                    value={sheetDesc}
                    onChange={handleSheetDescChange}
                    placeholder="Sheet Description . . ."
                  />
                </div>
                {/* <button type="submit">Submit</button> */}
                <div className="addNewSheetBtn" onClick={() => handleSubmitCreate()}>
                  {
                    creatingSheet ? <img src="https://openaccess.sagepub.com/SciPrisV4S12/Content/images/loading7.gif" alt="" /> : <AddIcon />
                  }
                </div>
              </div>
              
              <h3>Your Sheets</h3>
              <>
                <div className="list">
                  {userSheet.length > 0 &&
                    userSheet.map((sheet) => (
                        <div className="sheet-container">
                          <a href={`create-problem-list/sheet/${sheet._id}`} target="_blank" className="title" rel="noreferrer">
                            {sheet.sheetName} <CallMadeIcon />{" "}
                          </a>
                          <div className="desc">{sheet.sheetDesc}</div>
                          <div className="btns">
                            <div className="info">
                              <div className="one-info">
                                <b>Questions count : </b>
                                {sheet.problemIds.length}
                              </div>
                              <div className="one-info">
                                <b>Latest Edit : </b>
                                {formatDate(sheet.lastUpdated)}
                              </div>
                            </div>
                            <a href={`create-problem-list/sheet-dashboard/${sheet._id}`} target="_blank" className="btn" rel="noreferrer">Edit Sheet Content {'>'} </a>
                          </div>
                        </div>
                    ))}
                </div>
              </>
              {/* <div className="list">
                <div className="sheet-container">
                  <div className="title">
                    Binary Search for Beginners <CallMadeIcon />{" "}
                  </div>
                  <div className="desc">
                    Explore 'Binary Search for Beginners,' a comprehensive guide
                    by a seasoned LeetCode enthusiast. Discover over 50 LeetCode
                    questions and hone your binary search skills, making complex
                    problem-solving seem like a breeze. Perfect for newcomers
                    seeking a solid foundation in this essential algorithm.
                  </div>
                  <div className="info">
                    <div className="one-info">
                      <b>Questions count : </b>0
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
                        <VisibilityIcon />
                        <div className="stats">1,342</div>
                      </div>
                      <div className="analytics">
                        <GradeIcon />
                        <div className="stats">127</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sheet-container">
                  <div className="title">
                    Binary Search for Beginners <CallMadeIcon />{" "}
                  </div>
                  <div className="desc">
                    Explore 'Binary Search for Beginners,' a comprehensive guide
                    by a seasoned LeetCode enthusiast. Discover over 50 LeetCode
                    questions and hone your binary search skills, making complex
                    problem-solving seem like a breeze. Perfect for newcomers
                    seeking a solid foundation in this essential algorithm.
                  </div>
                  <div className="info">
                    <div className="one-info">
                      <b>Questions count : </b>0
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
                        <VisibilityIcon />
                        <div className="stats">1,342</div>
                      </div>
                      <div className="analytics">
                        <GradeIcon />
                        <div className="stats">127</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </UserSheetsList>
          )}
          {user && (
            <UserSheetsLikedList>
              {/* <h3>Sheets you Star Marked</h3>
              <div className="list">
                <div className="sheet-container">
                  <div className="title">
                    Binary Search for Beginners <CallMadeIcon />{" "}
                  </div>
                  <div className="info">
                    <div className="one-info">
                      Author <b>@Arsh Goyal</b>
                    </div>
                    <div className="author-links">
                      <img
                        className="author-img"
                        src="https://yt3.googleusercontent.com/ytc/APkrFKbsYv4EsFtPfuUp7Xk9ULYrDBLJ9tgN7SrOyB1Fbw=s900-c-k-c0x00ffffff-no-rj"
                        alt=""
                      />
                      <div className="other-links">
                        <img
                          src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png"
                          alt=""
                        />
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                          alt=""
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052"
                          alt=""
                        />
                        <div className="text">Follow for Updates</div>
                      </div>
                    </div>
                  </div>
                  <div className="desc">
                    Explore 'Binary Search for Beginners,' a comprehensive guide
                    by a seasoned LeetCode enthusiast. Discover over 50 LeetCode
                    questions and hone your binary search skills, making complex
                    problem-solving seem like a breeze. Perfect for newcomers
                    seeking a solid foundation in this essential algorithm.
                  </div>
                  <Progress>
                    <div className="value">Solved : 17%</div>
                    <div className="bar">
                      <div className="fill" style={{ width: "17%" }}></div>
                    </div>
                  </Progress>
                  <div className="sheets-info">
                    <div className="sheet-info">
                      <div className="info-about">Total Questions</div>
                      <p>30</p>
                    </div>
                    <div className="sheet-info">
                      <div className="info-about">Last Update</div>
                      <p>13 Oct 2023</p>
                    </div>
                    <div className="sheet-info">
                      <div className="info-about">Sheet Views</div>
                      <p>1342</p>
                    </div>
                    <div className="sheet-info">
                      <div className="info-about">Stars</div>
                      <p>127</p>
                    </div>
                  </div>
                </div>
                <div className="sheet-container">
                  <div className="title">
                    Binary Search for Beginners <CallMadeIcon />{" "}
                  </div>
                  <div className="info">
                    <div className="one-info">
                      Author <b>@Arsh Goyal</b>
                    </div>
                    <div className="author-links">
                      <img
                        className="author-img"
                        src="https://yt3.googleusercontent.com/ytc/APkrFKbsYv4EsFtPfuUp7Xk9ULYrDBLJ9tgN7SrOyB1Fbw=s900-c-k-c0x00ffffff-no-rj"
                        alt=""
                      />
                      <div className="other-links">
                        <img
                          src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png"
                          alt=""
                        />
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                          alt=""
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052"
                          alt=""
                        />
                        <div className="text">Follow for Updates</div>
                      </div>
                    </div>
                  </div>
                  <div className="desc">
                    Explore 'Binary Search for Beginners,' a comprehensive guide
                    by a seasoned LeetCode enthusiast. Discover over 50 LeetCode
                    questions and hone your binary search skills, making complex
                    problem-solving seem like a breeze. Perfect for newcomers
                    seeking a solid foundation in this essential algorithm.
                  </div>
                  <Progress>
                    <div className="value">Solved : 17%</div>
                    <div className="bar">
                      <div className="fill" style={{ width: "17%" }}></div>
                    </div>
                  </Progress>
                  <div className="sheets-info">
                    <div className="sheet-info">
                      <div className="info-about">Total Questions</div>
                      <p>30</p>
                    </div>
                    <div className="sheet-info">
                      <div className="info-about">Last Update</div>
                      <p>13 Oct 2023</p>
                    </div>
                    <div className="sheet-info">
                      <div className="info-about">Sheet Views</div>
                      <p>1342</p>
                    </div>
                    <div className="sheet-info">
                      <div className="info-about">Stars</div>
                      <p>127</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </UserSheetsLikedList>
          )}
        </div>
        <SimpleFooter />
      </Container>
    </GrandContainer>
  );
};

export default CreateCustomCodingSheets;

const GrandContainer = styled.div``;

const MobContainer = styled.div`
  width: 100vw;
  padding: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;

  img {
    width: calc(100% - 80px);
    margin: 40px;
    border-radius: 5px;
    display: block;
  }

  @media only screen and (min-width: 1099px) {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  padding-bottom: 80px;

  @media only screen and (max-width: 1099px) {
    display: none;
  }

  display: flex;
  justify-content: space-between;
  padding-left: 200px;

  background-color: ${(props) => (props.needDarkMode ? '#313338' : 'transparent')};

  a{
    color: ${(props) => (props.needDarkMode ? '#6d93d8' : '#18489f')};
  }

  .cc-middle-content {
    min-height: 100vh;
    width: 100%;
    /* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
    padding: 80px 120px 50px 120px;
    position: relative;
    width: 100%;
    max-width: 1360px;
    min-width: 850px;
    margin: auto;

    @media only screen and (max-width: 1200px) {
      padding: 80px 50px 50px 50px;
    }

    .main-heading{
          font-size: 1.65rem;
          font-weight: 600;
          color: ${(props) => (props.needDarkMode ? '#e5e6e8' : '#292929')};
      }

      .heading-supporter{
          font-size: 1.05rem;
          margin-bottom: 10px;
          font-weight: 400;
          color: ${(props) => (props.needDarkMode ? '#ffffffa6' : '#696168')};

          a{
            color: ${(props) => (props.needDarkMode ? '#18489f' : '#18489f')};
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          }
      }

      .message{
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: ${(props) => (props.needDarkMode ? '#444754' : '#d5f7e1')};
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 10px 0;

        .text{
            font-size: 0.8rem;
            color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#13803b')};
            font-weight: 300;

            b{
                font-weight: 500;
                color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#13803b')};
            }
        }
      }
  }
`;

const UserSheetsList = styled.div`
  margin-top: 30px;
  margin-bottom: 60px;

    .owner-detail-main{
      display: flex;
      align-items: center;
      
      .owner-pic{
        height: 75px;
        aspect-ratio: 1/1;
        border-radius: 100px;
        margin-right: 20px;
        border: 1px solid #d1d5db;
        background-color: #e5e5e5;
        padding: 2.5px;
      }

      p{
        font-size: 0.85rem;
        font-weight: 200;
        color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#333')};

        b{
          font-weight: 500;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }
      }
    }

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 50px;
    color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
  }

  .create-new-sheet{
    position: relative;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    /* flex-wrap: wrap; */
    width: 100%;
    /* background-color: black; */

    .newSheetInput{
      width: calc(50% - 37px);
      /* background-color: black; */
      margin: 10px 10px 0 0;
      border-radius: 10px;
      border: 1px solid ${(props) => (props.needDarkMode ? '#404249' : '#e7dcdc')};
      background-color: ${(props) => (props.needDarkMode ? '#232425' : 'transparent')};
      
      input{
        font-size : 0.75rem;
        border: none;
        padding: 12.5px;
        width: 100%;
        height: 100%;
        background-color: transparent;
        color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

        &::placeholder {
          color: ${(props) => (props.needDarkMode ? '#b0b0b0' : '#6c6c6c')};
        }
      }
    }

    .addNewSheetBtn{
      display: grid;
      place-items: center;
      border: 1px solid ${(props) => (props.needDarkMode ? '#404249' : '#e7dcdc')};
      background-color: ${(props) => (props.needDarkMode ? '#404249' : 'transparent')};
      height: 45px;
      width: 45px;
      border-radius: 10px;
      position: absolute;
      right: 10px;
      bottom: 0px;
      cursor: pointer;
      
      svg{
        font-size: 1.25rem;
        fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
      }

      img{
        height: 25px;
      }

    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    .sheet-container {
      width: calc(50% - 10px);
      /* background-color: black; */
      margin: 10px 10px 0 0;
      border-radius: 10px;
      border: 1px solid ${(props) => (props.needDarkMode ? '#3f4042' : '#e7dcdc')};
      background-color: ${(props) => (props.needDarkMode ? '#232425' : 'transparent')};      
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;


      .title {
        font-weight: 500;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
        color: ${(props) => (props.needDarkMode ? '#b1bcec' : '#6d93d8')};

        svg {
          font-size: 1rem;
          margin-left: 5px;
          fill: ${(props) => (props.needDarkMode ? '#b1bcec' : '#333')};
        }

        &:hover {
          transition-duration: 250ms;
          color: cornflowerblue;

          svg {
            fill: cornflowerblue;
          }
        }
      }

      .desc {
        font-size: 0.75rem;
        font-weight: 200;
        margin-top: 5px;
        flex: 1;
        color: ${(props) => (props.needDarkMode ? '#bababa' : '#333')};
      }

      .info {
        margin: 20px 0 0px 0;
        .one-info {
          font-size: 0.75rem;
          font-weight: 200;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

          b {
            font-weight: 500;
            color: ${(props) => (props.needDarkMode ? '#bababa' : '#333')};
          }
        }
      }

      .btns {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        .btn {
          padding: 5px 10px;
          font-size: 0.75rem;
          font-weight: 300;
          background-color: ${(props) => (props.needDarkMode ? '#404249' : '#e5e5e5')};
          /* color: white; */
          border-radius: 10px;
          margin-top: 10px;
          text-decoration: none;
          font-weight: 400;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }

        .right {
          display: flex;
          margin-right: 10px;

          .analytics {
            display: flex;
            align-items: center;
            margin-left: 10px;

            svg {
              font-size: 1rem;
              fill: #434343;
            }

            .stats {
              font-size: 0.75rem;
              margin-left: 2.5px;
              color: #434343;
            }
          }
        }
      }
    }

    .new-sheet-container {
      width: 50px;
      height: 50px;
      /* background-color: black; */
      margin: 10px 10px 0 0;
      border-radius: 10px;
      border: 1px solid #e7dcdc;
      padding: 10px;

      display: grid;
      place-items: center;
    }

    .search-bar {
      width: 425px;
    }
  }
`;

const UserSheetsLikedList = styled.div`
  margin-top: 30px;

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 10px;
    color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    .sheet-container {
      width: calc(50% - 10px);
      /* background-color: black; */
      margin: 10px 10px 0 0;
      border-radius: 10px;
      border: 1px solid #e7dcdc;
      padding: 10px;

      .title {
        font-weight: 500;
        display: flex;
        align-items: center;
        cursor: pointer;

        svg {
          font-size: 1rem;
          margin-left: 5px;
        }

        &:hover {
          transition-duration: 250ms;
          color: cornflowerblue;

          svg {
            fill: cornflowerblue;
          }
        }
      }

      .desc {
        font-size: 0.85rem;
        font-weight: 200;
        margin-top: 5px;
      }

      .info {
        margin: 10px 0;
        .one-info {
          font-size: 0.85rem;
          font-weight: 200;
          display: flex;
          align-items: center;
          margin: 10px 0 0 0;

          b {
            font-weight: 500;
            margin-left: 5px;
          }
        }

        .author-links {
          margin-top: 10px;
          position: relative;
          height: 80px;
          display: flex;
          align-items: center;

          .author-img {
            height: 75px;
            width: 75px;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 0;
          }

          .other-links {
            max-width: calc(100% - 10px);
            margin-left: 10px;
            height: 40px;
            display: flex;
            align-items: center;
            padding: 0 15px 0 80px;
            background-color: #f3f1f1;
            border-radius: 10px;

            img {
              height: 15px;
              margin-right: 15px;
            }

            .text {
              font-size: 0.7rem;
              border-left: 1px solid black;
              padding-left: 10px;
            }
          }
        }
      }

      .sheets-info {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%;
        background-color: #64e1b5;
        height: 50px;
        border-radius: 10px;
        margin-top: 10px;

        .sheet-info {
          width: 25%;
          height: 100%;
          border-right: 1px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          .info-about {
            font-size: 0.65rem;
          }

          p {
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
`;

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

const SignUpButton = styled.div`
  height: 40px;
  width: 220px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.needDarkMode ? '#454754' : '#fff')};
  border: 1px solid ${(props) => (props.needDarkMode ? '#5d5e61' : 'rgb(209, 213, 219)')};

  img {
    height: 20px;
  }

  .text {
    font-size: 0.8rem;
    font-weight: 500;
    margin-left: 10px;
    color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
  }

  &:hover{
    border: 1px solid ${(props) => (props.needDarkMode ? '#b6b6b6' : '#9c9c9c')};
    transition-duration: 250ms;
  }
`;
