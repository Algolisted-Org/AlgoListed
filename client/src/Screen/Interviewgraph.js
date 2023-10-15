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
                "#D9EAD3",
                "#B6D7A8",
                "#93C47D",
                "#8AD767",
                "#70DF3F",
                "#5CE61D",
                "#6AA84F",
                "#57BD2A",
                "#38761D",
                "#2F810B",
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
