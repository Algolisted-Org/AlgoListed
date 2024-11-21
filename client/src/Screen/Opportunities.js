import React, { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import SimpleFooter from "../Components/SimpleFooter";
import CallMadeIcon from '@material-ui/icons/CallMade';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CCHeaderPlus from '../Components/CCHeaderPlus';
import CCHeaderDark from '../Components/CCHeaderDark';
import LeftMenu from '../Components/LeftMenu';
import LeftMenuDark from '../Components/LeftMenuDark';
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus';
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DoneIcon from '@material-ui/icons/Done';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LazyLoad from 'react-lazy-load';
import MobileNavbar from "../Components/MobileNavbar";

const Opportunities = () => {


  const [needDarkMode, setNeedDarkMode] = useState(!false);
  const [openVisualiser, setOpenVisualiser] = useState(false);
  const [filterContestType, setFilterContestType] = useState("All");
  const [filterOpportunityTypeName, setFilterOpportunityTypeName] = useState("Job Type");
  const [openModel1, setOpenModel1] = useState(false);
  const [openModel2, setOpenModel2] = useState(false);
  const [openModel3, setOpenModel3] = useState(false);
  const [openModel4, setOpenModel4] = useState(false);
  const [applyMagicFilter, setApplyMagicFilter] = useState(false);
  const [sliderInputValue, setSliderInputValue] = useState("Fresher");
  const [location, setLocation] = useState("All Locations");
  const [status, setStatus] = useState("All Status")
  const [cities, setCities] = useState([])

  const ACTIONS = {
    SET_DATA: 'set_data',
    TOGGLE_LIKED: 'liked',
    TOGGLE_FILLED: 'filled',
    TOGGLE_NOT_INTERESTED: 'not_interested'
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.SET_DATA:
        // Initialize data and preferences
        const storedPreferences = JSON.parse(localStorage.getItem('jobPreferences') || '{}');
        return action.payload.data.map((item, index) => ({
          ...item,
          liked: storedPreferences[index]?.liked || false,  // Use index as key in preferences
          filled: storedPreferences[index]?.filled || false,
          not_interested: storedPreferences[index]?.not_interested || false,
          index: index, // Ensure index is included in each item
        }));
  
        case ACTIONS.TOGGLE_LIKED:
          case ACTIONS.TOGGLE_FILLED:
          case ACTIONS.TOGGLE_NOT_INTERESTED: {
            const updatedState = state.map((item) => {
              if (item.uniqueIdentifier === action.payload.uniqueIdentifier) {
                const propertyToToggle = {
                  [ACTIONS.TOGGLE_LIKED]: 'liked',
                  [ACTIONS.TOGGLE_FILLED]: 'filled',
                  [ACTIONS.TOGGLE_NOT_INTERESTED]: 'not_interested',
                }[action.type];
                return { ...item, [propertyToToggle]: !item[propertyToToggle] };
              }
              return item;
            });
          
            updateLocalStorage(updatedState);
            return updatedState;
          }
  
      default:
        return state;
    }
  };
  
  // Function to update local storage with preferences
  const updateLocalStorage = (opportunities) => {
    const preferences = opportunities.reduce((acc, item) => {
      if (item.liked || item.filled || item.not_interested) {
        acc[item.uniqueIdentifier] = {
          liked: item.liked,
          filled: item.filled,
          not_interested: item.not_interested,
        };
      }
      return acc;
    }, {});
    localStorage.setItem('jobPreferences', JSON.stringify(preferences));
  };

  const [allOpportunities, dispatch] = useReducer(reducer, []); //initially empty list

  // useEffect(() => {
  //   console.log("All Opportunities was just updated to : ", allOpportunities);
  // }, [allOpportunities])

  let count = 0;

  useEffect(() => {
    document.title = "All Internship and Job Opportunities - Algolisted";
  }, []);

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === 'dark') {
      setNeedDarkMode(true)
    }
    else {
      setNeedDarkMode(false);
    }
  }, [])

  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  useEffect(() => {
    axios
      .get(
        `https://script.googleusercontent.com/macros/echo?user_content_key=j9Co0fA6rp5kG1v2ji1_cWNf0Qyd9PiRVSMEFlosmhJLm00_tFel6zYGRqfJxOlWenWb_Exj0y9g-ljCbWFdh6qpF5o4vuRbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnA8Tr49F1Ivtr0o6Yp4fjnD9VY8k1Q0AdNpbEobTJSVU02RPIupYF5H0LqOn1gHHuTQr3i-TjMlDArlJytlu8mpjZbJ2bHHlb9z9Jw9Md8uu&lib=M_adtjhtYqTY4x3CHvLkZEzxNTvjCbw04`
      )
      .then((res) => {
        const recievedData = res.data;
        //the above is a list of objects
        const newData = recievedData.map((item, index) => {
          return { ...item, filled: false, liked: false, not_interested: false, uniqueIdentifier: index}
        })
        dispatch({ type: ACTIONS.SET_DATA, payload: { data: newData } });
      })
      .catch((err) => console.log(err));
  }, []);

  const getImageLink = (source) => {
    const linkedinRegex = /linkedin\.com/;
    const whatsappRegex = /whatsapp\.com/;
    const telegramRegex = /telegram\.org/;
    const telegramRegex2 = /t\.me/;
    const youtubeRegex = /youtube\.com/;
    const googleRegex = /google\.com/;

    if (linkedinRegex.test(source)) {
      return 'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png';
    } else if (whatsappRegex.test(source)) {
      return 'https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png';
    } else if (telegramRegex.test(source) || telegramRegex2.test(source)) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png';
    } else if (youtubeRegex.test(source)) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/2048px-YouTube_social_red_circle_%282017%29.svg.png';
    } else if (googleRegex.test(source)) {
      return 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png';
    } else {
      // If no match, return a default image link
      return 'https://imageio.forbes.com/specials-images/imageserve/63dd379b9ef3cd559331b7e2/Illustration-of-the-word--Ai---in-the-style-of-the-Google-logo/0x0.jpg?format=jpg&height=1080&width=1920';
    }
  };

  // Function to get cities by country using an external API
  const getCitiesByCountry = async (country = "India") => {
    try {
      // Make a POST request to the countriesnow API to fetch cities for the given country
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          country: country,
        }
      );
      if (response?.status === 200) {
        const cities = response.data.data;
        setCities(cities);
        cities.push("Banglore"); //since the API returns some positions as banglore, which is misspelled of 
        //bengaluru or bangalore, hence adding it manually
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  };

  // useEffect to fetch cities when the component mounts
  useEffect(() => {
    // Define an asynchronous function to use the getCitiesByCountry function
    const fetchData = async () => {
      try {
        await getCitiesByCountry("India");
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  // Function to filter opportunities based on various criteria
  // Main filtering function for opportunities
  const filterOpportunities = (opportunities) => {
    return opportunities
      .filter((item) => (applyMagicFilter ? item.magic_filter === "yes" : true))
      .filter(filterByOpportunityType)
      .filter(filterByExperience)
      .filter(filterByLocation)
      .filter(filterByStatus)
      .reverse();
  };

  // Filter opportunities based on opportunities type
  //Using .includes instead of checking for straight equality because some item.type are like "Intern & FTE"
  const filterByOpportunityType = (item) => {
    switch (filterOpportunityTypeName) {
      case "Intern":
        return item.type.includes("Intern");
      case "Full Time":
        return item.type.includes("FTE");
      case "Job Type":
        return true; // If no filter selected, show all
      default:
        return false;
    }
  };

  // Filter opportunities based on experience level
  // item.years_exp has values like "Fresher", "fresher", "1-2 years", "2-3 years", "Entry Level", 
  // "0", "5", "Internship etc." etc.
  // So for a more refined logic, we do the following : 
  // 1. If the years_exp value is itself a string like "0", "1", "3", ...etc, 
  //    we check whether the number is greater than 0. If yes, then it qualifies as experienced, otherwise as fresher
  // 2. If the value is like a range : number x - number y, we check two things : (considering x < y) 
  //    a) If x is greater than 0, this qualifies as an opportunity for only the expereinced
  //    b) If x is equal to 0 this opportunity also qualifies for freshers as well as experienced
  // 3. If the string is neither a single number nor a range, then its something like "fresher", "intern", etc..., 
  // hence its for freshers

  //  The above logic is based on the p[resumption that even in the future, the opportunities
  //  scrapped will have years_exp value in ranges or single number only for experienced
  //  and not something like "5 years", although this logic can be updated later on as required

  const filterByExperience = (item) => {
    const s = item.years_exp;
    const pattern = /^(\d+)\s*-\s*\d+$/;
    const match = s.match(pattern);
    let singleNumber = false, experienced = false, fresher = false;

    singleNumber = !isNaN(s) && !isNaN(parseFloat(s));

    if (!singleNumber && match == null) {
      //means the stirng is not a number and not a range
      //means its something like intern, fresher, etc...
      fresher = true;
    }

    if (singleNumber) {
      //means its a single number
      if (Number(s) == 0) {
        fresher = true;
      }
      else {
        experienced = true;
      }
    }

    if (match != null) {
      experienced = true;
      if (match[1] === "0") {
        fresher = true;
      }
    }

    switch (sliderInputValue) {
      case "Fresher":
        return fresher;
      case "Experienced":
        return experienced;
      default:
        return false;
    }
  };

  // Filter opportunities based on location
  const filterByLocation = (item) => {
    const lowerLocation = item.location.toLowerCase();
    // console.log("Location : ", item.location);
    let remote = lowerLocation.includes("remote") || lowerLocation.includes("wfh");
    //some locations have "unknown" in them, so we need to exclude them
    //if at least one city from the city list is present in the location, then its in India
    let india = cities.some((city) =>
      lowerLocation.includes(city.toLowerCase()) && !lowerLocation.includes("unknown")
    );
    //if the location is not in India and not remote, then it is out of India
    let out_of_india = !remote && !cities.some((city) =>
      lowerLocation.includes(city.toLowerCase())) && !lowerLocation.includes("unknown");
    // if (remote){
    //   console.log(" - Remote");
    // }
    // if (india){
    //   console.log(" - India");
    // }
    // if (out_of_india){
    //   console.log(" - Out of India");
    // }
    switch (location) {
      case "Remote":
        return remote;
      case "All Locations":
        return true; // Show all locations
      case "India":
        return india;
      case "Out of India":
        return out_of_india;
      // Prev code below - If the location is not in India, then it can be remote or out of India
      // return !cities.some((city) =>
      //   lowerLocation.includes(city.toLowerCase())
      // );
      default:
        return false;
    }
  };

  const filterByStatus = (item) => {
    switch (status) {
      case "Liked":
        return item.liked;
      case "Filled":
        return item.filled;
      case "Not Interested":
        return item.not_interested;
      case "All Status":
        return true;
      default:
        return false;
    }
  };

  return (
    <GrandContainer>
      <MobContainer>
      <MobileNavbar />
      <div className="main-content">
            <h1 className='main-heading'>All Internship & Job Opportunities
              <div className="head-tag">
                Powered by Algolisted Scraper-Ai{" "}
                <img
                  draggable="false"
                  src="https://static.wixstatic.com/media/592002_0f04cb41e098424588d09e2fba76ec65~mv2.gif"
                  alt=""
                />
              </div>
            </h1>
            <p className="heading-supporter">
              This page provides information on a range of job openings and internship possibilities. While these opportunities are primarily tailored for students in India, we are actively working to incorporate opportunities from around the world as well.
            </p>
            {/* <div className="messages">
              <div className="message">
                <div className="icon"></div>
                <div className="text">
                  We are seeking out <b>small YouTube, Linkedin or Telegram channels</b> engaged in similar activities to ours, with a mutual interest in collaborating on this website.
                  If interested <i><a href="mailto:nayak.primary@gmail.com">contact here</a></i>
                </div>
              </div>
            </div> */}
            {/* <h4>Information Extracted From : </h4>
            <div className="resources-used">
              <div className="special-thanks"><img src="https://res.cloudinary.com/adaface/image/upload/v1583493789/adaface_logo.png" alt="" /></div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="" />
                </LazyLoad>
              </div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png" alt="" />
                </LazyLoad>
              </div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" alt="" />
                </LazyLoad>
              </div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/2048px-YouTube_social_red_circle_%282017%29.svg.png" alt="" />
                </LazyLoad>
              </div>
            </div> */}
            <SheetMessage needDarkMode={needDarkMode}>
              <div className="text">
                Explore the dynamics of the IT job market over the past six months to gain a comprehensive understanding of its current state. This page presents graphical representations of company job openings data, providing valuable insights into the prevailing trends and opportunities within the industry.
              </div>
              <div className="open-btn" onClick={() => setOpenVisualiser(!openVisualiser)}>
                {
                  openVisualiser ? (
                    <>
                      <div className="desc">
                        Close Visualization
                      </div>
                      <ExpandLessIcon />
                    </>
                  ) : (
                    <>
                      <div className="desc">
                        Open Visualization
                      </div>
                      <ExpandMoreIcon />
                    </>
                  )
                }
              </div>
              {
                openVisualiser ? (
                  <div className="all-resources">
                    Under Development
                  </div>
                ) : (<></>)
              }
            </SheetMessage>
            <EffectiveFilter className='noselect' needDarkMode={needDarkMode} applyMagicFilter={applyMagicFilter}>
              <div className="left">
                <div className="filter-item check_color noselect" onClick={() => setOpenModel1(!openModel1)}> {filterOpportunityTypeName}
                  {openModel1 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {
                    openModel1 ? (
                      <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                        <div className="option" data-value="Job Type" onClick={(e) => setFilterOpportunityTypeName(e.target.dataset.value)}>Job Type</div>
                        <div className="option" data-value="Intern" onClick={(e) => setFilterOpportunityTypeName(e.target.dataset.value)}>Intern</div>
                        <div className="option" data-value="Full Time" onClick={(e) => setFilterOpportunityTypeName(e.target.dataset.value)}>Full Time</div>
                      </ShowAbsoluteModelDropDown>
                    ) : <></>
                  }
                </div>
                <div className="filter-item check_color noselect" onClick={() => setOpenModel2(!openModel2)}> {sliderInputValue}
                  {openModel2 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {
                    openModel2 ? (
                      <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                        <div className="option" data-value="Fresher" onClick={(e) => setSliderInputValue(e.target.dataset.value)}>Fresher</div>
                        <div className="option" data-value="Experienced" onClick={(e) => setSliderInputValue(e.target.dataset.value)}>Experienced</div>
                      </ShowAbsoluteModelDropDown>
                    ) : <></>
                  }
                </div>
                <div className="filter-item check_color noselect" onClick={() => setOpenModel3(!openModel3)}> {location}
                  {openModel3 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {
                    openModel3 ? (
                      <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                        <div className="option" data-value="All Locations" onClick={(e) => setLocation(e.target.dataset.value)}>All Locations</div>
                        <div className="option" data-value="India" onClick={(e) => setLocation(e.target.dataset.value)}>India</div>
                        <div className="option" data-value="Out of India" onClick={(e) => setLocation(e.target.dataset.value)}>Out of India</div>
                        <div className="option" data-value="Remote" onClick={(e) => setLocation(e.target.dataset.value)}>Remote</div>
                      </ShowAbsoluteModelDropDown>
                    ) : <></>
                  }
                </div>
                <div className="filter-item check_color noselect" onClick={() => setOpenModel4(!openModel4)}> {status}
                  {openModel4 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {
                    openModel4 ? (
                      <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                        <div className="option" data-value="All Status" onClick={(e) => { setStatus(e.target.dataset.value) }}>All Status</div>
                        <div className="option" data-value="Liked" onClick={(e) => { setStatus(e.target.dataset.value) }}>Liked</div>
                        <div className="option" data-value="Filled" onClick={(e) => { setStatus(e.target.dataset.value) }}>Filled</div>
                        <div className="option" data-value="Not Interested" onClick={(e) => { setStatus(e.target.dataset.value) }}>Not Interested</div>
                      </ShowAbsoluteModelDropDown>
                    ) : <></>
                  }
                </div>
              </div>
              <div className="right">
                {/* <div className="filter-item">A</div>
              <div className="filter-item">B</div>
              <div className="filter-item">C</div>
              <div className="filter-item">D</div> */}
                <div className="filter-item filter-right" onClick={() => setApplyMagicFilter(!applyMagicFilter)}>
                  Show for tier 1 & 2 college CSE students
                  <ChevronRightIcon />
                </div>
                {/* <div className="filter-item">Hide Problem Tags</div> */}
                {/* <div className="filter-item">Show Unsolved</div>  */}
              </div>
            </EffectiveFilter>
            <Table needDarkMode={needDarkMode}>
              <div className="row top-row">
                <div className="hash">Count</div>
                <div className="opportunity">Opportunity</div>
                {/* <div className="salary">Salary</div> */}
                {/* <div className="exp">Experience</div> */}
                {/* <div className="branch">Branch</div> */}
                <div className="source">Track</div>
              </div>
              {allOpportunities.length === 0 ? (
                <div className="linear-progess-holder">
                  <LinearProgress />
                </div>
              ) : (
                <>
                  {filterOpportunities(allOpportunities)
                    .map((item, key) => {
                      return (<div className="row" key={item.uniqueIdentifier}>
                        <div className="hash">{++count}</div>
                        <div className="opportunity">
                          <div className="left">
                            <a href={item.job_link} target="_blank" className="link">
                              {item.job_title} <CallMadeIcon />
                            </a>
                            <div className="extra-info">
                              {item.location && <div className="info">{item.location}</div>}
                              <div className="info">{item.role}</div>
                              <div className="info">{item.type}</div>
                              <div className="info">
                                {item.years_exp}
                                {item.years_exp === 'Fresher' ? null : "+ Year Exp"}
                              </div>
                              {item.salary_low !== '-' ? (
                                <div className="info">
                                  {item.salary_low}
                                  {item.salary_low !== item.salary_high ? `- ${item.salary_high}` : null}
                                  {item.type === "FTE" ? " LPA" : " INR"}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          {/* <div className="right">
                            {item.filled ? <CheckCircleIcon onClick={(e) => { dispatch({ type: ACTIONS.TOGGLE_FILLED, payload: { index: item.index } }) }} />: <CheckCircleOutlineIcon onClick={(e) => { dispatch({type : ACTIONS.TOGGLE_FILLED, payload : {index : item.index}}) }} />}  
                            {item.not_interested ? <RemoveCircleIcon onClick={(e) => { dispatch({ type: ACTIONS.TOGGLE_NOT_INTERESTED, payload: { index: item.index } }) }} /> : <RemoveCircleOutlineIcon onClick={(e) => { dispatch({type : ACTIONS.TOGGLE_NOT_INTERESTED, payload : {index : item.index}}) }} />}
                            {item.liked ? <FavoriteIcon onClick={(e) => { dispatch({ type: ACTIONS.TOGGLE_LIKED, payload: { index: item.index } }) }} /> : <FavoriteBorderIcon onClick={(e) => { dispatch({type : ACTIONS.TOGGLE_LIKED, payload : {index : item.index}}) }} />}
                          </div> */}
                        </div>
                        <div className="source">
                          {/* <a href={item.source} target="_blank">
                            <img src={getImageLink(item.source)} alt="" />
                          </a> */}
                          {item.filled ? (<CheckCircleIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_FILLED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>) : (<CheckCircleOutlineIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_FILLED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>)}
                          {item.not_interested ? (<RemoveCircleIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_NOT_INTERESTED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>) : (<RemoveCircleOutlineIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_NOT_INTERESTED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>)}
                          {item.liked ? (<FavoriteIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_LIKED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>) : (<FavoriteBorderIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_LIKED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>)}
                        </div>
                      </div>)
                    })
                  }
                </>
              )}
            </Table>
          </div>

          <SimpleFooter />
      </MobContainer>
      <Container needDarkMode={needDarkMode}>
        {
          needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
        }
        {
          needDarkMode ? <LeftMenuDark marked={"opportunities"} /> : <LeftMenu marked={"opportunities"} />
        }
        <div className='show-middle-content'>
          <div className="cc-middle-content">
            <h1 className='main-heading'>All Internship & Job Opportunities
              <div className="head-tag">
                Powered by Algolisted Scraper-Ai{" "}
                <img
                  draggable="false"
                  src="https://static.wixstatic.com/media/592002_0f04cb41e098424588d09e2fba76ec65~mv2.gif"
                  alt=""
                />
              </div>
            </h1>
            <p className="heading-supporter">
              This page provides information on a range of job openings and internship possibilities. While these opportunities are primarily tailored for students in India, we are actively working to incorporate opportunities from around the world as well.
            </p>
            {/* <div className="messages">
              <div className="message">
                <div className="icon"></div>
                <div className="text">
                  We are seeking out <b>small YouTube, Linkedin or Telegram channels</b> engaged in similar activities to ours, with a mutual interest in collaborating on this website.
                  If interested <i><a href="mailto:nayak.primary@gmail.com">contact here</a></i>
                </div>
              </div>
            </div> */}
            {/* <h4>Information Extracted From : </h4>
            <div className="resources-used">
              <div className="special-thanks"><img src="https://res.cloudinary.com/adaface/image/upload/v1583493789/adaface_logo.png" alt="" /></div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="" />
                </LazyLoad>
              </div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png" alt="" />
                </LazyLoad>
              </div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" alt="" />
                </LazyLoad>
              </div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/2048px-YouTube_social_red_circle_%282017%29.svg.png" alt="" />
                </LazyLoad>
              </div>
            </div> */}
            <SheetMessage needDarkMode={needDarkMode}>
              <div className="text">
                Explore the dynamics of the IT job market over the past six months to gain a comprehensive understanding of its current state. This page presents graphical representations of company job openings data, providing valuable insights into the prevailing trends and opportunities within the industry.
              </div>
              <div className="open-btn" onClick={() => setOpenVisualiser(!openVisualiser)}>
                {
                  openVisualiser ? (
                    <>
                      <div className="desc">
                        Close Visualization
                      </div>
                      <ExpandLessIcon />
                    </>
                  ) : (
                    <>
                      <div className="desc">
                        Open Visualization
                      </div>
                      <ExpandMoreIcon />
                    </>
                  )
                }
              </div>
              {
                openVisualiser ? (
                  <div className="all-resources">
                    Under Development
                  </div>
                ) : (<></>)
              }
            </SheetMessage>
            <EffectiveFilter className='noselect' needDarkMode={needDarkMode} applyMagicFilter={applyMagicFilter}>
              <div className="left">
                <div className="filter-item check_color noselect" onClick={() => setOpenModel1(!openModel1)}> {filterOpportunityTypeName}
                  {openModel1 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {
                    openModel1 ? (
                      <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                        <div className="option" data-value="Job Type" onClick={(e) => setFilterOpportunityTypeName(e.target.dataset.value)}>Job Type</div>
                        <div className="option" data-value="Intern" onClick={(e) => setFilterOpportunityTypeName(e.target.dataset.value)}>Intern</div>
                        <div className="option" data-value="Full Time" onClick={(e) => setFilterOpportunityTypeName(e.target.dataset.value)}>Full Time</div>
                      </ShowAbsoluteModelDropDown>
                    ) : <></>
                  }
                </div>
                <div className="filter-item check_color noselect" onClick={() => setOpenModel2(!openModel2)}> {sliderInputValue}
                  {openModel2 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {
                    openModel2 ? (
                      <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                        <div className="option" data-value="Fresher" onClick={(e) => setSliderInputValue(e.target.dataset.value)}>Fresher</div>
                        <div className="option" data-value="Experienced" onClick={(e) => setSliderInputValue(e.target.dataset.value)}>Experienced</div>
                      </ShowAbsoluteModelDropDown>
                    ) : <></>
                  }
                </div>
                <div className="filter-item check_color noselect" onClick={() => setOpenModel3(!openModel3)}> {location}
                  {openModel3 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {
                    openModel3 ? (
                      <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                        <div className="option" data-value="All Locations" onClick={(e) => setLocation(e.target.dataset.value)}>All Locations</div>
                        <div className="option" data-value="India" onClick={(e) => setLocation(e.target.dataset.value)}>India</div>
                        <div className="option" data-value="Out of India" onClick={(e) => setLocation(e.target.dataset.value)}>Out of India</div>
                        <div className="option" data-value="Remote" onClick={(e) => setLocation(e.target.dataset.value)}>Remote</div>
                      </ShowAbsoluteModelDropDown>
                    ) : <></>
                  }
                </div>
                <div className="filter-item check_color noselect" onClick={() => setOpenModel4(!openModel4)}> {status}
                  {openModel4 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {
                    openModel4 ? (
                      <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                        <div className="option" data-value="All Status" onClick={(e) => { setStatus(e.target.dataset.value) }}>All Status</div>
                        <div className="option" data-value="Liked" onClick={(e) => { setStatus(e.target.dataset.value) }}>Liked</div>
                        <div className="option" data-value="Filled" onClick={(e) => { setStatus(e.target.dataset.value) }}>Filled</div>
                        <div className="option" data-value="Not Interested" onClick={(e) => { setStatus(e.target.dataset.value) }}>Not Interested</div>
                      </ShowAbsoluteModelDropDown>
                    ) : <></>
                  }
                </div>
              </div>
              <div className="right">
                {/* <div className="filter-item">A</div>
              <div className="filter-item">B</div>
              <div className="filter-item">C</div>
              <div className="filter-item">D</div> */}
                <div className="filter-item filter-right" onClick={() => setApplyMagicFilter(!applyMagicFilter)}>
                  Show for tier 1 & 2 college CSE students
                  <ChevronRightIcon />
                </div>
                {/* <div className="filter-item">Hide Problem Tags</div> */}
                {/* <div className="filter-item">Show Unsolved</div>  */}
              </div>
            </EffectiveFilter>
            <Table needDarkMode={needDarkMode}>
              <div className="row top-row">
                <div className="hash">Count</div>
                <div className="opportunity">Opportunity</div>
                {/* <div className="salary">Salary</div> */}
                {/* <div className="exp">Experience</div> */}
                {/* <div className="branch">Branch</div> */}
                <div className="source">Track</div>
              </div>
              {allOpportunities.length === 0 ? (
                <div className="linear-progess-holder">
                  <LinearProgress />
                </div>
              ) : (
                <>
                  {filterOpportunities(allOpportunities)
                    .map((item, key) => {
                      return (<div className="row" key={item.uniqueIdentifier}>
                        <div className="hash">{++count}</div>
                        <div className="opportunity">
                          <div className="left">
                            <a href={item.job_link} target="_blank" className="link" rel="noreferrer">
                              {item.job_title} <CallMadeIcon />
                            </a>
                            <div className="extra-info">
                              {item.location && <div className="info">{item.location}</div>}
                              <div className="info">{item.role}</div>
                              <div className="info">{item.type}</div>
                              <div className="info">
                                {item.years_exp}
                                {item.years_exp === 'Fresher' ? null : "+ Year Exp"}
                              </div>
                              {item.salary_low !== '-' ? (
                                <div className="info">
                                  {item.salary_low}
                                  {item.salary_low !== item.salary_high ? `- ${item.salary_high}` : null}
                                  {item.type === "FTE" ? " LPA" : " INR"}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          {/* <div className="right">
                            {item.filled ? <CheckCircleIcon onClick={(e) => { dispatch({ type: ACTIONS.TOGGLE_FILLED, payload: { index: item.index } }) }} />: <CheckCircleOutlineIcon onClick={(e) => { dispatch({type : ACTIONS.TOGGLE_FILLED, payload : {index : item.index}}) }} />}  
                            {item.not_interested ? <RemoveCircleIcon onClick={(e) => { dispatch({ type: ACTIONS.TOGGLE_NOT_INTERESTED, payload: { index: item.index } }) }} /> : <RemoveCircleOutlineIcon onClick={(e) => { dispatch({type : ACTIONS.TOGGLE_NOT_INTERESTED, payload : {index : item.index}}) }} />}
                            {item.liked ? <FavoriteIcon onClick={(e) => { dispatch({ type: ACTIONS.TOGGLE_LIKED, payload: { index: item.index } }) }} /> : <FavoriteBorderIcon onClick={(e) => { dispatch({type : ACTIONS.TOGGLE_LIKED, payload : {index : item.index}}) }} />}
                          </div> */}
                        </div>
                        <div className="source">
                          {/* <a href={item.source} target="_blank">
                            <img src={getImageLink(item.source)} alt="" />
                          </a> */}
                          {item.filled ? (<CheckCircleIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_FILLED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>) : (<CheckCircleOutlineIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_FILLED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>)}
                          {item.not_interested ? (<RemoveCircleIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_NOT_INTERESTED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>) : (<RemoveCircleOutlineIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_NOT_INTERESTED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>)}
                          {item.liked ? (<FavoriteIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_LIKED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>) : (<FavoriteBorderIcon onClick={() => dispatch({ type: ACTIONS.TOGGLE_LIKED, payload: { uniqueIdentifier: item.uniqueIdentifier } })}/>)}
                        </div>
                      </div>)
                    })
                  }
                </>
              )}
            </Table>
          </div>
        </div>
        <SimpleFooter />
      </Container>
    </GrandContainer>
  )
}

export default Opportunities

const GrandContainer = styled.div`

`

const MobContainer = styled.div`
    width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;  // Ensure vertical stacking
//position: relative;
  padding-top: 60px;
  padding-bottom: 100px; // Space for footer
  background-color: ${(props) => (props.needDarkMode ? '#313338' : '#ffffff')};

  .main-content {
    flex: 1;
    padding: 15px;
    margin-bottom: auto;
    flex-direction: column;


    .main-heading {
      font-size: 1.25rem;
      font-weight: 600;
      color: #292929;
       margin-bottom: 5px;

      display: flex;
      align-items: center;

       .head-tag {
        font-size: 0.55rem;
        font-weight: 500;
        padding: 0.2rem 0.4rem;
        padding: 5px;
        border-radius: 10px;
        background-color: #a5bb26;
        margin-left: 10px;
        width: 170px;

        img {
          position: absolute;
          height: 1.5rem;
          margin-top: -5px;
          margin-left: -3px;
        }
      }
    }


    .heading-supporter {
      font-size: 0.85rem;
      margin-bottom: 15px;
      font-weight: 400;
      color: ${(props) => (props.needDarkMode ? '#ffffffa6' : '#696168')};
    }

  }

 footer {
    width: 100%;
    background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#ffffff')};
    border-top: 1px solid ${(props) => (props.needDarkMode ? '#404040' : '#e0e0e0')};
    padding: 15px;
    margin-top: auto; // Push footer to bottom
  }

  @media only screen and (min-width: 1100px) {
    display: none;
  }
`


const Container = styled.div`
    position: relative;
    padding-bottom: 80px;
    
    @media only screen and (max-width: 1099px){
        display: none;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 200px;

    background-color: ${(props) => (props.needDarkMode ? '#313338' : 'transparent')};

    a{
      color: ${(props) => (props.needDarkMode ? '#6d93d8' : '#18489f')};
    }

    input{
      background-color: transparent;
    }

    .show-middle-content{
      margin-bottom: 30px;
    }

    .cc-middle-content{
      min-height: 100vh;
      width: 100%;
      /* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
      padding: 80px 120px 30px 120px;
      position: relative;
      width: 100%;
      max-width: 1360px;
      min-width: 850px;
      margin: auto;
      
      @media only screen and (max-width: 1200px){
        padding: 80px 50px 30px 50px;
      }   

      .main-heading{
        font-size: 1.65rem;
        font-weight: 600;
        color: ${(props) => (props.needDarkMode ? '#e5e6e8' : '#292929')};
        display: flex;
        align-items: center;
        .head-tag {
          display: inline;
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          padding-right: 35px;
          border-radius: 100px;
          background-color: #a5bb26;
          margin-left: 10px;

          img {
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
          color: ${(props) => (props.needDarkMode ? '#ffffffa6' : '#696168')};
          
          a{
            color: ${(props) => (props.needDarkMode ? '#18489f' : '#18489f')};
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          }
      }

      h4{
            margin-top: 40px;
            font-size: 1.05rem;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
            font-weight: 500;
      }

      .resources-used{
          display: flex;
          flex-wrap: wrap;
          margin: 20px 0;

          .resource{
              margin: 0 7.5px 7.5px 0;
              border-radius: 50%;
              /* background-color: #f0f0f0; */
              border: 1px solid black;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;

              img{    
                  height: 30px;
              }
          }

          .special-thanks{
            height: 50px;
            background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : 'whitesmoke')};
            border-radius: 100px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            margin: 0 7.5px 7.5px 0;

            img{    
                height: 30px;
                border-radius: 100px;
                margin-top: -7.5px;
            }
          }
      }

      .messages{
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
    }
`


const Table = styled.div`
  border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(202, 195, 195)')};
  border-radius: 5px;
  overflow: hidden;

  .row{
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border-top: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(202, 195, 195)')};

    .hash{
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      /* background-color: orange; */
      font-weight: 200;
      font-size: 0.85rem;
      border-right: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(202, 195, 195)')};
      color: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
      background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#fff')};
    }
    
    .opportunity{
      flex: 1;
      padding: 5px 5px;
      background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#fff')};
      border-right: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(202, 195, 195)')};
      font-size: 0.15rem;
      font-weight: 500;

      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .left{
        .link{
          color: ${(props) => (props.needDarkMode ? '#94b2e6' : 'cornflowerblue')};
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: ${(props) => (props.needDarkMode ? 'none' : 'default')};
          
          svg{
            fill: ${(props) => (props.needDarkMode ? '#94b2e6' : 'cornflowerblue')};
            font-size: 0.85rem;
          }

          &:hover{
            text-decoration: underline;
          }
        }

        .extra-info{
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          
          .info{
            font-size: 0.7rem;
            font-weight: 300;
            padding: 2.5px 7.5px;
            background-color: ${(props) => (props.needDarkMode ? '#232323' : 'whitesmoke')};
            border-radius: 100px;
            margin-right: 5px;
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(202, 195, 195)')};
            color: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
          }
        }

        .extra-link{
          margin-top: 5px;
          margin-bottom: 15px;
          /* font-style: italic; */
          display: flex;
          align-items: center;
          
          a{
            font-size: 0.75rem;
            font-weight: 300;
            text-decoration: underline;
            color: ${(props) => (props.needDarkMode ? '#94b2e6' : 'cornflowerblue')};
          }
          
          svg{
            fill: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
            margin-right: 5px;
            /* fill: ${(props) => (props.needDarkMode ? '#94b2e6' : 'cornflowerblue')}; */
            font-size: 0.85rem;
          }
        }
      }

      .right{
        display: flex;
        align-items: center;

        svg{
          font-size: 2rem;
          margin-left: 5px;
          fill: ${(props) => (props.needDarkMode ? '#b4a7a6' : '#b5a6a6')};
        }
      }
    }

    .source{
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#fff')};
      font-weight: 200;
      font-size: 0.85rem;

      img{
        height: 25px;
        border-radius: 100px;
      }

      display: flex;
      align-items: center;

      svg{
        font-size: 1.4rem;
        margin-left: 5px;
        fill: ${(props) => (props.needDarkMode ? '#b4a7a6' : '#b5a6a6')};
      }
    }
  }

  .top-row{
    border-top: none;

    .hash{
      background-color: ${(props) => (props.needDarkMode ? '#232323' : 'whitesmoke')};
      font-weight: 500;
      border-right: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(202, 195, 195)')};
      color: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
    }
    
    .opportunity{
      background-color: ${(props) => (props.needDarkMode ? '#232323' : 'whitesmoke')};
      font-weight: 500;
      border-right: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(202, 195, 195)')};
      color: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
    }

    .source{
      color: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
      background-color: ${(props) => (props.needDarkMode ? '#232323' : 'whitesmoke')};
      font-weight: 500;
    }
  }
`

// const EffectiveFilter = styled.div`
// 	display: flex;
//     flex-wrap: wrap; /* Allow items to wrap on smaller screens */
// 	justify-content: space-between;
// 	align-items: center;
// 	margin: 20px 0 20px 0;

// 	.left{
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;

//     .filter-item{
// 			padding: 5px 10px;
// 			font-size: 0.7rem;
// 			color: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
//       border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
//       /* background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')}; */
// 			border-radius: 3px;
// 			margin-right: 5px;
// 			cursor: pointer;
//       /* color: #e5e5e5; */
//       /* background-color: ${(props) => (props.needDarkMode ? 'white' : 'yellow')};  */

//       position: relative;

//       display: flex;
//       align-items: center;

//       svg{
//         font-size: 1rem;
//         margin-left: 5px;
//         fill: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
//         /* fill: #e5e5e5; */
//         /* fill: ${(props) => (props.needDarkMode ? 'white' : 'black')}; */
//       }
// 		}
// 	}

// 	.right{
// 		display: flex;
// 		align-items: center;

// 		.filter-item{
// 			padding: 5px 10px;
// 			font-size: 0.7rem;
// 			border-radius: 3px;
//       margin-left: 5px;
// 			cursor: pointer;
//       color: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
//       border: 1px solid ${(props) =>
//     props.needDarkMode
//       ? props.applyMagicFilter
//         ? 'white'
//         : '#595b5f'
//       : props.applyMagicFilter
//         ? 'black'
//         : 'rgb(209, 213, 219)'};
//       display: flex;
//       align-items: center;

//       svg{
//         font-size: 1rem;
//         margin-left: 5px;
//         fill: ${(props) => (props.needDarkMode ? '#b4a7a6' : '#333')};
//       }
// 		}

//     .magic-filter{
//         background-color: #404249;
//         color: #333;
//         background: linear-gradient(300deg,#56f238,#b3adff,#c5c5ef,#bde6ce,#56f238);
//         background-size: 400% 400%;
//         -webkit-animation: AnimationName 10s ease infinite;
//         -moz-animation: AnimationName 10s ease infinite;
//         animation: AnimationName 10s ease infinite;
//         border-color: transparent;
//         cursor: pointer;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         text-align: center;
//         opacity: 0.75;
//         /* border-radius: 100px; */
        

//         a{
//           color: #333; 
//         }

//         &:hover{
//           background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : 'whitesmoke')};
//           color: #333;
//           cursor: pointer;
//           transition-duration: 500ms;
//           opacity: 1;
//         }
//       }

//       @-webkit-keyframes AnimationName {
//           0%{background-position:0% 50%}
//           50%{background-position:100% 50%} 
//           100%{background-position:0% 50%}
//       }

//       @-moz-keyframes AnimationName {
//           0%{background-position:0% 50%}
//           50%{background-position:100% 50%}
//           100%{background-position:0% 50%}
//       }

//       @keyframes AnimationName {
//           0%{background-position:0% 50%}
//           50%{background-position:100% 50%}
//           100%{background-position:0% 50%}
//       }
// 	}
// `

const EffectiveFilter = styled.div`
	display: flex;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;

	.left{
		display: flex;
    flex-wrap: wrap;
		// justify-content: space-between;
		align-items: center;
    

    .filter-item{
			padding: 5px 10px;
			font-size: 0.7rem;
			color: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
      /* background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')}; */
			border-radius: 3px;
			margin-right: 5px;
			cursor: pointer;
      /* color: #e5e5e5; */
      /* background-color: ${(props) => (props.needDarkMode ? 'white' : 'yellow')};  */

      position: relative;

      display: flex;
      align-items: center;

      svg{
        font-size: 1rem;
        margin-left: 5px;
        fill: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
        /* fill: #e5e5e5; */
        /* fill: ${(props) => (props.needDarkMode ? 'white' : 'black')}; */
      }
		}
	}

	.right{
		display: flex;
		align-items: center;
    margin-top:10px;

		.filter-item{
			padding: 5px 10px;
			font-size: 0.7rem;
			border-radius: 3px;
      margin-left: 5px;
			cursor: pointer;
      color: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
		}
	}
`


const ShowAbsoluteModelDropDown = styled.div`
  position: absolute;
  max-height: 200px;
  min-height: 30px;
  width: 200px;
  color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
  background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#ffffff')};
  border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
  border-radius: 5px;
  top: 35px;
  left: -5px;
  z-index: 10;
  /* overflow-y: scroll; */
  overflow: hidden;
  cursor: default;

  /* -webkit-box-shadow: 0px 0px 60px 0px rgba(219,212,219,1);
  -moz-box-shadow: 0px 0px 60px 0px rgba(219,212,219,1);
  box-shadow: 0px 0px 60px 0px rgba(219,212,219,1); */
    
  ::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  flex-direction: column;

  .option{
    height: 40px;
    border-bottom: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
    color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
    display: grid;
    padding: 0 10px;
    display: flex;
    align-items: center;
    
    &:hover{
      background-color: ${(props) => (props.needDarkMode ? '#404249' : '#e5e5e5')};
      cursor: pointer;
      transition-duration: 250ms;
    }
  }

  &:last-child {
    border-bottom: none;
  }

`

const SheetMessage = styled.div`
	padding: 10px;
	margin: 50px 0 10px 0;
	/* border: 1px solid black; */
	border-radius: 5px;
	/* background-color: #c9e8ff; */
	background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#f0f0f0')}; 

	.text {
		font-size: 0.8rem;
		color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
	}

	.open-btn{
		display: flex;
		align-items: center;
		cursor: pointer;
		
		font-size: 0.8rem;
		font-weight: 500;
		margin-top: 15px;

		.desc{
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}

		svg{
			fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}
	}

    .all-resources{
  			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        margin-top: 7.5px;
        font-size: 0.75rem;
        font-style: italic;

        img{
            height: 100px;
            border-radius: 10px;
            margin: 7.5px 7.5px 0 0;
        }
    }
`;