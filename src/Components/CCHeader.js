import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';


const CCHeader = () => {
  return (
    <Container>
      <div className="search-box">
        <div className="icon">
          <SearchIcon/>
        </div>
        <input type="text" className="input" placeholder='Search for algorithm or datastructure'/>
      </div>
    </Container>
  )
}

export default CCHeader

const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 55px;
    width: calc(100vw - 200px);
    /* background-color: orange; */
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    position: fixed;
    top: 0;
    left: 200px;
    z-index: 2;
    background-color: white;
    align-items: center;
    
    .search-box{
      width: 50%;
      border-radius: 100px;
      border: 1px solid rgba(230, 230, 230, 1);
      height: 80%;

      display: flex;
      align-items: center;
      padding: 10px 15px;

      .icon{
        margin-top: 7.5px;
        margin-right: 10px;
      }

      input{
        border: none;
        flex: 1;
        font-weight: 400;
      }

    }
`