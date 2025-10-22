import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './pages/portfolio/components/NavigationBar.js';
import TitleCard from './pages/portfolio/components/TitleCard.js';
import AboutCard from './pages/portfolio/components/AboutCard.js';
import TechStack from './pages/portfolio/components/TechStack.js';
import Footer from './pages/portfolio/components/Footer';
import "./styles/index.scss";
import "./styles/App.scss";
import Projects from './pages/portfolio/components/Projects.js';
import Experience from './pages/portfolio/components/Experience.js';
import ProjectsLinks from './pages/portfolio/components/ProjectsLink.js';

function App() {
  const TitleCardRef = React.useRef(null);
  const AboutCardRef = React.useRef(null);
  const TechStackRef = React.useRef(null);
  const AcademicRef = React.useRef(null);
  const ProjectsRef = React.useRef(null);
  const ProjectLinksRef = React.useRef(null);
  const FooterRef = React.useRef(null);

  var scrollToSectionCallback = (section) => {
    switch(section){
      case "Home":
        TitleCardRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "About":
        AboutCardRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "Tech Stack":
        TechStackRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "Academic and Professional Experience":
        AcademicRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "Projects":
        ProjectsRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "Fun Projects":
        ProjectLinksRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "Contact":
        FooterRef.current.scrollIntoView({behavior: "smooth"});
        break; 
      default:
        //Do nothing.
        break;
    }
  }

  return (
    <>
      <NavigationBar scrollToSectionCallback={scrollToSectionCallback}/>
      <TitleCard innerRef={TitleCardRef}/>
      <AboutCard innerRef={AboutCardRef}/>
      <Experience innerRef={AcademicRef}/>
      <TechStack innerRef={TechStackRef}/>
      <Projects innerRef={ProjectsRef}/>
      <ProjectsLinks innerRef={ProjectLinksRef}/>
      <Footer innerRef={FooterRef} />
    </>
  );
}

export default App;
