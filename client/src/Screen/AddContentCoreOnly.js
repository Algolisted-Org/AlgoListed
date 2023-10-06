import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AddContentCoreOnly = () => {
    const [currentFilter, setCurrentFilter] = useState("Resources");
    const [showSelectType, setshowSelectType] = useState(false);
    const [showSelectCategory, setshowSelectCategory] = useState(false);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [imgLink, setImgLink] = useState("");
    const [promotionLink, setPromotionLink] = useState("");
    const [selectCategoryValue, setSelectCategoryValue] = useState("Complete DSA");
    const [selectTypeValue, setSelectTypeValue] = useState("Handwritten Notes");


    const filterList = [
        {
            "name" : "Resources",
        }
        // ,{
        //     "name" : "Question",
        // }
    ]

    const selectCategory = [
          {
            "name" : "DSA Topic",
          },
          {
            "name" : "Dynamic Programming",
          },
          {
            "name" : "Data Structures",
          },
          {
            "name" : "Language Basics",
          },
          {
            "name" : "Web Development",
          },
          {
            "name" : "Github",
          },
          {
            "name" : "Theory Subjects",
          },
          {
            "name" : "Interview Preparation",
          },
          {
            "name" : "Machine Learning",
          },
    ]

    const selectType = [
        {
            "name" : "Handwritten Notes",
        },
        {
            "name" : "Digital Notes",
        },
        {
            "name" : "Blog",
        },
        {
            "name" : "Linkedin Post",
        },
        {
            "name" : "Other",
            
        }
    ]

    console.log(selectCategoryValue);

    const filters = filterList.map((item, index) => {
		return (
			<div
				key={index}
				className={
					item.name === currentFilter ? "filter selected" : "filter"
				}
			>
				{item.name}
			</div>
		);
	});

    const filters1 = selectCategory.map((item, index) => {
		return (
			<div
				key={index}
				className={
					item.name === currentFilter ? "option selected" : "option"
				}
                onClick={() => setSelectCategoryValue(item.name)}
			>
				{item.name}
			</div>
		);
	});

    const filters2 = selectType.map((item, index) => {
		return (
			<div
				key={index}
				className={
					item.name === currentFilter ? "option selected" : "option"
				}
                onClick={() => setSelectTypeValue(item.name)}
			>
				{item.name}
			</div>
		);
	});

    const handleSubmit = async () => {
        console.log(
            title,
            description,
            link,
            imgLink,
            promotionLink,
            selectCategoryValue,
            selectTypeValue
        );

        await fetch(`${process.env.REACT_APP_BACKEND_API}/resources/create`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },

            body: JSON.stringify({
                title,
                description,
                link,
                imgLink,
                promotionLink,
                selectCategoryValue,
                selectTypeValue

            })
        }).then(response => response.json())
            .then(apiReturn => {
                console.log(apiReturn);
                alert(apiReturn.message);
            })

        setTitle("");
        setDescription("");
        setLink("");
        setImgLink("");
        setPromotionLink("");
    }


    

    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with
                width more than 1100px, a standard laptop or tablet landscape.
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>

            <NewContainer>
                <div className="top-header-full">
                    <h1>Thankyou for Feeding Data to Algolisted</h1>
                </div>
                <div className="main-content">
                    <Filters>{filters}</Filters>
                    <div className="feed-data-container">
                        <div className="row">
                            <div className="left">Resource Title</div>
                            <input style={{ fontFamily: 'Arial' }} type="text" className="right" placeholder='Max characters 40' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="left">Resource Description</div>
                            <input type="text" className="right" placeholder='Max characters 100' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="left">Resource Image - Add an attractive image URL from Google</div>
                            <input type="text" className="right" placeholder='Enter link here' value={imgLink} onChange={(e) => setImgLink(e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="left">Google Drive - Make sure to have it public</div>
                            <input type="text" className="right" placeholder='Enter link here' value={link} onChange={(e) => setLink(e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="left">Your Link to Promote</div>
                            <input type="text" className="right" placeholder='Enter link here' value={promotionLink} onChange={(e) => setPromotionLink(e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="left">Select Category</div>
                            <div className="right drop-down" onClick={() => setshowSelectCategory(!showSelectCategory)}>
                                <div className="value">{selectCategoryValue}</div>
                                <ExpandMoreIcon/>
                                { showSelectCategory && <div className="options">
                                    {filters1}
                                </div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="left">Select Type</div>
                            <div className="right drop-down" onClick={() => setshowSelectType(!showSelectType)}>
                                <div className="value">{selectTypeValue}</div>
                                <ExpandMoreIcon/>
                                {showSelectType && <div className="options">
                                    {filters2}
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="submit-btn" onClick={() => handleSubmit()}>Submit</div>
                </div>
            </NewContainer>

        </GrandContainer>
    )
}

export default AddContentCoreOnly

const GrandContainer = styled.div`

`

const MobContainer = styled.div`
  width: 100vw;
  padding: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;

  img{
    width: calc(100% - 80px);
    margin: 40px;
    border-radius: 5px;
    display: block;
  }

  @media only screen and (min-width: 1100px){
    display: none;
  }
`

const NewContainer = styled.div`
    @media only screen and (max-width: 1100px){
        display: none;
    }

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    a{
      color: #18489f;
    }

    .top-header-full{
        height: 70px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(233, 229, 229);
        padding: 0 35px;
        /* background-color: rgb(255, 255, 255); */
        background-color: #ffffffd4;
        box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 5%);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);

        h1{
            font-size: 16px;
            margin: 20px auto;
            font-weight: 400;
            text-align: center;
            max-width: 1100px;
            letter-spacing: 0.5rem;
            text-transform: uppercase;
        }
    }

    .main-content{
        padding: 100px 30px;

        .feed-data-container{
            margin-top: 30px;
            background-color: black;
            width: 1000px;

            .row{
                width: 100%;
                display: flex;
                border-bottom: 2px solid white;
                letter-spacing: 0.07rem;

                .left{
                    width: 30%;
                    padding: 15px 20px;
                    background-color: #201f1f;
                    border-right: 2px solid white;
                    font-size: 0.8rem;
                    font-weight: 200;
                    color: white;
                }

                .right{
                    width: 70%;
                    padding: 15px 20px;
                    background-color: #dad4d4;
                    font-size: 0.8rem;
                    border: none;
                    position: relative;
                }
                
                input{
                    letter-spacing: 0.07rem;
                    font-family: "Poppins" !important;
                    /* font-family: 'Poppins', sans-serif; */
                }

                .drop-down{
                    user-select: none;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                }

                .options{
                    width: calc(50% - 5px);
                    position: absolute;
                    top: 20px;
                    right: 2.5px;
                    border: 1px solid rgb(233,229,229);
                    background-color: #ffffff;
                    box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 5%);
                    z-index: 1000;
                    border-radius: 10px;
                    overflow: hidden;

                    .option{
                        padding: 15px 20px;
                        font-size: 0.7rem;
                        border-bottom: 1px solid rgb(233,229,229);

                        cursor: pointer;

                        &:hover{
                            background-color: #fdf9fa;
                        }
                    }

                    .selected{
                        background-color: #fdf9fa;
                    }
                }
            }
        }

        .submit-btn {
            user-select: none;
            padding: 7.5px 15px;
            font-size: 0.75rem;
            background-color: white;
            color: inherit;
            border: 1px solid rgb(209, 213, 219);
            text-decoration: none;
            margin: 20px 0;
            width: 100px;
            text-align: center;
            
            &:hover {
                border-color: #201f1f;
                transition-duration: 250ms;
                cursor: pointer;
            }
        }
    }
`

const Filters = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10px 0 10px 0;

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

