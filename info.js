/* 
    Personal Website - all text on web page
    as of Aug. 2020
    by Allison Poh
*/

var name = "Allison Poh";
var jobAbbr = "SWE";
var profile = "img/profile.jpg";
var resume = "resume_apoh.pdf";

const navOptions = ["Home","Experience","Portfolio","Contact"];

const contactInfo = ["pohallison@gmail.com","linkedin.com/in/allisonpoh","apoh3.github.io"];

const homeText = "Software Engineer | MS in Computer Science.";

var firstYr = 2015;
var lastYr = 2020;

const experience = [
    //2015
    {
        year:"2015",
        keyword:"moment",
        title:"Enrolled in UMassD Computer Science Program",
        date:"Fall 2015",
        info: [
            
        ]
    },
    {
        year:"2015",
        keyword:"work",
        title:"Volunteer STEM Mentor and Tutor",
        date:"Fall 2015 - Spring 2016",
        info: [
            "helped middle school students with homework and projects related to their STEM studies and promoted interest in the STEM fields through demonstrations and games"
        ]
    },
    {
        year:"2015",
        keyword:"work",
        title:"Phonathon",
        date:"Fall 2015 - Spring 2016",
        info: [
            "called alumni and friends of UMass Dartmouth to update them on current events and to encourage them to financially support the University and upcoming events"
        ]
    },

    //2016
    {
        year:"2016",
        keyword:"work",
        title:"Volunteer STEM Mentor and Tutor",
        date:"Fall 2015 - Spring 2016",
        info: [
            "helped middle school students with homework and projects related to their STEM studies and promoted interest in the STEM fields through demonstrations and games"
        ]
    },
    {
        year:"2016",
        keyword:"work",
        title:"Phonathon",
        date:"Fall 2015 - Spring 2016",
        info: [
            "called alumni and friends of UMass Dartmouth to update them on current events and to encourage them to financially support the University and upcoming events"
        ]
    },
    {
        year:"2016",
        keyword:"award",
        title:"Carrier-Pisarczyk Scholarship Recipient",
        date:"September 2016",
        info: [
            "awarded to a full-time, matriculated undergraduate or graduate student based on academic merit and financial need"
        ]
    },
    {
        year:"2016",
        keyword:"work",
        title:"Lab Assistant",
        date:"Fall 2016",
        info: [
            "assisted labs for EGR 111 Introduction to Engineering and Computing"
        ]
    },
    {
        year:"2016",
        keyword:"work",
        title:"WRC Tutor",
        date:"Fall 2016 - Spring 2018",
        info: [
            "worked one-on-one with students (primarily first-year and STEM students) to guide them through all stages of the writing process, including idea development, research, and documentation",
            "participated in and facilitated weekly workshops with other tutors for continued growth"
        ]
    },

    //2017
    {
        year:"2017",
        keyword:"work",
        title:"WRC Tutor",
        date:"Fall 2016 - Spring 2018",
        info: [
            "worked one-on-one with students (primarily first-year and STEM students) to guide them through all stages of the writing process, including idea development, research, and documentation",
            "participated in and facilitated weekly workshops with other tutors for continued growth"
        ]
    },
    {
        year:"2017",
        keyword:"award",
        title:"Regina Rheault Scholarship Recipient",
        date:"April 2017",
        info: [
            "awarded to an outstanding female student majoring in computer science"
        ]
    },

    //2018
    {
        year:"2018",
        keyword:"work",
        title:"WRC Tutor",
        date:"Fall 2016 - Spring 2018",
        info: [
            "worked one-on-one with students (primarily first-year and STEM students) to guide them through all stages of the writing process, including idea development, research, and documentation",
            "participated in and facilitated weekly workshops with other tutors for continued growth"
        ]
    },
    {
        year:"2018",
        keyword:"moment",
        title:"Completed Senior Capstone",
        date:"May 2018",
        info: [
            "title: AIS Data Archiver (ADA)",
            "worked for the Naval Undersea Warfare Center (NUWC) Division Newport",
            "try AIS Data Archiver in Portfolio below"
        ]
    },
    {
        year:"2018",
        keyword:"grad",
        title:"BS in Computer Science",
        date:"May 2018",
        info: [
            "earned a bachelor's degree from the University of Massachusetts Dartmouth",
            "GPA: 3.85",
            "summa cum laude"
        ]
    },
    {
        year:"2018",
        keyword:"research",
        title:"Research Assistant",
        date:"Summer 2018",
        info: [
            "topic: Web Provenance Studies",
            "researched data visualization techniques for displaying and tracking provenances for web analytics",
            "created highly interactive web pages for testing ease-of-implementation and effectiveness of a new provenance tracking library called SIMProv.js"
        ]
    },
    {
        year:"2018",
        keyword:"work",
        title:"Teacher Assistant",
        date:"Fall 2018",
        info: [
            "prepared, instructed, and graded labs for CIS 180 Object-Oriented Programming I (Java)",
            "graded coursework for CIS 272 Introduction to Computing Systems"
        ]
    },

    //2019
    {
        year:"2019",
        keyword:"work",
        title:"Teacher Assistant",
        date:"Spring 2019",
        info: [
            "prepared, instructed, and graded labs for CIS 180 Object-Oriented Programming I (Java) and CIS 181 Object-Oriented Programming II (Java)"
        ]
    },
    {
        year:"2019",
        keyword:"research",
        title:"Research Assistant",
        date:"Summer 2019",
        info: [
            "topic: Visualizing Uncertainty in Data",
            "developed a web tool to test researched methods and self proposed techniques for visualizing missing and imputed data in common data visualizations",
            "view Visualizing Uncertainty in Portfolio below"
        ]
    },
    {
        year:"2019",
        keyword:"work",
        title:"Teacher Assistant",
        date:"Fall 2019",
        info: [
            "prepared, instructed, and graded labs for CIS 180 Object-Oriented Programming I (Java)",
            "graded coursework and assisted labs for CIS 370 Design of Operating Systems (Linux/C)"
        ]
    },

    //2020
    {
        year:"2020",
        keyword:"work",
        title:"Teacher Assistant",
        date:"Spring 2020",
        info: [
            "prepared, instructed, and graded labs for CIS 181 Object-Oriented Programming II (Java)",
            "graded coursework for CIS 381 Social and Ethical Aspects of Computing"
        ]
    },
    {
        year:"2020",
        keyword:"moment",
        title:"MS Thesis",
        date:"May 2020",
        info: [
            "title: nucleoSLIDE: A Citizen Science Game for the Motif Finding Problem",
            "targeted topics include bioinformatics, algorithms, game design, human-computer interaction",
            "try nucleoSLIDE in Portfolio below"
        ]
    },
    {
        year:"2020",
        keyword:"grad",
        title:"MS in Computer Science",
        date:"May 2020",
        info: [
            "earned MS in Computer Science from the University of Massachusetts Dartmouth",
            "GPA: 3.84"
        ]
    }
];

const skills = [
    {
        title:"Programming",
        includes:"Java;JavaScript;C#;C;C++;Python"
    },
	{
        title:"Web Development",
        includes:"JavaScript;(jQuery, Angular, D3.js, Node.js);HTML/CSS (Bootstrap);TypeScript;PHP",
    },
    {
        title:"Databases",
        includes:"SQLite;MySQL"
    },
    {
        title:"Tools and Environments",
        includes:"Visual Studio Code;Eclipse;Android Studio;Unity;Git"
    },
    {
        title:"Other",
        includes:"Linux;Agile (Scrum)"
    }
];

const portfolioProjects = [
    {
        title:"nucleoSLIDE",
        image:"img/n/5.jpg",
        text:"Online citizen science puzzle game for finding unknown patterns of length k in multiple DNA sequences (known as the Motif Finding Problem in bioinformatics).",
		tech:"JavaScript, HTML/CSS, PHP, SQLite database, Apache server",
        link:"http://www.cis.umassd.edu/~apoh/",
		code:"https://github.com/apoh3/nucleoSLIDE",
        slides:5,
        theme:"light"
    },
    {
        title:"Visualizing Uncertainty", 
        image:"img/v/5.jpg",
        text:"Web tool for testing researched and self-proposed techniques for visualizing missing and imputed data in line and bar graphs (including highlighting, downplaying, and annotating data marks and channels).", 
		tech:"JavaScript (D3.js), HTML/CSS",
        link:"visUncertainty/index.html",
		code:"https://github.com/apoh3/Visualizing-Uncertainty",
        slides:5,
        theme:"dark"
    },
    {
        title:"AIS Data Archiver",
        image:"img/a/2.jpg",
        text:"Desktop application for viewing and managing live AIS data (vessel traffic data) that is scraped and stored from web resources without user operation.", 
		tech:"Java (JavaFX, Jsoup, JDBC), MySQL database, HTML/CSS, Google Maps API",
        link:"x",
		code:"https://github.com/apoh3/AIS-Data-Archiver",
        slides:3,
        theme:"dark"
    },
    {
        title:"TCS Marathon Results",
        image:"img/t/1.jpg",
        text:"Desktop application for querying a multi-table database of marathon results, including results of race divisions, specific runners, and award category recipients.", 
		tech:"Java (JavaFX, JDBC), SQLite database, CSS",
        link:"x",
		code:"https://github.com/apoh3/TCSMarathonResults",
        slides:3,
        theme:"dark"
    },
	{
        title:"Jeopardy",
        image:"img/j/2.jpg",
        text:"Jeopardy desktop game with complete admin access to create and edit stored games through a clean and simple user interface.",
		tech:"Java (JavaFX, JDBC), SQLite database, CSS",
        link:"x",
		code:"https://github.com/apoh3/Jeopardy",
        slides:4,
        theme:"light"
    },
    {
        title:"Quote Finder - The Office",
        image:"img/q/1.jpg",
        text:"Application that scrapes transcripts of The Office episodes from a web page to find quotes based on user input (season, episode, speaker, and/or keywords).", 
		tech:"Python (Tkinter, Beautiful Soup)",
        link:"x",
		code:"https://github.com/apoh3/The-Office-Web-Scraper",
        slides:4,
        theme:"dark"
    },
    {
        title:"Resume Website",
        image:"img/r/1.jpg",
        text:"GitHub Pages website.", 
		tech:"JavaScript (jQuery, D3.js), HTML/CSS (Bootstrap)",
        link:"x",
		code:"https://github.com/apoh3/apoh3.github.io",
        slides:1,
        theme:"dark"
    }
];

