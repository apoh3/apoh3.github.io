/* Personal Site - as of 07/14/2020 */

//Svg icons
var playIcon = '<svg class="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>';

//Info for resume
const education = [
    {
        title:"Master of Science in Computer Science",
        conferral:"May 2020",
        awards:"4 time Teaching Assistantship recipient",
        gpa:"3.84"
    },
    {
        title:"Bachelor of Science in Computer Science",
        conferral:"May 2018",
        awards:"graduated summa cum laude;Regina Rheault Scholarship recipient;Carrier-Pisarczyk Scholarship recipient",
        gpa:"3.85"
    }
];

const skills = [
    {
        title:"Languages",
        bullets:"{{Java;C#;C;C++;SQL;JavaScript;TypeScript;HTML;CSS;PHP}}"
    },
    {
        title:"Tools and Environments",
        bullets:"{{Eclipse;Visual Studio Code;Android Studio;Unity;SQLiteStudio;MySQL Workbench;Linux;Rational Rose;Git}}"
    },
    {
        title:"Development Methodologies",
        bullets:"{{Agile (Scrum)}}"
    }
];

const workExperience = [
    {
        title:"Graduate Teaching Assistant",
        terms:"Fall 2018 - Spring 2020",
        description:"Lab instructor and grader for 5 core computer science courses:{{Object-Oriented Programming I (Java);Object-Oriented Programming II (Java);Introduction to Computing Systems;Design of Operating Systems (Linux and C);Social and Ethical Aspects of Computing}}"
    },
    {
        title:"Writing and Reading Tutor",
        terms:"Fall 2016 - Spring 2018",
        description:"Worked one-on-one with students to guide them through all stages of the writing process, including idea development, research, and documentation. Additionally, participated in and facilitated weekly workshops."
    },
    {
        title:"Phonathon Caller",
        terms:"Fall 2015 - Spring 2016",
        description:"Called alumni and friends of UMass Dartmouth for contributions to help better the university."
    }
];

const projectsAndResearch = [
    {
        title:"nucleoSLIDE: A Citizen Science Game for the Motif Finding Problem (MS Thesis)",
        terms:"Fall 2019 - Spring 2020",
        languages:"JavaScript, HTML, CSS, SQLite, PHP, Apache"
    },
    {
        title:"Visualizing Uncertainty (Research Assistant at UMassD)",
        terms:"Summer 2019",
        languages:"JavaScript (D3.js), HTML"
    },
    {
        title:"Web Provenance Studies (Research Assistant at UMassD)",
        terms:"Summer 2018",
        languages:"JavaScript (SIMProv), HTML, CSS"
    }, 
    {
        title:"AIS Data Scraper and Archiver (Senior Capstone with NUWC)",
        terms:"Fall 2017 - Spring 2018",
        languages:"Java (JavaFX, Jsoup, JDBC), HTML, Google Maps API",
        roles:"scrume master and software engineer (5 person team)"
    }
];

//Info about each project for portfolio
const portfolioProjects = [
    {
        title:"nucleoSLIDE",
        image:"img/nucleoslide.png",
        text:"Online citizen science game developed to help solve the Motif Finding Problem, where a motif is some meaningful unknown pattern of length <i>k</i> hidden among multiple sequences.",
        try:true,
        link:"http://www.cis.umassd.edu/~apoh/"
    },
    {
        title:"Visualizing Uncertainty", 
        image:"img/visMissing.png",
        text:"Web-based tool for testing visualization methods for viewing and predicting missing or uncertain data in line and bar graphs.", 
        try:true,
        link:"visMissing/index.html"
    },
    {
        title:"AIS Data Archiver",
        image:"img/aisArchiver.png",
        text:"Desktop application for viewing and managing live AIS data (vessel traffic data) that is gathered and stored from web resources without user operation.", 
    },
    {
        title:"Locksmith Barron", 
        image:"img/locksmithBarron.png",
        text:"Puzzle game that tasks players with building keys by banging down groves until the key matches the given mold. When a groove is banged down, both adjacent grooves get its debris causing them to rise.", 
        try:true,
        link:"click here for p4"
    }
];