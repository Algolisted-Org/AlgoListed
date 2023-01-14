import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CCHeader from "../Components/CCHeader";
import LeftMenu from "../Components/LeftMenu";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { codingSheetsFilters } from "../Components/codingSheetsFilters";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import SimpleFooter from "../Components/SimpleFooter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MobileNavbar from "../Components/MobileNavbar";
import DoughnutChart from '../Components/DoughnutChart';
import Tooltip from '@material-ui/core/Tooltip';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import UpdateIcon from '@material-ui/icons/Update';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';

import {
	CircularProgressbar,
	buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const CodingSheets = () => {
	const [data, setData] = useState([]);
	const [solvedData, setSolvedData] = useState([]);
	const [dataLoading, setDataLoading] = useState(true);
	const [completedCount, setCompletedCount] = useState(0);
	const [showFilters, setShowFilters] = useState(false);
	const [sortedTopicTagsKeys, setSortedTopicTagsKeys] = useState([]);
	const [sortedTopicTagsValues, setSortedTopicTagsValues] = useState([]);
	const [difficulty, setDifficulty] = useState({});
	const [userDifficulty, setUserDifficulty] = useState({});
	const [difficultyPercentage, setDifficultyPercentage] = useState([0, 0, 0]);
	const [openVisualiser, setOpenVisualiser] = useState(true);
	const [toggleEffect, setToggleEffect] = useState(true);
	const [filteredData, setFilteredData] = useState(data);
	const [showTags, setShowTags] = useState(true);

	const [selectedLabel, setSelectedLabel] = useState('All');
	console.log(selectedLabel);
	console.log(data);

	const handleLabelClick = (label) => {
		setSelectedLabel(label);
	}

	const params = useParams();
	const { sheetname } = params;
	// console.log(sheetname);

	document.title = `Coding Sheets - Algolisted`;

	const allowedProblemTags = [
		"Array",
		"String",
		"Hash Table",
		"Dynamic Programming",
		"Math",
		"Sorting",
		"Greedy",
		"Depth-First Search",
		"Database",
		"Breadth-First Search",
		"Binary Search",
		"Tree",
		"Matrix",
		"Binary Tree",
		"Two Pointers",
		"Bit Manipulation",
		"Stack",
		"Heap (Priority Queue)",
		"Design",
		"Graph",
		"Prefix Sum",
		"Simulation",
		"Counting",
		"Backtracking",
		"Sliding Window",
		"Union Find",
		"Linked List",
		"Ordered Set",
		"Monotonic Stack",
		"Enumeration",
		"Recursion",
		"Trie",
		"Divide and Conquer",
		"Binary Search Tree",
		"Bitmask",
		"Queue",
		"Memoization",
		"Geometry",
		"Segment Tree",
		"Topological Sort",
		"Number Theory",
		"Hash Function",
		"Binary Indexed Tree",
		"Game Theory",
		"Data Stream",
		"Interactive",
		"String Matching",
		"Rolling Hash",
		"Shortest Path",
		"Combinatorics",
		"Randomized",
		"Brainteaser",
		"Monotonic Queue",
		"Merge Sort",
		"Iterator",
		"Concurrency",
		"Doubly-Linked List",
		"Probability and Statistics",
		"Quickselect",
		"Bucket Sort",
		"Suffix Array",
		"Minimum Spanning Tree",
		"Counting Sort",
		"Shell",
		"Line Sweep",
		"Reservoir Sampling",
		"Eulerian Circuit",
		"Radix Sort",
		"Strongly Connected Component",
		"Rejection Sampling",
		"Advanced Data Structure",
		"Algorithms",
		"BFS",
		"Data Structures",
		"circular-linked-list",
		"Biconnected Component"
	];

	useEffect(() => {
		// retrieve the data from the server
		axios
			// .get(`https://algolisted.cyclic.app/coding-sheets/sheet/${sheetname}`)
			.get(`https://algolisted.cyclic.app/coding-questions/question/${sheetname}`)
			.then((res) => {
				// retrieve the "completed" status of each sheet from the local storage
				let updatedData = res.data.map((sheet) => {
					const completed = localStorage.getItem(`completedSheetQuestion-${sheet._id}`);
					const marked = localStorage.getItem(`markedSheetQuestion-${sheet._id}`);
					return {
						...sheet,
						completed: completed === "true",
						marked: marked === "true",
					};
				});

				var solvedQuestions = [];
				let len = updatedData.length;
				for (let i = 0; i < len; i++) {
					if (updatedData[i].completed) solvedQuestions.push(updatedData[i]);
				}
				setSolvedData(solvedQuestions);

				// calculate the initial value of completedCount based on the "completed" status of the sheets in updatedData
				const initialCompletedCount = updatedData.reduce((acc, sheet) => {
					return acc + (sheet.completed ? 1 : 0);
				}, 0);
				setCompletedCount(initialCompletedCount);
				setData(updatedData);
				setDataLoading(false);
			})
			.catch((err) => console.log(err));
	}, [sheetname]);

	// console.log(data);

	const toggleCompleted = (id) => {
		// update the "completed" field for the coding sheet at the specified index
		const updatedData = [...data];
		let index = 0, len = data.length;
		
		for(; index < len; index++) {
			if(updatedData[index]._id == id) break;
		}

		updatedData[index].completed = !updatedData[index].completed;

		setCompletedCount(
			(prevCount) => prevCount + (updatedData[index].completed ? 1 : -1)
		);
		
		var solvedQuestions = [];
		for (let i = 0; i < len; i++) {
			if (updatedData[i].completed == true) solvedQuestions.push(updatedData[i]);
		}
		setSolvedData(solvedQuestions);
		setToggleEffect(!toggleEffect);

		// save the "completed" status of the sheet in the local storage
		localStorage.setItem(
			`completedSheetQuestion-${updatedData[index]._id}`,
			updatedData[index].completed
		);
	};

	const toggleMarked = (index) => {
		// update the "completed" field for the coding sheet at the specified index
		const updatedData = [...filteredData];
		updatedData[index].marked = !updatedData[index].marked;
		setFilteredData(updatedData);

		localStorage.setItem(
			`markedSheetQuestion-${updatedData[index]._id}`,
			updatedData[index].marked
		);
	};

	const progressBarPercent =
		data.length === 0 ? 0 : ((completedCount / data.length) * 100).toFixed(data.length > 100 ? 1 : 0);

	const filters = codingSheetsFilters.map((item) => {
		return (
			<a
				href={item.domainFilter}
				key={item.id}
				className={
					item.domainFilter === sheetname ? "filter selected" : "filter"
				}
			>
				{item.text}
			</a>
		);
	});


	// console.log(data);

	const colors = [
		'#FF877C', '#FF77A9', '#DF79EF', '#DF79EF', '#B085F5', '#8E99F3', '#7FD6FF', '#74E7FF', '#6FF9FF', '#63D8CB', '#98EE99', '#CFFF95', '#FFFF89'
	];

	// const colors = ["#de79ef", "#df6cf7", "#e061ff", "#e15754", "#e24d08", "#e3430c", "#e4390f", "#e53011", "#e6281a", "#e72122", "#e81b29", "#e91730", "#ea123c", "#eb0f4c", "#ec0c5e", "#ed0974", "#ee0695", "#ef03bb", "#f000e4", "#cfff95"];

	const borderColors = [
		'#fff'
	];

	var chartData = {
		title: { text: 'Chart Title', display: true },
		labels: sortedTopicTagsKeys.map((items) => { return (items) }),
		datasets: [{
			label: "Number of questions by Tag",
			data: sortedTopicTagsValues.map((items) => { return (items) }),
			backgroundColor: colors,
			borderColor: borderColors,
			borderWidth: 1,
		}],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	useEffect(() => { // finding unique tags
		let len = data.length;
		let ProblemsTags = [];
		for (let i = 0; i < len; i++) {
			let tagsLen = data[i].tags.length;
			for (let j = 1; j < tagsLen; j++) {
				ProblemsTags.push(data[i].tags[j]);
			}
		}

		// ProblemsTags = ProblemsTags.filter(string => string !== 'Amazon');

		const filteredTags = ProblemsTags.filter(tag => allowedProblemTags.includes(tag));
		ProblemsTags = filteredTags;

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
		Object.keys(elementCounts).sort((a, b) => elementCounts[b] - elementCounts[a]).forEach(function (key) {
			sortedElementCounts[key] = elementCounts[key];
		});

		const filteredCounts = {};
		let otherValue = 0;
		for (let key in sortedElementCounts) {
			if (sortedElementCounts[key] >= data.length * 0.015) {
				filteredCounts[key] = sortedElementCounts[key];
			} else {
				otherValue += sortedElementCounts[key];
			}
		}
		filteredCounts["others"] = otherValue;

		setSortedTopicTagsKeys(Object.keys(filteredCounts));
		setSortedTopicTagsValues(Object.values(filteredCounts));

		// setSortedTopicTagsKeys(Object.keys(sortedElementCounts));
		// setSortedTopicTagsValues(Object.values(sortedElementCounts));
	}, [data])


	useEffect(() => {
		let len = data.length;
		const elementCounts = {};
		elementCounts['Easy'] = 0;
		elementCounts['Medium'] = 0;
		elementCounts['Hard'] = 0;
		for (let i = 0; i < len; i++) {
			let element = data[i].tags[0];
			if (element != 'Easy' && element != 'Medium' && element != 'Hard') {
				element = data[i].specialTag;
			}
			if (element == 'Basic') element = 'Easy';
			if (elementCounts[element]) {
				elementCounts[element]++;
			} else {
				elementCounts[element] = 1;
			}
		}
		// console.log(elementCounts);
		setDifficulty(elementCounts);
	}, [data])

	const difficultyColors = ["#9ed0fa", "#ffb800", "#ef4643"];

	useEffect(() => {
		let len = solvedData.length;
		console.log(solvedData);
		const elementCounts = {};
		elementCounts['Easy'] = 0;
		elementCounts['Medium'] = 0;
		elementCounts['Hard'] = 0;

		for (let i = 0; i < len; i++) {
			let element = solvedData[i].tags[0];
			if (element != 'Easy' && element != 'Medium' && element != 'Hard') {
				element = solvedData[i].specialTag;
			}
			console.log(element);
			if (element == 'Basic') element = 'Easy';
			if (elementCounts[element]) {
				elementCounts[element]++;
			} else {
				elementCounts[element] = 1;
			}
		}

		// console.log(elementCounts);
		setUserDifficulty(elementCounts);
	}, [solvedData, data, toggleEffect])

	useEffect(() => {
		let num1 = (userDifficulty.Easy / difficulty.Easy) * 100;
		let num2 = (userDifficulty.Medium / difficulty.Medium) * 100;
		let num3 = (userDifficulty.Hard / difficulty.Hard) * 100;

		// console.log(num1, num2, num3);
		let difficultyPercentageArray = [];
		difficultyPercentageArray.push(num1.toFixed(2));
		difficultyPercentageArray.push(num2.toFixed(2));
		difficultyPercentageArray.push(num3.toFixed(2));
		// console.log(difficultyPercentageArray);

		setDifficultyPercentage(difficultyPercentageArray);
	}, [difficulty, userDifficulty])

	useEffect(() => {
		if (selectedLabel === 'All') {
			setFilteredData(data);
		} else {
			setFilteredData(
				data.filter(item => item.specialTag == selectedLabel || item.tags.includes(selectedLabel))
			);
		}
	}, [selectedLabel, data]);


	// console.log(userDifficulty);

	return (
		<GrandContainer>
			<MobContainer>
				<MobileNavbar />
				<div className="main-content">
					<h1 className="main-heading">Coding Sheets</h1>
					<p className="heading-supporter">
						Looking for a convenient way to access a variety of coding practice sheets from different sources? Look no further than Coding Sheets, a feature on the Algolisted website. Not only can you find a wide range of sheets all in one place, but the included analysis graphs make solving them even more enjoyable by allowing you to track your progress. Plus, a discussion section is coming soon to provide support and guidance as you work through each sheet. Happy coding!
					</p>

					<div className="data-filters">
						<div
							className="toggle-filter"
							onClick={() => setShowFilters(!showFilters)}
						>
							{showFilters ? (
								<>
									<div className="text">Hide Sheets</div>
									<ExpandLessIcon />
								</>
							) : (
								<>
									<div className="text">Select Sheet</div>
									<ExpandMoreIcon />
								</>
							)}
						</div>
					</div>

					{showFilters ? <Filters>{filters}</Filters> : <></>}

					<div className="mob-table">
						{dataLoading ? (
							<>
								<LinearProgress />
							</>
						) : (
							data.map((item, index) => {
								return (
									<div
										key={item.name}
										className={
											item.completed ? "link-row done-row" : "link-row"
										}
									>
										{" "}
										<div className="link-row-left">
											<div className="count">{index + 1}</div>
											<div className="main-row-content">
												<a
													href={item.quesLink}
													target="_blank"
													rel="noreferrer"
												>
													{item.quesName}
												</a>
												<div className="tags">
													{item.specialTag !== "-" ? (
														<div className="tag special-tag">
															{item.specialTag}
														</div>
													) : (
														<></>
													)}
													<div className="tag">
														{item.tags[0]}
													</div>
												</div>
											</div>
										</div>
										<div className="done-btn">
											<CheckCircleOutlineIcon
												onClick={() => toggleCompleted(item._id)}
											/>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
				<SimpleFooter />
			</MobContainer>
			<Container>
				<CCHeader />
				<LeftMenu marked={"coding-sheets"} />
				<div className="cc-middle-content">
					<h1 className="main-heading">Coding Sheets</h1>
					<p className="heading-supporter">
						Looking for a convenient way to access a variety of coding practice sheets from different sources? Look no further than Coding Sheets, a feature on the Algolisted website. Not only can you find a wide range of sheets all in one place, but the included analysis graphs make solving them even more enjoyable by allowing you to track your progress. Plus, a discussion section is coming soon to provide support and guidance as you work through each sheet. Happy coding!
					</p>
					<div className="message">
						<div className="icon"></div>
						<div className="text">
							As we continue to develop our platform, we do not currently require users to create accounts. As a result, any progress made is saved locally in your device's storage. Therefore, it's recommended to not clear your browser's cache.
						</div>
					</div>

					<Filters>{filters}</Filters>

					<SheetMessage>
						<div className="text">
							Hey there! With this tool, you can easily see a visual representation of the coding sheet you are working on and track your progress as you go. It also gives you an idea of the types of questions you can expect to find on the sheet. Cool, huh?
						</div>
						<div className="open-btn" onClick={() => setOpenVisualiser(!openVisualiser)}>
							{
								openVisualiser ? (
									<>
										<div className="desc">
											Close Visualiser
										</div>
										<ExpandLessIcon />
									</>
								) : (
									<>
										<div className="desc">
											Open Visualiser
										</div>
										<ExpandMoreIcon />
									</>
								)
							}
						</div>
						{
							openVisualiser ? (
								<VisualiserConatiner>
									<div className="visualiser-conatiner">
										<div className="canvas-container">
											<div className="top-label">
												<div className="label-item selected">Problem Tags in Sheet</div>
												<div className="label-item" onClick={() => alert("Under development, Men at work")}>Solved Tags</div>
											</div>
											<div className="canvas-graph">
												<DoughnutChart chartData={chartData} options={options}></DoughnutChart>
											</div>
											<div className="graph-labels">
												{
													sortedTopicTagsKeys.map((item, index) => {
														return (
															<div className="label" key={index}>
																<div className="color" style={{ "backgroundColor": `${colors[index]}` }}></div>
																<div className="label-key">{sortedTopicTagsKeys[index]} : </div>
																<div className="label-value">{sortedTopicTagsValues[index]}</div>
															</div>
														)
													})
												}
											</div>
										</div>
										<div className="learn-self-graph">
											<div className="top-label">
												<div className="label-item selected">Track Progress</div>
											</div>
											<div className="circular-chart">
												<CircularProgressbar
													value={progressBarPercent}
													text={`${progressBarPercent}%`}
													strokeWidth={5}
													styles={buildStyles({
														textColor: "red",
														textSize: "18px",
														pathColor: "orange",
														trailColor: "#f0f0f0"
													})}
												/>
											</div>
											<div className="category">
												<div className="cat-data">
													<div className="name">Easy</div>
													<div className="completed">
														<div className="text">Completed : </div>
														<div className="value">{userDifficulty.Easy} / {difficulty.Easy}</div>
													</div>
												</div>
												<div className="line">
													<div className="fill" style={{
														"width": `${difficultyPercentage[0]}%`,
														"backgroundColor": `${difficultyColors[0]}`
													}}></div>
												</div>
											</div>
											<div className="category">
												<div className="cat-data">
													<div className="name">Medium</div>
													<div className="completed">
														<div className="text">Completed : </div>
														<div className="value">{userDifficulty.Medium} / {difficulty.Medium}</div>
													</div>
												</div>
												<div className="line">
													<div className="fill" style={{
														"width": `${difficultyPercentage[1]}%`,
														"backgroundColor": `${difficultyColors[1]}`
													}}></div>
												</div>
											</div>
											<div className="category">
												<div className="cat-data">
													<div className="name">Hard</div>
													<div className="completed">
														<div className="text">Completed : </div>
														<div className="value">{userDifficulty.Hard} / {difficulty.Hard}</div>
													</div>
												</div>
												<div className="line">
													<div className="fill" style={{
														"width": `${difficultyPercentage[2]}%`,
														"backgroundColor": `${difficultyColors[2]}`
													}}></div>
												</div>
											</div>
										</div>
									</div>
								</VisualiserConatiner>
							) : (<></>)
						}

					</SheetMessage>

					<Progress>
						<div className="text">Progress : </div>
						<div className="value">{`${progressBarPercent}%`}</div>
						<div className="bar">
							<div
								className="fill"
								style={{ width: `${progressBarPercent}%` }}
							></div>
						</div>
					</Progress>

					<EffectiveFilter>
						<div className="left">
							<input type="checkbox" id="all" checked={selectedLabel === 'All'} onChange={() => handleLabelClick('All')} />
							<label htmlFor="all">All</label>
							<input type="checkbox" id="easy" checked={selectedLabel === 'Easy'} onChange={() => handleLabelClick('Easy')} />
							<label htmlFor="easy">Easy</label>
							<input type="checkbox" id="medium" checked={selectedLabel === 'Medium'} onChange={() => handleLabelClick('Medium')} />
							<label htmlFor="medium">Medium</label>
							<input type="checkbox" id="hard" checked={selectedLabel === 'Hard'} onChange={() => handleLabelClick('Hard')} />
							<label htmlFor="hard">Hard</label>
						</div>
						<div className="right">
							<div className="filter-item" onClick={() => setShowTags(!showTags)}>{showTags ? "Hide Problem Tags" : "Show Problem Tags"}</div>
							{/* <div className="filter-item">Show Unsolved</div>  */}
						</div>
					</EffectiveFilter>

					<div className="table">
						{dataLoading ? (
							<>
								<LinearProgress />
							</>
						) : (
							filteredData.map((item, index) => {
								return (
									<div
										key={index}
										className={
											item.marked ? (
												item.completed ? "review-row link-row done-row" : "review-row link-row"
											) : (
												item.completed ? "link-row done-row" : "link-row"
											)
										}
									>
										{" "}
										<div className="link-row-left">
											<div className="count">{index + 1}</div>
											<div className="main-row-content">
												<a
													href={item.quesLink}
													target="_blank"
													rel="noreferrer"
												>
													{item.quesName}
												</a>
												<div className="tags">
													{item.specialTag !== "-" ? (
														<div className="tag special-tag">
															{item.specialTag}
														</div>
													) : (
														<></>
													)}
													{item.tags.map((tagItem, tagIndex) => {
														if(showTags){
															return (
																<div className="tag" key={tagIndex}>
																	{tagItem}
																</div>
															)
														}
														else {
															return <></>
														}
													})}
												</div>
											</div>
										</div>
										<div className="right-icons">
											<Tooltip title={item.completed ? "Mark as Uncompleted" : "Mark as Completed"}>
												<div className="done-btn">
													<CheckCircleOutlineIcon
														onClick={() => toggleCompleted(item._id)}
													/>
												</div>
											</Tooltip>
											<Tooltip title={item.marked ? "Unmark" : "Mark for Later"}>
												<div className="review-btn">
													<UpdateIcon
														onClick={() => toggleMarked(index)}
													/>
												</div>
											</Tooltip>
										</div>
									</div>
								);
							})
						)}
					</div>
					{data.length === 0 ? <GiveSpace></GiveSpace> : <></>}
					<SimpleFooter />
				</div>
			</Container>
		</GrandContainer>
	);
};

export default CodingSheets;

const GrandContainer = styled.div``;

const MobContainer = styled.div`
	width: 100vw;
	padding-top: 60px;

	.main-content {
		padding: 10px 15px;

		.main-heading {
			font-size: 1.25rem;
			font-weight: 600;
			color: #292929;
			margin-bottom: 5px;
		}

		.heading-supporter {
			font-size: 0.85rem;
			margin-bottom: 10px;
			font-weight: 400;
			color: #696168;

			a {
				color: #18489f;
				font-size: 0.75rem;
				font-weight: 300;
				margin-left: 0.25rem;
			}
		}

		.data-filters {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 30px 0 10px 0;
			position: relative;

			.toggle-filter {
				width: 120px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 500px;
				font-weight: 300;
				padding: 5px 15px;
				font-size: 0.7rem;
				background-color: white;
				border: 1px solid rgb(185, 175, 175);
				box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;

				.text {
					/* color: #ebdddd; */
				}

				svg {
					font-size: 1.15rem;
					/* fill: #ebdddd; */
					margin-right: -4px;
				}
			}

			.sort {
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 500px;
				padding: 5px;
				background-color: white;
				border: 1px solid rgb(185, 175, 175);
				box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;

				svg {
					font-size: 1.15rem;
				}
			}

			.sort-type {
				position: absolute;
				top: 35px;
				right: -5px;
				background-color: white;
				border: 1px solid rgb(185, 175, 175);
				box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
				padding: 5px 10px;
				border-radius: 5px;
				display: none;
				z-index: 100;

				.item {
					font-size: 0.7rem;
					padding: 2.5px 0;
				}
			}

			.open {
				display: inline;
			}
		}

		.mob-table {
			margin: 15px 0;
			width: 100%;
			/* background-color: #fbf7f7; */
			border: 1px solid #d1d5db;
			border-radius: 5px;
			/* padding: 0 15px; */
			display: flex;
			flex-direction: column;
			background-color: white;
			border-bottom-color: transparent;

			.link-row {
				padding: 20px 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				border-bottom: 1px solid #d1d5db;

				.link-row-left {
					display: flex;
					align-items: center;

					.count {
						font-size: 1rem;
						font-family: Inter var, ui-sans-serif, system-ui, -apple-system,
							BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
							Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji,
							Segoe UI Symbol, Noto Color Emoji;
						margin-right: 20px;
						font-weight: 500;
					}

					.main-row-content {
						a {
							font-size: 0.85rem;
							font-weight: 500;
							text-decoration: none;
							/* color: inherit; */

							&:hover {
								text-decoration: underline;
							}
						}

						.tags {
							margin: 0;
							margin-top: 5px;
							display: flex;
							flex-wrap: wrap;

							.tag {
								background-color: #f3f4f7;
								color: inherit;
								padding: 2.5px 5px;
								border-radius: 100px;
								font-size: 0.6rem;
								margin-right: 5px;
								border: 1px solid #cac3c3;
								margin-bottom: 2.5px;
							}

							.special-tag {
								/* background-color: #ffeac2; */
								color: inherit;
								/* background-color: black; */
								/* color: white; */
								font-weight: 400;
								border: 1px solid #a99c9c;
							}
						}
					}
				}

				.done-btn {
					.MuiSvgIcon-root {
						fill: #b5a6a6;
						font-size: 1.75rem;

						&:hover {
							transition-duration: 250ms;
							fill: orange;
							cursor: pointer;
						}
					}
				}
			}

			.done-row {
				background-color: #dcf8eb;

				.done-btn {
					.MuiSvgIcon-root {
						fill: orange;
						font-size: 1.75rem;
					}
				}
			}

			.no-bottom-border {
				border-bottom: 1px solid transparent;
			}
		}
	}

	@media only screen and (min-width: 1100px) {
		display: none;
	}
`;

const Container = styled.div`
	@media only screen and (max-width: 1099px) {
		display: none;
	}

	display: flex;
	justify-content: space-between;
	padding-left: 200px;

	a {
		color: #18489f;
	}

	.cc-middle-content {
		min-height: 100vh;
		width: 100%;
		/* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
		padding: 80px 120px 30px 120px;
		position: relative;
		width: 100%;
		max-width: 1360px;
		min-width: 850px;
		margin: auto;

		@media only screen and (max-width: 1200px) {
			padding: 80px 50px 30px 50px;
		}

		.main-heading {
			font-size: 1.65rem;
			font-weight: 600;
			color: #292929;
		}

		.heading-supporter {
			font-size: 1.05rem;
			margin-bottom: 10px;
			font-weight: 400;
			color: #696168;

			a {
				color: #18489f;
				font-size: 0.95rem;
				font-weight: 300;
				margin-left: 0.25rem;
			}
		}

		.message {
			display: inline-block;
			/* display: flex; */
			/* align-items: center; */
			background-color: #d5f7e1;
			border-radius: 5px;
			padding: 10px;
			margin: 20px 0 10px 0;

			.text {
				font-size: 0.8rem;
				color: #13803b;
				font-weight: 300;
			}
		}

		.table {
			margin: 15px 0;
			width: 100%;
			/* background-color: #fbf7f7; */
			border: 1px solid #d1d5db;
			border-radius: 5px;
			/* padding: 0 15px; */
			display: flex;
			flex-direction: column;
			background-color: white;
			border-bottom-color: transparent;

			.link-row {
				padding: 20px 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				border-bottom: 1px solid #d1d5db;

				.link-row-left {
					display: flex;
					align-items: center;

					.count {
						font-size: 1.25rem;
						font-family: Inter var, ui-sans-serif, system-ui, -apple-system,
							BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
							Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji,
							Segoe UI Symbol, Noto Color Emoji;
						margin-right: 20px;
						font-weight: 500;
						width: 32.5px;
						text-align: center;
					}

					.main-row-content {
						a {
							font-size: 0.9rem;
							font-weight: 500;
							text-decoration: none;
							/* color: inherit; */

							&:hover {
								text-decoration: underline;
							}
						}

						.tags {
							margin: 0;
							display: flex;
							flex-wrap: wrap;

							.tag {
								background-color: #f3f4f7;
								color: inherit;
								padding: 2.5px 7.5px;
								border-radius: 100px;
								font-size: 0.7rem;
								margin-top: 5px;
								margin-right: 5px;
								border: 1px solid #cac3c3;
							}

							.special-tag {
								/* background-color: #ffeac2; */
								color: inherit;
								/* background-color: black; */
								/* color: white; */
								font-weight: 500;
								border: 1px solid #111;
							}
						}
					}
				}

				.right-icons{
					display: flex;
					align-items: center;

					.done-btn {
						.MuiSvgIcon-root {
							fill: #b5a6a6;
							font-size: 2rem;
	
							&:hover {
								transition-duration: 250ms;
								fill: orange;
								cursor: pointer;
							}
						}
					}

					.review-btn {
						.MuiSvgIcon-root {
							fill: #b5a6a6;
							font-size: 2rem;
							margin-left: 10px;
	
							&:hover {
								transition-duration: 250ms;
								fill: #cf5f5f;
								cursor: pointer;
							}
						}
					}
				}

			}

			.done-row {
				background-color: #dcf8eb;
				
				.right-icons{
					display: flex;
					
					.done-btn {
						.MuiSvgIcon-root {
							fill: orange;
						}
					}
				}
			}

			.review-row {
				background-color: #ffe3e2;
				border-radius: 0;
				
				.right-icons{
					display: flex;

					.review-btn {
						.MuiSvgIcon-root {
							fill: #cf5f5f;
						}
					}
				}
			}
			
			.no-bottom-border {
				border-bottom: 1px solid transparent;
			}
		}
	}
`;

const Filters = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 80px 0 10px 0;

	.filter {
		padding: 7.5px 15px;
		font-size: 0.8rem;
		border: 1px solid #b9afaf;
		border-radius: 500px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
		color: inherit;

		&:hover {
			border-color: #201f1f;
			background-color: #201f1f;
			color: #ebdddd;
			transition-duration: 250ms;
			cursor: pointer;
		}
	}

	.selected {
		/* background-color: #ded7d7;
    color: #111; */
		border-color: #201f1f;
		background-color: #201f1f;
		color: #ebdddd;
	}

	@media only screen and (max-width: 1100px) {
		margin: 10px 0 10px 0;

		.filter {
			padding: 5px 15px;
			font-size: 0.7rem;
			margin: 0px 5px 5px 0px;
		}

		.selected {
			/* background-color: #ded7d7;
      color: #111; */
			border-color: #201f1f;
			background-color: #201f1f;
			color: #ebdddd;
		}
	}
`;

const Progress = styled.div`
	display: flex;
	align-items: center;
	margin: 30px 0 0 0;

	.text {
		font-size: 0.9rem;
		font-weight: 500;
	}

	.value {
		margin: 0 10px;
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: 0.15rem;
		padding: 5px 10px;
		width: 70px;
		text-align: center;
		background-color: #f3f4f7;
		border-radius: 50px;
	}

	.bar {
		/* width: 400px; */
		height: 10px;
		border-radius: 100px;
		background-color: whitesmoke;
		border: 1px solid pink;
		flex: 1;
		overflow: hidden;

		.fill {
			transition: width 0.25s linear;
			height: 100%;
			border-radius: 100px;
			background-color: #ffa500;
		}
	}
`;

const SheetMessage = styled.div`
	padding: 10px;
	margin: 20px 0 0px 0;
	/* border: 1px solid black; */
	border-radius: 5px;
	/* background-color: #c9e8ff; */
	background-color: #f0f0f0;

	.text {
		font-size: 0.8rem;
	}

	.open-btn{
		display: flex;
		align-items: center;
		cursor: pointer;
		
		font-size: 0.8rem;
		font-weight: 500;
		margin-top: 15px;
	}
`;

const GiveSpace = styled.div`
	margin-bottom: 40vh;
`;

const VisualiserConatiner = styled.div`
	margin: 10px 0 0 0;
    .visualiser-conatiner{
        display: flex;
		align-items: stretch;
        justify-content: space-between;
        
        .canvas-container{
            border: 1px solid #d1d5db;
            background-color: rgba(255, 255, 255, 0.83);
            box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;
            border-radius: 5px;
            padding: 50px 10px 10px 50px;
            width: 65%;
            position: relative;
    
            display: flex;
            align-items: center;
            justify-content: space-between;
    
            .canvas-graph{
                width: 45%;
                display: inline;
                /* border: 1px solid black; */
            }
    
            .graph-labels{
                display: flex;
                flex-direction: column;
				height: 220px;
				overflow-y: scroll;
				padding: 0 20px;

				::-webkit-scrollbar {
					width: 2px;
				}
				
				::-webkit-scrollbar-track {
					background-color: #f0e9e9;
					border-left: 1px solid #e9e5e5;
				}
				
				::-webkit-scrollbar-thumb {
					background-color: #335ddc;
					border-radius: 100px;
				}


    
                .label{
                    display: flex;
                    align-items: center;
					flex-wrap: wrap;
					margin: 1px 0;
    
                    .color{
                        height: 15px;
                        width: 15px;
                        /* border-radius: 2px; */
                        background-color: cornflowerblue;
                        margin-right: 10px;
                        border: 0.5px solid #444;
                    } 
    
                    .label-key{
                        font-size: 0.7rem;
                        font-weight: 500;
                        margin-right: 5px;
                    }
    
                    .label-value{
                        font-size: 0.8rem;
                        letter-spacing: 0.07rem;
                        font-weight: 300;
                        font-family: verdana,arial,sans-serif;
                    }
                }
            }
        }
        
        .learn-self-graph{
			flex-grow: 1;
            padding: 10px 30px;
            margin-left: 7.5px;
            border: 1px solid #d1d5db;
            background-color: rgba(255, 255, 255, 0.83);
            box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;
            border-radius: 5px;
			position: relative;
			
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
			
            .category{
                margin-top: 20px;
                display: flex;
                flex-direction: column;
				justify-content: center;
                width: 100%;

                .cat-data{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 5px;
    
                    .name{
                        font-size: 0.9rem;
                        font-weight: 500;
                    }
    
                    .completed{
                        display: flex;
                        align-items: center;
    
                        .text{
                            font-size: 0.7rem;
                            font-weight: 300;
                            color: grey;
                            margin: 0 7.5px;
                        }
                        .value{
                            font-size: 0.9rem;
                            font-weight: 400;
                            font-family: sans-serif;
                        }
                    }
                }
    
                .line{
                    height: 7.5px;
                    width: 100%;
                    border-radius: 50px;
                    background-color: #f1f6f1;
                    border: 1px solid #dbd5d5;
					overflow: hidden;

					.fill{
						background-color: #b5b3b0;
						height: 100%;
						border-radius: 50px;
					}
                }
            }
			
			.circular-chart{
				width: 80px;
			}
        }

		.top-label{
			position: absolute;
			display: flex;
			top: 10px;
			left: 10px;
			
			.label-item{
				padding: 5px 10px;
				font-size: 0.7rem;
				border: 1px solid #d0d5db;
				border-radius: 3px;
				margin-right: 5px;
				cursor: pointer;
			}
			
			.selected{
				background-color: #f0f0f0;
			}
		}
    }

    
    
    p{
        font-size: 0.8rem;
        letter-spacing: 0.07rem;
    }
`

const EffectiveFilter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;

	.left{
		display: flex;
		justify-content: space-between;
		align-items: center;

		label{
			font-size: 0.75rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 15px;
			font-weight: 400;
		}
		
		input{
			cursor: pointer;
			margin-right: 5px;
		}

		input[type="checkbox"]:checked + label {
			color: #333;
		}
		/* Change the color of the checkboxes when they are not selected */
		input[type="checkbox"] + label {
			color: gray;
		}
	}

	.right{
		display: flex;
		align-items: center;

		.filter-item{
			padding: 5px 10px;
			font-size: 0.7rem;
			border: 1px solid #d0d5db;
			border-radius: 3px;
			margin-right: 5px;
			cursor: pointer;
		}
	}
`