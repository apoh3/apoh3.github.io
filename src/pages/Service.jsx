function Service() {
  const services = [
    // --- Professional Service ---
    {
      title: "ISLS",
      role: "Reviewer",
      year: 2026,
      type: "professional"
    },
    {
      title: "SIGCSE TS",
      role: "Reviewer",
      year: 2026,
      type: "professional"
    },
    {
      title: "Frontiers in Education",
      role: "Reviewer",
      year: 2025,
      type: "professional"
    },
    {
      title: "AIED",
      role: "Reviewer",
      year: 2025,
      type: "professional"
    },
    {
      title: "ISLS",
      role: "Reviewer",
      year: 2025,
      type: "professional"
    },
    {
      title: "SIGCSE TS",
      role: "Reviewer",
      year: 2025,
      type: "professional"
    },
    {
      title: "CHI Play",
      role: "Student Volunteer",
      year: 2024,
      type: "professional"
    },

    // --- University Service ---
    {
      title: "Responsible Technology Coalition",
      role: "Co-Chair",
      year: "2025 - 2026",
      type: "university"
    },
    {
      title: "HackUMass XIII",
      role: "Judge",
      year: "2025 - 2026",
      type: "university"
    },
    {
      title: "PhD Applicant Support Program",
      role: "Volunteer",
      year: "2025 - 2026",
      type: "university"
    },  
    {
      title: "Responsible Technology Coalition",
      role: "Co-Chair",
      year: "2024 - 2025",
      type: "university"
    },
    {
      title: "PhD Applicant Support Program",
      role: "Committee Member",
      year: "2024 - 2025",
      type: "university"
    },
    {
      title: "Undergraduate Research Volunteer",
      role: "Mentor",
      year: "2024 - 2025",
      type: "university"
    },
    {
      title: "Voices of Data Science",
      role: "Committee Member",
      year: "2023 - 2024",
      type: "university"
    },
    {
      title: "Undergraduate Research Volunteer",
      role: "Mentor",
      year: "2023 - 2024",
      type: "university"
    },
    {
      title: "Undergraduate Research Night",
      role: "Volunteer",
      year: "2023 - 2024",
      type: "university"
    },
    {
      title: "PhD Applicant Support Program",
      role: "Volunteer",
      year: "2023 - 2024",
      type: "university"
    },
    {
      title: "Graduate Women in STEM Mentoring Committee",
      role: "Co-Chair",
      year: "2022 - 2023",
      type: "university"
    },
    {
      title: "Undergraduate Research Volunteer",
      role: "Mentor",
      year: "2022 - 2023",
      type: "university"
    },
    {
      title: "PhD Applicant Support Program",
      role: "Volunteer",
      year: "2022 - 2023",
      type: "university"
    },
    {
      title: "Graduate Women in STEM Mentoring Committee",
      role: "Committee Member",
      year: "2021 - 2022",
      type: "university"
    },
    {
      title: "Graduate Women in STEM Outreach Committee",
      role: "Committee Member",
      year: "2021 - 2022",
      type: "university"
    },
    {
      title: "Women in Engineering & Computing Career Day",
      role: "Volunteer",
      year: "2021 - 2022",
      type: "university"
    },
    {
      title: "PhD Applicant Support Program",
      role: "Volunteer",
      year: "2021 - 2022",
      type: "university"
    },

    // --- Other ---
    {
      title: "Letters to a Pre-Scientist",
      role: "Pen Pal",
      year: "2024 - present",
      type: "other"
    },
  ];

  const groupByYear = (items) => {
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.year]) acc[item.year] = [];
      acc[item.year].push(item);
      return acc;
    }, {});
    return Object.entries(grouped).sort((a, b) => b[0] - a[0]);
  };

  const renderGrouped = (items) => {
    const grouped = groupByYear(items);
    return grouped.map(([year, services]) => (
      <div key={year} className="service-year">
        <h4>{year}</h4>
        <div className="service-list">
          {services.map((s, i) => (
            <div key={i} className="service-item">
              <p className="title">
                {s.title} — {s.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <section className="teaching">
      <h2>Professional Service</h2>
      {renderGrouped(services.filter((s) => s.type === "professional"))}

      <h2>University Service</h2>
      {renderGrouped(services.filter((s) => s.type === "university"))}

      <h2>Other</h2>
      {renderGrouped(services.filter((s) => s.type === "other"))}
    </section>
  );
}

export default Service;