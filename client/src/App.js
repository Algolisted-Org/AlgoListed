import React, { useState, useEffect } from 'react'

import {
  Routes,
  Route,
} from "react-router-dom";
import styled from 'styled-components'

import { BlogPage , AboutUs , Contact , FutureVision ,BlogIdeas, CodingCompetitions , Issues ,
PageNotExist ,LandingPage ,OrganisationInfo ,AllBlogs ,AptitudeRound ,Opportunities ,Resources,
ContributeSite ,BlogAutoCode ,AuthPage , SelectedProfiles, CodingSheets ,AddContentCoreOnly ,LandingPage2, 
Readme, CoreTeam ,Mission , RequestAPI, ChartTemp, PushDataToMongoDB } from './Screen'
import ScrollToTop from './Components/ScrollToTop';
import GoToTop from './Components/GoToTop';
import BuyMeACoffee from './Components/BuyMeACoffee';
import CCHeader from './Components/CCHeader';
import CompetitionApi from './DevelopmentLocal/CompetitionApi';

const App = () => {
  return (
    <div>
      <ScrollToTop/>
      <Routes>
        <Route path="/development" element={<CompetitionApi/>} />
        <Route path="/" element={<LandingPage2/>} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/sign-in" element={<AuthPage/>} />
        <Route path="/create-account" element={<AuthPage/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/core-team" element={<CoreTeam/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/mission" element={<Mission/>} />
        <Route path="/future-vision" element={<FutureVision/>} />
        <Route path="/request-api" element={<RequestAPI/>} />
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
        {/* <Route path="/coding-sheets" element={<CodingSheets/>} /> */}
        <Route path="/coding-sheets/:sheetname" element={<CodingSheets/>} />
        <Route path="/add-content-core-only" element={<AddContentCoreOnly/>} />
        <Route path="/readme" element={<Readme/>} />
        <Route path="/:random" element={<PageNotExist/>} />
        <Route path="/:random/:random" element={<PageNotExist/>} />
      </Routes>
      
      <GoToTop/>
    </div>
  )
}

export default App