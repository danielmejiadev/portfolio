import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import StackStrip from "@/components/StackStrip";
import About from "@/components/About";
import Trajectory from "@/components/Trajectory";
import OpenSource from "@/components/OpenSource";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />
      <main id="main">
        <Hero />
        <CaseStudies />
        <StackStrip />
        <About />
        <Trajectory />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
