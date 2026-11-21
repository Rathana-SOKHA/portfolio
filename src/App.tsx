import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/animations/CustomCursor";
import ScrollProgress from "./components/animations/ScrollProgress";
import ClickSpark from "./components/animations/ClickSpark";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        {/* Subtle, non-intrusive interactive enhancements */}
        <CustomCursor />
        <ScrollProgress />
        <ClickSpark />

        <Navbar />
        <main className="w-full max-w-full overflow-x-hidden">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
