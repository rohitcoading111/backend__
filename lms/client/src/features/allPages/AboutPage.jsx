
import useAboutPage from "./hooks/useAboutPage";

import SEO from "../../components/SEO.jsx";
import AboutNavbar from "./components/AboutNavbar";
import AboutIntro from "./components/AboutIntro";
import FeatureSection from "./components/FeatureSection";
import AboutCTA from "./components/AboutCTA";
import AboutFooter from "./components/AboutFooter";
import "./HomePage.css";

export default function AboutPage() {
  const { features } = useAboutPage();

  return (
    <main className="learnhub-home learnhub-about min-h-screen overflow-hidden text-white">
      <SEO
        title="About LearnHub – Our Learning Platform"
        description="Learn about LearnHub, our mission and our approach to making online education accessible through expert-led courses and live classes."
        path="/about"
      />
      <AboutNavbar />

      <AboutIntro />

      <section
        id="platform-features"
        className="px-5 py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-cyan-400 sm:text-sm">
              Explore the Platform
            </p>

            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              LearnHub Features for Students, Instructors and Organizations
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base">
              Explore actual LearnHub platform interfaces and
              understand how each feature supports the learning
              experience.
            </p>
          </div>

          <div className="space-y-24 sm:space-y-32">
            {features.map((feature, index) => (
              <FeatureSection
                key={feature.number}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <AboutCTA />

      <AboutFooter />
    </main>
  );
}
