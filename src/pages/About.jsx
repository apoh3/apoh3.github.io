import { useState } from "react";
import profilePic from "../assets/profile.jpg";
import researchInterests from "../assets/research_highlight.svg";
import researchInterestsSmall from "../assets/research_highlight_small.svg";

function About() {
  const [showAllNews, setShowAllNews] = useState(false);

  const newsItems = [
    {
      date: "May 2025",
      text: (
        <>
          Our work <em><a href="https://link.springer.com/chapter/10.1007/978-3-031-99264-3_7" target="_blank" rel="noopener noreferrer" className="link">"Enhancing Teacher Support in Learning Technologies: A Human-Centered Approach with WearableLearning"</a></em> was accepted to the Late-Breaking Results track at AIED 2025, and <em><a href="https://ceur-ws.org/Vol-4019/paper_05.pdf" target="_blank" rel="noopener noreferrer" className="link">"Example Explorers and Persistent Finishers: Exploring Student Practice Behaviors in a Python Practice System"</a></em> was accepted to the CSEDM Workshop @ EDM'25.
        </>
      ),
    },
    {
      date: "Apr. 2025",
      text: (
        <>
          Our work <em><a href="https://osf.io/whz2p" target="_blank" rel="noopener noreferrer" className="link">"Educators' Evolving Attitudes Toward AI: Analysis of Discussions from r/Teachers and r/Professors"</a></em> was accepted to <strong>EDULEARN25</strong>.
        </>
      ),
    },
    {
      date: "Apr. 2025",
      text: (
        <>
          Helped organize and moderate the <a href="https://sites.google.com/umass.edu/rtcsymposium/home" target="_blank" rel="noopener noreferrer" className="link">AI x Democracy Symposium</a> as co-chair of the Responsible Technology Coalition.
        </>
      ),
    },
    {
      date: "Dec. 2024",
      text: (
        <>
          Selected as one of four students for the <a href="https://www.cics.umass.edu/news/spring-2025-writing-fellowships" target="_blank" rel="noopener noreferrer" className="link">Spring 2025 Thesis Proposal Writing Fellowship</a> for students in the early stages of their dissertation writing.
        </>
      ),
    },
    {
      date: "Aug. 2024",
      text: (
        <>
          Completed the <a href="https://learnlab.org/learnlab-summer-school/" target="_blank" rel="noopener noreferrer" className="link">Computer Science Education Research track</a> at Carnegie Mellon's LearnLab Summer School in Pittsburgh, PA.
        </>
      ),
    },
    {
      date: "Apr. 2024",
      text: (
        <>
          Our work <em><a href="https://link.springer.com/chapter/10.1007/978-3-031-64315-6_1" target="_blank" rel="noopener noreferrer" className="link">"Aligning AIED Systems to Embodied Cognition and Learning Theories"</a></em> was accepted to the BlueSky track at AIED 2024.
        </>
      ),
    },
    {
      date: "Mar. 2024",
      text: (
        <>
          Helped organize and run the <a href="https://www.cics.umass.edu/news/voices-data-science-encourages-critical-think" target="_blank" rel="noopener noreferrer" className="link">Voices of Data Science conference</a> as a committee member of the Voices of Data Science organization.
        </>
      ),
    },
  ];

  const visibleNews = showAllNews ? newsItems : newsItems.slice(0, 3);

  return (
    <section className="about">
      {/* Hero section */}
      <div className="about-hero">
        <img src={profilePic} alt="Allison Poh" className="about-photo" />
        <div className="about-text">
          <h1>Allison Poh</h1>
          <h2>
            PhD Candidate, Computer Science<br />
            University of Massachusetts (UMass) Amherst
          </h2>
          <p className="blurb">
            I'm a member of the{" "}
            <a
              href="https://advancedlearningtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Advanced Learning Technologies lab
            </a>{" "}
            at UMass Amherst, where I study the design and evaluation of educational
            technologies. My current work focuses on designing a multimodal dashboard to
            support K-12 teachers during embodied learning activities. I’m also interested
            in computer science education and have taught courses at UMass Amherst and UMass
            Dartmouth, as well as served as a graduate research assistant for{" "}
            <a
              href="https://www.datascience4everyone.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Data Science 4 Everyone
            </a>
            . Before starting my PhD, I was a data engineer at Procter & Gamble.
          </p>
          <p className="contact-me">
            The best way to contact me is by email:{" "}
            <a href="mailto:apoh@umass.edu">apoh@umass.edu</a>
          </p>
          <div className="about-buttons">
            <a
              href="/apoh3.github.io/docs/cv_apoh_aug2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      <div className="about-interests">
        <h2>Research Interests</h2>
        <picture>
          <source media="(max-width: 768px)" srcSet={researchInterestsSmall} />
          <img
            src={researchInterests}
            alt="Research Interests Graphic"
            className="research-graphic"
          />
        </picture>
      </div>

      <div className="about-news">
        <h2>Latest News</h2>
        <ul>
          {visibleNews.map((item, i) => (
            <li key={i}>
              <strong>{item.date}</strong> — {item.text}
            </li>
          ))}
        </ul>
        <button className="btn" onClick={() => setShowAllNews(!showAllNews)}>
          {showAllNews ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
}

export default About;
