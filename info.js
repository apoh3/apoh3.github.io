var name = "Allison Poh";
var jobAbbr = "SWE";
var profile = "img/profile.jpg";

const navOptions = ["Home","Experience","Skills","Portfolio","Contact"];

const contactInfo = ["pohallison@gmail.com","linkedin.com/in/allisonpoh","apoh3.github.io"];

const expereince = [
    {
        years:"2016-2018",
        job:"Writing and Reading Tutor",
        pos:"bottom"
    },
    {
        years:"2018-2020",
        job:"Graduate Teaching Assistant",
        pos:"bottom"
    },
    {
        years:"2017-2018",
        job:"Senior Capstone",
        pos:"top"
    },    
    {
        years:"2018",
        job:"Research Assistant 1",
        pos:"top"
    },
    {
        years:"2019",
        job:"Research Assistant 2",
        pos:"top"
    },
    {
        years:"2019-2020",
        job:"MS Thesis",
        pos:"top"
    },
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
        text:"Web tool for testing researched methods and self-proposed techniques for visualizing missing and imputed data in line and bar graphs (including highlighting, downplaying, and annotating data points).", 
		tech:"JavaScript (D3.js), HTML/CSS",
        link:"visUncertainty/index.html",
		code:"https://github.com/apoh3/Visualizing-Uncertainty",
        slides:5,
        theme:"dark"
    },
    {
        title:"AIS Data Archiver",
        image:"img/a/2.jpg",
        text:"Desktop application for viewing and managing live AIS data (vessel traffic data) that is gathered and stored from web resources without user operation.", 
		tech:"Java (JavaFX, Jsoup, JDBC), MySQL database, HTML/CSS, Google Maps API",
        link:"x",
		code:"https://github.com/apoh3/AIS-Data-Archiver",
        slides:3,
        theme:"dark"
    },
    {
        title:"TCS Marathon Results",
        image:"img/t/1.jpg",
        text:"Desktop application for querying a multi-table database of marathon results.", 
		tech:"Java (JavaFX, JDBC), SQLite database, CSS",
        link:"x",
		code:"https://github.com/apoh3/TCSMarathonResults",
        slides:3,
        theme:"dark"
    },
	{
        title:"Jeopardy",
        image:"img/j/2.jpg",
        text:"Jeopardy desktop game with admin access to edit and create rounds.", 
		tech:"Java (JavaFX, JDBC), SQLite database, CSS",
        link:"x",
		code:"https://github.com/apoh3/Jeopardy",
        slides:4,
        theme:"light"
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

