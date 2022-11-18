import React, { useState } from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import styled from 'styled-components'
import BlogPage from './Screen/BlogPage'
import BlogIdeas from './Screen/BlogIdeas'
import CodingCompetitions from './Screen/CodingCompetitions'
import Issues from './Screen/Issues'
import PageNotExist from './Screen/PageNotExist';
import LandingPage from './Screen/LandingPage';
import OrganisationInfo from './Screen/OrganisationInfo';
import AllBlogs from './Screen/AllBlogs';
import BrainTeasers from './Screen/BrainTeasers';
import Opportunities from './Screen/Opportunities';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/blog/ideas" element={<BlogIdeas/>} />
        <Route path="/coding-competitions" element={<CodingCompetitions/>} />
        <Route path="/organisation-information/:showpage" element={<OrganisationInfo/>} />
        <Route path="/issues" element={<Issues/>} />
        <Route path="/blogs/:blogname" element={<BlogPage/>} />
        <Route path="/blogs/all" element={<AllBlogs/>} />
        <Route path="/brain-teasers" element={<BrainTeasers/>} />
        <Route path="/opportunities" element={<Opportunities/>} />
        <Route path="/:random" element={<PageNotExist/>} />
      </Routes>
    </div>
  )
}

export default App