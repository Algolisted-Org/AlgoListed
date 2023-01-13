import React from 'react'
import styled from 'styled-components'
import groupPhoto from '../Images/aboutUsImg.jpeg'
import scanMeImage from '../Images/gpayScan.jpeg'
import gpayImage from '../Images/gpay.png'
import Fade from 'react-reveal/Fade';
import CloseIcon from '@material-ui/icons/Close';
import Slide from 'react-reveal/Slide';

const BuyMeACoffee = ({showModelCoffee, setshowModelCoffee}) => {
    const percentage = 32;

    return (
        <Container>
            <Slide right>
                <div className="main-content">
                    <div className="closer" onClick={() => setshowModelCoffee(false)}>
                        <CloseIcon/>
                    </div>
                    <div className="center">
                        <div className="small-header">Become a supporter to Algolisted</div>
                        <div className="header">A supporter is worth a thousand followers.</div>

                        <div className="images">
                            <img className='scanner' src={scanMeImage} draggable="false" alt="" />
                            <img className='company' src={gpayImage} draggable="false" alt="" />
                        </div>

                        <div className="progress">
                            <div className="cat-data">
                                <div className="name">32% towards 100 supporters goal</div>
                                {/* <div className="completed">
                                    <div className="text">Completed : </div>
                                    <div className="value">31 / 412</div>
                                </div> */}
                            </div>
                            <div className="line">
                                <div className="fill" style={{
                                    "width": `${percentage}%`,
                                }}></div>
                            </div>
                        </div>

                        <ul>
                            <li>Your support will help us increase our infrastructure capabilities, allowing us to serve more users and improve performance by purchasing additional servers.</li>
                            {/* <li>By supporting Algolisted, you're enabling us to implement machine learning techniques to personalize content for individual users and improve the validation process for all content on the platform.</li> */}
                            <li>Your contributions will also help us invest in marketing efforts to increase visibility and attract more users to the platform.</li>
                        </ul>
                        
                        
                    </div>
                </div>
            </Slide>
        </Container>
    )
}

export default BuyMeACoffee


const Container = styled.div`
    position: fixed;
    height: 100vh;
    /* width: calc(100vw - 200px); */
    width: calc(100vw - 200px);
    z-index: 1000;
    background-color: #00000099;
    /* height: 1000px; */
    /* overflow: scroll; */
    top: 0;
    left: 200px;
    padding: 2.5vh 0;
    padding-left: 30px;

    .main-content{
        width: calc(100vw - 260px);
        height: 95vh;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid rgb(233, 229, 229);
        box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;
        background-color: #fff;
        border-radius: 10px;
        position: relative;

        .closer{
            position: absolute;
            right: -15px;
            top: -15px;
            height: 35px;
            width: 35px;
            border-radius: 100px;
            border: 1px solid rgb(233, 229, 229);
            box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;
            background-color: #fff;
            display: grid;
            place-items: center;
            cursor: pointer;

            svg{
                font-size: 1.25rem;
            }
        }

        .center{    
            width: 700px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .small-header{
                font-size: 0.9rem;
                font-weight: 500;
                text-align: center;
            }
    
            .header{
                font-size: 1.95rem;
                font-weight: 600;
                margin: 10px 0;
                color: #222222;
                text-align: center;
            }

            ul{
                li{
                    font-size: 0.85rem;
                    font-weight: 300;
                    letter-spacing: 0.07rem;
                    line-height: 1.75rem;
                    margin: 10px;
                }
            }

            .images{
                user-select: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 40px 0;
                padding: 20px 20px;
                border-radius: 5px;
                border: 1px solid rgb(209, 213, 219);
                background-color: rgba(255, 255, 255, 0.83);
                box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;
            }

            .scanner{   
                user-select: none;
                height: 200px;
            }

            .company{
                user-select: none;
                height: 20px;
            }

            .progress{
                width: 500px;
                margin: 0 0 50px 0;

                .cat-data{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 5px;
    
                    .name{
                        font-size: 0.8rem;
                        font-weight: 500;
                        margin-bottom: 5px;
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
                        background-color: #8eb3df;
                        height: 100%;
                        /* border-radius: 50px; */
                    }
                }
            }

        }

    }
`