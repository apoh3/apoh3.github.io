/* Personal Site - as of 07/14/2020 */

//Icons from https://icons.getbootstrap.com/
var awardIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-award" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l-1.51-.229L8 1.126l-1.355.702-1.51.229-.684 1.365-1.086 1.072L3.614 6l-.25 1.506 1.087 1.072.684 1.365 1.51.229L8 10.874l1.356-.702 1.509-.229.684-1.365 1.086-1.072L12.387 6l.248-1.506-1.086-1.072-.684-1.365z"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/></svg>';
var badgeIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-badge" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 1H4a1 1 0 0 0-1 1v11.755S4 12 8 12s5 1.755 5 1.755V2a1 1 0 0 0-1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/><path fill-rule="evenodd" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/></svg>';
var calendarIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar3" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/><path fill-rule="evenodd" d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>'
var filledBadgeIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-award-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/></svg>';
var gearIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gear-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"/></svg>';
var infoIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/><circle cx="8" cy="4.5" r="1"/></svg>';
var playIcon = '<svg class="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>';

//Info for resume
const education = [
    {
        school:"University of Massachusetts Dartmouth",
        title:"Master of Science in Computer Science",
        conferral:"May 2020",
        awards:"4 time Teaching Assistantship recipient",
        gpa:"GPA of 3.84"
    },
    {
        school:"University of Massachusetts Dartmouth",
        title:"Bachelor of Science in Computer Science",
        conferral:"May 2018",
        awards:"##Regina Rheault Scholarship recipient;Carrier-Pisarczyk Scholarship recipient;graduated summa cum laude##",
        gpa:"GPA of 3.85"
    }
];

const skills = [
    {
        title:"Languages",
        bullets:"##Java,90;Cpound,70;C,50;Cplusplus,50;SQL,90;JavaScript,90;TypeScript,80;HTML/CSS,90;PHP,70",
        moreInfo: [
            "6;JavaFX, JDBC, jsoup",
            "3",
            "2",
            "1",
            "3",
            "6;jQuery, Angular, D3.js",
            "2",
            "7;Bootstrap",
            "2"]
    },
    {
        title:"Tools and Environments",
        bullets:"##Eclipse;Visual Studio Code;Android Studio;Unity;SQLiteStudio;MySQL Workbench;Linux;Rational Rose;Git##"
    },
    {
        title:"Development Methodologies",
        bullets:"##Agile (Scrum)"
    }
];

const workExperience = [
    {
        title:"Graduate Teaching Assistant",
        terms:"Fall 2018 - Spring 2020",
        description:"Lab instructor and grader for 5 core computer science courses:##;Object-Oriented Programming I (Java);Object-Oriented Programming II (Java);Introduction to Computing Systems;Design of Operating Systems (Linux and C);Social and Ethical Aspects of Computing##"
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
        roles:"scrum master and software engineer (5 person team)"
    }
];

//Info for portfolio
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