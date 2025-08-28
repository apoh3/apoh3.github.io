import { FileText, SquarePlay } from "lucide-react";

function Publications() {
  const publications = [
    {
      title: "Enhancing Teacher Support in Learning Technologies: A Human-Centered Approach with WearableLearning",
      authors: "Allison Poh, Yuqian Shi, Francisco Castro and Ivon Arroyo",
      venue: "AIED 2025",
      link_paper: "https://link.springer.com/chapter/10.1007/978-3-031-99264-3_7",
      link_talk: null,
      type: "publications"
    },
    {
      title: "Example Explorers and Persistent Finishers: Exploring Student Practice Behaviors in a Python Practice System",
      authors: "Allison Poh, Anurata Prabha Hridi, Jordan Barria-Pineda, Peter Brusilovsky and Bita Akram",
      venue: "CSEDM Workshop @ EDM 2025",
      link_paper: "https://sites.google.com/view/csedm-workshop-edm25/schedule-proceedings?authuser=0",
      link_talk: null,
      type: "publications"
    },
    {
      title: "Educators' Evolving Attitudes Toward AI: Analysis of Discussions from r/Teachers and r/Professors",
      authors: "Allison Poh, Ari Dang* and Albert Young* (*contributed equally)",
      venue: "EDULEARN 2025",
      link_paper: "https://osf.io/whz2p",
      link_talk: null,
      type: "publications"
    },
    {
      title: "Aligning AIED Systems to Embodied Cognition and Learning Theories",
      authors: "Ivon Arroyo, Injila Rasul, Danielle Crabtree, Francisco Castro, Allison Poh, Sai Gattupalli, William Lee, Hannah Smith and Matthew Micciolo",
      venue: "AIED 2024",
      link_paper: "https://link.springer.com/chapter/10.1007/978-3-031-64315-6_1",
      link_talk: null,
      type: "publications"
    },
    {
      title: "Design Principles for Teacher Dashboards to Support In-Class Learning",
      authors: "Allison Poh, Francisco Castro and Ivon Arroyo",
      venue: "ICLS 2023",
      link_paper: "https://repository.isls.org//handle/1/10322",
      link_talk: "https://youtu.be/UBgwUPge1Ak",
      type: "publications"
    },
    {
      title: "WearableLearning: Developing Computational Thinking through Modeling, Simulation and Computational Problem Solving",
      authors: "Injila Rasul, Danielle Crabtree, Francisco Castro, Allison Poh, Sai Gattupalli, Krishna Kathala and Ivon Arroyo",
      venue: "ICLS 2023",
      link_paper: "https://repository.isls.org/handle/1/9849",
      link_talk: null,
      type: "publications"
    },
    {
      title: "nucleoSLIDE: A Citizen Science Game for the Motif Finding Problem",
      authors: null,
      venue: "Master's Thesis, UMass Dartmouth 2020",
      link_paper: "https://umassd.primo.exlibrisgroup.com/discovery/delivery/01MA_DM_INST:umassd_library/12117857170001301",
      link_talk: null,
      type: "other"
    }
  ];

  const renderList = (items) => (
    <ol className="pub-list">
      {items.map((pub, i) => (
        <li key={i}>
          <p className="title">{pub.title}</p>
          {pub.authors && (
            <p className="authors">
              {pub.authors.split(/(Allison Poh|\(\*contributed equally\))/).map((part, idx) => {
                if (part === "Allison Poh") {
                  return <strong key={idx}>{part}</strong>;
                } else if (part === "(*contributed equally)") {
                  return (
                    <em key={idx}>
                      {part}
                    </em>
                  );
                } else {
                  return part;
                }
              })}
            </p>
          )}
          <p className="venue">{pub.venue}</p>
          <div className="links">
            {pub.link_paper && (
              <a
                class="link_paper"
                href={pub.link_paper}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText class="icon" />
                Paper
              </a>
            )}
            {pub.link_talk && (
              <>
                {"|"}
                <a
                  class="link_talk"
                  href={pub.link_talk}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SquarePlay class="icon" />
                  Talk
                </a>
              </>
            )}
          </div>
        </li>
      ))}
    </ol>
  );

  return (
    <section className="publications">
      <h2 >Publications</h2>
      {renderList(publications.filter((pub) => pub.type === "publications"))}

      <h2>Other</h2>
      {renderList(publications.filter((pub) => pub.type === "other"))}
    </section>
  );
}

export default Publications;
