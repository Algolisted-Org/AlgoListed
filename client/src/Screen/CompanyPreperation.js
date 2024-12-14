import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import CCHeaderPlus from '../Components/CCHeaderPlus';
import CCHeaderDark from '../Components/CCHeaderDark';
import LeftMenu from '../Components/LeftMenu';
import LeftMenuDark from '../Components/LeftMenuDark';
import axios from 'axios';
import { contestAnalysisFilters } from '../Components/contestAnalysisFilters';
import LockIcon from '@material-ui/icons/Lock';
import WarningIcon from '@material-ui/icons/Warning';
import SearchIcon from '@material-ui/icons/Search';
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus';
import contestsData from '../DummyDB/InterviewSummaries/LcContests.json';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CallMadeIcon from '@material-ui/icons/CallMade';
import NotesIcon from '@material-ui/icons/Notes';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useLocalStorage } from "@uidotdev/usehooks";
import { FaWineBottle } from 'react-icons/fa';
import NoteMaking from './../MicroComponents/NoteMakingCompo';
import { Bar } from 'react-chartjs-2';
import DoneIcon from '@material-ui/icons/Done';
import SimpleFooter from '../Components/SimpleFooter';
import StyledModal from '../MicroComponents/Allmodals/StyledModal';
import { useParams } from "react-router-dom";
import MobileNavbar from "../Components/MobileNavbar";

const CompanyPreperation = () => {
    const [needDarkMode, setNeedDarkMode] = useState(false);
    const [currentCompany, setCurrentCompany] = useState("general-software-company");

    useEffect(() => {
        let selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme === "dark") setNeedDarkMode(true);
    }, []);

    useEffect(() => {
        document.title = "Company Preperation | Open AI - Algolisted";
    }, []);

    console.log("needDarkMode : ", needDarkMode);
    const toggleDarkMode = () => {
        setNeedDarkMode(!needDarkMode);
    };

    const companies = [
        { id: 0, text: 'General Software Company', lock: false, domainFilter: 'general-software-company' },
        { id: 1, text: 'Google', lock: false, domainFilter: 'google' },
        { id: 2, text: 'Microsoft', lock: false, domainFilter: 'microsoft' },
        { id: 3, text: 'Apple', lock: false, domainFilter: 'apple' },
        { id: 4, text: 'Amazon', lock: false, domainFilter: 'amazon' },
        { id: 5, text: 'Meta', lock: false, domainFilter: 'meta' },
        { id: 6, text: 'Adobe', lock: false, domainFilter: 'adobe' },
        { id: 7, text: 'Oracle', lock: false, domainFilter: 'oracle' },
        { id: 8, text: 'SAP', lock: false, domainFilter: 'sap' },
        { id: 9, text: 'Salesforce', lock: false, domainFilter: 'salesforce' },
        { id: 10, text: 'IBM', lock: false, domainFilter: 'ibm' },
        { id: 11, text: 'Intel', lock: false, domainFilter: 'intel' },
        { id: 12, text: 'NVIDIA', lock: false, domainFilter: 'nvidia' },
        { id: 13, text: 'LinkedIn', lock: false, domainFilter: 'linkedin' },
        { id: 14, text: 'Netflix', lock: false, domainFilter: 'netflix' },
        { id: 15, text: 'Spotify', lock: false, domainFilter: 'spotify' },
        { id: 16, text: 'Zoom', lock: false, domainFilter: 'zoom.us' },
        { id: 17, text: 'Slack', lock: false, domainFilter: 'slack' },
        { id: 18, text: 'Twitter', lock: false, domainFilter: 'twitter' },
        { id: 19, text: 'Dropbox', lock: false, domainFilter: 'dropbox' },
        { id: 20, text: 'Uber', lock: false, domainFilter: 'uber' },
    ];

    const filters = companies.map((item) => {
    return item.lock === true ? (
            <div key={item.id} className='locked-feature filter'>
                {item.text}
                <LockIcon />
            </div>
        ) : (
            <a
                href={`/company-preparation/${item.domainFilter}`}
                key={item.id}
                className={item.domainFilter === currentCompany ? 'filter selected' : 'filter'}
            >
                {item.text}
            </a>
        );
    });

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
            <Container>
                {needDarkMode ? (
                    <CCHeaderDarkPlus
                        needDarkMode={needDarkMode}
                        toggleDarkMode={toggleDarkMode}
                    />
                ) : (
                    <CCHeaderPlus
                        needDarkMode={needDarkMode}
                        toggleDarkMode={toggleDarkMode}
                    />
                )}
                {needDarkMode ? (
                    <LeftMenuDark marked={"company-preparation"} />
                ) : (
                    <LeftMenu marked={"company-preparation"} />
                )}
                {/* ---> change this all-blogs to your desired page-id */}

                <div className="cc-middle-content">
                    <h1 className="main-heading">
                        Company Preparation{" "}
                        <div className="head-tag">
                            Powered by Algolisted Ai{" "}
                            <img
                                draggable="false"
                                src="https://static.wixstatic.com/media/592002_0f04cb41e098424588d09e2fba76ec65~mv2.gif"
                                alt=""
                            />
                        </div>
                    </h1>
                    <p className="heading-supporter">
                        Using this feature, you can unlock a comprehensive guide tailored to your target company, such as Google, Microsoft, and others. Our AI provides detailed preparation guidelines based on the company’s culture, hiring process, and expectations. It includes a curated list of frequently asked questions categorized by interview rounds—technical, behavioral, and HR. Additionally, you can explore in-depth tips for cracking coding interviews, system design challenges, and company-specific scenarios.
                    </p>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            Book a company-specific mentor for personalized guidance or mock interviews.
                        </div>
                    </div>

                    <Filters needDarkMode={needDarkMode}>{filters}</Filters>
                    <CleanLine />

                    

                </div>
            </Container>
        </GrandContainer>
    );
};

export default CompanyPreperation;

const LoadingSection = styled.div``;

const QuestionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

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
  @media only screen and (max-width: 1099px) {
    display: none;
  }

  display: flex;
  justify-content: space-between;
  padding-left: 200px;

  a {
    color: #18489f;
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

    .main-heading {
      font-size: 1.65rem;
      font-weight: 600;
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

    .heading-supporter {
      font-size: 1.05rem;
      margin-bottom: 10px;
      font-weight: 400;
      color: #696168;

      a {
        color: #18489f;
        font-size: 0.95rem;
        font-weight: 300;
        margin-left: 0.25rem;
      }
    }

    .message {
      display: inline-block;
      /* display: flex; */
      /* align-items: center; */
      background-color: #d5f7e1;
      border-radius: 5px;
      padding: 10px;
      margin: 20px 0 10px 0;

      .text {
        font-size: 0.8rem;
        color: #13803b;
        font-weight: 300;
      }
    }

    .btn-1 {
      padding: 5px 10px;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.25rem;
      svg {
        margin-right: 5px;
      }
    }

    .loading-section {
      display: flex;
      flex-direction: column;
      padding: 4rem 0;
      justify-content: center;
      align-items: center;
    }

    .error-section {
      display: flex;
      flex-direction: column;
      padding: 4rem 0;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Filters = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 80px 0 10px 0;

	.filter {
		padding: 7.5px 15px;
		font-size: 0.8rem;
		border: 1px solid ${(props) => (props.needDarkMode ? '#514f4f' : '#b9afaf')};
		border-radius: 500px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
    background-color: ${(props) => (props.needDarkMode ? 'transparent' : 'transparent')};
    color: ${(props) => (props.needDarkMode ? '#e5e5e5' : 'inherit')};

    svg{
      font-size: 1rem;
      margin-bottom: -0.2rem;
      margin-left: 5px;
      fill: #71c929;
    }

		&:hover {
			background-color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#f1f1f1')};
			border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#333')};
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : 'inherit')};
			transition-duration: 250ms;
			cursor: pointer;
		}
	}

  .locked-feature{
    &:hover{
      background-color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#f1f1f1')};
      color: ${(props) => (props.needDarkMode ? '#fff' : 'inherit')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
      transition-duration: 250ms;
    }
  }

	.selected {
		/* background-color: #ded7d7;
    color: #111; */
    color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#ebdddd')};
    border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#201f1f')};
    background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')};

    &:hover {
      color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#ebdddd')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#201f1f')};
      background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')};
			transition-duration: 250ms;
			cursor: pointer;
		}
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

const CleanLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: grey;
`