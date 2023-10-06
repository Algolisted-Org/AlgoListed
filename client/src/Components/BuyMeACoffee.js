import React from 'react'
import styled from 'styled-components'
import scanMeImage from '../Images/gpayScan.jpeg'
// import gpayImage from '../Images/gpay.png'
import gpayImage from '../Images/upi.png'
import leftImage from '../Images/bmc1.png'
import rightImage from '../Images/bmc2.png'
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
                        <div className="left">
                            <div>
                                <div className="title">Buy Me a Coffee</div>
                                <div className="small-title">Every sip helps us create more</div>
                                <p>Your support will help us increase our infrastructure capabilities allowing us to serve more users and improve performance by purchasing additional servers.</p>
                                <p>Your contributions will also help us invest in marketing efforts to increase visibility and attract more users to the platform</p>
                            </div>
                            <img className='bottom-img' src={leftImage} alt="" />
                        </div>
                        <div className="right">
                            <div>
                                <div className="small-title">Please scan Below</div>
                                <div className="images">
                                    <img className='scanner' src={scanMeImage} draggable="false" alt="" />
                                    <img className='company' src={gpayImage} draggable="false" alt="" />
                                </div>
                            </div>
                            <img className='bottom-img' src={rightImage} alt="" />
                        </div>
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
        padding: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid rgb(233, 229, 229);
        box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;
        background-color: #fff;
        border-radius: 10px;
        position: relative;
        min-height: 500px;

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
            display: flex;
            align-items: flex-start;
            height: 100%;
            width: 100%;
            min-height: 500px;


            .left{
                flex: 1;
                padding: 50px 50px 0 50px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                .title{
                    font-size: 3rem;
                    font-weight: 600;
                    color: #222222;
                    /* letter-spacing: 0.1rem; */
                }

                .small-title{
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #222222;
                    letter-spacing: 0.07rem;
                    margin-bottom: 40px;
                }

                p{
                    font-size: 0.9rem;
                    font-weight: 200;
                    letter-spacing: 0.07rem;
                    margin: 20px 0;
                    width: 80%;
                }
            }
            
            .right{
                width: 35%;
                min-width: 380px;
                height: 100%;
                background-color: black;
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                padding-top: 50px;

                .small-title{
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #fff;
                    letter-spacing: 0.07rem;
                    text-align: center;
                }
                
                .images{
                    user-select: none;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 20px 0;
                    padding: 20px 20px;
                    border-radius: 20px;
                    border: 1px solid rgb(209, 213, 219);
                    background-color: #fff;
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
            }
            
            .bottom-img{
                width: calc(100% - 30px);
                margin: 0 auto;
            }

        }

    }
`