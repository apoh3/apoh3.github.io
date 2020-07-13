/* Personal Site - as of 06/26/2020 */

buildResume();
appendProjectCards();



$(document).ready(function() {
    $(".card-img-div").click(function(e) {  
        var num = this.id.charAt(0);
        
        $("#overlay").css("display","block");
        $("html,body").css("overflow","hidden");

        var img = $("<img>").attr("id","overlaid_img").attr("src",projects[num].image);
        var text = $("<div>").attr("id","overlay_close").append("click anywhere to close");

        $("#overlay").prepend(img,text);
    });

    $('#overlay').click(function(e) {  
        $("#overlay").children().eq(0).remove(); 
        $("#overlay").children().eq(0).remove(); 
        $("#overlay").css("display","none");
        $("html,body").css("overflow","visible");
    });
});

function buildResume() {
    var pdfLink = $("<a>").attr("href","resume_apoh.pdf").attr('target','_blank').append("view pdf");

    var leftCol = $("<div>").attr("class","col-sm-4").append("left");
    var rightCol = $("<div>").attr("class","col-sm-8").append("right");
    var resRow1 = $("<div>").attr("id","res-row").attr("class","row").append(leftCol,rightCol);

    $("#resume-container").append(pdfLink,resRow1);
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
            var cardLink = $("<a>").attr("class","card-link").attr("href",projects[i].link).attr('target','_blank').append(playIcon + " click here to try " + projects[i].title);
        else
            var cardLink = $("<a>").attr("class","card-link").attr("href",projects[i].link).attr('target','_blank').append(playIcon + " click here to view " + projects[i].title);
         
        cardBody.append(cardTitle,cardImgDiv,cardText,cardLink);
        card.append(cardBody);
        col.append(card);
        cardColumns.append(col);
    }

    $("#portfolio-container").append(cardColumns);
}