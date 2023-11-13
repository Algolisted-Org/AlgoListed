import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
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
import CreateIcon from '@material-ui/icons/Create';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import { Link as RouterLink } from 'react-router-dom';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LockIcon from '@material-ui/icons/Lock';
import problemsData from '../DummyDB/InterviewSummaries/LcProblems.json';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const CodingSheets = () => {
	const [data, setData] = useState([]);
	const [solvedData, setSolvedData] = useState([]);
	const [dataLoading, setDataLoading] = useState(true);
	const [completedCount, setCompletedCount] = useState(0);
	const [showFilters, setShowFilters] = useState(false);
	const [sortedTopicTagsKeys, setSortedTopicTagsKeys] = useState([]);
	const [sortedTopicTagsValues, setSortedTopicTagsValues] = useState([]);
	const [sortedSolvedTopicTagsKeys, setSortedSolvedTopicTagsKeys] = useState([]);
	const [sortedSolvedTopicTagsValues, setSortedSolvedTopicTagsValues] = useState([]);
	const [difficulty, setDifficulty] = useState({});
	const [userDifficulty, setUserDifficulty] = useState({});
	const [difficultyPercentage, setDifficultyPercentage] = useState([0, 0, 0]);
	const [openVisualiser, setOpenVisualiser] = useState(false);
	const [toggleEffect, setToggleEffect] = useState(true);
	const [filteredData, setFilteredData] = useState(data);
	const [showTags, setShowTags] = useState(true);
	const [showSolvedChart, setShowSolvedChart] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState('All');
	const [OwnerInformation, setOwnerInformation] = useState(null);
	const [github, setGithub] = useState('');
	const [instagram, setInstagram] = useState('');
	const [linkedin, setLinkedin] = useState('');
	const [name, setName] = useState('');
	const [profilePictureURL, setProfilePictureURL] = useState('');
	const [twitter, setTwitter] = useState('');
	const [youtube, setYoutube] = useState('');
	const [ownerId, setOwnerId] = useState(null);
	const [sheetName, setSheetName] = useState("");
	const [sheetDesc, setSheetDesc] = useState("");
	const [needDarkMode, setNeedDarkMode] = useState(!false);

	useEffect(() => {
		let selectedTheme = localStorage.getItem("selectedTheme");
		if (selectedTheme === 'dark') setNeedDarkMode(true);
		if (selectedTheme === 'light') setNeedDarkMode(false);
	}, [])
	console.log("needDarkMode : ", needDarkMode);

	const toggleDarkMode = () => {
		setNeedDarkMode(!needDarkMode);
	};


	// console.log(selectedLabel);
	// console.log(data);

	const handleLabelClick = (label) => {
		setSelectedLabel(label);
	}

	const params = useParams();
	const { sheetId } = params;
	console.log('sheetId : ', sheetId);

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

	useEffect(async () => {
		try {
			const sheetDetailsResponse = await axios.get(`/problem-sheets/details?sheetId=${sheetId}`);
			const sheetData = sheetDetailsResponse.data.sheet;

			setSheetName(sheetData.sheetName);
			setSheetDesc(sheetData.sheetDesc);

			const problemIds = sheetData.problemIds;

			const scrapedProblems = [];

			for (let i = 0; i < problemIds.length; i++) {
				const problemId = problemIds[i];
				const scrapedProblemData = problemsData[problemId];

				if (scrapedProblemData) {
					scrapedProblems.push(scrapedProblemData);
				}
			}

			console.log("scrapedProblems:", scrapedProblems);

			const updatedData = scrapedProblems.map((sheet) => {
				const sheetLink = sheet.quesLink;
				const completed = localStorage.getItem(`completedSheetQuestion-${sheetLink}`);
				const marked = localStorage.getItem(`markedSheetQuestion-${sheetLink}`);
				return {
					...sheet,
					completed: completed === "true",
					marked: marked === "true",
				};
			});

			console.log("updatedData:", updatedData);

			const solvedQuestions = updatedData.filter((sheet) => sheet.completed);
			setSolvedData(solvedQuestions);

			const initialCompletedCount = updatedData.reduce((acc, sheet) => {
				return acc + (sheet.completed ? 1 : 0);
			}, 0);
			setCompletedCount(initialCompletedCount);
			setData(updatedData);
			setDataLoading(false);

			const sheetOwnerId = sheetData.ownerId;

			console.log(sheetOwnerId);

			try {
				const response = await fetch(`/user-details/profile-details/?ownerId=${sheetOwnerId}`);

				if (response.ok) {
					const data = await response.json();
					console.log("data.user:", data.user);

					setOwnerInformation(data.user);
					setOwnerId(data.user._id);
					setGithub(data.user.github);
					setInstagram(data.user.instagram);
					setLinkedin(data.user.linkedin);
					setName(data.user.name);
					setProfilePictureURL(data.user.profilePictureURL);
					setTwitter(data.user.twitter);
					setYoutube(data.user.youtube);
				} else {
					console.error('Failed to fetch data');
				}
			} catch (error) {
				console.error('Error:', error);
			}
		} catch (error) {
			console.error('Error fetching sheet data:', error);
		}
	}, [sheetId]);


	// console.log(data);

	const toggleCompleted = (quesLink) => {
		// update the "completed" field for the coding sheet at the specified index
		const updatedData = [...data];
		let index = 0, len = data.length;

		for (; index < len; index++) {
			if (updatedData[index].quesLink == quesLink) break;
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
			`completedSheetQuestion-${updatedData[index].quesLink}`,
			updatedData[index].completed
		);
	};

	const toggleMarked = (index) => {
		// update the "completed" field for the coding sheet at the specified index
		const updatedData = [...filteredData];
		updatedData[index].marked = !updatedData[index].marked;
		setFilteredData(updatedData);

		localStorage.setItem(
			`markedSheetQuestion-${updatedData[index].quesLink}`,
			updatedData[index].marked
		);
	};

	const progressBarPercent = data.length === 0 ? 0 : ((completedCount / data.length) * 100).toFixed(data.length > 100 ? 1 : 0);

	const colors = [
		"#438194",
		"#478295",
		"#4b8496",
		"#4f8597",
		"#538798",
		"#578999",
		"#5b8b9a",
		"#5f8c9b",
		"#638d9c",
		"#678f9d",
		"#6b909e",
		"#6f919f",
		"#7393a0",
		"#7794a1",
		"#7b95a2",
		"#7f96a3",
		"#8398a4",
		"#8799a5",
		"#8b9aa6",
		"#8f9ca7",
		"#939da8",
		"#979ea9",
		"#9ba0aa",
		"#9fa1ab",
		"#a3a2ac",
		"#a7a4ad",
		"#aba5ae",
		"#afa6af",
		"#b3a8b0",
		"#b7a9b1",
		"#bbaab2",
		"#bfacb3",
		"#c3adb4",
		"#c7aeb5",
		"#cba0b6",
		"#cfa1b7",
		"#ff7d7c"
	]

	// const colors = [
	// 	"#a9d18f",
	// 	"#aac292",
	// 	"#acc496",
	// 	"#adc699",
	// 	"#aec99c",
	// 	"#b0cca0",
	// 	"#b1cfa3",
	// 	"#b2d2a6",
	// 	"#b4d5aa",
	// 	"#b5d8ad",
	// 	"#b6dbb0",
	// 	"#b8deb4",
	// 	"#b9e1b7",
	// 	"#bae4ba",
	// 	"#bce7be",
	// 	"#bdeac1",
	// 	"#bfebce",
	// 	"#c1eeda",
	// 	"#c3f1e7",
	// 	"#c4f4f4",
	// 	"#c6f7f0",
	// 	"#c7fafd",
	// 	"#c9fdfa",
	// 	"#cafeee",
	// 	"#ccf9e2",
	// 	"#cdf6d7",
	// 	"#cff3cc",
	// 	"#d0f0c1",
	// 	"#d2edb6",
	// 	"#d3eaab",
	// 	"#d5e7a0",
	// 	"#d6e495",
	// 	"#d7e18a",
	// 	"#d9de7f",
	// 	"#dadb74",
	// 	"#dcd869",
	// 	"#dde55e",
	// 	"#dfe253",
	// 	"#e0df48",
	// 	"#e2dc3d",
	// 	"#e3d932",
	// 	"#e5d627",
	// 	"#e6d31c",
	// 	"#e7d111",
	// 	"#e9ce06",
	// 	"#eadb00",
	// 	"#ebd900",
	// 	"#eddd00",
	// 	"#eeda00",
	// 	"#f0d700",
	// 	"#f1d400",
	// 	"#f3d100",
	// 	"#dfebf7"
	// ]

	const borderColors = [
		"#000"
	];

	var chartData = {
		title: { text: 'Chart Title', display: true },
		labels: sortedTopicTagsKeys.map((items) => { return (items) }),
		datasets: [{
			label: "Number of questions by Tag",
			data: sortedTopicTagsValues.map((items) => { return (items) }),
			backgroundColor: colors,
			borderColor: borderColors,
			borderWidth: 0.25,
		}],
	};

	var chartDataSolved = {
		title: { text: 'Chart Title', display: true },
		labels: sortedSolvedTopicTagsKeys.map((items) => { return (items) }),
		datasets: [{
			label: "Number of questions by Tag",
			data: sortedSolvedTopicTagsValues.map((items) => { return (items) }),
			backgroundColor: colors,
			borderColor: borderColors,
			borderWidth: 0.25,
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
		// console.log(solvedData);
		const elementCounts = {};
		elementCounts['Easy'] = 0;
		elementCounts['Medium'] = 0;
		elementCounts['Hard'] = 0;

		for (let i = 0; i < len; i++) {
			let element = solvedData[i].tags[0];
			if (element != 'Easy' && element != 'Medium' && element != 'Hard') {
				element = solvedData[i].specialTag;
			}
			// console.log(element);
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
		console.log("I was clicked");
		if (selectedLabel === 'All') {
			console.log("Mark 1");
			setFilteredData(data);
		} else {
			console.log("Mark 2");
			console.log(data);
			setFilteredData(
				data.filter(item => item.specialTag == selectedLabel || item.tags.includes(selectedLabel))
			);
			console.log(filteredData);
		}
	}, [selectedLabel, data]);

	useEffect(() => { // finding unique tags
		let len = solvedData.length;
		let ProblemsTags = [];
		for (let i = 0; i < len; i++) {
			let tagsLen = solvedData[i].tags.length;
			for (let j = 0; j < tagsLen; j++) {
				ProblemsTags.push(solvedData[i].tags[j]);
			}
		}
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
		// let otherValue = 0;
		for (let key in sortedElementCounts) {
			filteredCounts[key] = sortedElementCounts[key];

			// if (sortedElementCounts[key] >= data.length * 0.015) {
			// 	filteredCounts[key] = sortedElementCounts[key];
			// } else {
			// 	otherValue += sortedElementCounts[key];
			// }
		}
		// filteredCounts["others"] = otherValue;

		setSortedSolvedTopicTagsKeys(Object.keys(filteredCounts));
		setSortedSolvedTopicTagsValues(Object.values(filteredCounts));
	}, [solvedData])

	// console.log(sortedSolvedTopicTagsKeys);

	return (
		<GrandContainer>
			{/* <MobContainer>
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

					<Progress>
						<div className="value">{`${progressBarPercent}%`}</div>
						<div className="bar">
							<div
								className="fill"
								style={{ width: `${progressBarPercent}%` }}
							></div>
						</div>
					</Progress>

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
												onClick={() => toggleCompleted(item.quesLink)}
											/>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
				<SimpleFooter />
			</MobContainer> */}
			<Container needDarkMode={needDarkMode}>
				{
					needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
				}
				{
					needDarkMode ? <LeftMenuDark marked={"create-problem-list"} /> : <LeftMenu marked={"create-problem-list"} />
				}
				<div className="cc-middle-content">
					<div className="sheet-details">
						<div className="owner-detail-main">
							<div className="owner-details">
								<img className="owner-pic" src={profilePictureURL} alt="" />
							</div>
						</div>
						<div className="sheet-detail-main">
							<h1 className="main-heading">{sheetName}</h1>
							<p className="heading-supporter">
								{sheetDesc}
							</p>
							<div className="imp-links">
								<div className="other-links">
									<a href={github}><img src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png" alt="" /></a>
									<a href={github}><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="" /></a>
									<a href={github}><img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052" alt="" /></a>
									<div className="text">Follow <b>@{name}</b> for Updates</div>
								</div>
								<div className="other-links-2">
									<VisibilityIcon />
									<div className="text">Views <b>286</b></div>
								</div>
								<div className="other-links-2">
									<StarBorderIcon />
									<div className="text">Starred <b>36</b></div>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="message">
						<div className="icon"></div>
						<div className="text">
							As we continue to develop our platform, we do not currently require users to create accounts. As a result, any progress made is saved locally in your device's storage. Therefore, it's recommended to not clear your browser's cache.
						</div>
					</div> */}
					<Filters needDarkMode={needDarkMode}>
						<a href="/custom-coding-sheets/create" className="filter2">
							Make your own Custom Problem Sheet
							<CallMadeIcon />
							<div className="tag">New Feature 🔥</div>
						</a>
					</Filters>

					<SheetMessage needDarkMode={needDarkMode}>
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
								<VisualiserConatiner needDarkMode={needDarkMode}>
									<div className="visualiser-conatiner">
										<div className="canvas-container">
											<div className="top-label">
												<div className={showSolvedChart ? "label-item" : "label-item selected"} onClick={() => setShowSolvedChart(false)}>Problem Tags in Sheet</div>
												<div className={!showSolvedChart ? "label-item" : "label-item selected"}
													onClick={solvedData.length > 0 ? () => setShowSolvedChart(true) : () => alert("You need to solve atleast one problem to use this feature.")}
												>Solved Tags</div>
											</div>
											{
												showSolvedChart ? (
													<>
														<div className="canvas-graph">

															<DoughnutChart chartData={chartDataSolved} options={options}></DoughnutChart>
														</div>
														<div className="graph-labels">
															{
																sortedSolvedTopicTagsKeys.map((item, index) => {
																	return (
																		<div className="label" key={index}>
																			<div className="color" style={{ "backgroundColor": `${colors[index]}` }}></div>
																			<div className="label-key">{sortedSolvedTopicTagsKeys[index]} : </div>
																			<div className="label-value">{sortedSolvedTopicTagsValues[index]}</div>
																		</div>
																	)
																})
															}
														</div>
													</>
												) : (
													<>
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
													</>
												)
											}

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
														textColor: needDarkMode ? 'white' : 'black',
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

					<Progress needDarkMode={needDarkMode}>
						<div className="text">Progress : </div>
						<div className="value">{`${progressBarPercent}%`}</div>
						<div className="bar">
							<div
								className="fill"
								style={{ width: `${progressBarPercent}%` }}
							></div>
						</div>
					</Progress>

					<EffectiveFilter needDarkMode={needDarkMode}>
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
						</div>
					</EffectiveFilter>

					{
						filteredData.length != data.length ?
							<div className="notice">Note : Unclicking a tag may not work. Try deselecting all, then select the filter collection.</div> :
							<div></div>
					}

					<div className="table">
						{dataLoading ? (
							<>
								<LinearProgress />
							</>
						) : (
							filteredData.length === 0 ? <></> : filteredData.map((item, index) => {
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
														if (showTags) {
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
														onClick={() => toggleCompleted(item.quesLink)}
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
											{/* <Tooltip title="Notes">
												<div className="review-btn">
													<CreateIcon/>
												</div>
											</Tooltip> */}
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
			/* border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')}; */
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

    background-color: ${(props) => (props.needDarkMode ? '#313338' : 'transparent')};

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

		.main-heading{
          font-size: 1.65rem;
          font-weight: 600;
          color: ${(props) => (props.needDarkMode ? '#e5e6e8' : '#292929')};
      }

	  .sheet-details{
	display: flex;
	align-items: center;

	.owner-detail-main{
		.owner-pic{
			height: 120px;
			width: 120px;
			border-radius: 100px;
			margin-right: 20px;
			border: 1px solid #d1d5db;
			background-color: #e5e5e5;
			padding: 5px;
		}
	}
	
	.sheet-detail-main{
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		.main-heading {
			font-size: 1.65rem;
			font-weight: 600;
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#292929')};
		}

		.heading-supporter {
			font-size: 1.05rem;
			margin-bottom: 10px;
			font-weight: 400;
			color: ${(props) => (props.needDarkMode ? '#c3bcbc' : '#696168')};

			a {
				color: #18489f;
				font-size: 0.95rem;
				font-weight: 300;
				margin-left: 0.25rem;
			}
		}

		.imp-links{
			display: flex;
			margin-top: 20px;

			.other-links{
				height: 40px;
				display: flex;
				align-items: center;
				padding: 0 15px 0 15px;
				background-color: #f3f1f1;
				border-radius: 10px;
				margin-right: 10px;
				border: 1px solid #d1d5db;

				img{
					height: 15px;
					margin-right: 15px;
				}

				.text{
					font-size: 0.7rem;
					border-left: 1px solid black;
					padding-left: 10px;
				}
			}

			.other-links-2{
				cursor: pointer;
				height: 40px;
				display: flex;
				align-items: center;
				padding: 0 15px 0 15px;
				background-color: #f3f1f1;
				border-radius: 10px;
				margin-right: 10px;
				border: 1px solid #d1d5db;

				img{
					height: 15px;
					margin-right: 15px;
				}

				svg{
					font-size: 1.25rem;
					margin-right: 15px;
				}

				.text{
					display: flex;
					align-items: center;
					height: 100%;
					font-size: 0.7rem;
					padding-left: 15px;
					border-left: 1px solid #d1d5db;

					b{
						padding: 2.5px 7.5px;
						/* border: 1px solid black; */
						margin-left: 5px;
						border-radius: 100px;
						font-weight: 600;
						background-color: #d1d5db;
					}
				}
			}
		}

		}
	}

      .heading-supporter{
          font-size: 1.05rem;
          margin-bottom: 10px;
          font-weight: 400;
          color: ${(props) => (props.needDarkMode ? '#ffffffa6' : '#696168')};

          a{
            color: ${(props) => (props.needDarkMode ? '#18489f' : '#18489f')};
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          }
      }

      .message{
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: ${(props) => (props.needDarkMode ? '#444754' : '#d5f7e1')};
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 50px 0;

        .text{
            font-size: 0.8rem;
            color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#13803b')};
            font-weight: 300;

            b{
                font-weight: 500;
                color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#13803b')};
            }
        }
      }

		.notice{
			font-size: 0.8rem;
			font-weight: 500;
		}

		.table {
			margin: 15px 0;
			width: 100%;
			/* background-color: #fbf7f7; */
			/* border: 1px solid #d1d5db; */
			border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
			border-radius: 5px;
			/* padding: 0 15px; */
			display: flex;
			flex-direction: column;
			background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#fff')};
			border-bottom-color: transparent;

			.link-row {
				padding: 20px 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				border-bottom: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};

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
						color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
					}

					.main-row-content {
						a {
							font-size: 0.9rem;
							font-weight: 500;
							text-decoration: none;
							/* color: inherit; */
							color: ${(props) => (props.needDarkMode ? 'cornflowerblue' : '#18489f')};

							&:hover {
								text-decoration: underline;
							}
						}

						.tags {
							margin: 0;
							display: flex;
							flex-wrap: wrap;

							.tag {
								/* background-color: #f3f4f7; */
								/* color: inherit; */
								padding: 2.5px 7.5px;
								border-radius: 100px;
								font-size: 0.7rem;
								margin-top: 5px;
								margin-right: 5px;
								/* border: 1px solid #cac3c3; */
								border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(202, 195, 195)')};
								color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
								background-color: ${(props) => (props.needDarkMode ? '#2b2b2b' : '#f3f4f7')};
							}

							.special-tag {
								/* background-color: #ffeac2; */
								/* background-color: black; */
								/* color: white; */
								font-weight: 500;
								border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#111')};
								color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
								/* background-color: ${(props) => (props.needDarkMode ? '#2b2b2b' : '#f3f4f7')}; */
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
				background-color: ${(props) => (props.needDarkMode ? '#404249' : '#dcf8eb')};
				
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
				background-color: ${(props) => (props.needDarkMode ? '#4f3a3a' : '#ffe3e2')};
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
		border: 1px solid ${(props) => (props.needDarkMode ? '#514f4f' : '#b9afaf')};
		border-radius: 500px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
    	background-color: ${(props) => (props.needDarkMode ? 'transparent' : 'transparent')};
    	color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

		svg{
			font-size: 1rem;
			margin-bottom: -0.2rem;
			margin-left: 5px;
			fill: #71c929;
		}

		&:hover {
			background-color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#f1f1f1')};
			border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#333')};
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : 'inherit')};
			transition-duration: 250ms;
			cursor: pointer;
		}
	}


	.filter2{
		position: relative;
		padding: 7.5px 15px;
		font-size: 0.8rem;
		border: 1px solid #b9afaf;
		border-radius: 500px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
		color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		display: flex;
		align-items: center;

		svg{
			font-size: 1rem;
			margin-left: 5px;
			fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}

		&:hover {
			background-color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#f1f1f1')};
			border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#333')};
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : 'inherit')};
			transition-duration: 250ms;
			cursor: pointer;
		}

		svg{
			font-size: 1rem;
			margin-left: 5px;
		}

		.tag{
			position: absolute;
			padding: 2.5px 7.5px;
			font-size: 0.65rem;
			background-color: orange;
			border-radius: 100px;
			left: -10px;
			top: -12.5px;
		}
	}

  .locked-feature{
    &:hover{
      background-color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#f1f1f1')};
      color: ${(props) => (props.needDarkMode ? '#fff' : 'inherit')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
      transition-duration: 250ms;
    }
  }

	.selected {
		/* background-color: #ded7d7;
    color: #111; */
    color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#ebdddd')};
    border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#201f1f')};
    background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')};

    &:hover {
      color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#ebdddd')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#201f1f')};
      background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')};
			transition-duration: 250ms;
			cursor: pointer;
		}
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
		color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
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
		border: 1px solid ${(props) => (props.needDarkMode ? '#000000' : 'pink')};
		background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : 'whitesmoke')};
		flex: 1;
		overflow: hidden;

		.fill {
			transition: width 0.25s linear;
			height: 100%;
			border-radius: 100px;
			background-color: #ffa500;
		}
	}

	@media only screen and (max-width: 1100px) {
		margin: 20px 0 0 0;

		.value {
			margin: 0 10px 0 0;
			font-size: 0.7rem;
			font-weight: 500;
			letter-spacing: 0.15rem;
			padding: 5px 7px;
			width: 70px;
			text-align: center;
			background-color: #f3f4f7;
			border-radius: 50px;
		}

		.bar {
			/* width: 400px; */
			height: 8px;
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
	}	


`;

const SheetMessage = styled.div`
	padding: 10px;
	margin: 20px 0 0px 0;
	/* border: 1px solid black; */
	border-radius: 5px;
	/* background-color: #c9e8ff; */
	background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#f0f0f0')};

	.text {
		font-size: 0.8rem;
		color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
	}

	.open-btn{
		display: flex;
		align-items: center;
		cursor: pointer;
		
		font-size: 0.8rem;
		font-weight: 500;
		margin-top: 15px;

		.desc{
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}

		svg{
			fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}
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
			border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : '#d1d5db')};
			background-color: ${(props) => (props.needDarkMode ? '#404249' : 'rgba(255, 255, 255, 0.83)')};
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
						color: ${(props) => (props.needDarkMode ? '#ffffff9e' : '#333')};
                    }
    
                    .label-value{
                        font-size: 0.8rem;
                        letter-spacing: 0.07rem;
                        font-weight: 300;
                        font-family: verdana,arial,sans-serif;
						color: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
                    }
                }
            }
        }
        
        .learn-self-graph{
			flex-grow: 1;
            padding: 10px 30px;
            margin-left: 7.5px;
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : '#d1d5db')};
            background-color: ${(props) => (props.needDarkMode ? '#404249' : 'rgba(255, 255, 255, 0.83)')};
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
						color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                    }
    
                    .completed{
                        display: flex;
                        align-items: center;
    
                        .text{
                            font-size: 0.7rem;
                            font-weight: 300;
                            color: ${(props) => (props.needDarkMode ? 'gray' : 'gray')};
                            margin: 0 7.5px;
                        }
                        .value{
                            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
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
					overflow: hidden;
					border: 1px solid ${(props) => (props.needDarkMode ? '#000000' : '#f1f6f1')};
					background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#dbd5d5')};
					/* background-color: #; */
    				/* border: 1px solid #; */

					.fill{
						background-color: #;
						height: 100%;
						border-radius: 50px;
					}
                }
            }
			
			.circular-chart{
				width: 80px;
			}

			.CircularProgressbar-text{
				color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
				/* border: 1px solid ${(props) => (props.needDarkMode ? '#000000' : '#f1f6f1')};
				background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#dbd5d5')}; */
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
				color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
				border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
				border-radius: 3px;
				margin-right: 5px;
				cursor: pointer;
			}
			
			.selected{
				color: ${(props) => (props.needDarkMode ? '#333' : '#333')};
				background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#f0f0f0')};
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
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}
		
		input{
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
			cursor: pointer;
			margin-right: 5px;
		}

		input[type="checkbox"]:checked + label {
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}
		/* Change the color of the checkboxes when they are not selected */
		input[type="checkbox"] + label {
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}
	}

	.right{
		display: flex;
		align-items: center;

		.filter-item{
			padding: 5px 10px;
			font-size: 0.7rem;
			border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
			border-radius: 3px;
			margin-right: 5px;
			cursor: pointer;
		}
	}
`