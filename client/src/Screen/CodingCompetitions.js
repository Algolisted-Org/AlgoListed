import React, { useState, useEffect, CSSProperties } from "react";
import styled from "styled-components";
import CCHeader from "../Components/CCHeader";
import LeftMenu from "../Components/LeftMenu";
import FilterListIcon from "@material-ui/icons/FilterList";
import InfoIcon from "@material-ui/icons/Info";
import { LinearProgress } from "@material-ui/core";
import TimeLeft from "../helpers/TimeLeft";
import { competitionFilters } from "../Components/competitionFilters";
import CompetitionItem from "../Components/CompetitionItem";

const CodingCompetitions = () => {
  const [temp, setTemp] = useState([1]);
  const [waitingForData, setWaitingForData] = useState(true);
  const [list, setList] = useState();
  const [filter, setFilter] = useState("All");
  const [isSortListOpen, setIsSortListOpen] = useState(false);
  const [sortType, setSortType] = useState("By Relevance");
  const [listCopy, setListCopy] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch(
        `https://script.google.com/macros/s/AKfycbzXyVH1o6CzzJUfLN0qC-EscTKQeKouAUlU3oBs_S85WvB13wPHuawZLK43QJrqBua3Ng/exec`
      )
        .then((res) => res.json())
        .then((data) => {
          setList(data);
          setListCopy(data);
          setWaitingForData(false);
        })
        .then(() => {
          setList(changeRegistrationStatus);
          setListCopy(changeRegistrationStatus);
        });
    })();
  }, []);

  const changeRegistrationStatus = (list) =>
    list.map((obj) => {
      const isRegistrationExpired =
        TimeLeft(
          false,
          obj.registration_end_date,
          obj.registration_end_time_mins
        ) === "Expired";
      if (isRegistrationExpired) {
        return { ...obj, registration_status: "Closed" };
      }

      return obj;
    });

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleFilter = (e) => {
    setFilter(e.target.textContent);
  };

  const handleSort = (e) => {
    setIsSortListOpen(!isSortListOpen);
    const listItemText = e.target.innerText;
    if (listItemText === "By Relevance") {
      setList(listCopy);
      setSortType(listItemText);
    }
    if (listItemText === "By Registration") {
      setList((list) => {
        return [...list].sort((a, b) => {
          const firstItemTime = TimeLeft(
            true,
            a.competition_date,
            a.time_start_mins
          );
          const secondItemTime = TimeLeft(
            true,
            b.competition_date,
            b.time_start_mins
          );
          if (a.registration_status === "Open") {
            if (a.registration_status === b.registration_status) {
              return firstItemTime - secondItemTime;
            }
            return -1;
          } else if (a.registration_status === "Closed") {
            if (a.registration_status === b.registration_status) {
              return firstItemTime - secondItemTime;
            }
            return 1;
          } else {
            return 0;
          }
        });
      });
      setSortType(listItemText);
    }
    if (listItemText === "By Contest Timing") {
      setList((list) => {
        return [...list].sort((a, b) => {
          const firstItemTime = TimeLeft(
            true,
            a.competition_date,
            a.time_start_mins
          );
          const secondItemTime = TimeLeft(
            true,
            b.competition_date,
            b.time_start_mins
          );
          return firstItemTime - secondItemTime;
        });
      });
      setSortType(listItemText);
    }
  };

  const filters = competitionFilters.map((item) => {
    return (
      <div
        onClick={(e) => {
          handleFilter(e);
        }}
        key={item.id}
        className={item.text == filter ? "filter selected" : "filter"}
      >
        {item.text}
      </div>
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
        <CCHeader />
        <LeftMenu marked={"all-coding-competitions"} />
        <div className="cc-middle-content">
          <h1 className="main-heading">All Upcoming Coding Competitions</h1>
          <p className="heading-supporter">
            We are not fetching the data from any public API, we have built our
            own API, which is being constantly updated by our the team and users
            with information.
            {/* <a href="/">I know about a coding competiion which is not mentioned here</a> */}
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              You know about a coding competition which is not mentioned here.{" "}
              <a href="/">click here</a>
            </div>
          </div>
          <p className="heading-supporter">
            Competitions like - Google Kickstart, Codeforces, Leetcode, CC,
            Hackathons, ICPC, Hackathons, Microsoft Imagine, Microsoft Engage,
            Facebook Hacker Cup, TCS Ninja, Uber Hacktag, Hacktoberfest,
            Girlscript, GSOC, Code jam, Hash Cup.
          </p>
          <Filters>{filters}</Filters>
          <Sort>
            <div onClick={(e) => handleSort(e)} className="box">
              <div className="text">{sortType}</div>
              <FilterListIcon />
              <div className={isSortListOpen ? "list open" : "list"}>
                <ul>
                  <li className="item">By Relevance</li>
                  <li className="item">By Registration</li>
                  <li className="item">By Contest Timing</li>
                </ul>
              </div>
            </div>
            <InfoIcon style={{ fill: "#333" }} />
          </Sort>

          <Table>
            <div className="row top-row">
              <div className="hash">#</div>
              <div className="platform">Platform</div>
              <div className="contest">Competition</div>
              <div className="date">Date and Time left</div>
              <div className="duration">Duration</div>
              <div className="registration">Registration</div>
            </div>

            {waitingForData ? (
              <LinearProgress />
            ) : (
              <>
                {list
                  .filter(
                    (item) =>
                      TimeLeft(
                        false,
                        item.competition_date,
                        item.time_start_mins + item.duration_mins
                      ) !== "Expired"
                  )
                  .map((item, index) => {
                    if (filter == "All") {
                      return (
                        <CompetitionItem
                          key={index}
                          index={index}
                          item={item}
                        />
                      );
                    } else if (item.tags.includes(filter)) {
                      return (
                        <CompetitionItem
                          key={index}
                          index={index}
                          item={item}
                        />
                      );
                    }
                  })}
              </>
            )}
          </Table>
        </div>
        {/* <CCRightMenu/> */}
      </Container>
    </GrandContainer>
  );
};

export default CodingCompetitions;

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
  @media only screen and (max-width: 1100px) {
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
      color: #292929;
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
  }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 80px 0 10px 0;

  .filter {
    padding: 7.5px 15px;
    font-size: 0.8rem;
    border: 1px solid #b9afaf;
    border-radius: 500px;
    margin: 0px 5px 5px 0px;
    font-weight: 300;

    &:hover {
      border-color: #201f1f;
      background-color: #201f1f;
      color: #ebdddd;
      transition-duration: 250ms;
      cursor: pointer;
    }
  }

  .selected {
    /* background-color: #ded7d7;
    color: #111; */
    border-color: #201f1f;
    background-color: #201f1f;
    color: #ebdddd;
  }
`;

const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;

  .box {
    padding: 5px 10px;
    height: 36px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    border-radius: 100px;
    background-color: white;
    border: 1px solid #b9afaf;
    box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
    margin-right: 5px;
    cursor: pointer;

    .list {
      padding: 5px;
      width: 100%;
      display: none;
      position: absolute;
      top: 36px;
      left: 0;
      justify-content: space-between;
      align-items: center;
      border-radius: 10px;
      background-color: white;
      box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
      z-index: 1;

      .item {
        width: 100%;
        font-size: 0.8rem;
        font-weight: 300;
        margin: 0 7.5px;
        list-style-type: none;
      }
      .item:hover {
        color: #18489f;
      }
    }

    .text {
      font-size: 0.8rem;
      font-weight: 300;
      margin: 0 7.5px;
    }
    .open {
      display: block;
  }
`;

const Table = styled.div`
  width: 100%;
  border: 1px solid #e0cece;
  border-radius: 5px;
  overflow: hidden;

  .row {
    background-color: white;
    width: 100%;
    min-height: 75px;
    padding: 0 15px;
    border-top: 1px solid #e0cece;
    display: flex;
    justify-content: space-between;
    position: relative;
    /* align-items: flex-start; */

    .time-left {
      font-size: 0.75rem;
      font-weight: 200;
    }

    .hash {
      width: 5%;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      /* background-color: yellow; */
      font-size: 0.9rem;
      font-weight: 300;
    }

    .platform {
      width: 10%;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      /* background-color: grey; */
      font-size: 0.9rem;
      font-weight: 300;
      padding-right: 5px;
    }

    .contest {
      width: 25%;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      /* background-color: coral; */
      font-size: 0.9rem;
      font-weight: 300;
      padding-right: 5px;
    }

    .date {
      width: 20%;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      /* background-color: grey; */
      font-size: 0.9rem;
      font-weight: 300;
      padding-right: 5px;
    }

    .duration {
      width: 10%;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      /* background-color: yellow; */
      font-size: 0.85rem;
      font-weight: 300;
      padding-right: 5px;
    }

    .registration {
      width: 20%;
      padding: 7.5px 0;
      font-size: 0.9rem;
      font-weight: 300;
      padding-right: 5px;
    }
  }

  .top-row {
    background-color: whitesmoke;
    width: 100%;
    height: 75px;
    padding: 0 15px;
    border-top: 1px solid transparent;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    /* border-radius: 5px; */

    .hash,
    .platform,
    .platform,
    .contest,
    .date,
    .duration {
      border-right: 1px solid #e0cece;
      font-size: 0.95rem;
      font-weight: 400;
      /* color: #c4b8b8; */
      display: flex;
      align-items: center;
    }

    .registration {
      font-size: 0.95rem;
      font-weight: 400;
      /* color: #c4b8b8; */
      display: flex;
      align-items: center;
    }
  }

  .ongoing {
    background-color: #ffe0e0;
  }

  .last-row {
    border-bottom: 0px solid transparent;
  }
`;
