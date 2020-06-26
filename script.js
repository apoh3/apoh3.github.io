/* Personal Site - as of 06/26/2020 */

BuildResume();
appendProjectCards();

function BuildResume() {

}

/* Used in portfolio - builds each project card (title, pic, info, link) and formats them grid-like */
function appendProjectCards() {
    var projects = [
        {
            title:"Project 1 Title",
            text:"Project 1 involved blah blah blah", 
            link:"click here for p1"
        },
        {
            title:"Project 2 Title", 
            text:"Project 2 involved blah blah blah", 
            link:"click here for p2"
        },
        {
            title:"Project 3 Title",
            text:"Project 3 involved blah blah blah", 
            link:"click here for p3"
        },
        {
            title:"Project 4 Title", 
            text:"Project 4 involved blah blah blah", 
            link:"click here for p4"
        },
        {
            title:"Project 5 Title",
            text:"Project 5 involved blah blah blah", 
            link:"click here for p5"
        },
        {
            title:"Project 6 Title", 
            text:"Project 6 involved blah blah blah", 
            link:"click here for p6"
        },{
            title:"Project 7 Title",
            text:"Project 7 involved blah blah blah", 
            link:"click here for p7"
        }
    ];

    var cardColumns = $("<div>").attr("class","row no-gutters");

    for(var i = 0; i < projects.length; i++) {
        var col = $("<div>").attr("class","col-sm-3");
        var card = $("<div>").attr("class","card");
        var cardBody = $("<div>").attr("class","card-body");
        var cardTitle = $("<h4>").attr("class","card-title").append(projects[i].title);
        var cardImg = $("<img>").attr("class","card-img").attr("src","img/proj1.jpg").attr("alt","card image");
        var cardText = $("<p>").attr("class","card-text").append(projects[i].text);
        var cardLink = $("<a>").attr("class","card-link").attr("href","#").append(projects[i].link);

        cardBody.append(cardTitle,cardImg,cardText,cardLink);
        card.append(cardBody);
        col.append(card);
        cardColumns.append(col);
    }

    $("#portfolio-container").append(cardColumns);
}