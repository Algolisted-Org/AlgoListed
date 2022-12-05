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
import AptitudeRound from './Screen/AptitudeRound';
import Opportunities from './Screen/Opportunities';
import Resources from './Screen/Resources';
import ContributeSite from './Screen/ContributeSite';
import BlogAutoCode from './Screen/BlogAutoCode';
import AuthPage from './Screen/AuthPage';
import SelectedProfiles from './Screen/SelectedProfiles';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/blog/ideas" element={<BlogIdeas/>} />
        <Route path="/coding-competitions" element={<CodingCompetitions/>} />
        <Route path="/organisation-information/:showpage" element={<OrganisationInfo/>} />
        <Route path="/issues" element={<Issues/>} />
        <Route path="/resources" element={<Resources/>} />
        <Route path="/blogs/:blogid/:blogname" element={<BlogPage/>} />
        <Route path="/blogs/all" element={<AllBlogs/>} />
        <Route path="/work-with-us" element={<ContributeSite/>} />
        <Route path="/aptitude-round" element={<AptitudeRound/>} />
        <Route path="/opportunities" element={<Opportunities/>} />
        <Route path="/get-blog-code" element={<BlogAutoCode/>} />
        <Route path="/selected-profiles" element={<SelectedProfiles/>} />
        <Route path="/:random" element={<PageNotExist/>} />
      </Routes>
    </div>
  )
}

export default App