/* Personal Site - as of 07/14/2020 */

buildResume();
appendProjectCards(portfolioProjects);

$(document).ready(function() {
    $(".card-img-div").click(function(e) {  
        var num = this.id.charAt(0);
        
        $("#overlay").css("display","block");
        $("html,body").css("overflow","hidden");

        var img = $("<img>").attr("id","overlaid_img").attr("src",portfolioProjects[num].image);
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
    var pdfLink = $("<a>").attr("href","resume_apoh.pdf").attr('target','_blank').append(playIcon + " view pdf");

    var leftCol = $("<div>").attr("id","res-left-col").attr("class","col-sm-4").append(buildNewResumeSection("Education"),buildNewResumeSection("Skills"));
    var rightCol = $("<div>").attr("id","res-right-col").attr("class","col-sm-8").append(buildNewResumeSection("Work Experience"),buildNewResumeSection("Projects and Research"));
    var resRow1 = $("<div>").attr("id","res-row").attr("class","row").append(leftCol,rightCol);

    $("#resume-container").append(pdfLink,resRow1);
}

function buildNewResumeSection(title) {
    var div = $("<div>").attr("class","res-section");
    var header = $("<h5>").attr("class","res-header").append(title);

    switch(title) {
        case "Education":
            div.append(header,writeFieldInfo(education));
            break;
        case "Skills":
            div.append(header,writeFieldInfo(skills));
            break;
        case "Work Experience":
            div.append(header,writeFieldInfo(workExperience));
            break;
        case "Projects and Research":
            div.append(header,writeFieldInfo(projectsAndResearch));
            break;
        default:
            break;
    }

    return div;
}

function writeFieldInfo(arr) {
    var div = $("<div>").attr("class","res-edu-text-section");

    var numOfFields = Object.keys(arr).length;
    
    for(var i = 0; i < numOfFields; i++) {
        for(var j = 0; j < Object.keys(arr[i]).length; j++) {
            var key = Object.keys(arr[i])[j];
            var val = Object.values(arr[i])[j];

            div.append(key + ": " + val + "\n");
        }
    }

    return div;
}

/* Used in portfolio - builds each project card (title, pic, info, link) and formats by row/col*/
function appendProjectCards(arr) {
    var cardColumns = $("<div>").attr("class","row no-gutters");

    for(var i = 0; i < arr.length; i++) {
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
        var cardTitle = $("<h4>").attr("class","card-title").append(arr[i].title);

        var cardImgDiv = $("<div>").attr("id",i+"-card-img-div").attr("class","card-img-div");
        var cardImgLink = $("<text>").attr("class","card-img-text").append("click to enlarge");
        var cardImg = $("<img>").attr("class","card-img").attr("src",arr[i].image).attr("alt","card image");
        
        cardImgDiv.append(cardImg,cardImgLink);

        var cardText = $("<p>").attr("class","card-text").append(arr[i].text);

        if(arr[i].try == true)
            var cardLink = $("<a>").attr("class","card-link").attr("href",arr[i].link).attr('target','_blank').append(playIcon + " click here to try " + arr[i].title);
        else
            var cardLink = $("<text>").attr("class","card-link").append("");
         
        cardBody.append(cardTitle,cardImgDiv,cardText,cardLink);
        card.append(cardBody);
        col.append(card);
        cardColumns.append(col);
    }

    $("#portfolio-container").append(cardColumns);
}