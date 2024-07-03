import { React, useState, useEffect } from 'react';
import styled from 'styled-components'
import ShowContributors from './ShowContributors'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import data from './allBlogsDatabase.json'
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { LinearProgress } from "@material-ui/core";
import Markdown from 'markdown-to-jsx';

const BlogResources = ({ ResourceType,  blogname }) => {
    console.log(ResourceType);
    const [contentName, setContentName] = useState("");
    const [contentText, setContentText] = useState("");

    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [completedCount, setCompletedCount] = useState(0);

    const toggleCompleted = (index) => {
		// update the "completed" field for the coding sheet at the specified index
		const updatedData = [...data];
		updatedData[index].completed = !updatedData[index].completed;
		setData(updatedData);
		setCompletedCount(
			(prevCount) => prevCount + (updatedData[index].completed ? 1 : -1)
		);

		// save the "completed" status of the sheet in the local storage
		localStorage.setItem(
			`blogResource-${updatedData[index]._id}`,
			updatedData[index].completed
		);
	};
    
    console.log(blogname);
    
    useEffect(() => {
        // retrieve the data from the server
        axios
            // .get(`https://algolisted.tonmoy1912.in/coding-sheets/sheet/${sheetname}`)
            .get(`https://algolisted.tonmoy1912.in/blog-resources/blog/${blogname}`)
            .then((res) => {
                // retrieve the "completed" status of each sheet from the local storage
                const updatedData = res.data.map((sheet) => {
                    const completed = localStorage.getItem(`blogResource-${sheet._id}`);
                    return {
                        ...sheet,
                        completed: completed === "true",
                    };
                });
                // calculate the initial value of completedCount based on the "completed" status of the sheets in updatedData
                const initialCompletedCount = updatedData.reduce((acc, sheet) => {
                    return acc + (sheet.completed ? 1 : 0);
                }, 0);
                setCompletedCount(initialCompletedCount);
                setData(updatedData);
                setDataLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);
    
    console.log(data);

    const contentInformation = [
        {
            "name": "Beginner to medium level Problems",
            "text": "These question are sorted in a really nice manner. It helps you to start solving the problems from the very basic and then takes you to medium level problems. Here we clubbed the resources we have got from leetcode blogs, codeforces blogs and the knowlege from the contributors of the blog."
        },
        {
            "name": "Relevant resources for the blog",
            "text": "This section includes a collection of resources, such as source codes and links to other relevant blogs, contributed by experienced individuals on the topic. These resources can be useful for those looking to learn more about the topic."
        }
    ]

    return (
        <Container>
            <div className="page-section" id="rev">
                <div className="new-part-heading">{contentInformation[ResourceType].name}</div>
                <div className="para-1">{contentInformation[ResourceType].text}</div>
                <div className="message">
                    <div className="text">
                        Feature for adding resources will be added soon!
                    </div>
                </div>
                {/* <div className="table">
                    <div className="link-row">
                        <div className="link-row-left">
                            <div className="count">1</div>
                            <div className="main-row-content">
                                <a href="https://leetcode.com/problems/friend-circles/">BFS Implementaion</a>
                                <div className="tags">
                                    <div className="tag">GeeksforGeeks</div>
                                    <div className="tag">Implementation</div>
                                    <div className="tag">TCS Ninjs</div>
                                    <div className="tag">Wipro</div>
                                </div>
                            </div>
                        </div>
                        <div className="done-btn">
                            <CheckCircleOutlineIcon className='done' />
                        </div>
                    </div>
                    <div className="link-row">
                        <div className="link-row-left">
                            <div className="count">2</div>
                            <div className="main-row-content">
                                <a href="https://leetcode.com/problems/friend-circles/">01 Matrix</a>
                                <div className="tags">
                                    <div className="tag">Leetcode</div>
                                    <div className="tag">Atlassian</div>
                                    <div className="tag">Google</div>
                                    <div className="tag">TCS Ninja</div>
                                </div>
                            </div>
                        </div>
                        <div className="done-btn">
                            <CheckCircleOutlineIcon className='done' />
                        </div>
                    </div>
                    <div className="link-row">
                        <div className="link-row-left">
                            <div className="count">3</div>
                            <div className="main-row-content">
                                <a href="https://leetcode.com/problems/friend-circles/">Number of Islands</a>
                                <div className="tags">
                                    <div className="tag">Leetcode</div>
                                    <div className="tag">Bloomberg</div>
                                </div>
                            </div>
                        </div>
                        <div className="done-btn">
                            <CheckCircleOutlineIcon />
                        </div>
                    </div>
                    <div className="link-row">
                        <div className="link-row-left">
                            <div className="count">4</div>
                            <div className="main-row-content">
                                <a href="https://leetcode.com/problems/friend-circles/">Rotting Oranges</a>
                                <div className="tags">
                                    <div className="tag">Leetcode</div>
                                    <div className="tag">Amazon</div>
                                    <div className="tag">Uber</div>
                                    <div className="tag">Microsoft Engage</div>
                                </div>
                            </div>
                        </div>
                        <div className="done-btn">
                            <CheckCircleOutlineIcon />
                        </div>
                    </div>
                    <div className="link-row">
                        <div className="link-row-left">
                            <div className="count">5</div>
                            <div className="main-row-content">
                                <a href="https://leetcode.com/problems/friend-circles/">Course Schedule I</a>
                                <div className="tags">
                                    <div className="tag">Leetcode</div>
                                    <div className="tag">Salesforce</div>
                                    <div className="tag">Twitter</div>
                                </div>
                            </div>
                        </div>
                        <div className="done-btn">
                            <CheckCircleOutlineIcon />
                        </div>
                    </div>
                    <div className="link-row">
                        <div className="link-row-left">
                            <div className="count">6</div>
                            <div className="main-row-content">
                                <a href="https://leetcode.com/problems/friend-circles/">Flood Fill</a>
                                <div className="tags">
                                    <div className="tag">Leetcode</div>
                                    <div className="tag">Uber</div>
                                    <div className="tag">Microsoft</div>
                                    <div className="tag">Google</div>
                                </div>
                            </div>
                        </div>
                        <div className="done-btn">
                            <CheckCircleOutlineIcon />
                        </div>
                    </div>
                    <div className="link-row no-bottom-border">
                        <div className="link-row-left">
                            <div className="count">7</div>
                            <div className="main-row-content">
                                <a href="https://leetcode.com/problems/friend-circles/">King Escape</a>
                                <div className="tags">
                                    <div className="tag">Codeforces</div>
                                    <div className="tag">Lyft Level 5 Challenge</div>
                                </div>
                            </div>
                        </div>
                        <div className="done-btn">
                            <CheckCircleOutlineIcon />
                        </div>
                    </div>
                </div> */}

                <div className="table">
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
                                                href={item.resourceLink}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {item.resourceName}
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
                                                    return (
                                                        <div className="tag" key={tagIndex}>
                                                            {tagItem}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="done-btn">
                                        <CheckCircleOutlineIcon
                                            onClick={() => toggleCompleted(index)}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <AddResource>
                    <a>Add Resource</a>
                </AddResource>

            </div>
        </Container>
    )
}

export default BlogResources

const Container = styled.div`
    width: 100%;

    .page-section{
        .table {
			margin: 15px 0;
			width: 100%;
			/* background-color: #fbf7f7; */
			border: 1px solid #d1d5db;
			border-radius: 5px;
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
							margin-top: 5px;
							display: flex;

							.tag {
								background-color: #f3f4f7;
								color: inherit;
								padding: 2.5px 7.5px;
								border-radius: 100px;
								font-size: 0.7rem;
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

				.done-btn {
					.MuiSvgIcon-root {
						fill: #b5a6a6;
						font-size: 2.25rem;

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
						font-size: 2.25rem;
					}
				}
			}

			.no-bottom-border {
				border-bottom: 1px solid transparent;
			}

            @media only screen and (max-width: 1100px) {
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
    }
`

const AddResource = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;

    a{  
        user-select: none;
        padding: 7.5px 15px;
        font-size: 0.75rem;
        background-color: white;
        border-radius: 5px;
        color: inherit;
        border: 1px solid #d1d5db;
        text-decoration: none;

        @media only screen and (max-width: 1100px) {
            width: 100%;
            display: flex;
            justify-content: center;

        }
    }
`