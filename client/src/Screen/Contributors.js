import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const Contributors = () => {
    const [temp, setTemp] = useState([1, 2, 2,3,3,4,4, 3,3,2,2,1]);

    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>All Contributors</h1>
            <p className="heading-supporter">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed error nemo atque delectus aliquam totam nesciunt corrupti praesentium, consequatur aspernatur odit commodi quo ducimus. <br /><br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis minus exercitationem illo, corporis a animi molestiae consequatur reprehenderit incidunt, quasi provident nam in maiores veritatis quod architecto tenetur assumenda quam rerum repellendus sapiente accusantium rem tempora! Vero ipsum quaerat ex?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis minus exercitationem illo, corporis a animi molestiae consequatur reprehenderit incidunt, quasi provident nam in maiores veritatis quod architecto tenetur assumenda quam rerum repellendus sapiente accusantium rem tempora! Vero ipsum quaerat ex?
            </p>

            <div className="sub-heading">Open Source Contributors</div>
            <div className="hold-contributors">
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/93304796?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/31253617?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/65110396?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/69350358?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/72225789?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/13181393?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/21978144?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/64989416?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
            </div>


            <div className="sub-heading">Technical Content Writters</div>
            <div className="hold-contributors">
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/31253617?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/72225789?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/21978144?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/13181393?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/93304796?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/65110396?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/69350358?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/64989416?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/31253617?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/72225789?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/21978144?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/13181393?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/93304796?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/65110396?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/69350358?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/64989416?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/31253617?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/72225789?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/21978144?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/13181393?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/93304796?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/65110396?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/69350358?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/64989416?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/31253617?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/72225789?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/21978144?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/13181393?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/93304796?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/65110396?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/69350358?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/64989416?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
            </div>

            <div className="sub-heading">Resources Contributors</div>
            <div className="hold-contributors">
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/31253617?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/72225789?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/21978144?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/13181393?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/93304796?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/65110396?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/69350358?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/64989416?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/31253617?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/58147810?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/72225789?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/21978144?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/13181393?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/93304796?v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/80634689?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/65110396?s=100&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/69350358?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/32944224?s=64&v=4" alt="" /></div>
                <div className="contributor"><img src="https://avatars.githubusercontent.com/u/64989416?s=64&v=4" alt="" /></div>
            </div>


        </Container>
    )
}

export default Contributors


const Container = styled.div`
    width: 100%;
    b{
        font-weight: 500;
    }

    .hold-contributors{
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      max-width: 60%;

      .contributor{
        background-color: pink;
        overflow: hidden;
        height: 48px;
        width: 48px;
        margin: 0 7.5px 7.5px 0;  
        border-radius: 100px;
        border: 1px solid #b7a6a6;

        img{
          height: 100%;
        }
      }
    }
`