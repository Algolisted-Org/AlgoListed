import React from 'react'
import styled from 'styled-components'
// import AllShortestPathAlgorithms from '../BlogContent/AllShortestPathAlgorithms'
import BlogContent from '../BlogContent/BlogContent'
import RightMenu from './RightMenu'

const BlogsMain = ({blogname}) => {
  return (
    <Container>
        <BlogContent/>

        {/* {
          blogname == "all-shortest-path-algorithms" ? 
          (<><AllShortestPathAlgorithms/></>):(<></>)
        }
        {
          blogname == "this-way-add-others" ? 
          (<><AllShortestPathAlgorithms/></>):(<></>)
        } */}
        <RightMenu/>
    </Container>
  )
}

export default BlogsMain

const Container = styled.div`
    flex: 1;
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
`