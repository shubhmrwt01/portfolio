import LogoSection from "./sections/LogoSection";
import NavBar from "./components/NavBar";
import FeatureCards from "./sections/FeatureCards";
import Hero from "./sections/Hero";
import ShowCase from "./sections/ShowCase";
import ProjectSection from "./sections/ProjectSection";
import TechStack from "./sections/TechStack";
import Testimonals from "./sections/Testimonals";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import AchievementSection from "./sections/AchievementSection";

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      {/* <ShowCase /> */}
      {/* <LogoSection /> */}
      <FeatureCards />
      <ProjectSection />
      <TechStack />
      {/* <Testimonals /> */}
      <AchievementSection />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
