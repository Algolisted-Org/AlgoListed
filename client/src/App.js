import React, { useState, useEffect } from 'react'

import {
  Routes,
  Route,
} from "react-router-dom";
import styled from 'styled-components'

import { BlogPage , AboutUs , Contact , FutureVision ,BlogIdeas, CodingCompetitions , Issues ,
PageNotExist, OrganisationInfo ,AllBlogs ,AptitudeRound ,Opportunities ,Resources,
ContributeSite ,BlogAutoCode ,AuthPage , SelectedProfiles, CodingSheets ,AddContentCoreOnly ,LandingPage2, 
Readme, CoreTeam ,Mission , RequestAPI, ChartTemp, PushDataToMongoDB }  from './Screen'
import ScrollToTop from './Components/ScrollToTop';
import GoToTop from './Components/GoToTop';
import BuyMeACoffee from './Components/BuyMeACoffee';
import CCHeader from './Components/CCHeader';
// import CompetitionApi from './DevelopmentLocal/CompetitionApi';
import CoursesReview from './Screen/CoursesReview';
import OnlineAssessment from './Screen/OnlineAssessment';
// import CodeClub from './Screen/CodeClub';
import ContestAnalysis from './Screen/ContestAnalysis';
import ContestAnalysisList from './Screen/ContestAnalysisList';
import InterviewSummaries from './Screen/InterviewSummaries';
import ShowdownServer from './Screen/ShowdownServer';
import ShowdownServerOpened from './Screen/ShowdownServerOpened';
import Development from './Screen/Development';
import LandingPage3 from './Screen/LandingPage3';
import ContestArchive from './Screen/ContestArchive';

const App = () => {
  return (
    <div>
      <ScrollToTop/>
      <Routes>
        {/* <Route path="/development" element={<CompetitionApi/>} /> */}
        {/* <Route path="/" element={<LandingPage2/>} /> */}
        <Route path="/" element={<LandingPage3/>} />
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
        <Route path="/contest-analysis" element={<ContestAnalysisList/>} />
        <Route path="/contests-archive" element={<ContestArchive/>} />
        <Route path="/contest-analysis/:contestName" element={<ContestAnalysis/>} />
        <Route path="/courses-review" element={<CoursesReview/>} />
        <Route path="/online-assessment" element={<OnlineAssessment/>} />
        <Route path="/interview-summaries" element={<InterviewSummaries/>} />
        <Route path="/showdown-server" element={<ShowdownServer/>} />
        <Route path="/showdown-server/:serverId" element={<ShowdownServerOpened/>} />
        <Route path="/development" element={<Development/>} />
        {/* <Route path="/codeclub/jadavpur-university" element={<CodeClub/>} /> */}
        <Route path="/:random" element={<PageNotExist/>} />
        <Route path="/:random/:random" element={<PageNotExist/>} />
      </Routes>
      <GoToTop/>
    </div>
  )
}

export default App