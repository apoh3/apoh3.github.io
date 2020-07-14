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
    var pdfLink = $("<a>").attr("href","resume_apoh.pdf").attr('target','_blank').append(getIcon("playIcon") + " view pdf");

    var leftCol = $("<div>").attr("id","res-left-col").attr("class","col-sm-4").append(buildNewResSection("Education"),buildNewResSection("Skills"));
    var rightCol = $("<div>").attr("id","res-right-col").attr("class","col-sm-8").append(buildNewResSection("Work Experience"),buildNewResSection("Projects and Research"));
    var resRow1 = $("<div>").attr("id","res-row").attr("class","row").append(leftCol,rightCol);

    $("#resume-container").append(pdfLink,resRow1);
}

function buildNewResSection(title) {
    var div = $("<div>");
    var header = $("<h5>").attr("class","res-header").append(title);

    switch(title) {
        case "Education":
            div.attr("class",".res-section res-section-top").append(header,appendFieldInfo(education));
            break;
        case "Skills":
            div.attr("class","res-section").append(header,appendFieldInfo(skills));
            break;
        case "Work Experience":
            div.attr("class",".res-section res-section-top").append(header,appendFieldInfo(workExperience));
            break;
        case "Projects and Research":
            div.attr("class","res-section").append(header,appendFieldInfo(projectsAndResearch));
            break;
        default:
            break;
    }

    return div;
}

function appendFieldInfo(arr) {
    var div = $("<div>").attr("class","res-field-text");

    var numOfFields = Object.keys(arr).length;
    
    for(var i = 0; i < numOfFields; i++) {
        for(var j = 0; j < Object.keys(arr[i]).length; j++) {
            var key = Object.keys(arr[i])[j];
            var val = Object.values(arr[i])[j];

            if(val.includes("##")) {
                var bullets = val.split(";");
                var k = 0;
                var plusIndent = false;

                if(val.charAt(0) != '#') {
                    div.append($("<p>").attr("class","res-text res-text-"+key).append(getIcon(key) + " " + bullets[k].replace('##','')+"<br>"));
                    k++;
                    plusIndent = true;
                }   

                var list = $("<ul>").attr("class","res-text-list");

                for(; k < bullets.length; k++) {
                    if(plusIndent == true)
                        list.append($("<li>").attr("class","res-text-list-item extra-indent-item").text(bullets[k].replace('##','')));
                    else if(arr == skills) {
                        list.append($("<li>").attr("class","res-text-list-item item-with-bar").append(
                            $("<div>").attr("class","progress").append(
                                $("<div>").attr("class","progress-bar").css("width","50%").append(
                                    $("<text>").append(getIcon(key) + " " + bullets[k].replace('##',''))
                                )
                            )
                        ));
                    } else {
                        list.append($("<li>").attr("class","res-text-list-item").append(
                            $("<text>").append(getIcon(key) + " " + bullets[k].replace('##',''))
                        ));
                    }
                }

                div.append(list);
            } else {
                if(key === "title") {
                    if(i == 0)
                        div.append($("<p>").attr("class","res-text-"+key).append(val+"<br>"));
                    else
                        div.append($("<p>").attr("class","res-title-bottom res-text-"+key).append(val+"<br>"));
                } else
                    div.append($("<p>").attr("class","res-text res-text-"+key).append(getIcon(key) + " " + val+"<br>"));
            }
                
        }
    }

    return div;
}

/*
function appendFieldInfo(arr) {
    var div = $("<div>").attr("class","res-field-text");

    var numOfFields = Object.keys(arr).length;
    
    for(var i = 0; i < numOfFields; i++) {
        for(var j = 0; j < Object.keys(arr[i]).length; j++) {
            var key = Object.keys(arr[i])[j];
            var val = Object.values(arr[i])[j];

            if(val.includes("##")) {
                var bullets = val.split(";");
                var k = 0;
                var plusIndent = false;

                if(val.charAt(0) != '#') {
                    div.append($("<p>").attr("class","res-text res-text-"+key).append(getIcon(key) + " " + bullets[k].replace('##','')+"<br>"));
                    k++;
                    plusIndent = true;
                }   

                var list = $("<ul>").attr("class","res-text-list");

                for(; k < bullets.length; k++) {
                    if(plusIndent == true)
                        list.append($("<li>").attr("class","res-text-list-item extra-indent-item").text(bullets[k].replace('##','')));
                    else {
                        list.append($("<li>").attr("class","res-text-list-item").append(
                            $("<text>").append(getIcon(key) + " " + bullets[k].replace('##',''))
                        ));
                    }
                }

                div.append(list);
            } else {
                if(key === "title") {
                    if(i == 0)
                        div.append($("<p>").attr("class","res-text-"+key).append(val+"<br>"));
                    else
                        div.append($("<p>").attr("class","res-title-bottom res-text-"+key).append(val+"<br>"));
                } else
                    div.append($("<p>").attr("class","res-text res-text-"+key).append(getIcon(key) + " " + val+"<br>"));
            }
                
        }
    }

    return div;
}
*/

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
        var cardTitle = $("<h5>").attr("class","card-title").append(arr[i].title);

        var cardImgDiv = $("<div>").attr("id",i+"-card-img-div").attr("class","card-img-div");
        var cardImgLink = $("<text>").attr("class","card-img-text").append("click to enlarge");
        var cardImg = $("<img>").attr("class","card-img").attr("src",arr[i].image).attr("alt","card image");
        
        cardImgDiv.append(cardImg,cardImgLink);

        var cardText = $("<p>").attr("class","card-text").append(arr[i].text);

        if(arr[i].try == true)
            var cardLink = $("<a>").attr("class","card-link").attr("href",arr[i].link).attr('target','_blank').append(getIcon("playIcon") + " click here to try " + arr[i].title);
        else
            var cardLink = $("<text>").attr("class","card-link").append("");
         
        cardBody.append(cardTitle,cardImgDiv,cardText,cardLink);
        card.append(cardBody);
        col.append(card);
        cardColumns.append(col);
    }

    $("#portfolio-container").append(cardColumns);
}

function getIcon(key) {
    if(key === "awards")
        return awardIcon;
    else if(key === "conferral" || key === "terms")
        return calendarIcon;  
    else if(key === "gpa")
        return filledBadgeIcon;
    else if(key === "languages")
        return gearIcon;
    else if(key === "playIcon")
        return playIcon;
    else if(key === "roles")
        return badgeIcon;
    else if(key == "description")
        return infoIcon;
    else 
        return ''; 
}