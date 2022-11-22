import React from 'react'
import styled from 'styled-components'
import image1 from '../Images/AllShortestPathAlgorithmsImages/count-1.png'
import image2 from '../Images/AllShortestPathAlgorithmsImages/count-2.png'
import image3 from '../Images/AllShortestPathAlgorithmsImages/count-3.png'
import image4 from '../Images/AllShortestPathAlgorithmsImages/count-4.png'
import image5 from '../Images/AllShortestPathAlgorithmsImages/count-5.png'
import image6 from '../Images/AllShortestPathAlgorithmsImages/count-6.png'
import image7 from '../Images/AllShortestPathAlgorithmsImages/count-7.png'
import ShowContributors from '../Components/ShowContributors'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const AllShortestPathAlgorithms = () => {
    return (
        <Container>
            <div className="left">
                <ShowContributors />
                <h1 className='main-heading'>All Shortest Path Algorithms - Graph Theory.</h1>
                <p className="heading-supporter">Explanation, code and interview questions with company tags</p>
                <div className="gap-5px-tb"></div>
                <div className="tags">
                    <div className="tag">Algorithms</div>
                    <div className="tag">Graph Theory</div>
                    <div className="tag">Dijekstra Algorithm</div>
                    <div className="tag">DSA</div>
                </div>
                <div className="big-margin"></div>
                <div className="gap-15px-tb"></div>
                <p className="para-1">This blog is about the most important shortest-path algorithms, there are a lot of blogs that exist on the topic but they are either lengthy and non-readable or give way too much information, which is not required. </p>
                <div className="para-1">I have also used a lot of online free resources like from medium, cp-algorithms and leetcode discuss section and used the important useful portions. </div>
                <div className="gap-5px-tb"></div>
                <div className="para-1">Here in this article, I have kept the concepts crisp and easy to understand, this whole blog can be broken down into three parts : </div>
                <div className="para-2"><div className="sym">•</div> <div className="text">Understanding the Algorithms - 5 of the most used algorithms</div></div>
                <div className="para-2"><div className="sym">•</div> <div className="text">Easy to medium-level problems sorted - from leetcode</div></div>
                <div className="para-2"><div className="sym">•</div> <div className="text">Questions asked in coding rounds and interviews - with company tags</div></div>

                <div className="theory-blog-part">
                    <div className="sub-heading">
                        <div className="number">1</div>
                        <div className="text">Directed and Undirected Graph with constant edge weight - Simple Method BFS</div>
                    </div>
                    <div className="inside-container">
                        {/* Part - I */}
                        <div className="para-1">The easiest method for finding the shortest path is by using BFS. It is more like the brute force for finding out the minimum path. </div>
                        <img className='img-1' src={image1} alt="" />
                        <div className="para-3">
                            <div className="text"><b>Basic algorithm understanding : </b> Suppose we are at position C now we can go to any of the adjacent vertices A, B, F and D. And the distance to reach that would be the distance to reach C from source + 1. And we update the values for those, whose path distance is greater than the above distance or if the vertice is unexplored. </div>
                        </div>
                        <div className="para-1">If the source was A, then the distance to reach B and C is 1. Now since we are at C the next adjacent vertices A, B, F and D can have a distance of 2. But since A and B have path distances to reach from source A as 0 and 1 respectively, and now the distance is 2, hence they wouldn't update their values. But D and F are unexplored hence they update their value to reach to 2. </div>

                        {/* Part - II */}
                        <div className="para-3">
                            <div className="text"><b>Understanding the Code : </b> We have two data structures to operate with one is the queue just like normally we have in BFS, and rather than having a visited array we have a min distance vector with all values initialized to infinity or any large value.  </div>
                        </div>
                        <div className="para-1">We first start by queue having source and making min distance vector value at source as 0. Now we go to all the adjacent vertices of the source and update their values with value at min distance vector at source + 1 to those whose that vector distance is more than that, then we repeat this same operation again and again.</div>
                        <img className='img-2' src={image2} alt="" />

                        {/* Part - III */}
                        <div className="para-3">
                            <div className="text"><b>Why BFS and not DFS ? </b></div>
                        </div>
                        <img className='img-1' src={image3} alt="" />
                        <div className="para-1">Suppose the above graph with source a and we have d as the final destination, then the shortest distance is 3. But according to DFS the path to reach d is from a to b to c and finally to d, which gives the distance of d to be 4 and not 3. Therefore we do not use DFS for finding the shortest path this way. </div>
                        <div className="para-1">The reason why we can't use it for cyclic graphs is that whenever we find a path, we can't be sure that it is the shortest path. A DFS gives no such guarantee.</div>
                    </div>
                </div>


                <div className="theory-blog-part">
                    <div className="sub-heading">
                        <div className="number">2</div>
                        <div className="text">Directed Graph with variable edge weight - Topological Sort Method </div>
                    </div>
                    <div className="inside-container">
                        {/* Part - I */}
                        <div className="para-1">The main advantage of Dijkstra's algorithm is its considerably low complexity, which is almost linear. We can use Dijkstra's algorithm in both directed and undirected graphs. We can apply this method to only DAGs - directed acyclic graphs. </div>
                        <img className='img-1' src={image4} alt="" />
                        <div className="para-3">
                            <div className="text"><b>Basic algorithm understanding : </b> We know already know, how to find the <a href="/">topological order</a> of a DAG. In the figure above the topological order would be A C B D E. Now we start with a stack having all these in order, hence 'A' with zero indegree at the top of the stack. </div>
                        </div>
                        <div className="para-1">Now we keep taking out the values from the stack and changing all of its adjacent vertices to the distance it has and the path to reach them if the adjacent vertex has a distance more than this or is still unexplored. </div>
                        <img className='img-2' src={image5} alt="" />
                        <div className="para-1">This method is better in time complexity than the first brute force BFS method, however, there are a couple of drawbacks to the topological sort minimum path method.</div>
                        <div className="para-1">We cannot just have random starting and ending points, the starting and ending points must be in topological order. Also, the graph should not contain any cycle in it, the graph has to be DAG. </div>
                    </div>
                </div>


                <div className="theory-blog-part">
                    <div className="sub-heading">
                        <div className="number">3</div>
                        <div className="text">Dijkstra's shortest path algorithm</div>
                    </div>
                    <div className="inside-container">
                        <div className="para-1">The main advantage of Dijkstra's algorithm is its considerably low complexity, which is almost linear. We can use Dijkstra's algorithm in both directed and undirected graphs. Dijkstra's algorithm can be used to determine the shortest path from one node to every other node within the same graph. </div>
                        <iframe width="966" height="543" src="https://www.youtube.com/embed/EFg3u_E6eHU" title="How Dijkstra's Algorithm Works" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <div className="para-1">If you can please watch this video, it explains the algorithm beautifully. And if you want to understand the algo slightly more deeply you try watching <a href="https://www.youtube.com/watch?v=GazC3A4OQTE">this video</a> </div>
                        <div className="para-3">
                            <div className="text"><b>Basic algorithm understanding : </b> Let us consider the below image for our example for explaining. </div>
                        </div>
                        <img className='img-2' src={image6} alt="" />
                        <div className="para-1">We then move to the adjacent elements and update their values like b would be updated to 7 and c to 3. Not as b and c were adjacent elements of a and c has a lower value than b there now c does the same operation and updates its adjacent elements if possible. </div>
                        <div className="para-3">
                            <div className="text">
                                <b>Understanding the Code : </b> With the help of this code we can find the minimum path distance from the source to any other vertex. </div>
                        </div>
                        <div className="para-1">We need two main datastructures for this algorithm : </div>
                        <div className="para-2"><div className="text">1. A priority queue or a set - basically a structure which has an ability to sort the elements in ascending order from top to bottom. That is the minimum distance would come on the top. </div></div>
                        <div className="para-2"><div className="text">2. Minimum distance vector with all elements initialised to infinity or large number like 1e9. </div></div>
                        <div className="para-1">We go through the set while it is not empty, we take out the upper most element which the element not visited with minimum path to reach, say node. Now iterate over the adjacent list of the node, now if the new path distance for the adjacent element is lesser than the prev path distance then we update the value on minimum distance vector and insert it over the set. </div>
                        <div className="para-1">Reading the code would make you understand it better. </div>
                        <div className="para-1">Here V is the total number of vertices and the vertices are from zero to V-1. </div>
                        <img className='img-2' src={image7} alt="" />
                        <div className="para-1">Drawbacks of Dijkstra's Algorithm : One potential drawback to this algorithm though is that if there isn’t a path to the desired target node, the algorithm will need to iterate over the entire graph before it completes.</div>
                    </div>
                </div>

                <div className="beginner-problems">
                    <div className="new-part-heading">Beginner to medium level Problems</div>
                    <div className="para-1">
                        These question are sorted in a really nice manner. It helps you to start solving the problems from the very basic and then takes you to medium level problems. Here we clubbed the resources we have got from leetcode blogs, codeforces blogs and the knowlege from the contributors of the blog.
                    </div>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            Want add a question link of this topic or point out any wrong info of tags. <a href="/">click here</a>
                        </div>
                    </div>
                    <div className="table">
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
                    </div>
                </div>

                <div className="interiview-problems">
                    <div className="new-part-heading">Recent Related Inteview Questions</div>
                    <div className="para-1">
                        # This will be dynamic component, where users can enter data with respect to a tags
                        for example it is shortest path and graphs.
                        <a href="/" target="_blank">http://algorithmist.in/recent-interview-discuss/topics/graphs/shortest-path</a>
                    </div>
                </div>
            </div>
            {/* <div className="right">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque harum exercitationem quasi tempore architecto, recusandae excepturi. Libero, possimus distinctio maxime magni neque facilis nulla vel iste itaque in eos animi reprehenderit, quisquam error temporibus soluta voluptates expedita, quibusdam officiis nostrum iure illum! Dolores numquam rerum facilis placeat animi blanditiis eius? Quasi reiciendis cumque at ex eaque aut labore aliquam. Odit alias laborum modi cumque reiciendis quo dolor aspernatur officia exercitationem placeat fugit molestias, mollitia natus ipsam laboriosam maiores atque consequuntur asperiores. Nulla dolore assumenda, repellendus sed officiis tenetur quia in, ullam mollitia non nobis aspernatur! Perspiciatis reprehenderit commodi blanditiis? Vitae.</div> */}
        </Container>
    )
}

export default AllShortestPathAlgorithms

const Container = styled.div`
    min-height: 100vh;
    /* width: calc(100vw - 200px); */
    /* width: 900px; */
    /* background-color: black; */
    /* margin: auto; */
    /* border-right: 1px solid black; */
    
    display: flex;
    justify-content: space-between;
    
    .left{
        /* background-color: pink; */
        width: max(900px, 60vw);
        padding: 80px 120px 50px 120px;

        @media only screen and (max-width: 1380px){
            padding: 80px 30px 30px 50px;
            width: 720px;
        }  
        
        @media only screen and (max-width: 1200px){
            width : calc(100vw - 200px);
            padding: 80px 120px 50px 120px;
        }
        
        .main-heading{
            font-size: 1.65rem;
            font-weight: 600;
            color: #292929;
        }

        .heading-supporter{
            font-size: 1.05rem;
            margin-bottom: 10px;
            font-weight: 400;
            color: #696168;
        }

        .theory-blog-part{
            margin-bottom: 70px;
        }

        .sub-heading{
            display: flex;
            align-items: flex-center;
            flex-direction: row;
            margin: 50px 0 0 0;

            .number{
                font-size: 0.8rem;
                background-color: #70a936;
                height: 1.15rem;
                width: 1.15rem;
                display: grid;
                place-items: center;
                margin-right: 5px;
                color: white;
                border-radius: 4px;
                margin-top: 3.5px;
                font-family: sohne-var, "Helvetica Neue", Arial, sans-serif;
            }

            .text{
                font-size: 1.05rem;
                margin-bottom: 10px;
                font-weight: 400;
            }
        }

        .inside-container{
            padding-left: 21.5px;

            iframe{
                width: 535px;
                height: 300px;
                margin: 20px 0;
            }
        }

        .tags{
            display: flex;
            flex-wrap: wrap;

            .tag{
                font-size: 0.7rem;
                padding: 5px 15px;
                border-radius: 5px;
                margin-right: 5px;
                background-color: #8a89d1;
                color: white;
            }
        }


        .gap-15px-tb{
            height: 15px;
        }

        .gap-5px-tb{
            height: 5px;
        }

        .big-margin{
            height: 30px;
        }

        .para-1{
            font-size: 0.95rem;
            font-weight: 200;
            margin-bottom: 5px;
        }

        .para-2{
            margin-bottom: 5px;
            margin-left: 30px;
            display: flex;
            align-items: flex-start;
            overflow: hidden;

            .sym{
                font-size: 2rem;
                margin: -0.8rem 0;
                margin-right: 5px;
            }

            .text{
                font-size: 0.95rem;
                font-weight: 200;
            }
        }
        
        .para-3{
            margin-top: 30px;
            margin-bottom: 10px;

            .text{
                font-size: 0.95rem;
                font-weight: 200;
                display: inline-block;
                
                b{
                    font-weight: 500;
                }
            }
        }

        .img-1{
            height: 160px;
            margin: 20px 0;
        }

        .img-2{
            width: 90%;
            margin: 20px 0;
            border-radius: 4px;
        }

        .new-part-heading{
            margin: 70px 0 20px 0;
            font-size: 1rem;
            font-weight: 500;
            padding: 10px 15px;
            background-color: #e5e5e5;
            
            min-width: 300px;
            text-align: center;
            border-radius: 5px;
        }

        .message{
            display: inline-block;
            /* display: flex; */
            /* align-items: center; */
            background-color: #d5f7e1;
            border-radius: 5px;
            padding: 10px;
            margin: 20px 0 0 0;

            .text{
                font-size: 0.8rem;
                color: #13803b;
                font-weight: 300;
                
            }
        }
        
        .beginner-problems{

            .table{
                margin: 15px 0;
                min-height: 100px;
                width: 100%;
                /* background-color: #fbf7f7; */
                border: 1px solid #d1d5db;
                border-radius: 5px;
                padding: 0 15px;
                display: flex;
                flex-direction: column;
                background-color: white;

                .link-row{
                    padding: 20px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #d1d5db;
                    
                    .link-row-left{
                        display: flex;
                        align-items: center;
                        
                        .count{
                            font-size: 1.25rem;
                            font-family: Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
                            margin-right: 20px;
                            font-weight: 500;
                        }

                        .main-row-content{
                            a{
                                font-size: 0.9rem;
                                font-weight: 500;
                                text-decoration: none;
                                /* color: inherit; */

                                &:hover{
                                    text-decoration: underline;
                                }
                            }
                            
                            .tags{
                                margin: 0;
                                margin-top: 5px;
                                
                                .tag{
                                    background-color: #f3f4f7;
                                    color: inherit;
                                    padding: 2.5px 7.5px;
                                    border-radius: 100px;
                                }
                            }
                        }

                        
                    }

                    .done-btn{
                        .MuiSvgIcon-root{
                            fill: #b5a6a6;
                            font-size: 2.25rem;

                            &:hover{
                                transition-duration: 250ms;
                                fill: orange;
                                cursor: pointer;
                            }
                        }

                        .done{
                            fill: orange;
                        }
                    }

                }
                
                .no-bottom-border{
                    border-bottom: 1px solid transparent;
                }
            }
        }

        .interiview-problems{

        }
    }

    /* .right{
        width: calc(100vw - 1100px);
        background-color: green;
        padding: 80px 20px;
    } */
    
`