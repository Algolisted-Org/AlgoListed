import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import data from '../Components/striverSDEsheetScrapedData.json'
import babbarData from '../Components/babbarSDEsheetData.json'
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import DoughnutChart from '../Components/DoughnutChart';

const ChartTemp = () => {
	const [data, setData] = useState([]);
    const [count, setCount] = useState([3, 1, 4])

    // Important! https://www.youtube.com/watch?v=yOousFGfmZc

    var chartData = {
        title: { text: 'Chart Title', display: true },
        labels: ["Easy", "Medium", "Hard"],
        datasets: [{
            label: "Number of questions", 
            data: count,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',],
            borderColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
        }]
    };

    var chartData2 = {
        title: { text: 'Chart Title', display: true },
        labels: ["Easy", "Medium", "Hard"],
        datasets: [{
            label: "Number of questions", 
            data: count,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',],
            borderColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
        }]
    };

    useEffect(() => {
		axios
			.get(`https://algolisted.cyclic.app/coding-questions/question/striver-sde-sheet`)
			.then((res) => {
				setData(res.data);
                console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);    

    useEffect(() => {
        let len = data.length;
        let easy = 0, medium = 0, hard = 0;
        for(let i = 0; i < len; i++){
            let difficulty = data[i].tags[0];

            console.log(difficulty);
            if(difficulty == "Easy"){
                easy++;
            }
            else if(difficulty == "Medium"){
                medium++;
            }
            else{
                hard++;
            }

            setCount([count[0] + easy, count[1] + medium, count[2] + hard]);
        }
    }, [data])

    useEffect(() => {
        let len = data.length;
        for(let i = 0; i < len; i++){
            
        }
    }, [data])
    
    useEffect(() => {
        let len = data.length;
        console.log(len);
        
        if(len){
            // for(let i = 0; i<len; i++){
                let idx = 0;
                // while(idx < 3) {
                //     if(data[0].tags[0] == chartData.labels[idx]) break;
                //     idx++;
                // }
    
                // setChartData.datasets[0].data[idx](chartData.datasets[0].data[idx] + 1);
                
            // }
        } else console.log('Waiting for data');
    }, [data])
    
    
    return (
        <Conatiner>
            <h1>Learning Chart JS</h1>
            <p>This page is for testing chart features on a trial basis. </p>
            <DoughnutChart chartData={chartData}></DoughnutChart>
            <DoughnutChart chartData={chartData2}></DoughnutChart>
            <div className="box"></div>

        </Conatiner>
    )
}

export default ChartTemp

const Conatiner = styled.div`
    padding: 20px;
    
    p{
        font-size: 0.8rem;
        letter-spacing: 0.07rem;
    }

    .box{
        height: 20px;
        width: 40px;
        background-color: cornflowerblue;
    }
`