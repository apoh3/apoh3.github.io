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

const contactInfo = ["pohallison@gmail.com","linkedin.com/in/allisonpoh","github.com/apoh3"];

const homeText = "Software Engineer | MS in Computer Science.";

var firstYr = 2015;
var lastYr = 2020;

const experience = [
    //2015
    {
        year:"2015",
        keyword:"moment",
        title:"Computer Science Candidate",
        date:"Sept. 2015",
        info: [
            "Enrolled in the Computer Science program at the University of Massachusetts Dartmouth."
        ]
    },
    {
        year:"2015",
        keyword:"work",
        title:"Volunteer STEM Mentor and Tutor",
        date:"Sept. 2015 - May 2016",
        info: [
            "Increased math literacy and interest in middle school students by helping students with STEM related homework, performing STEM demonstrations, and leading math games."
        ]
    },
    {
        year:"2015",
        keyword:"work",
        title:"Phonathon Caller",
        date:"Sept. 2015 - May 2016",
        info: [
            "Increased donations for UMass Dartmouth by calling 150+ alumni and friends of the University per night, updating them on current events and encouraging them to financially support the University."
        ]
    },

    //2016
    {
        year:"2016",
        keyword:"work",
        title:"Volunteer STEM Mentor and Tutor",
        date:"Sept. 2015 - May 2016",
        info: [
            "Increased math literacy and interest in middle school students by helping students with STEM related homework, performing STEM demonstrations, and leading math games."
        ]
    },
    {
        year:"2016",
        keyword:"work",
        title:"Phonathon Caller",
        date:"Sept. 2015 - May 2016",
        info: [
            "Increased donations for UMass Dartmouth by calling 150+ alumni and friends of the University per night, updating them on current events and encouraging them to financially support the University."
        ]
    },
    {
        year:"2016",
        keyword:"award",
        title:"Carrier-Pisarczyk Scholarship Recipient",
        date:"Sept. 2016",
        info: [
            "Awarded to a full-time, matriculated undergraduate or graduate student based on academic merit and financial need."
        ]
    },
    {
        year:"2016",
        keyword:"work",
        title:"Engineering Lab Assistant",
        date:"Sept. 2016 - Dec. 2016",
        info: [
            "Improved first-year engineering students' understanding of engineering disciplines by assisting with projects in Introduction to Engineering and Computing labs."
        ]
    },
    {
        year:"2016",
        keyword:"work",
        title:"Literacy Tutor",
        date:"Sept. 2016 - May 2018",
        info: [
            "Strengthened communication and analytical skills by aiding students throughout the writing process.",
            "Educated other tutors on web design and web development by leading a digital literacy workshop."
        ]
    },

    //2017
    {
        year:"2017",
        keyword:"work",
        title:"Literacy Tutor",
        date:"Sept. 2016 - May 2018",
        info: [
            "Strengthened communication and analytical skills by aiding students throughout the writing process.",
            "Educated other tutors on web design and web development by leading a digital literacy workshop."
        ]
    },
    {
        year:"2017",
        keyword:"award",
        title:"Regina Rheault Scholarship Recipient",
        date:"Apr. 2017",
        info: [
            "Awarded to an outstanding female student majoring in computer science."
        ]
    },

    //2018
    {
        year:"2018",
        keyword:"work",
        title:"Literacy Tutor",
        date:"Sept. 2016 - May 2018",
        info: [
            "Strengthened communication and analytical skills by aiding students throughout the writing process.",
            "Educated other tutors on web design and web development by leading a digital literacy workshop."
        ]
    },
    {
        year:"2017",
        keyword:"moment",
        title:"Senior Capstone",
        date:"Sept. 2017 - May 2018",
        info: [
            "Improved vessel tracking by developing a Java application for scraping and displaying live data for the Naval Undersea Warfare Center Division Newport.",
            "Managed Agile development as Scrum Master by leading scrum meetings, resulting in healthy progress and excellent team dynamic.",
            "View AIS Data Archiver in Portfolio below."
        ]
    },
    {
        year:"2018",
        keyword:"moment",
        title:"Senior Capstone",
        date:"Sept. 2017 - May 2018",
        info: [
            "Improved vessel tracking by developing a Java application for scraping and displaying live data for the Naval Undersea Warfare Center Division Newport.",
            "Managed Agile development as Scrum Master by leading scrum meetings, resulting in healthy progress and excellent team dynamic.",
            "View AIS Data Archiver in Portfolio below."
        ]
    },
    {
        year:"2018",
        keyword:"grad",
        title:"BS in Computer Science",
        date:"May 2018",
        info: [
            "Earned an BS in Computer Science with highest distinction from the University of Massachusetts Dartmouth."
        ]
    },
    {
        year:"2018",
        keyword:"research",
        title:"Research Assistant",
        date:"June 2018 - Aug. 2018",
        info: [
            "Validated a new JavaScript framework by testing its ease-of-implementation, correctness, and portability on 3 interactive web pages."
        ]
    },
    {
        year:"2018",
        keyword:"work",
        title:"CS Teacher Assistant",
        date:"Sept. 2018 - Dec. 2018",
        info: [
            "Prepared, instructed, and graded 2 lab sections of Object-Oriented Programming I (Java).",
            "Graded coursework of 80+ students for Introduction to Computing Systems."
        ]
    },

    //2019
    {
        year:"2019",
        keyword:"work",
        title:"CS Teacher Assistant",
        date:"Jan. 2019 - May 2019",
        info: [
            "Prepared, instructed, and graded 3 lab sections of Object-Oriented Programming I and II (Java).",
        ]
    },
    {
        year:"2019",
        keyword:"research",
        title:"Research Assistant",
        date:"June 2019 - Aug. 2019",
        info: [
            "Illustrated 18 methods to visualize and interact with imputed data by developing a web tool using JavaScript, setting grounds for a user study.",
            "Try Visualizing Uncertainty in Portfolio below."
        ]
    },
    {
        year:"2019",
        keyword:"work",
        title:"CS Teacher Assistant",
        date:"Sept. 2019 - Dec. 2019",
        info: [
            "Prepared, instructed, and graded 2 lab sections of Object-Oriented Programming I (Java).",
            "Graded coursework of 80+ students and assisted in labs for Design of Operating Systems (Linux and C)."
        ]
    },
    {
        year:"2019",
        keyword:"moment",
        title:"MS Thesis",
        date:"Sept. 2019 - May 2020",
        info: [
            "Reduced complexity of an NP-complete bioinformatics problem by developing a web game, allowing non-scientists to aid genomic research.",
            "View nucleoSLIDE in Portfolio below."
        ]
    },

    //2020
    {
        year:"2020",
        keyword:"moment",
        title:"MS Thesis",
        date:"Sept. 2019 - May 2020",
        info: [
            "Reduced complexity of an NP-complete bioinformatics problem by developing a web game, allowing non-scientists to aid genomic research.",
            "View nucleoSLIDE in Portfolio below."
        ]
    },
    {
        year:"2020",
        keyword:"work",
        title:"CS Teacher Assistant",
        date:"Jan. 2020 - May 2020",
        info: [
            "Prepared, instructed, and graded an Object-Oriented Programming II (Java) lab.",
            "Graded coursework of 80+ students for Social and Ethical Aspects of Computing."
        ]
    },
    {
        year:"2020",
        keyword:"grad",
        title:"MS in Computer Science",
        date:"May 2020",
        info: [
            "Earned an MS in Computer Science with a 3.84 GPA from the University of Massachusetts Dartmouth."
        ]
    }
];

const skills = [
    {
        title:"Programming",
        includes:"Java;JavaScript;C#;C++;C;Python"
    },
	{
        title:"Web Development",
        includes:"JavaScript;(jQuery, Angular, D3.js, Node.js);HTML/CSS (Bootstrap);PHP",
    },
    {
        title:"Databases",
        includes:"SQLite;MySQL"
    },
    {
        title:"Tools and Environments",
        includes:"Visual Studio Code;Eclipse;Git/Github"
    },
    {
        title:"Other",
        includes:"Linux;Agile;Scrum"
    }
];

const portfolioProjects = [
    {
        title:"nucleoSLIDE",
        image:"img/n/5.jpg",
        text:"Online citizen science puzzle game for finding unknown patterns of length k in multiple DNA sequences (known as the Motif Finding Problem in bioinformatics).",
        tech:"JavaScript, HTML/CSS, PHP, SQLite database, Apache server",
        purpose:"MS thesis",
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
        purpose:"research assistant position",
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
        purpose:"BS senior capstone",
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
        purpose:"database systems course",
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
        purpose:"independent project",
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
        purpose:"independent project",
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
        purpose:"independent project",
        link:"x",
		code:"https://github.com/apoh3/apoh3.github.io",
        slides:1,
        theme:"dark"
    }
];

