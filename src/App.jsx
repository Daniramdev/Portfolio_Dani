import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import LoadingScreen from "./components/LoadingScreen";
import HeroSection from "./components/Hero";
import AboutMe from "./components/About";
import MovingText from "./components/AnimatedText";
import ProjectList from "./components/ProjectList";
import ProjectSection from "./components/Projects";
import ContactSection from "./components/ContactSection";



export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading selama 2.5 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // sesuaikan durasi loading jika perlu

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Nav />
         
      )}
      <HeroSection/>
      <MovingText/>
      <AboutMe/>
      <ProjectList/>
      <ProjectSection/>
      <ContactSection/>
     
    </>
  );
}