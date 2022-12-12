import React from "react";
import styled from "styled-components";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

function ModuleSection({ title, body, links }) {
  return (
    <Module>
      <section>
        <div className="sub-page-head">{title}</div>
        <div className="sub-page-sub-head">{body}</div>
        <div className="cat-boxes">
          {links.map((data, index) => {
            return (
              <a href={data.link} className="cat-box" key={index}>
                <div className="cat-left">
                  <div className="cat-head">{data.title}</div>
                  <div className="cat-desc">{data.body}</div>
                </div>
                <div className="cat-right">
                  <ArrowRightAltIcon />
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </Module>
  );
}

export default ModuleSection;

const Module = styled.div`
  section {
    margin-top: 50px;

    .sub-page-head {
      font-size: 1.75rem;
      font-weight: 500;
    }

    .sub-page-sub-head {
      max-width: 980px;
      margin: 15px 0 15px 10px;
      font-size: 1rem;
      font-weight: 200;
      line-height: 1.75rem;
    }

    .cat-boxes {
      margin: 10px 5px;
      display: flex;
      flex-wrap: wrap;
      @media only screen and (max-width: 940px) and (min-width: 600px ){
        display: grid;
        gap:10px;
        grid-template-columns: repeat(2, 1fr);
      }

      /* background-color: black; */

      .cat-box {
        height: auto;
        width: 375px;
        position: relative;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        background-color: #f3f1f1;
        border-radius: 5px;
        padding: 15px;
        margin: 0px 15px 15px 0px;

        @media only screen and (max-width: 940px) and (min-width: 600px ){
          margin: 0px;
          padding: 10px;
          width: auto;
        }

        .cat-left {
          .cat-head {
            font-size: 1rem;
            font-weight: 400;
          }

          .cat-desc {
            font-size: 0.8rem;
            font-weight: 200;
          }
        }

        .cat-right {
          margin-left: 15px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;
