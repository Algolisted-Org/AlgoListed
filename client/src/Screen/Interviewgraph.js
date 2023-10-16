import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Container } from "@material-ui/core";
import styled from "styled-components";

const Interviewgraph = ({ companies }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (companies && Object.keys(companies).length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const myChartRef = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(myChartRef, {
        type: "doughnut",
        data: {
          labels: Object.keys(companies),
          datasets: [
            {
              label: "Interview Summary",
              data: Object.values(companies),
              backgroundColor: [
                "#02992B",
                "#05AD32",
                "#0BBC3A",
                "#29BD50",
                "#2CCE57",
                "#15D849",
                "#09E042",
                "#03ED41",
                "#06DC1E",
                "#07F322",
                "#00FE1D",
                "#23F623",
                "#33F933",
                "#68F368",
                "#51F051",
                "#65EF65",
                "#71F071",
                "#80F080",
                "#8EF28E",
                "#A0F1A0",
              ],
              borderColor:[
                "#BDFABD"
              ],
              borderRadius:2,
              borderWidth:1,
              hoverOffset: 4,
            },
          ],
        },
      });
    }
  }, [companies]);

  return (
    <Container>
      <StyledContainer>
        <div className="graph">
          <div className="graphMain">
            <canvas
              ref={chartRef}
              style={{ width: "500px", height: "500px" }}
            />
          </div>
          <div className="graphDetail">
            <ul>
              {Object.entries(companies).map(([companyName, value]) => (
                <li key={companyName}>
                  {companyName}: {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </StyledContainer>
    </Container>
  );
};

export default Interviewgraph;

const StyledContainer = styled.div`
  display: flex;
  .graph {
    width: 100%;
    display: flex;
    justify-content: space between;
    padding: 30px;
    border-radius: 25px;
    box-shadow: 10px 10px 25px #ccc;
    .graphMain {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}`;
