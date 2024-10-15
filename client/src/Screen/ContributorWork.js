import React, { useState, useEffect } from "react";
import styled from "styled-components";
import data from "../Components/contributorsData.json";
import axios from 'axios'

//If you want to add your experience go to ../Components/contributorsData.json
const ContributorWork = () => {
  const [contributorsData, setContributorsData] = useState([]);
  const [isLoading,setIsLoading] =useState(true);

  //Fetch the Contributors data
  useEffect(() => {
    const owner = "Nayaker";
    const repo = "AlgoListed";
  
    axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`)
      .then(async (res) => {
        const contributors = res.data;  
        const contributorsData = await Promise.all(contributors.map(async (contributor) => {

          // Per page only 100 requests can be fetched. 
          // Page1
          var pullRequestsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`;
          const pullRequestsResponse = await axios.get(pullRequestsUrl);
          const pullRequests = pullRequestsResponse.data
          .filter(pr => pr.user.login === contributor.login)
          .map(pr => ({
            id: pr.id,
            title: pr.title,
            url: pr.html_url,
            created_on: new Date(pr.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          }));
          
          // Page 2
          pullRequestsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100&page=2`;
          const pullRequestsResponse2 = await axios.get(pullRequestsUrl);
          const pullRequests2 = pullRequestsResponse2.data
          .filter(pr => pr.user.login === contributor.login)
          .map(pr => ({
            id: pr.id,
            title: pr.title,
            url: pr.html_url,
            created_on: new Date(pr.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          }));
          
          //Merge two pages
          const AllPullRequests=pullRequests.concat(pullRequests2);

          const contributorDetailsResponse = await axios.get(`https://api.github.com/users/${contributor.login}`);
          const contributorDetails = contributorDetailsResponse.data;
          
          //Experience are fetched from ./Components/contributorsData.json
          const manualDescription = data[contributor.login] || "";
  
          return {
            user_name: contributor.login,
            name: contributorDetails.name || "",
            description: manualDescription || "",
            avatar_url: contributorDetails.avatar_url,
            pull_requests: AllPullRequests,
          };
        }));

         // Sort the contributorsData with manual descriptions at the top
          Promise.all(contributorsData)
          .then(data => {
            const sortedData = data.sort((a, b) => {
              if (a.description && !b.description) return -1;
              if (!a.description && b.description) return 1;
              return 0;
            });
            setContributorsData(sortedData);
            setIsLoading(false);
          })
          .catch(err => console.log(err));
          // setIsLoading(false);
      })
      .catch((err) => console.log(err));
      // setIsLoading(false);
  }, []);
  
  
  useEffect(() => {
    document.title = "Contributor Work | Organisation Information - Algolisted";
  }, []);

  const [isVisible, setIsVisible] = useState([]);

  const toggleVisibility = (index) => {
    setIsVisible((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Container>
      <h1 className="main-heading">Contributor Work</h1>
      <p className="heading-supporter">
        We would like to extend our heartfelt gratitude to all the dedicated
        contributors who have poured their time, effort, and expertise into our
        project. Your unwavering commitment and valuable contributions have
        played an instrumental role in our success. Your creativity, dedication,
        and passion for the work you do have not only elevated our project but
        also inspired everyone around you. We truly appreciate your hard work
        and look forward to continuing this journey of collaboration and
        achievement together. Thank you for your exceptional contributions; they
        are the cornerstone of our progress.
      </p>
      
      {isLoading ? (
      <div>Loading...</div>
      ) : (
      <div className="hold-contributors">
        {contributorsData != null &&
          contributorsData.map((item, index) => {
            return (
              <div key={index} className="contributor-work-container">
                <div className="contributor-info">
                  <a
                    href={`https://github.com/${item.user_name}`}
                    target={"_blank"} rel="noreferrer"
                  >
                    <img src={item.avatar_url} alt="" />
                  </a>
                </div>
                <div className="contributor-work">
                  <h3>{item.name} <a href={`https://github.com/${item.user_name}`}><span>@{item.user_name}</span></a></h3>
                  <p>{item.description}</p>
                 
                  {isVisible[index] ? (
                    <>
                      <a onClick={() => toggleVisibility(index)}>Show less</a>
                      <ul className={isVisible[index] ? "show" : "hide"}>
                        {item.pull_requests.map((pr, idx) => {
                          return (
                            <li key={idx}>
                              <a
                                href={pr.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                #{pr.id} - {pr.title}
                              </a>
                              {` | Created On ${pr.created_on}`}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <a onClick={() => toggleVisibility(index)}>Show more</a>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      )}
    </Container>
  );
};

export default ContributorWork;

const Container = styled.div`
  width: 100%;
  b {
    font-weight: 500;
  }

  .hold-contributors {
    margin-top: 40px;
    padding: 10px;

    .contributor-work-container {
      flex-direction: row;
      display: flex;
      margin-bottom: 8px;
      padding: 16px;
      border-bottom: 1px solid #e5e5e5;
      .contributor-info {
        width: 20%;
        text-align: center;

        a {
          font-size: 0.85rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          text-decoration: none;
          width: 100%;
          font-family: "Poppins", sans-serif;
        }

        img {
          height: 100px;
          width: 100px;
          border-radius: 100px;
          border: 1px solid #b7a6a6;
          transition: ease-in 0.2s all;
        }

        :hover {
          img {
            transform: scale(1.05);
          }

          p {
            color: cornflowerblue;
          }
        }
      }

      .contributor-work {
        margin-left: 30px;
        width: 80%;
        h3{
          margin-top: 0;
          margin-bottom: 5px;
          a{
            text-decoration:none;
          }
          span{
            font-size: 0.75rem;
            font-weight: 400;
            color: #374151;
            margin-left: 5px;
          }
        }
        p{
          font-size: 0.75rem;
          font-weight: 200;
          letter-spacing: 0.05rem;
          line-height: 1.25rem;
        }
        a{
          margin:2px;
          font-size: 0.75rem;
          background-color: #ffff;
          cursor: pointer;
        }
        .show {
          max-height: 100%; 
          overflow: hidden;
          transition:  3s ease-in;
        }
      
        .hide {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
        }
        ul {
          margin-top: 10px;
          list-style: none;
          font-size: 0.65rem;
          font-weight: 200;
          line-height: 1.5rem;
         
          li {
            margin-bottom: 8px;
          }
        }
        
      }
    }
  }
`;
