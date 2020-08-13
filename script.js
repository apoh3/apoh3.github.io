$(document).ready(function() {
    addHTMLText();
    buildNavOptions();
    buildHome();
    buildExperience(); //timeline
    buildPortfolio();  //cards
    buildContact();    //img and table
    addInteractions();

    $('[data-toggle="popover"]').popover();

    $(document).scroll(function() { 
        //top = home
        if($(window).scrollTop() === 0) {
            $('a[href="#"]').addClass('active');
        }

        //near bottom = contact
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $('a[href="#portfolio"]').removeClass('active');
            $('a[href="#contact"]').addClass('active');
        }
        //further from bottom = portfolio 
        else if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
            $('a[href="#portfolio"]').addClass('active');
            $('a[href="#contact"]').removeClass('active');
        } else if (!$('a[href="#experience"]').hasClass("active") && !$('a[href="#portfolio"]').hasClass("active") && !$('a[href="#contact"]').hasClass("active")) {
            $('a[href="#"]').addClass('active');
        }
     });
});

function addHTMLText() {
    document.title = name + " | " + jobAbbr;
    $(".navbar-brand").append(name).css({
        "color":"#fbfbfb",
        "font-size":"130%",
        "font-weight":"bold",
        "font-family":"'Ovo', serif"
    });
    //$("#jumbotron-1").append(navOptions[0]);
	$("#jumbotron-2").append(navOptions[1]);
	//$("#jumbotron-3").append(navOptions[2]);
	$("#jumbotron-4").append(navOptions[2]);
    $("#jumbotron-5").append(navOptions[3]);
}

function buildNavOptions() {
    for(var i = 0; i < navOptions.length; i++) {
        var loc = navOptions[i].toLowerCase();

        if(loc === "home") {
            loc = "";
        }

        $(".navbar-nav").append(
            $("<li>").attr("class","nav-item").append(
                $("<a>").attr("class","nav-link").attr("name","navOptions[i].toLowerCase()").attr("href","#"+loc)
                .hover(function() {})
                .append(navOptions[i])
            )
        );
    }

    $('a[href="#"]').addClass('active');
}

function buildHome() {
    $("#home-container").append(
        $("<div>").attr("class","row").append(
            $("<div>").attr("id","info-container").attr("class","col-xl-6"),
            $("<div>").attr("id","skills-container").attr("class","col-xl-6")
        )
    );

    buildIntro();
    buildSkills();
}

function buildIntro() {
    $("#info-container").append(
        $("<div>").attr("id","home-div").append(
            $("<h1>").attr("id","home-title").append("Allison Poh"),
            $("<p>").attr("id","home-text").append("software engineer blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah"),
            $("<a>").attr("id","home-resume").attr("href","resume_apoh.pdf").attr('target','_blank').append("view resume")
        )
    )
}

function buildSkills() {
    //outer circle
    var width = $("#skills-container").width();
    var height = width;
    var margin = $("#skills-container").width()*0.1;
    var radius = Math.min(width,height)/2-margin;
    var innerRad = $("#skills-container").width()*0.3;
    var stroke = $("#skills-container").width()*0.05;
    var outerFontOffset = -0.1;

    //inner circle
    var innerCircleRadius = radius*0.7;
    var fontSize = 1;
    var fontSpacing = -0.25;

    if(width < 768/2) { //small
        fontSize = 0.6;
    }

    var color = d3.scaleOrdinal()
        .domain(skills)
        .range(["rgb(173,77,0)","rgb(247,154,50)","rgb(164,121,115)","rgb(90,31,49)","rgb(41,21,23)"]);

    var pie = d3.pie().value(skills.length);
    var data = pie(d3.entries(skills));

    //diagram
    var svg = d3.select("#skills-container")
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    //slices
    svg
        .selectAll('any')
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(innerRad)
            .outerRadius(radius)
        )
        .attr('class', 'slice')
        .attr('fill', function(d,i){ return(color(skills[i].title)) })
        .attr("stroke", "white")
        .style("stroke-width",function(d,i) {
            if(i == 0) {
                return "0px";
            } else {
                return stroke+"px";
            }
        })
        .on('mouseover', function (d,i) {
            d3.select(this).style("cursor", "pointer"); 

            clearTexts();
            updateInnerText(i);
            d3.selectAll(".slice")
                .style("stroke-width", stroke+"px");
            d3.select(this)
                .style("stroke-width", "0px");
        });

    //inner circle
    svg
        .append("circle")
        .attr("r", innerCircleRadius)
        .style("fill", "rgba(169,160,139,0.3)")
        .on('mouseover', function (d,i) {
            d3.select(this).style("cursor", "default")});

    //inner circle text
    svg.append('text')
        .attr('class', 'inner-text-title')
        .attr('y', radius * fontSpacing)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .style("font-size", fontSize+"em")
        .text(skills[0].title)
        .on('mouseover', function (d,i) {
            d3.select(this).style("cursor", "default")});
    makeTexts(0);

    //update inner circle text
    function updateInnerText(i) {
        d3.select(".inner-text-title")
            .text(skills[i].title);

        makeTexts(i);
    }

    //skills info on newlines (new text)
    function makeTexts(idx) {
        var skillInfo = skills[idx].includes.split(';');
        var pos = 1;

        for(var i = 0; i < skillInfo.length; i++) {
            svg.append('text')
                .attr('class', 'inner-text-info')
                .attr('y', radius * outerFontOffset*pos)
                .attr('text-anchor', 'middle')
                .style("font-size", fontSize+"em")
                .text(skillInfo[i])
                .on('mouseover', function (d,i) {
                    d3.select(this).style("cursor", "default")});

            pos--;
        }
    }

    //remove skills info
    function clearTexts() {
        d3.selectAll(".inner-text-info").remove();
    }
}

function buildExperience() {
    //top (left, right, and mid info)
    var information = $("<div>").attr("id","exp-info-row").attr("class","row").append(
        $("<div>").attr("class","col col-sm-12 col-middle").append(
            $("<div>").attr("id","div-exp-info").attr("class","col-middle-info")
        )
    );

    //bottom (yr btns)
    var years = $("<div role='group'>").attr("id","deck-years").attr("class","card-deck");
    for(var i = firstYr; i <= lastYr; i++) {
        years.append(
            $("<div>").attr("id","card-year-"+i).attr("class","card").append(
                $("<div>").attr("class","card-body").append(
                    $("<div>").attr("id","btn-notch-"+i).attr("class","triangle"),
                    $("<a onclick='updateExp("+i+")'>").attr("id","btn-year-"+i).attr("class","btn btn-year").append(i)
                )
            )
        )
    }

    if($(window).width() < 768) {
        $("#experience-container").append(years, information);
        $("#deck-years").css("margin-bottom","15px");
        $("#experience-container").css("margin-bottom","0px");
        $(".card-exp").css("margin-right","0px");
    } else {
        $("#experience-container").append(information, years);
        $(".card-exp").css("margin-right","20px");
    }

    //add cards to experience
    $("#div-exp-info").append(
        $("<div>").attr("id","deck-activity").attr("class","card-deck")
    );
    createExperienceCards(lastYr);

    //yr actions
    $("#btn-year-"+lastYr).focus();
    window.scrollTo(0,0);

    if($(window).width() > 768) {
        $("#btn-notch-"+lastYr).addClass("triangle-white");
        $(".btn-year").css("line-height","50px");
    }
}

function updateExp(yr) {
    if($(window).width() > 768) {
        $(".triangle").each(function() {
            $(this).removeClass("triangle-white");
            });
    
            $("#btn-notch-"+yr).addClass("triangle-white");
    }

    $("#deck-activity").empty();
    createExperienceCards(yr);
}

function createExperienceCards(yr) {
    var indexes = [];
    var cardCnt = 0;

    for(var i = 0; i < experience.length; i++) {
        if(experience[i].year === yr.toString()) {
            indexes[cardCnt] = i;
            cardCnt++;
        }
    }

    for(var i = 0; i < indexes.length; i++) {
        $("#deck-activity").append(
            $("<div>").attr("id","card-exp-"+indexes[i]).attr("class","card card-exp").append(
                $("<div>").attr("class","card-body").append(
                    $("<div>").attr("id","card-title-"+indexes[i]).attr("class","card-title").append(experience[indexes[i]].title).append(
                        $("<div>").attr("class","card-text-date").append(experience[indexes[i]].date)
                    ),
                    $("<div>").attr("class","card-text").append(
                        $("<div>").attr("id","card-text-info-"+indexes[i]).attr("class","card-text-info")
                    )
                )
            )
        );

        setCardTextInfo(indexes[i]);
        setCardColor(experience[indexes[i]].keyword,indexes[i]);
        addCardImg(experience[indexes[i]].keyword,indexes[i]);
    }

    if($(window).width() < 768) {
        $(".card-exp").css("margin-right","0px");
    } else {
        $(".card-exp").css("margin-right","20px");
        $(".card-exp").css("min-height",40+"vh");
    }
}

function setCardTextInfo(i) {
    var div = $("#card-text-info-"+i);

    var infoArr = experience[i].info; 
    
    for(var j = 0; j < infoArr.length; j++) {
        div.append(infoArr[j]); 

        if(j != infoArr.length) {
            div.append($("<br>"));
        }
    }
}

function addCardImg(key,i) {
    var cardTitle = $("#card-title-"+i);
    var icon;

    switch(key) {
        case "grad":
            icon = $("<i>").attr("class","fa fa-graduation-cap ").attr("aria-hidden","true");
            break;
        case "award":
            icon = $("<i>").attr("class","fa fa-star").attr("aria-hidden","true");
            break;
        case "research":
            icon = $("<i>").attr("class","fa fa-desktop").attr("aria-hidden","true");
            break;
        case "work":
            icon = $("<i>").attr("class","fa fa-briefcase").attr("aria-hidden","true");
            break;
        case "moment":
            icon = $("<i>").attr("class","fa fa-university").attr("aria-hidden","true");
            break;
        default:
            icon = $("<i>").attr("class","fa fa-caret-left").attr("aria-hidden","true");
    }

    cardTitle.prepend(icon);
}

function setCardColor(key,i) {
    var card = $("#card-exp-"+i);
    var cardTitle = $("#card-title-"+i);

    switch(key) {
        case "grad":
            card.css("border","1px solid rgba(247,154,50,0.5)");
            cardTitle.css("background-color","rgb(247,154,50)");
            break;
        case "award":
            card.css("border","1px solid rgba(41,21,23,0.5)");
            cardTitle.css("background-color","rgb(41,21,23)");
            break;
        case "research":
            card.css("border","1px solid rgba(164,121,115,0.5)");
            cardTitle.css("background-color","rgb(164,121,115)");
            break;
        case "work":
            card.css("border","1px solid rgba(90,31,49,0.5)");
            cardTitle.css("background-color","rgb(90,31,49)");
            break;
        default:
            card.css("border","1px solid rgba(173,77,0,0.5)");
            cardTitle.css("background-color","rgb(173,77,0)");
    }
}

function buildPortfolio() {
    var cardColumn = $("<div>").attr("class","row no-gutters");

    for(var i = 0; i < portfolioProjects.length; i++) {
        var col = $("<div>").attr("class","col-md-3 d-flex align-items-stretch");

        if($(window).width() >= 768 && $(window).width() < 1200) {
            col = $("<div>").attr("class","col-md-6 d-flex align-items-stretch");
        }

        //text and img
        var cardBody = $("<div>").attr("class","card-body").append(
            $("<h5>").attr("class","card-title").append(portfolioProjects[i].title + " "),
            $("<img>").attr("id","card-img-"+i).attr("class","card-img").attr("src",portfolioProjects[i].image).attr("alt",portfolioProjects[i].title+" screenshot"),
            $("<p>").attr("class","card-text").append(portfolioProjects[i].text),
            $("<p>").attr("class","card-text card-text2").append(
                $("<i>").attr("class","fa fa-gear").attr("aria-hidden","true"),
                " " + portfolioProjects[i].tech
            )
        )

        //try link (if available)
        if(portfolioProjects[i].link !== "x") {
            cardBody.append(
                $("<a>").attr("class","card-link").attr("href",portfolioProjects[i].link).attr('target','_blank').append(
                    $("<i>").attr("class","fa fa-external-link").attr("aria-hidden","true").append(" try " + portfolioProjects[i].title)
                ),
                $("<br>")
            )
        }

        //code link
        cardBody.append(
            $("<a>").attr("class","card-link").attr("href",portfolioProjects[i].code).attr('target','_blank').append(
                $("<i>").attr("class","fa fa-file-code-o").attr("aria-hidden","true"),
                " view code"
            )
        );
        
        col.append($("<div>").attr("class","card card-portfolio").append(cardBody));
        cardColumn.append(col);
    }
	
    $("#portfolio-container").append(cardColumn);
	
    $("#card-img-"+(portfolioProjects.length-1)).css({"opacity":"1","cursor":"default"});

    if($(window).width() < 768) {
        $(".card-portfolio").css("margin-right","0px");
        $("#input-search").css("width","100px");
    } else {
        $(".card-portfolio").css("margin-right","20px");
    }
}

function enlargeImage(el) {
    var idSplit = el.id.split('-');
    var num = idSplit[idSplit.length-1];
    var path = "img/"+portfolioProjects[num].title.charAt(0).toLowerCase()+"/";

    $("html,body").css("overflow","hidden");
    $("#overlay").css("display","block");

    $("#overlay").prepend(
        //close button
        $("<button>").attr("id","btn-close").attr("class","float-right").append($("<i>").attr("class","fa fa-times").attr("aria-hidden","true")),
        //carousel
        $("<div data-interval='false'>").attr("id","carousel").attr("class","carousel slide").append(
            //dots for current image
            $("<ol>").attr("class","carousel-indicators").append(
                $("<li data-target='#carousel' data-slide-to='0'>").attr("class","active")
            ),
            //images
            $("<div>").attr("class","carousel-inner").append(
                $("<div>").attr("class","carousel-item active").append(
                    $("<img>").attr("id","img-first").attr("class","d-block").attr("src",path+"1.jpg").attr("alt","First slide").css("width",$(window).width()*0.8)
                )
            ),
            //left control
            $("<a role='button' data-slide='prev'>").attr("id","btn-left").attr("class","carousel-control-prev").attr("href","#carousel").append(
                $("<i>").attr("class","carousel-control-icon fa fa-angle-left").attr("aria-hidden","true")
            ),
            //right control
            $("<a role='button' data-slide='next'>").attr("id","btn-right").attr("class","carousel-control-next").attr("href","#carousel").append(
                $("<i>").attr("class","carousel-control-icon fa fa-angle-right").attr("aria-hidden","true")
            )
        )
    );

    if($("#img-first").height() >= $(window).height()) {
        $("#img-first").css("height",$(window).height()*0.95);
    }

    var w = $("#img-first").width();

    //build slideshow according to num of images available
    for(var i = 0; i < portfolioProjects[num].slides-1; i++) {
        $(".carousel-indicators").append($("<li data-target='#carousel' data-slide-to='"+(i+1)+"'>"));
        $(".carousel-inner").append(
            $("<div>").attr("class","carousel-item").append(
                $("<img>").attr("id","carousel-img-"+i).attr("class","d-block carousel-img").attr("src",path+(i+2)+".jpg").attr("alt",portfolioProjects[num].title+" screenshot").css("width",w)
            )
        );

        if($("#img-first").height() > 0) {
            $("#carousel-img-"+i).css("height",$("#img-first").height());
        }
    }

    //ensure carousel control visibility
    if(portfolioProjects[num].theme === "dark") {
        $(".carousel-indicators").attr("class", "carousel-indicators carousel-indicators-dark");
        $(".carousel-control-prev").css("color","black");
        $(".carousel-control-next").css("color","black");
    }
	
	//slide on arrow keys
	document.onkeydown = function(e) {
		switch(e.keyCode) {
			// left
			case 37:
				$("#btn-left").click();
				break;
			// right
			case 39: 
				$("#btn-right").click();
				break;
			// escape
			case 27: 
				$("#btn-close").click();
				break;
			// backspace/delete
			case 8: 
				$("#btn-close").click();
				break;
			default: return;
		}
		e.preventDefault();
	};
	
	//close/x button
	$('#btn-close').click(function() {  
        $("#overlay").html("");
        $("#overlay").css("display","none");
        $("html,body").css("overflow","visible");
    });
}

function buildContact() {
    var table = $("<div>").attr("class","row");

    var img = $("<div>").attr("class","col-sm-4 col-left").append(
        $("<img>").attr("src",profile).attr("id","profile-img").attr("class","img-thumbnail").attr("alt","Profile Image")
    );

    var info = $("<div>").attr("class","col-sm-8").append(
        $("<table>").attr("id","contact-table").attr("class","table").append(
            $("<tbody>").append(
                // //phone
                // $("<tr>").append(
                //     $("<td>").append(
                //         $("<i>").attr("class","fa fa-lg fa-phone").attr("aria-hidden","true")
                //     ),
                //     $("<td>").append(contactInfo[0])
                // ),
                //email
                $("<tr>").append(
                    $("<td>").append(
                        $("<i>").attr("class","fa fa-lg fa-envelope").attr("aria-hidden","true")
                    ),
                    $("<td>").append(contactInfo[0])
                ),
                //linkedin
                $("<tr>").append(
                    $("<td>").append(
                        $("<i>").attr("class","fa fa-lg fa-linkedin-square").attr("aria-hidden","true")
                    ),
                    $("<td>").append(contactInfo[1])
                ),
                //github
                $("<tr>").append(
                    $("<td>").append(
                        $("<i>").attr("class","fa fa-lg fa-github").attr("aria-hidden","true")
                    ),
                    $("<td>").append(contactInfo[2])
                )
            )
        )
    );

    table.append(img,info);
    $("#contact-container").append(table);
}

function addInteractions() {
    $("#input-search" ).focus(function() {
        document.onkeydown = function(e) {
            if(e.keyCode == 13)
                $("#btn-search").click();
        };
    });

    $("#btn-clear").click(function() { 
        $("#input-search").val("");
        findMatches("clearing search...");
    });

    $(".card-img").click(function() { 
		if(this.id !== "card-img-"+(portfolioProjects.length-1)) {
			enlargeImage(this);
		} 
    });

    $("#btn-search").click(function() {
        var input = $("#input-search").val();
        findMatches(input);
    });
}

function findMatches(input) {
    if(input.length == 0) {
        findMatches("clearing search...");
        return;
    }

    var container = $("#portfolio-container");

    container.find('.card').each(function(){
        this.className = "card";

        if(findWord(this.textContent.toLowerCase(), input)) {
            this.className = "card card-found";
        }
    });
}

function findWord(string, word){
    return new RegExp( '\\b' + word + '\\b', 'i').test(string);
}
