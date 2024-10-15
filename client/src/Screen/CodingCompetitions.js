import React, { useState, useEffect, CSSProperties } from "react";
import styled from "styled-components";
import CCHeader from "../Components/CCHeader";
import LeftMenu from "../Components/LeftMenu";
import FilterListIcon from "@material-ui/icons/FilterList";
import InfoIcon from "@material-ui/icons/Info";
import { LinearProgress } from "@material-ui/core";
import { timeLeft } from "../helpers/TimeLeft";
import { competitionFilters } from "../Components/competitionFilters";
import CompetitionItem from "../Components/CompetitionItem";
import { sortByContestTiming } from "../helpers/sortByContestTiming";
import { sortByRegistration } from "../helpers/sortByRegistration";
import SimpleFooter from "../Components/SimpleFooter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MobileNavbar from "../Components/MobileNavbar";
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
// import localContestData from '../Components/localContestData';

const CodingCompetitions = () => {
	const [temp, setTemp] = useState([1]);
	const [waitingForData, setWaitingForData] = useState(true);
	const [list, setList] = useState();
	const [filter, setFilter] = useState("All");
	const [isSortListOpen, setIsSortListOpen] = useState(false);
	const [sortType, setSortType] = useState("By Contest Timing");
	const [showFilters, setShowFilters] = useState(false);

	useEffect(() => {
		document.title = "All Upcoming Coding Competitions - Algolisted";
	}, []);

	useEffect(() => {
		(async () => {
			await fetch(
				`https://script.google.com/macros/s/AKfycbzXyVH1o6CzzJUfLN0qC-EscTKQeKouAUlU3oBs_S85WvB13wPHuawZLK43QJrqBua3Ng/exec`
			)
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					setList(sortByContestTiming(data));
					setWaitingForData(false);
				})
				.then(() => {
					setList(changeRegistrationStatus);
				});
		})();
	}, []);

	// console.log(list);

	useEffect(() => {
		const interval = setInterval(() => setList((list) => [...list]), 60000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	const changeRegistrationStatus = (list) =>
		list.map((obj) => {
			const isRegistrationExpired =
				timeLeft(
					false,
					obj.registration_end_date,
					obj.registration_end_time_mins
				) === "Expired";
			if (isRegistrationExpired) {
				return { ...obj, registration_status: "Closed" };
			}

			return obj;
		});

	const handleFilter = (e) => {
		setFilter(e.target.textContent);
	};

	const handleSort = (e) => {
		setIsSortListOpen(!isSortListOpen);
		const listItemText = e.target.innerText;
		if (listItemText === "By Registration") {
			setList(sortByRegistration(list));
			setSortType(listItemText);
		}
		if (listItemText === "By Contest Timing") {
			setList(sortByContestTiming(list));
			setSortType(listItemText);
		}
	};

	const filters = competitionFilters.map((item) => {
		return (
			<div
				onClick={(e) => {
					handleFilter(e);
				}}
				key={item.id}
				className={item.text == filter ? "filter selected" : "filter"}
			>
				{item.text}
			</div>
		);
	});

	return (
		<GrandContainer>
			<MobContainer>
				<MobileNavbar />
				<div className="main-content">
					<h1 className="main-heading">All Upcoming Coding Competitions</h1>
					<p className="heading-supporter">
						While there are other websites, such as CLIST and Unstop, that provide information about contests, our list only includes the ones that are truly relevant and necessary, rather than unnecessary or extraneous ones.
						Currently, our list of upcoming contests is specifically geared towards Indians and curated by an Indian who understands the types of competitions that are most relevant to this audience. 
					</p>
					<div className="all-support-companies">
						<div className="support-company diff-value">
							<div className="text">Example Competitions</div>
						</div>
						<div className="support-company">
							<div className="text">Google KickStart</div>
						</div>
						<div className="support-company">
							<div className="text">Codeforces</div>
						</div>
						<div className="support-company">
							<div className="text">Microsoft Engage</div>
						</div>
						<div className="support-company">
							<div className="text">Top College Event</div>
						</div>
						<div className="support-company">
							<div className="text">Codechef</div>
						</div>
						<div className="support-company">
							<div className="text">TCS CodeVita</div>
						</div>
					</div>

					<div className="data-filters">
						<div
							className="toggle-filter"
							onClick={() => setShowFilters(!showFilters)}
						>
							{showFilters ? (
								<>
									<div className="text">Hide Filters</div>
									<ExpandLessIcon />
								</>
							) : (
								<>
									<div className="text">Show Filters</div>
									<ExpandMoreIcon />
								</>
							)}
						</div>
						<div
							className="sort"
							onClick={() => {
								setIsSortListOpen(!isSortListOpen);
							}}
						>
							<FilterListIcon />
						</div>
						<div className={isSortListOpen ? "sort-type open" : "sort-type"}>
							<div className="item" onClick={(e) => handleSort(e)}>
								By Contest Timing
							</div>
							<div className="item" onClick={(e) => handleSort(e)}>
								By Registration
							</div>
						</div>
					</div>

					{showFilters ? <Filters>{filters}</Filters> : <></>}
					
					{waitingForData ? <><br /><LinearProgress /><br/></> : <></>}
					
					
					<Table className="table">
						{waitingForData == true ? (
							<></>
						) : (
							<>
								{list
									.filter(
										(item) =>
											timeLeft(
												false,
												item.competition_date,
												item.time_start_mins + item.duration_mins
											) !== "Expired"
									)
									.map((item, index) => {
										if (filter == "All") {
											return (
												<CompetitionItem
													key={index}
													index={index}
													item={item}
												/>
											);
										} else if (item.tags.includes(filter)) {
											return (
												<CompetitionItem
													key={index}
													index={index}
													item={item}
												/>
											);
										}
									})}
							</>
						)}
					</Table>
				</div>
				<SimpleFooter />
			</MobContainer>

			<Container>
				<CCHeader />
				<LeftMenu marked={"all-coding-competitions"} />
				<div className="cc-middle-content">
					<h1 className="main-heading">All Upcoming Coding Competitions</h1>
					<p className="heading-supporter">
						While there are other websites, such as CLIST and Unstop, that provide information about contests, our list only includes the ones that are truly relevant and necessary, rather than unnecessary or extraneous ones.
						Currently, our list of upcoming contests is specifically geared towards Indians and curated by an Indian who understands the types of competitions that are most relevant to this audience. 
					</p>
					<div className="all-support-companies">
						<div className="support-company diff-value">
							<div className="text">Example Competitions</div>
						</div>
						<div className="support-company">
							<div className="text">Google KickStart</div>
						</div>
						<div className="support-company">
							<div className="text">Codeforces</div>
						</div>
						<div className="support-company">
							<div className="text">Microsoft Engage</div>
						</div>
						<div className="support-company">
							<div className="text">Top College Event</div>
						</div>
						<div className="support-company">
							<div className="text">Codechef</div>
						</div>
						<div className="support-company">
							<div className="text">TCS CodeVita</div>
						</div>
					</div>
					<div className="message">
						<div className="icon"></div>
						<div className="text">
							You know about a coding competition which is not mentioned here.{" "}
							<a href="/">click here</a>
						</div>
					</div>
					{/* <p className="heading-supporter">
            Competitions like - Google Kickstart, Codeforces, Leetcode, CC,
            Hackathons, ICPC, Hackathons, Microsoft Imagine, Microsoft Engage,
            Facebook Hacker Cup, TCS Ninja, Uber Hacktag, Hacktoberfest,
            Girlscript, GSOC, Code jam, Hash Cup.
          </p> */}
					<Filters>{filters}</Filters>

					<Sort>
						{/* <Tooltip title="Under Development"> */}
							<a href="https://docs.google.com/forms/d/e/1FAIpQLSeMogvmpnRIg0MWh50H9xIGq5aSdzH3sbMtRENc_3r7sZpAOw/viewform" target={"_blank"} className="box" rel="noreferrer">
								<AddIcon />
							</a>
						{/* </Tooltip> */}
						<div onClick={(e) => handleSort(e)} className="box">
							<div className="text">{sortType}</div>
							<FilterListIcon />
							<div className={isSortListOpen ? "list open" : "list"}>
								<ul>
									<li className="item">By Contest Timing</li>
									<li className="item">By Registration</li>
								</ul>
							</div>
						</div>
						{/* <InfoIcon style={{ fill: "#333" }} /> */}
					</Sort>

					<Table>
						<div className="row top-row">
							<div className="hash">#</div>
							<div className="platform">Platform</div>
							<div className="contest">Competition</div>
							<div className="date">Date and Time left</div>
							<div className="duration">Duration</div>
							<div className="registration">Registration</div>
						</div>

						{waitingForData ? (
							<div className="linear-progess-holder">
								<LinearProgress />
							</div>
						) : (
							<>
								{list
									.filter(
										(item) =>
											timeLeft(
												false,
												item.competition_date,
												item.time_start_mins + item.duration_mins
											) !== "Expired"
									)
									.map((item, index) => {
										if (filter == "All") {
											return (
												<CompetitionItem
													key={index}
													index={index}
													item={item}
												/>
											);
										} else if (item.tags.includes(filter)) {
											return (
												<CompetitionItem
													key={index}
													index={index}
													item={item}
												/>
											);
										}
									})}
							</>
						)}
					</Table>
					{waitingForData ? <GiveSpace></GiveSpace> : <></>}
					<SimpleFooter />
				</div>
				{/* <CCRightMenu/> */}
			</Container>
		</GrandContainer>
	);
};

export default CodingCompetitions;

const GrandContainer = styled.div``;

const MobContainer = styled.div`
	width: 100vw;
	padding-top: 60px;

	.main-content {
		padding: 10px 15px;

		.linear-progess-holder{
			.MuiLinearProgress-colorPrimary{
				visibility: visible;
			}
			margin-bottom: 30px;
		}

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

		.all-support-companies {
			display: flex;
			flex-wrap: wrap;

			.support-company {
				padding: 2.5px 7.5px;
				background-color: #e5e5e5;
				border-radius: 5px;
				margin: 0 5px 5px 0;

				.text {
					font-size: 0.65rem;
					font-weight: 200;
				}
			}

			.diff-value {
				background-color: #f6f6f6;
				.text {
					font-weight: 300;
				}
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
	}
	@media only screen and (min-width: 1100px) {
		display: none;
	}
`;

const Container = styled.div`
	@media only screen and (max-width: 1100px) {
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

		.all-support-companies {
			display: flex;
			flex-wrap: wrap;

			.support-company {
				padding: 2.5px 7.5px;
				background-color: #e5e5e5;
				border-radius: 5px;
				
				margin-right: 5px;

				.text {
					font-size: 0.7rem;
					font-weight: 200;
				}
			}

			.diff-value {
				background-color: #f6f6f6;
				.text {
					font-weight: 300;
				}
			}
		}

		.message {
			display: inline-block;
			/* display: flex; */
			/* align-items: center; */
			background-color: #d5f7e1;
			border-radius: 5px;
			padding: 10px;
			margin: 30px 0 10px 0;

			.text {
				font-size: 0.8rem;
				color: #13803b;
				font-weight: 300;
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

const Sort = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin: 10px 0;

	svg {
		font-size: 1.25rem;
	}

	.box {
		padding: 5px 10px;
		height: 36px;
		display: flex;
		position: relative;
		justify-content: space-between;
		align-items: center;
		border-radius: 100px;
		background-color: white;
		border: 1px solid #b9afaf;
		box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
		margin-right: 5px;
		cursor: pointer;
		user-select: none;

		.list {
			padding: 5px;
			width: 100%;
			display: none;
			position: absolute;
			top: 40px;
			left: 0;
			justify-content: space-between;
			align-items: center;
			border-radius: 10px;
			border: 1px solid #b9afaf;
			box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
			background-color: white;
			z-index: 1;
			user-select: none;

			.item {
				width: 100%;
				font-size: 0.8rem;
				font-weight: 300;
				margin: 0 7.5px;
				list-style-type: none;
				padding: 5px 0;
				user-select: none;
			}
			.item:hover {
				color: #18489f;
			}
		}

		.text {
			font-size: 0.8rem;
			font-weight: 300;
			margin: 0 7.5px;
		}
		.open {
			display: block;
		}
	}
`;

const Table = styled.div`
	width: 100%;
	border: 1px solid #e0cece;
	border-radius: 5px;
	overflow: hidden;

	.row {
		background-color: white;
		width: 100%;
		min-height: 75px;
		padding: 0 15px;
		border-top: 1px solid #e0cece;
		display: flex;
		justify-content: space-between;
		position: relative;
		/* align-items: flex-start; */

		.time-left {
			font-size: 0.75rem;
			font-weight: 200;
		}

		.hash {
			width: 4%;
			padding: 7.5px 0;
			border-right: 1px solid #e0cece;
			/* background-color: yellow; */
			font-size: 0.9rem;
			font-weight: 300;
		}

		.platform {
			width: 12%;
			padding: 7.5px 0;
			border-right: 1px solid #e0cece;
			/* background-color: grey; */
			font-size: 0.9rem;
			font-weight: 300;
			padding-right: 5px;
		}

		.contest {
			width: 24%;
			padding: 7.5px 0;
			border-right: 1px solid #e0cece;
			/* background-color: coral; */
			font-size: 0.9rem;
			font-weight: 300;
			padding-right: 5px;
		}

		.date {
			width: 20%;
			padding: 7.5px 0;
			border-right: 1px solid #e0cece;
			/* background-color: grey; */
			font-size: 0.9rem;
			font-weight: 300;
			padding-right: 5px;
		}

		.duration {
			width: 10%;
			padding: 7.5px 0;
			border-right: 1px solid #e0cece;
			/* background-color: yellow; */
			font-size: 0.85rem;
			font-weight: 300;
			padding-right: 5px;
		}

		.registration {
			width: 20%;
			padding: 7.5px 0;
			font-size: 0.9rem;
			font-weight: 300;
			padding-right: 5px;
		}
	}

	.top-row {
		background-color: whitesmoke;
		width: 100%;
		height: 75px;
		padding: 0 15px;
		border-top: 1px solid transparent;
		display: flex;
		justify-content: space-between;
		/* align-items: center; */
		/* border-radius: 5px; */

		.hash,
		.platform,
		.platform,
		.contest,
		.date,
		.duration {
			border-right: 1px solid #e0cece;
			font-size: 0.95rem;
			font-weight: 400;
			/* color: #c4b8b8; */
			display: flex;
			align-items: center;
		}

		.registration {
			font-size: 0.95rem;
			font-weight: 400;
			/* color: #c4b8b8; */
			display: flex;
			align-items: center;
		}
	}

	.ongoing {
		background-color: #ffe0e0;
	}

	.last-row {
		border-bottom: 0px solid transparent;
	}

	@media (max-width: 1100px) {
		/* 
			Styles for mobile view 
			(screen width up to 1100px)
		*/

		display: flex;
		flex-direction: column;
		align-items: center;
		border: none;

		.top-row {
			display: none !important;
		}

		.row {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin: 5px 2px;
			padding: 20px;
			width: 100%;
			min-width: 320px;
			border-radius: 10px;
			border: 1px solid rgb(232, 232, 232);
    		/* box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px; */
			/* filter: drop-shadow(0 0.1rem 0.2rem grey); */

			.contest {
				width: 95%;
				order: -1;
				font-size: 1rem;
				padding: 5px 0;
				border: none;

				a {
					text-decoration: none;
					font-weight: 500;
				}
			}

			.hash {
				::before {
					content: "#";
				}
				border: none;
				width: 5%;
				order: 0;
				font-size: 0.8rem;
				text-align: right;
			}

			.time-left {
				width: 100%;
				order: 2;
				margin-bottom: 5px;
				font-size: 0.85rem;
				font-weight: 400;
				color: #656565;

				.label {
					order: 2;
				}
			}

			.date {
				::before {
					content: "Date & Time left: ";
					font-weight: 500;
					font-size: 0.85rem;
				}
				font-size: 0.85rem;
				font-weight: 300;
				color: #656565;
				width: 100%;
				border: none;
			}

			.platform {
				::before {
					content: "Platform: ";
					font-weight: 500;
					font-size: 0.85rem;
				}
				width: 100%;
				order: 3;
				font-size: 0.85rem;
				font-weight: 500;
				padding: 5px 0;
				color: #656565;
				border: none;
			}

			.duration {
				::before {
					content: "Duration: ";
					font-weight: 500;
					font-size: 0.85rem;
				}
				width: 100%;
				order: 4;
				font-size: 0.85rem;
				font-weight: 400;
				color: #656565;
				border: none;
			}

			.registration {
				width: 100%;
				order: 5;
				font-size: 0.85rem;
				font-weight: 400;
				color: #656565;
			}
		}
		
		.ongoing {
			background-color: #ffe0e0;
		}
	}
`;

const GiveSpace = styled.div`
	margin-bottom: 30vh;
`;
