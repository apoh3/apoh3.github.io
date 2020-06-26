/* Personal Site - as of 06/26/2020 */

//Info about each project displayed in portfolio
var projects = [
    {
        title:"nucleoSLIDE",
        image:"img/nucleoslide.png",
        text:"A citizen science game developed for the web to help solve the Motif Finding Problem, where a motif is some meaningful, unknown pattern of length <i>k</i> hidden among multiple sequences.",
        try:true,
        link:"nucleoslide/index.html"
    },
    {
        title:"Visualizing Missing Data", 
        image:"img/proj1.jpg",
        text:"Project 2 involved blah blah blah", 
        try:true,
        link:"visMissing/index.html"
    },
    {
        title:"Project 3 Title",
        image:"img/proj1.jpg",
        text:"Project 3 involved blah blah blah", 
        link:"click here for p3"
    },
    {
        title:"Project 4 Title", 
        image:"img/proj1.jpg",
        text:"Project 4 involved blah blah blah", 
        link:"click here for p4"
    },
    {
        title:"Project 5 Title",
        image:"img/proj1.jpg",
        text:"Project 5 involved blah blah blah", 
        link:"click here for p5"
    },
    {
        title:"Project 6 Title", 
        image:"img/proj1.jpg",
        text:"Project 6 involved blah blah blah", 
        link:"click here for p6"
    },{
        title:"Project 7 Title",
        image:"img/proj1.jpg",
        text:"Project 7 involved blah blah blah", 
        link:"click here for p7"
    }
];

buildResume();
appendProjectCards();

$(document).ready(function() {
    $('.card-img-div').click(function(e) {  
        var num = this.id.charAt(0);
        window.open(projects[num].image);
    });
});

function buildResume() {

}

/* Used in portfolio - builds each project card (title, pic, info, link) and formats by row/col*/
function appendProjectCards() {
    var playIcon = '<svg class="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>';

    var cardColumns = $("<div>").attr("class","row no-gutters");

    for(var i = 0; i < projects.length; i++) {
        var col = $("<div>").attr("class","col-lg-3 d-flex align-items-stretch");

        /*
        card
            body
                title
                img div
                    img
                    a
                text
                link
        */

        var card = $("<div>").attr("class","card");
        var cardBody = $("<div>").attr("class","card-body");
        var cardTitle = $("<h4>").attr("class","card-title").append(projects[i].title);

        var cardImgDiv = $("<div>").attr("id",i+"-card-img-div").attr("class","card-img-div");
        var cardImgLink = $("<text>").attr("class","card-img-text").append("click to enlarge");
        var cardImg = $("<img>").attr("class","card-img").attr("src",projects[i].image).attr("alt","card image");
        
        cardImgDiv.append(cardImg,cardImgLink);

        var cardText = $("<p>").attr("class","card-text").append(projects[i].text);

        if(projects[i].try == true)
            var cardLink = $("<a>").attr("class","card-link").attr("href",projects[i].link).append(playIcon + " click here to try " + projects[i].title + " ...");
        else
            var cardLink = $("<a>").attr("class","card-link").attr("href",projects[i].link).append(playIcon + " click here to view " + projects[i].title + " ...");
         
        cardBody.append(cardTitle,cardImgDiv,cardText,cardLink);
        card.append(cardBody);
        col.append(card);
        cardColumns.append(col);
    }

    $("#portfolio-container").append(cardColumns);
}