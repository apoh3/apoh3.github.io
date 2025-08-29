import { Presentation } from "lucide-react";

function Teaching() {
  const teachings = [
    // --- PRIMARY ---
    // --- UMass Amherst ---
    {
      title: "Intro to Programming",
      university: "UMass Amherst",
      link_syllabus: "https://drive.google.com/file/d/1Yz-5qXAWWpWXKXjE6GLe8VAZUxt-_QW0/view?usp=sharing",
      link_presentation: null,
      semesters: "Fall 24",
      type: "primary"
    },
    {
      title: "Foundations of Programming",
      university: "UMass Amherst",
      link_syllabus: "https://drive.google.com/file/d/1F-gCZKBQiQgaSV80TxVfPdckkJzxsGlD/view?usp=sharing",
      link_presentation: null,
      semesters: "Spring 2023, Spring 2024",
      type: "primary"
    },
    {
      title: "A Mathematical Foundation for Informatics",
      university: "UMass Amherst",
      link_syllabus: "https://drive.google.com/file/d/1Q7hAZOoICSw9kZuK_5Fkbk1424VrGX-j/view?usp=sharing",
      link_presentation: null,
      semesters: "Fall 2023",
      type: "primary"
    },
    {
      title: "First-Year Seminar: Mobile & Wearable Technologies",
      university: "UMass Amherst",
      link_syllabus: "https://drive.google.com/file/d/1VLjXbBFM4fkD4zROpItiMqkSvRDETRho/view?usp=sharing",
      link_presentation: null,
      semesters: "Fall 2022",
      type: "primary"
    },

    // --- UMass Dartmouth ---
    {
      title: "Artificial Intelligence",
      university: "UMass Dartmouth",
      link_syllabus: "https://drive.google.com/file/d/1IU56zu8kcRIQxb0s7XhcWVI3tq2dJpp2/view?usp=sharing",
      link_presentation: null,
      semesters: "Spring 2024",
      type: "primary"
    },
    {
      title: "Data Analysis & Visualization",
      university: "UMass Dartmouth",
      link_syllabus: "https://drive.google.com/file/d/1OogjU8wrqgt13-tRoQ9jTVt2dkpzehiq/view?usp=sharing",
      link_presentation: null,
      semesters: "Spring 2024",
      type: "primary"
    },
    {
      title: "Artificial Intelligence (graduate level)",
      university: "UMass Dartmouth",
      link_syllabus: "https://drive.google.com/file/d/13Eunm0ZLoAFPaPXjLiGMUAymXDyJXXOt/view?usp=sharing",
      link_presentation: null,
      semesters: "Fall 2023",
      type: "primary"
    },
    {
      title: "Data Mining & Knowledge Discovery",
      university: "UMass Dartmouth",
      link_syllabus: "https://drive.google.com/file/d/1vqBFNhVNdqJjdLHC83SNXtzuUq0naufZ/view?usp=sharing",
      link_presentation: null,
      semesters: "Fall 2022, Fall 2023",
      type: "primary"
    },

    // --- TA ---
    // --- UMass Amherst ---
    {
      title: "Object-Oriented Programming",
      university: "UMass Amherst",
      link_syllabus: null,
      link_presentation: null,
      semesters: "Fall 2025",
      type: "ta",
    },
    {
      title: "Programming with Data Structures",
      university: "UMass Amherst",
      link_syllabus: null,
      link_presentation: null,
      semesters: "Spring 2022, Fall 2022",
      type: "ta",
    },
    {
      title: "Computer Crime Law",
      university: "UMass Amherst",
      link_syllabus: null,
      link_presentation: null,
      semesters: "Fall 2021",
      type: "ta",
    },

    // --- UMass Dartmouth ---
    {
      title: "Object-Oriented Programming II",
      university: "UMass Dartmouth",
      link_syllabus: null,
      link_presentation: null,
      semesters: "Spring 2019, Fall 2020",
      type: "ta",
    },
    {
      title: "Object-Oriented Programming I",
      university: "UMass Dartmouth",
      link_syllabus: null,
      link_presentation: null,
      semesters: "Fall 2018, Spring 2019, Fall 2019",
      type: "ta",
    },
    {
      title: "Design of Operating Systems ",
      university: "UMass Dartmouth",
      link_syllabus: null,
      link_presentation: null,
      semesters: "Fall 2019",
      type: "ta",
    },
    {
      title: "Introduction to Computing Systems",
      university: "UMass Dartmouth",
      link_syllabus: null,
      link_presentation: null,
      semesters: "Fall 2018",
      type: "ta",
    },

    // --- Workshops ---
    {
      title: "Better Collaborative Problem Solving: The Driver-Navigator Approach",
      university: "Teaching Academy @ UMass Amherst",
      link_syllabus: null,
      link_presentation:
        "https://drive.google.com/file/d/1yirEyTLdHNJ9GU8g9257ZIjmQZA8pn22/view?usp=sharing",
      semesters: "2024",
      type: "workshop",
    },
  ];

  const renderGrouped = (items) => {
    const grouped = items.reduce((acc, t) => {
      if (!acc[t.university]) acc[t.university] = [];
      acc[t.university].push(t);
      return acc;
    }, {});

    return Object.entries(grouped).map(([university, courses]) => (
      <div key={university} className="teaching-university">
        <h4>{university}</h4>
        <div className="teaching-list">
          {courses.map((teach, i) => {
            const link = teach.link_syllabus || teach.link_presentation;
            return (
              <div key={i} className="teaching-item">
                <p className="title">
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="title-link"
                    >
                      {teach.title}
                    </a>
                  ) : (
                    teach.title
                  )}{" "}
                  — {teach.semesters}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  const renderWorkshops = (items) => (
    <ol className="workshop-list">
      {items.map((teach, i) => (
        <li key={i} className="workshop-item">
          <p className="title">{teach.title}</p>
          <p className="venue">
            {teach.university} {teach.semesters}
          </p>
          <div className="links">
            {teach.link_presentation && (
              <a
                className="link_presentation"
                href={teach.link_presentation}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Presentation className="icon" />
                Presentation
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );

  return (
    <section className="teaching">
      <h2>Primary Instructor</h2>
      {renderGrouped(teachings.filter((t) => t.type === "primary"))}

      <h2>Teaching Assistant</h2>
      {renderGrouped(teachings.filter((t) => t.type === "ta"))}

      <h2>Pedagogical Talks</h2>
      {renderWorkshops(teachings.filter((t) => t.type === "workshop"))}
    </section>
  );
}

export default Teaching;
