import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/layouts/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Footer from "./components/layouts/Footer";
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
