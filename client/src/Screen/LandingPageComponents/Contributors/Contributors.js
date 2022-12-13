import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function Contributors() {
  const [contributorsList, setContributorsList] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/Nayaker/Algorithmist/contributors")
      .then((res) => {
        setContributorsList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Cont>
      <div className="open-source-page">
        <div className="page-head">Open Source Contribution</div>
        <div className="page-sub-head">
          Lorem One platform, infinite possibilities. Artificial intelligence.
          We do this by providing a data-centric, end-to-end solution to manage
          the entire ML lifecycle.
        </div>
        <a
          href="https://github.com/Nayaker/Algorithmist/"
          target={"_blank"}
          className="btn"
        >
          Start Contributing
        </a>
        <div className="sub-page-head">Our Contributors</div>
        <div className="hold-contributors">
          {contributorsList != null &&
            contributorsList.map((item, index) => {
              return (
                <a
                  className="contributor"
                  href={item.html_url}
                  target={"_blank"}
                  key={index}
                >
                  <img src={item.avatar_url} alt="" />
                </a>
              );
            })}
        </div>
      </div>
    </Cont>
  );
}

export default Contributors;

const Cont = styled.div`
  /* #e2e8f0 */

  .open-source-page {
    width: 100vw;
    min-height: 240px;
    padding: 100px 50px;
    background-color: #f3f1f166;

    .page-head {
      font-size: 2.5rem;
      font-weight: 500;
    }

    .page-sub-head {
      max-width: 780px;
      margin: 15px 0 10px 0;
      font-size: 1.15rem;
      font-weight: 200;
    }

    .sub-page-head {
      font-size: 1.75rem;
      font-weight: 500;
    }

    .hold-contributors {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;

      .contributor {
        background-color: pink;
        overflow: hidden;
        height: 48px;
        width: 48px;
        margin: 0 7.5px 7.5px 0;
        border-radius: 100px;
        border: 1px solid #b7a6a6;

        img {
          height: 100%;
        }
      }
    }

    
    .btn {
      display: inline-block;
      border: 1px solid #c2b1b1;
      color: inherit;
      margin: 10px 50px;
      font-size: 0.85rem;
      font-weight: 400;
      padding: 10px 20px;
      letter-spacing: 0.07rem;
      margin-bottom: 50px;
      border-radius: 100px;
      text-decoration: none;

      @media only screen and (max-width:600px) {
        font-size: 0.75rem;
      }

      &:hover {
        cursor: pointer;
        background-color: #222;
        color: whitesmoke;
      }
    }
  }
`;
