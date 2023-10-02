import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import data from '../Components/contributorsData.json'

const ContributorWork = () => {
    useEffect(() => {
        document.title = "Contributor Work | Organisation Information - Algolisted";
    }, []);

    const [contributorsPullRequests, setContributorsPullRequests] = useState(data);

    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>Contributor Work</h1>
            <p className="heading-supporter">
                This page will contain information about all the people who have contributed, their name, username, first commit, last commit merged. 
                And the agenda for each PR. 
            </p>
            <div className="hold-contributors">
                {contributorsPullRequests != null &&
                  contributorsPullRequests.map((item, index) => {
                    return (
                      <div key={index} className="contributor-work-container">
                        <div className="contributor-info">
                          <a
                            href={`https://github.com/${item.user_name}`}
                            target={"_blank"}
                          >
                            <img src={item.avatar_url} alt="" />
                            <p>{item.name}</p>
                          </a>
                        </div>
                        <div className="contributor-work">
                          <ul>
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
                        </div>
                      </div>
                    );
                })}
            </div>
        </Container>
    )
}

export default ContributorWork


const Container = styled.div`
  width: 100%;
  b {
    font-weight: 500;
  }

  .hold-contributors {
    margin-top: 40px;

    .contributor-work-container {
      flex-direction: row;
      display: flex;
      margin-bottom: 8px;
      padding: 16px;

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

        ul {
          list-style: none;
          font-size: 0.85rem;
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
