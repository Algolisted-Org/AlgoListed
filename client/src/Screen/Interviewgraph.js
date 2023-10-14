import { Container } from "@material-ui/core";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import img from "../Images/s1.png";
import Chart from "chart.js/auto";
const Interviewgraph = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }, []);
  return (
    <>
      <Container>
        <StyledContainer>
          <div className="graph">
            <div className="graphMain">
              <canvas ref={chartRef} style={{width:"500px",height:"500px"}}/>
            </div>
            <div className="graphDetail">
              <ul>
                <li>Microsoft: 50</li>
                <li>Microsoft: 50</li>
                <li>Microsoft: 50</li>
                <li>Microsoft: 50</li>
                <li>Microsoft: 50</li>
                <li>Microsoft: 50</li>
                <li>Microsoft: 50</li>
                <li>Microsoft: 50</li>
                <li>Microsoft: 50</li>
                <li>Microsoft: 50</li>
              </ul>
            </div>
          </div>
        
        </StyledContainer>
      </Container>
    </>
  );
};

export default Interviewgraph;

const StyledContainer = styled.div`
  display: flex;
  .graph {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding:30px;
    border-radius: 25px;
    box-shadow: 10px 10px 25px #ccc;
    .graphMain {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
  }
`;
