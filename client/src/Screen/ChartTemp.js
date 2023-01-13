import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DoughnutChart from '../Components/DoughnutChart';

const ChartTemp = () => {
    const [data, setData] = useState([]);
    const [sortedTopicTagsKeys, setSortedTopicTagsKeys] = useState([]);
    const [sortedTopicTagsValues, setSortedTopicTagsValues] = useState([]);
    const [difficulty, setDifficulty] = useState({});
    const [count, setCount] = useState([3, 1, 4]);

    const colors = [
        '#FA6166',
        '#4CAF50',
        '#CD313E',
        '#E65100',
        '#B085F5',
        '#185600',
        '#29302B',
        '#673BC6',
        '#0277BD',
        '#FFA252',
        '#FFD600',
        '#CF4DCE',
        '#D3F0A0',
        '#936C00',
        '#0A2647',
        '#753422',
        '#FC5185',
        '#309975',
        '#850000',
        '#ADA2FF',
        '#FF0000',
        '#000000',
        '#474700',
        '#8F3B76',
        '#4FFBDF',
        '#00FF7F',
        '#D2691E',
        '#6495ED',
        '#004064',
        '#A0522D',
        '#F39C12',
        '#9400D3',
        '#521823',
        '#275444',
    ];

    const borderColors = ['#fff'];

    // Important! https://www.youtube.com/watch?v=yOousFGfmZc

    var chartData = {
        title: { text: 'Chart Title', display: true },
        labels: sortedTopicTagsKeys.map((items) => {
            return items;
        }),
        datasets: [
            {
                label: 'Number of questions by Tag',
                data: sortedTopicTagsValues.map((items) => {
                    return items;
                }),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    useEffect(() => {
        axios
            .get(
                `https://algolisted.cyclic.app/coding-questions/question/striver-sde-sheet`
            )
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        // finding unique tags
        let len = data.length;
        let ProblemsTags = [];
        for (let i = 0; i < len; i++) {
            let tagsLen = data[i].tags.length;
            for (let j = 1; j < tagsLen; j++) {
                ProblemsTags.push(data[i].tags[j]);
            }
        }

        ProblemsTags = ProblemsTags.filter((string) => string !== 'Amazon');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Microsoft');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Google');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Adobe');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Accolite');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Oracle');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Flipkart');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Paytm');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Samsung');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Snapdeal');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Walmart');

        ProblemsTags = ProblemsTags.filter((string) => string !== 'Easy');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Medium');
        ProblemsTags = ProblemsTags.filter((string) => string !== 'Hard');

        const allTagsLen = ProblemsTags.length;
        const elementCounts = {};
        for (let i = 0; i < allTagsLen; i++) {
            const element = ProblemsTags[i];
            if (elementCounts[element]) {
                elementCounts[element]++;
            } else {
                elementCounts[element] = 1;
            }
        }
        const sortedElementCounts = {};
        Object.keys(elementCounts)
            .sort((a, b) => elementCounts[b] - elementCounts[a])
            .forEach(function(key) {
                sortedElementCounts[key] = elementCounts[key];
            });

        let count = 0;
        const top10SortedElementCounts = {};
        for (const element in sortedElementCounts) {
            if (count >= 10) {
                break;
            }
            top10SortedElementCounts[element] = sortedElementCounts[element];
            count++;
        }

        console.log(ProblemsTags);
        console.log(elementCounts);
        console.log(sortedElementCounts);
        console.log(top10SortedElementCounts);
        setSortedTopicTagsKeys(Object.keys(top10SortedElementCounts));
        setSortedTopicTagsValues(Object.values(top10SortedElementCounts));
    }, [data]);

    useEffect(() => {
        let len = data.length;
        const elementCounts = {};
        elementCounts['Easy'] = 0;
        elementCounts['Medium'] = 0;
        elementCounts['Hard'] = 0;
        for (let i = 0; i < len; i++) {
            let element = data[i].tags[0];
            if (element == 'Basic') element = 'Easy';
            if (elementCounts[element]) {
                elementCounts[element]++;
            } else {
                elementCounts[element] = 1;
            }
        }
        console.log(elementCounts);
        setDifficulty(elementCounts);
    }, [data]);

    return (
        <Conatiner>
            <div className="visualiser-conatiner">
                <div className="learn-self-graph">
                    <div className="category">
                        <div className="cat-data">
                            <div className="name">Easy</div>
                            <div className="completed">
                                <div className="text">Completed : </div>
                                <div className="value">
                                    0 / {difficulty.Easy}
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                    </div>
                    <div className="category">
                        <div className="cat-data">
                            <div className="name">Medium</div>
                            <div className="completed">
                                <div className="text">Completed : </div>
                                <div className="value">
                                    0 / {difficulty.Medium}
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                    </div>
                    <div className="category">
                        <div className="cat-data">
                            <div className="name">Hard</div>
                            <div className="completed">
                                <div className="text">Completed : </div>
                                <div className="value">
                                    0 / {difficulty.Hard}
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="canvas-container">
                    <div className="canvas-graph">
                        <DoughnutChart
                            chartData={chartData}
                            options={options}></DoughnutChart>
                    </div>
                    <div className="graph-labels">
                        {sortedTopicTagsKeys.map((item, index) => {
                            return (
                                <div className="label">
                                    <div
                                        className="color"
                                        style={{
                                            backgroundColor: `${colors[index]}`,
                                        }}></div>
                                    <div className="label-key">
                                        {sortedTopicTagsKeys[index]} :{' '}
                                    </div>
                                    <div className="label-value">
                                        {sortedTopicTagsValues[index]}
                                    </div>
                                </div>
                            );
                        })}
                        <div className="label">
                            <div className="color"></div>
                            <div className="label-key">
                                Dynamic Programming :{' '}
                            </div>
                            <div className="label-value">11</div>
                        </div>
                    </div>
                </div>
            </div>
        </Conatiner>
    );
};

export default ChartTemp;

const Conatiner = styled.div`
    .visualiser-conatiner {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        .canvas-container {
            border: 1px solid rgb(233, 229, 229);
            background-color: rgba(255, 255, 255, 0.83);
            box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;
            border-radius: 5px;
            padding: 10px 50px;
            width: 60%;
            position: relative;

            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            .canvas-graph {
                width: 40%;
                display: inline;
                /* border: 1px solid black; */
            }

            .graph-labels {
                display: flex;
                flex-direction: column;

                .label {
                    display: flex;
                    align-items: center;
                    margin: 2.5px 0;

                    .color {
                        height: 15px;
                        width: 15px;
                        /* border-radius: 2px; */
                        background-color: cornflowerblue;
                        margin-right: 10px;
                        border: 0.5px solid #444;
                    }

                    .label-key {
                        font-size: 0.85rem;
                        font-weight: 300;
                        margin-right: 5px;
                    }

                    .label-value {
                        font-size: 0.85rem;
                        letter-spacing: 0.07rem;
                        font-weight: 300;
                        font-family: verdana, arial, sans-serif;
                    }
                }
            }
        }

        .learn-self-graph {
            flex: 1;
            padding: 0 30px;
            margin-right: 10px;
            border: 1px solid rgb(233, 229, 229);
            background-color: rgba(255, 255, 255, 0.83);
            box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;
            border-radius: 5px;

            .category {
                margin: 30px 0;
                display: flex;
                flex-direction: column;

                .cat-data {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 5px;

                    .name {
                        font-size: 0.95rem;
                        font-weight: 500;
                    }

                    .completed {
                        display: flex;
                        align-items: center;

                        .text {
                            font-size: 0.7rem;
                            font-weight: 300;
                            color: grey;
                            margin: 0 7.5px;
                        }
                        .value {
                            font-size: 0.9rem;
                            font-weight: 400;
                            font-family: sans-serif;
                        }
                    }
                }

                .line {
                    height: 10px;
                    width: 100%;
                    border-radius: 50px;
                    background-color: #f1f6f1;
                    border: 1px solid #dbd5d5;
                }
            }
        }
    }

    p {
        font-size: 0.8rem;
        letter-spacing: 0.07rem;
    }
`;
