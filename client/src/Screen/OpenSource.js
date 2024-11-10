import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
import SimpleFooter from '../Components/SimpleFooter'
import LockIcon from '@material-ui/icons/Lock';
import { useParams } from "react-router-dom";
import CallMadeIcon from '@material-ui/icons/CallMade';
import { openSourceFilters } from '../Components/openSourceFilters'
import MobileNavbar from "../Components/MobileNavbar";

const OpenSource = () => {
    const [needDarkMode, setNeedDarkMode] = useState(false);
    const [tabName, setTabName] = useState("swags");

    useEffect(() => {
        let selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme === 'dark') setNeedDarkMode(true);
    }, []);

    useEffect(() => {
        document.title = "Open Source - Algolisted";
    }, []);

    const filters = openSourceFilters.map((item) => {
        return item.lock === true ? (
            <div key={item.id} className='locked-feature filter'>
                {item.text}
                <LockIcon />
            </div>
        ) : (
            <a
                href={`/open-source/${item.domainFilter}`}
                key={item.id}
                className={item.domainFilter === tabName ? 'filter selected' : 'filter'}
            >
                {item.text}
            </a>
        );
    });

    console.log("needDarkMode : ", needDarkMode);
    const toggleDarkMode = () => {
        setNeedDarkMode(!needDarkMode);
    };

    const swagsData = [
        {
            "swagTitle": "Huddle01",
            "company": "Huddle01",
            "difficulty": "medium",
            "swagTags": ["cash", "clothing", "expired", "hacktoberfest"],
            "desc": "Join Huddle01's Hacktoberfest 2023 challenge! Win from a $300/$100 pool prize for advanced/intermediate level respectively. Beginners can earn unique POAP tokens and merchandise.",
            "link": "Check it out",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "swagTitle": "OpenBB",
            "company": "OpenBB",
            "difficulty": "medium",
            "swagTags": ["clothing", "expired", "hacktoberfest"],
            "desc": "Earn a T-shirt or hat from OpenBB in Hacktoberfest. Contribute by making no-code contributions, code enhancements, adding a non-extension feature, or creating a custom extension.",
            "link": "Check it out",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "swagTitle": "Revert",
            "company": "Revert",
            "difficulty": "medium",
            "swagTags": ["clothing", "expired", "hacktoberfest", "mug", "stickers"],
            "desc": "Earn spooky pumpkins for every PR merged in the Hacktoberfest at Revert! Collect as many pumpkins as you can before Halloween 2023 strikes and win some amazing swags!!",
            "link": "Check it out",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "swagTitle": "VeSoft",
            "company": "VeSoft",
            "difficulty": "medium",
            "swagTags": ["clothing", "digitalbadge", "expired", "hacktoberfest", "mascotdoll", "mug", "stickers"],
            "desc": "Earn digital badges and special SWAG from VeSoft in Hacktoberfest! With 1, 3, or 5 accepted PRs on vesoft-inc or nebula-contrib, receive different badges and amazing SWAG.",
            "link": "Check it out",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "swagTitle": "Interledger",
            "company": "Interledger",
            "difficulty": "medium",
            "swagTags": ["clothing", "expired", "hacktoberfest", "stickers"],
            "desc": "Earn exclusive Interledger swag this Hacktoberfest! Get a T-shirt with 1+ accepted PRs. Get limited edition swag with 4+ accepted PRs.",
            "link": "Check it out",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "swagTitle": "Haystack",
            "company": "Haystack",
            "difficulty": "medium",
            "swagTags": ["expired", "hacktoberfest", "stickers"],
            "desc": "Contribute to open issues with the 'hacktoberfest' tag at Haystack's repository and grab some exclusive stickers!",
            "link": "Check it out",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "swagTitle": "Dyrector.io",
            "company": "Dyrector.io",
            "difficulty": "medium",
            "swagTags": ["clothing", "expired", "hacktoberfest", "stickers"],
            "desc": "Contribute to any issue of dyrector.io and win an exclusive cap and stickers! Swag can optionally be personally delivered at esteemed events like KubeCon EU, Web Summit, and more if you're in Europe.",
            "link": "Check it out",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "swagTitle": "Covalent",
            "company": "Covalent",
            "difficulty": "medium",
            "swagTags": ["cash", "expired", "hacktoberfest"],
            "desc": "Join the Covalent Hacktoberfest. Get rewarded with cash prizes based on the complexity and level of your contributions. Beginners can earn $25 per merged PR, while experts have an opportunity to earn $100.",
            "link": "Check it out",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "swagTitle": "Appblock",
            "company": "Appblock",
            "difficulty": "medium",
            "swagTags": ["cash", "expired", "hacktoberfest"],
            "desc": "Each accepted PR to AppBlock during the Hacktoberfest will win ₹5,000. You have a chance to win up to ₹30,000!!",
            "link": "Check it out",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        }
    ]

    const hiringData = [
        {
            "jobTitle": "Full Stack Developer",
            "company": "Huddle01",
            "location": "Remote",
            "employmentType": "Full-time",
            "salary": "$70,000 - $90,000 USD",
            "tags": ["open-source", "full-stack", "remote"],
            "desc": "Join Huddle01 as a Full Stack Developer. Work on open-source projects and contribute to decentralized communication systems. Candidates with experience in React.js, Node.js, and WebRTC are preferred.",
            "link": "Apply here",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "jobTitle": "Backend Engineer",
            "company": "OpenBB",
            "location": "Onsite - San Francisco, CA",
            "employmentType": "Full-time",
            "salary": "$100,000 - $120,000 USD",
            "tags": ["open-source", "backend", "onsite"],
            "desc": "OpenBB is looking for a Backend Engineer to work on open-source financial tools. Strong knowledge of Python and API development is essential. Familiarity with financial systems and databases is a plus.",
            "link": "Apply here",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "jobTitle": "Frontend Developer",
            "company": "Revert",
            "location": "Remote/Onsite - EU Preferred",
            "employmentType": "Contract",
            "salary": "€60,000 - €80,000 EUR",
            "tags": ["frontend", "open-source", "remote", "contract"],
            "desc": "Revert is hiring a Frontend Developer to enhance their open-source projects. The role focuses on React.js and TypeScript, contributing to projects for a global user base.",
            "link": "Apply here",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "jobTitle": "DevOps Engineer",
            "company": "VeSoft",
            "location": "Remote",
            "employmentType": "Full-time",
            "salary": "$80,000 - $100,000 USD",
            "tags": ["DevOps", "cloud", "remote", "open-source"],
            "desc": "VeSoft is seeking a DevOps Engineer with experience in AWS and Kubernetes to manage their cloud infrastructure and contribute to open-source tooling.",
            "link": "Apply here",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "jobTitle": "Blockchain Developer",
            "company": "Interledger",
            "location": "Onsite - New York, NY",
            "employmentType": "Full-time",
            "salary": "$110,000 - $130,000 USD",
            "tags": ["blockchain", "open-source", "onsite"],
            "desc": "Interledger is hiring a Blockchain Developer to work on cutting-edge decentralized finance protocols. Must have experience with smart contracts and Solidity.",
            "link": "Apply here",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "jobTitle": "Product Manager",
            "company": "Haystack",
            "location": "Remote",
            "employmentType": "Full-time",
            "salary": "$90,000 - $110,000 USD",
            "tags": ["product-management", "remote", "open-source"],
            "desc": "Haystack is looking for a Product Manager to lead the development of their open-source projects. Must have experience with agile methodologies and managing cross-functional teams.",
            "link": "Apply here",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "jobTitle": "Frontend Engineer",
            "company": "Dyrector.io",
            "location": "Remote",
            "employmentType": "Contract",
            "salary": "$70,000 - $90,000 USD",
            "tags": ["frontend", "contract", "open-source", "remote"],
            "desc": "Dyrector.io is hiring a Frontend Engineer to work on their open-source tools. The ideal candidate has experience in JavaScript frameworks like React.js and Svelte.",
            "link": "Apply here",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "jobTitle": "Data Scientist",
            "company": "Covalent",
            "location": "Remote",
            "employmentType": "Full-time",
            "salary": "$100,000 - $120,000 USD",
            "tags": ["data-science", "remote", "open-source"],
            "desc": "Covalent is seeking a Data Scientist with experience in analyzing large datasets for their open-source blockchain projects. Proficiency in Python and machine learning is essential.",
            "link": "Apply here",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "jobTitle": "Mobile App Developer",
            "company": "Appblock",
            "location": "Onsite - Bangalore, India",
            "employmentType": "Full-time",
            "salary": "₹15,00,000 - ₹25,00,000 INR",
            "tags": ["mobile", "onsite", "open-source"],
            "desc": "Appblock is hiring a Mobile App Developer to work on their open-source Android and iOS applications. Candidates must be proficient in Kotlin and Swift.",
            "link": "Apply here",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        }
    ];

    const bountyData = [
        {
            "bountyTitle": "Huddle01 Bug Fix",
            "company": "Huddle01",
            "difficulty": "medium",
            "bountyTags": ["bug-fix", "high-priority"],
            "desc": "Fix critical bugs in Huddle01's communication platform. Reward up to $500 for successful fixes. Ideal for experienced contributors familiar with JavaScript and WebRTC.",
            "reward": "$500 USD",
            "link": "Claim this bounty",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "bountyTitle": "OpenBB Feature Addition",
            "company": "OpenBB",
            "difficulty": "high",
            "bountyTags": ["feature-request", "open-source"],
            "desc": "Develop a new feature for OpenBB's financial analysis tool. Up to $1,000 reward for a well-implemented feature. Knowledge of Python and financial systems required.",
            "reward": "$1,000 USD",
            "link": "Claim this bounty",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "bountyTitle": "Revert UI Enhancement",
            "company": "Revert",
            "difficulty": "medium",
            "bountyTags": ["ui-ux", "enhancement"],
            "desc": "Enhance the UI/UX of Revert's open-source project. Rewards include up to $750 and special recognition in the community.",
            "reward": "$750 USD",
            "link": "Claim this bounty",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "bountyTitle": "VeSoft Documentation Improvement",
            "company": "VeSoft",
            "difficulty": "low",
            "bountyTags": ["documentation", "improvement"],
            "desc": "Improve documentation for VeSoft's Nebula project. Earn up to $300 for high-quality improvements. Great for those skilled in technical writing.",
            "reward": "$300 USD",
            "link": "Claim this bounty",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "bountyTitle": "Interledger Security Audit",
            "company": "Interledger",
            "difficulty": "high",
            "bountyTags": ["security", "audit"],
            "desc": "Conduct a security audit on Interledger's open-source protocols. Reward of up to $1,500 for identifying critical vulnerabilities.",
            "reward": "$1,500 USD",
            "link": "Claim this bounty",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "bountyTitle": "Haystack Code Optimization",
            "company": "Haystack",
            "difficulty": "medium",
            "bountyTags": ["code-optimization", "performance"],
            "desc": "Optimize code for Haystack's open-source project to improve performance. Up to $600 reward based on impact and efficiency.",
            "reward": "$600 USD",
            "link": "Claim this bounty",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "bountyTitle": "Dyrector.io Integration",
            "company": "Dyrector.io",
            "difficulty": "high",
            "bountyTags": ["integration", "api"],
            "desc": "Integrate Dyrector.io with a third-party API. Rewards up to $1,200 for seamless integration and documentation.",
            "reward": "$1,200 USD",
            "link": "Claim this bounty",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "bountyTitle": "Covalent Data Analysis",
            "company": "Covalent",
            "difficulty": "medium",
            "bountyTags": ["data-analysis", "open-source"],
            "desc": "Analyze and visualize data from Covalent's blockchain projects. Reward of up to $800 for insightful and actionable reports.",
            "reward": "$800 USD",
            "link": "Claim this bounty",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        },
        {
            "bountyTitle": "Appblock Mobile Feature",
            "company": "Appblock",
            "difficulty": "medium",
            "bountyTags": ["mobile", "feature-request"],
            "desc": "Develop a new feature for Appblock's mobile app. Reward of ₹50,000 for high-quality feature implementation.",
            "reward": "₹50,000 INR",
            "link": "Claim this bounty",
            "logo": "https://appwrite.io/assets/logomark/logo.png"
        }
    ];


    const params = useParams();
    const { routeId } = params;

    useEffect(() => {
        if (routeId != undefined) setTabName(routeId);
    }, [routeId])

    console.log(routeId);



    return (
        <GrandContainer needDarkMode={needDarkMode}>
            <MobContainer>
                <MobileNavbar />
                <div className="main-content">
                    <h1 className="main-heading">Open Source</h1>
                    <p className="heading-supporter">
                        Looking for the ultimate open-source experience? Algolisted is your go-to platform, offering a comprehensive collection of resources, updates, and community-driven projects. Whether you're after the latest open-source tools, opportunities to join thriving communities, or insights on exclusive bounties and swags, you'll find everything in one place. With regular updates and collaboration features, Algolisted ensures you stay ahead while contributing to impactful projects. Dive in today and unlock the world of open-source!        </p>
                    <Filters needDarkMode={needDarkMode}>
                        {filters}
                    </Filters>
                    {
                        routeId == undefined || routeId == "swags" ?
                            (
                                <BoxContainer>
                                    {swagsData.map((swag, index) => (
                                        <div key={index} className="box">
                                            <div className="box-logo">
                                                <img src={swag.logo} alt={`${swag.company} logo`} />
                                            </div>
                                            <h3 className="box-title">{swag.swagTitle}</h3>
                                            <p className="box-desc">{swag.desc}</p>
                                            <p className="box-tags">
                                                {swag.swagTags.map((tag, idx) => (
                                                    <span key={idx} className="box-tag">{tag}</span>
                                                ))}
                                            </p>
                                            <a href={swag.link} className="box-link">Check it out <CallMadeIcon /> </a>
                                        </div>
                                    ))}
                                </BoxContainer>
                            )
                            : routeId == "hiring" ? (
                                <div>
                                    <BoxContainer>
                                        {hiringData.map((job, index) => (
                                            <div key={index} className="box">
                                                <div className="box-logo">
                                                    <img src={job.logo} alt={`${job.company} logo`} />
                                                </div>
                                                <h3 className="box-title">{job.jobTitle} Hiring</h3>
                                                <p className="box-desc">{job.desc}</p>
                                                <p className="box-tags">
                                                    {job.tags.map((tag, idx) => (
                                                        <span key={idx} className="box-tag">{tag}</span>
                                                    ))}
                                                </p>
                                                <p className="box-tags2">
                                                    <p className="box-tag">{job.location}</p>
                                                    <p className="box-tag">{job.salary}</p>
                                                </p>
                                                <a href={job.link} className="box-link">Apply here <CallMadeIcon /> </a>
                                            </div>
                                        ))}
                                    </BoxContainer>
                                </div>
                            ) : (
                                <div>
                                    <BoxContainer>
                                        {bountyData.map((bounty, index) => (
                                            <div key={index} className="box">
                                                <div className="box-logo">
                                                    <img src={bounty.logo} alt={`${bounty.company} logo`} />
                                                </div>
                                                <h3 className="box-title">{bounty.bountyTitle}</h3>
                                                <p className="box-desc">{bounty.desc}</p>
                                                <p className="box-tags">
                                                    {bounty.bountyTags.map((tag, idx) => (
                                                        <span key={idx} className="box-tag">{tag}</span>
                                                    ))}
                                                </p>
                                                <p className="box-tags2">
                                                    <p className="box-tag">{bounty.reward}</p>
                                                </p>
                                                <a href={bounty.link} className="box-link">Claim this bounty <CallMadeIcon /> </a>
                                            </div>
                                        ))}
                                    </BoxContainer>
                                </div>
                            )
                    }
                </div>
                <SimpleFooter />
            </MobContainer>

            <Container needDarkMode={needDarkMode}>
                {
                    needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
                }
                {
                    needDarkMode ? <LeftMenuDark marked={"open-source"} /> : <LeftMenu marked={"open-source"} />
                }
                {/* ---> change this all-blogs to your desired page-id */}

                <div className="cc-middle-content">
                    <h1 className='main-heading'>Open Source</h1>
                    <p className="heading-supporter">
                        Looking for the ultimate open-source experience? Algolisted is your go-to platform, offering a comprehensive collection of resources, updates, and community-driven projects. Whether you're after the latest open-source tools, opportunities to join thriving communities, or insights on exclusive bounties and swags, you'll find everything in one place. With regular updates and collaboration features, Algolisted ensures you stay ahead while contributing to impactful projects. Dive in today and unlock the world of open-source!
                    </p>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            We're always open to voluntary contributions and collaborations—reach out at <a href="mailto:nayak@algolisted.com">nayak@algolisted.com</a>
                        </div>
                    </div>
                    <Filters needDarkMode={needDarkMode}>
                        {filters}
                    </Filters>

                    {
                        routeId == undefined || routeId == "swags" ?
                            (
                                <BoxContainer needDarkMode={needDarkMode}>
                                    {swagsData.map((swag, index) => (
                                        <div key={index} className="box">
                                            <div className="box-logo">
                                                <img src={swag.logo} alt={`${swag.company} logo`} />
                                            </div>
                                            <h3 className="box-title">{swag.swagTitle}</h3>
                                            <p className="box-desc">{swag.desc}</p>
                                            <p className="box-tags">
                                                {swag.swagTags.map((tag, idx) => (
                                                    <span key={idx} className="box-tag">{tag}</span>
                                                ))}
                                            </p>
                                            <a href={swag.link} className="box-link">Check it out <CallMadeIcon /> </a>
                                        </div>
                                    ))}
                                </BoxContainer>
                            )
                            : routeId == "hiring" ? (
                                <div>
                                    <BoxContainer needDarkMode={needDarkMode}>
                                        {hiringData.map((job, index) => (
                                            <div key={index} className="box">
                                                <div className="box-logo">
                                                    <img src={job.logo} alt={`${job.company} logo`} />
                                                </div>
                                                <h3 className="box-title">{job.jobTitle} Hiring</h3>
                                                <p className="box-desc">{job.desc}</p>
                                                <p className="box-tags">
                                                    {job.tags.map((tag, idx) => (
                                                        <span key={idx} className="box-tag">{tag}</span>
                                                    ))}
                                                </p>
                                                <p className="box-tags2">
                                                    <p className="box-tag">{job.location}</p>
                                                    <p className="box-tag">{job.salary}</p>
                                                </p>
                                                <a href={job.link} className="box-link">Apply here <CallMadeIcon /> </a>
                                            </div>
                                        ))}
                                    </BoxContainer>
                                </div>
                            ) : (
                                <div>
                                    <BoxContainer needDarkMode={needDarkMode}>
                                        {bountyData.map((bounty, index) => (
                                            <div key={index} className="box">
                                                <div className="box-logo">
                                                    <img src={bounty.logo} alt={`${bounty.company} logo`} />
                                                </div>
                                                <h3 className="box-title">{bounty.bountyTitle}</h3>
                                                <p className="box-desc">{bounty.desc}</p>
                                                <p className="box-tags">
                                                    {bounty.bountyTags.map((tag, idx) => (
                                                        <span key={idx} className="box-tag">{tag}</span>
                                                    ))}
                                                </p>
                                                <p className="box-tags2">
                                                    <p className="box-tag">{bounty.reward}</p>
                                                </p>
                                                <a href={bounty.link} className="box-link">Claim this bounty <CallMadeIcon /> </a>
                                            </div>
                                        ))}
                                    </BoxContainer>
                                </div>
                            )
                    }
                </div>
                <SimpleFooter />
            </Container>
        </GrandContainer>
    )
}

export default OpenSource

const GrandContainer = styled.div`

`

const MobContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;  // Ensure vertical stacking
//   position: relative;
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
      color: ${(props) => (props.needDarkMode ? '#e5e6e8' : '#292929')};
      margin-bottom: 10px;
    }

    .heading-supporter {
      font-size: 0.85rem;
      margin-bottom: 15px;
      font-weight: 400;
      color: ${(props) => (props.needDarkMode ? '#ffffffa6' : '#696168')};
    }

    .message {
      background-color: ${(props) => (props.needDarkMode ? '#444754' : '#d5f7e1')};
      border-radius: 5px;
      padding: 12px;
      margin: 15px 0;

      .text {
        font-size: 0.8rem;
        color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#13803b')};
        font-weight: 300;
      }
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
`;


const Container = styled.div`
    position: relative;
    padding-bottom: 80px;
    @media only screen and (max-width: 1099px){
        display: none;
    }

   display: flex;
   flex-direction:column;
    justify-content: space-between;
    padding-left: 200px;
    
    

    background-color: ${(props) => (props.needDarkMode ? '#313338' : 'transparent')};

    a{
      color: ${(props) => (props.needDarkMode ? '#6d93d8' : '#18489f')};
    }

    input{
      background-color: transparent;
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
`

const Filters = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 20px 0 10px 0;

	.filter {
		padding: 7.5px 15px;
		font-size: 0.8rem;
		border: 1px solid ${(props) => (props.needDarkMode ? '#514f4f' : '#b9afaf')};
		border-radius: 500px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
    	background-color: ${(props) => (props.needDarkMode ? 'transparent' : 'transparent')};
    	color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

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


	.filter2{
		position: relative;
		padding: 7.5px 15px;
		font-size: 0.8rem;
		border: 1px solid #b9afaf;
		border-radius: 500px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
		color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		display: flex;
		align-items: center;

		svg{
			font-size: 1rem;
			margin-left: 5px;
			fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}

		&:hover {
			background-color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#f1f1f1')};
			border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#333')};
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : 'inherit')};
			transition-duration: 250ms;
			cursor: pointer;
		}

		svg{
			font-size: 1rem;
			margin-left: 5px;
		}

		.tag{
			position: absolute;
			padding: 2.5px 7.5px;
			font-size: 0.65rem;
			background-color: orange;
			border-radius: 100px;
			left: -10px;
			top: -12.5px;
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


const BoxContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 10px;


    .box {
        max-width: 300px;
        width: 100%;
        margin-bottom: 20px;
        border-radius: 8px;
        border: ${(props) => (props.needDarkMode ? '1px solid #514f4f' : '1px solid rgb(209, 213, 219)')};
        background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : 'white')};
        padding: 15px;
        display: flex;  
        flex-direction: column;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);

        .box-logo {
            margin-bottom: 12px;
            img {
                height: 32px;
                object-fit: contain;
            }
        }

        .box-title {
            font-size: 1rem;
            font-weight: 500;
            margin-bottom: 8px;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : 'inherit')};
        }        

        .box-desc {
            font-size: 0.8rem;
            font-weight: 300;
            line-height: 1.4;
            color: ${(props) => (props.needDarkMode ? '#b7b8ba' : 'inherit')};
        }

        .box-tags {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin: 12px 0 8px 0;
            gap: 6px;

            .box-tag {
                font-size: 0.7rem;
                padding: 4px 12px;
                border-radius: 100px;
                font-weight: 300;
                border: ${(props) => (props.needDarkMode ? '1px solid #514f4f' : '1px solid #a1cd93')};
                background-color: ${(props) => (props.needDarkMode ? '#211f1f' : '#e2f3dd')};
                color: ${(props) => (props.needDarkMode ? '#b7b8ba' : 'inherit')};
            }
        }

        .box-tags2 {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin: 0 0 12px 0;
            gap: 6px;

            .box-tag {
                font-size: 0.7rem;
                padding: 4px 12px;
                border-radius: 100px;
                
                border: ${(props) => (props.needDarkMode ? '1px solid #514f4f' : '1px solid #84b4dc')};
                background-color: ${(props) => (props.needDarkMode ? '#211f1f' : '#e8f4fe')};
                color: ${(props) => (props.needDarkMode ? '#b7b8ba' : 'inherit')};

                font-weight: 300;
            }
        }

        .box-link {
            font-size: 0.75rem;
            background-color: ${(props) => (props.needDarkMode ? '#404249' : '#e5e5e5')};
            padding: 12px;
            border-radius: 100px;
            text-align: center;
            text-decoration: none;
            color: ${(props) => (props.needDarkMode ? '#fff' : 'inherit')};
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: auto;
            transition: background-color 0.2s;
            

            &:active {
                background-color: #d5d5d5;
            }

            svg {
                fill: ${(props) => (props.needDarkMode ? '#fff' : 'inherit')};
                font-size: 0.85rem;
                margin-left: 5px;
            }
        }
    }

    /* Media Queries for Responsive Layout */
    @media (max-width: 320px) {
        padding: 0 15px;
        .box {
            width: 100%;
            margin: 0 0 15px 0;
        }
    }

    @media (min-width: 321px) and (max-width: 576px) {
        padding: 0 20px;
        .box {
            width: 100%;
            margin: 0 0 20px 0;
        }
    }

    @media (min-width: 577px) and (max-width: 767px) {
        padding: 0 15px;
        justify-content: space-around;
        .box {
            width: calc(50% - 15px);
        }
    }

    @media (min-width: 768px) {
        padding: 0;
        .box {
            width: calc(33.3333% - 20px);
        }
    }
`;
