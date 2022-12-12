import styled from "styled-components";
import react3dLoader from "../Images/react3dLoader.gif";
import TopMessage from "./LandingPageComponents/TopMessage/TopMessage";
import HeroHeader from "./LandingPageComponents/Hero/Hero";
import ModuleSection from "./LandingPageComponents/ModulesSection/ModuleSection";
import Contributors from "./LandingPageComponents/Contributors/Contributors";
import Footer from "./LandingPageComponents/Footer/Footer";
import BottomMessage from "./LandingPageComponents/BottomMessage/BottomMessage";

const LandingPageReal = () => {
  // BROKE DOWN THE MAJOR PARTS OF THE PAGE INTO COMPONENTS TO MAKE STYLING AND TROUBLE SHOOTING EASIER

  // LINKS TO USE AS PROPS FOR THE MODULE COMPONENT

  const section1 = [
    {
      link: "/blogs/all",
      title: "Datastructures and Algorithms",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni eum commodi ipsa praesentium",
    },
    {
      link: "/blogs/all",
      title: "Web Development",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni eum commodi ipsa praesentium",
    },
    {
      link: "/blogs/all",
      title: "Competitive Programming",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni eum commodi ipsa praesentium",
    },
    {
      link: "/blogs/all",
      title: "Computer Science Theory Subjects",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni eum commodi ipsa praesentium",
    },
  ];

  const section2 = [
    {
      link: "/aptitude-round",
      title: "Top most asked Brain Teasers",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni eum commodi ipsa praesentium",
    },
  ];

  const section3 = [
    {
      link: "/resources",
      title: "Resources",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni eum commodi ipsa praesentium",
    },
  ];

  const section4 = [
    {
      link: "//coding-competitions",
      title: "Upcoming Coding Competitions",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni eum commodi ipsa praesentium",
    },
    {
      link: "/coding-competitions",
      title: "Opportunities List",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni eum commodi ipsa praesentium",
    },
    {
      link: "/coding-competitions",
      title: "Coding communites to join",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni eum commodi ipsa praesentium",
    },
  ];

  return (
    // BROKE DOWN THE MAJOR PARTS OF THE PAGE INTO COMPONENTS TO MAKE STYLING AND TROUBLE SHOOTING MORE EASIER

    <GrandContainer>
      {/* <MobContainer>
        We are still working on Responsive Version of the website, please view
        the site with width more than 1100px, a standard laptop or tablet
        landscape.
        <img
          src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif"
          alt=""
        />
      </MobContainer> */}
      <Container>
        <TopMessage />

        <HeroHeader gif={react3dLoader} />

        <div className="categories-page">
          <div className="page-head">Modules of Algorithmist</div>
          <div className="page-sub-head">
            These are the main sections which the website is currently building
            on. Website has sections for the coding enthusiasts, from reading
            blogs to getting all informations about the coding opportunities.
          </div>

          <ModuleSection
            title="1. Beginner Friendly Blogs"
            body="We have beginner friendly website contents, no fancy texts and
              informations. We just give as much information required by the
              first time reading users, because we firmly believe that when you
              want to learn a language you don't study it from a dictionary."
            links={section1}
          />

          <ModuleSection
            title="2. Aptitude Round - Hiring Process"
            body="Interviewers ask brainteaser questions because they think your
              ability to answer will provide some indication of your ability to
              do the job. Often, the hiring manager feels the brainteaser will
              help them to evaluate your strength in one or more of the
              following competency areas : Problem solving, Critical thinking,
              Analytic skills, Creativity and Ability to think on your feet."
            links={section2}
          />

          <ModuleSection
            title="3. Resources for Learning"
            body="We link to you all the resources available on internet from
              question papers to notes in an organised manner."
            links={section3}
          />

          <ModuleSection
            title="4. List of Competitions & Opportunities"
            body="These are the lists useful for coder who want to compete or want
              to get hired."
            links={section4}
          />
        </div>

        {/* THIS COMMENTED OUT CODE CAN BE FOUND IN THE COPY OF THE ORIGINAL LANDING PAGE /landingComponent/OriginalLandingPage  */}

        <Contributors />
        
        <PageThreeFooter>

          <Footer />

          <BottomMessage />

        </PageThreeFooter>
      </Container>
    </GrandContainer>
  );
};

export default LandingPageReal;

const GrandContainer = styled.div``;

// const MobContainer = styled.div``;

const Container = styled.div`
  /* @media only screen and (max-width: 1100px){
    display: none;
  } */
  width: 100vw;
  padding-top: 40px;
  /* MODULE HEAD CSS  */
  .categories-page {
    width: 100vw;
    min-height: 540px;
    padding: 100px 50px;

    .page-head {
      font-size: 2.5rem;
      font-weight: 500;
    }

    .page-sub-head {
      max-width: 980px;
      margin: 10px 0;
      font-size: 1.15rem;
      font-weight: 200;
    }
  }
  /* MODULE HEAD CSS  */
`;
/* margin-bottom: 60px; */
const PageThreeFooter = styled.div`
  height: 560px;
  background-color: #111;
  padding-top: 36px;
  position: relative;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
`;
