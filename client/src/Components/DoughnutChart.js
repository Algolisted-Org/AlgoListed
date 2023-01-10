import React from 'react'
import styled from 'styled-components'
import { Doughnut } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";

const DoughnutChart = ({chartData, options}) => {
  return (
    <Container>
      <Doughnut data={chartData} options={options}></Doughnut>
    </Container>
  )
}

export default DoughnutChart

const Container = styled.div`
`