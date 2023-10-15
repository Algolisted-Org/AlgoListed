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
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "#FFFF00",
                "#8B0000",
                "#BF9000",
                "#0B5394",
                "#674EA7",
                "#6AA84F",
                "#FFE599",
              ],
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
            <canvas ref={chartRef} style={{ width: "500px", height: "500px" }} />
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
