/* 
    Personal Website - build page script
    as of Aug. 2020
    by Allison Poh
*/

addHTMLText();     //title, brand, and jumbotron text
buildNavLinks();   //navigation bar
buildHome();       //intro + skills donut
buildExperience(); //timeline
buildPortfolio();  //cards
buildContact();    //img and table
addInteractions(); //element focus and clicks 

$(document).scroll(function() { 
    //better navbar focus on scroll (top = home; near bottom = contact; further from bottom = portfolio; default = home)
    if($(window).scrollTop() == 0) {
        $('a[href="#"]').addClass('active');
    } else if($(window).scrollTop() + $(window).height() > $(document).height() - 100) { 
        $('a[href="#portfolio"]').removeClass('active');
        $('a[href="#contact"]').addClass('active');
    } else if($(window).scrollTop() + $(window).height() > $(document).height() - 200) { 
        $('a[href="#portfolio"]').addClass('active');
        $('a[href="#contact"]').removeClass('active');
    } else if (!$('a[href="#experience"]').hasClass("active") && !$('a[href="#portfolio"]').hasClass("active") && !$('a[href="#contact"]').hasClass("active")) { 
        $('a[href="#"]').addClass('active');
    }
});

function addHTMLText() {
    document.title = name + " | " + jobAbbr;

    var nameAbbr = name.match(/\b(\w)/g).join('');

    $(".navbar-brand").append(nameAbbr).css({
        "color":"#fbfbfb",
        "font-size":"130%",
        "font-weight":"bold",
        "font-family":"'Ovo', serif"
    });
    
	$("#jumbotron-2").append(navOptions[1]);
	$("#jumbotron-3").append(navOptions[2]);
    $("#jumbotron-4").append(navOptions[3]);
}

function buildNavLinks() {
    for(var i = 0; i < navOptions.length; i++) {
        var loc = navOptions[i].toLowerCase();

        if(loc === "home") {
            loc = "";
        }

        $(".navbar-nav").append(
            $("<li>").attr("class","nav-item").append(
                $("<a>").attr("class","nav-link").attr("name",navOptions[i].toLowerCase()).attr("href","#"+loc).append(navOptions[i])
            )
        );
    }

    $('a[href="#"]').addClass('active');
}

function buildHome() {
    $("#home-container").append(
        $("<div>").attr("class","row").append(
            $("<div>").attr("id","info-container").attr("class","col-lg-6 home-col"),
            $("<div>").attr("id","skills-container").attr("class","col-lg-6 home-col")
        )
    );

    buildIntro();  //info-container
    buildSkills(); //skills-container

    if($(window).width() < 992) {
        $("#info-container").css({
            "margin-top":$(".navbar").height()*1.5, 
            "margin-bottom":$(".navbar").height()
        });

        $("#info-div").css({
            "text-align":"center"
        });
    }

    function buildIntro() {
        $("#info-container").append(
            $("<div>").attr("id","info-div").append(
                $("<h1>").attr("id","info-title").append(name),
                $("<p>").attr("id","info-text").append(homeText),
                $("<a>").attr("id","info-resume").attr("href",resume).attr('target','_blank').append("view resume")
            )
        )
    }

    function buildSkills() {
        //builds d3.js donut chart: each slice size equal; inner circle for info; hover over slice changes info
    
        //donut values
        var width = $("#skills-container").width();
        var height = width;
        var margin = $("#skills-container").width()*0.1;
        var radius = Math.min(width,height)/2-margin;
        var innerRadius = $("#skills-container").width()*0.3;
        var stroke = $("#skills-container").width()*0.05;
        var outerFontOffset = -0.1;
    
        //inner circle values
        var innerCircleRadius = radius*0.7;
        var fontSpacing = -0.25;
        var fontSize = 1;
        if(width < 768/2) fontSize = 0.6;
    
        //color palette
        var color = d3.scaleOrdinal()
            .domain(skills)
            .range(["rgb(173,77,0)","rgb(247,154,50)","rgb(164,121,115)","rgb(90,31,49)","rgb(41,21,23)"]);
    
        var pie = d3.pie().value(skills.length);
        var data = pie(d3.entries(skills));
    
        //create svg
        var svg = d3.select("#skills-container")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
    
        //create slices
        svg
            .selectAll('any')
            .data(data)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(innerRadius)
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
                clearTexts();
                updateInnerText(i);
                d3.select(this).style("cursor", "pointer"); 
                d3.selectAll(".slice").style("stroke-width", stroke+"px");
                d3.select(this).style("stroke-width", "0px");
            });
    
        //create inner circle
        svg
            .append("circle")
            .attr("r", innerCircleRadius)
            .style("fill", "rgba(169,160,139,0.3)")
            .on('mouseover', function (d,i) {d3.select(this).style("cursor", "default")});
    
        //create inner circle text
        svg.append('text')
            .attr('class', 'inner-text-title')
            .attr('y', radius * fontSpacing)
            .attr('text-anchor', 'middle')
            .style('font-weight', 'bold')
            .style("font-size", fontSize+"em")
            .text(skills[0].title)
            .on('mouseover', function (d,i) {d3.select(this).style("cursor", "default")});
        makeTexts(0);
    
        //update inner circle text
        function updateInnerText(i) {
            d3.select(".inner-text-title").text(skills[i].title);
            makeTexts(i);
        }
    
        //put skills info on newlines
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
                    .on('mouseover', function (d,i) {d3.select(this).style("cursor", "default")});
    
                pos--;
            }
        }
    
        //remove skills info
        function clearTexts() {
            d3.selectAll(".inner-text-info").remove();
        }
    }
}

function buildExperience() {
    //div of experience cards (top)
    var expCardsDiv = $("<div>").attr("id","experience-row").attr("class","row").append(
        $("<div>").attr("id","div-exp-info").attr("class","col")
    );

    //div of year buttons (bottom)
    var yearsDiv = $("<div>").attr("id","deck-years").attr("class","card-deck");
    for(var i = firstYr; i <= lastYr; i++) {
        yearsDiv.append(
            $("<div>").attr("id","card-year-"+i).attr("class","card").append(
                $("<div>").attr("class","card-body").append(
                    $("<div>").attr("id","btn-notch-"+i).attr("class","triangle"),
                    $("<a onclick='updateExp("+i+")'>").attr("id","btn-year-"+i).attr("class","btn btn-year").append(i)
                )
            )
        )
    }

    if($(window).width() <= 768) { //small window: years first
        $("#experience-container").append(yearsDiv, expCardsDiv);
        $("#deck-years").css("margin-bottom","15px");
        $("#experience-container").css("margin-bottom","0px");
        $(".card-exp").css("margin-right","0px");
    } else { //larger window: experience first
        $("#experience-container").append(expCardsDiv, yearsDiv);
        $(".card-exp").css("margin-right","20px");
        $("#btn-notch-"+lastYr).addClass("triangle-white");
        $(".btn-year").css("line-height","50px");
    }

    $("#div-exp-info").append( //add cards to experience
        $("<div>").attr("id","deck-expereince").attr("class","card-deck")
    );
    createExperienceCards(lastYr);

    $("#btn-year-"+lastYr).focus(); //set most recent year focused
    window.scrollTo(0,0);
}

function updateExp(yr) {
    if($(window).width() > 768) { //only if larger screens, update triangle notch
        $(".triangle").each(function() {
            $(this).removeClass("triangle-white");
            });
    
            $("#btn-notch-"+yr).addClass("triangle-white");
    }

    $("#deck-expereince").empty();
    createExperienceCards(yr);
}

function createExperienceCards(yr) {
    var indexes = [];
    var cardCnt = 0;

    //get indexes of cards to be shown
    for(var i = 0; i < experience.length; i++) {
        if(experience[i].year === yr.toString()) {
            indexes[cardCnt] = i;
            cardCnt++;
        }
    }

    //build cards
    for(var i = 0; i < indexes.length; i++) {
        $("#deck-expereince").append(
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
        addCardIcon(experience[indexes[i]].keyword,indexes[i]);
    }

    function setCardTextInfo(i) {
        var div = $("#card-text-info-"+i);
    
        var infoArr = experience[i].info; 
        
        for(var j = 0; j < infoArr.length; j++) {
            div.append($("<i>").attr("class","fa fa-angle-double-right bullet-fa bullet-fa-"+i).attr("aria-hidden","true"),infoArr[j]); 
    
            if(j != infoArr.length) {
                div.append($("<br>"));
            }
        }
    }

    function setCardColor(key,i) {
        var card = $("#card-exp-"+i);
        var cardTitle = $("#card-title-"+i);
        var bulletIcon = $(".bullet-fa-"+i);
    
        switch(key) {
            case "grad":
                card.css("border","1px solid rgba(247,154,50,0.5)");
                cardTitle.css("background-color","rgb(247,154,50)");
                bulletIcon.css("color","rgb(247,154,50)");
                break;
            case "award":
                card.css("border","1px solid rgba(41,21,23,0.5)");
                cardTitle.css("background-color","rgb(41,21,23)");
                bulletIcon.css("color","rgb(41,21,23)");
                break;
            case "research":
                card.css("border","1px solid rgba(164,121,115,0.5)");
                cardTitle.css("background-color","rgb(164,121,115)");
                bulletIcon.css("color","rgb(164,121,115)");
                break;
            case "work":
                card.css("border","1px solid rgba(90,31,49,0.5)");
                cardTitle.css("background-color","rgb(90,31,49)");
                bulletIcon.css("color","rgb(90,31,49)");
                break;
            default:
                card.css("border","1px solid rgba(173,77,0,0.5)");
                cardTitle.css("background-color","rgb(173,77,0)");
                bulletIcon.css("color","rgb(173,77,0)");
        }
    }
    
    function addCardIcon(key,i) {
        var cardTitle = $("#card-title-"+i);
        var icon;
    
        switch(key) {
            case "grad":
                icon = $("<i>").attr("class","fa fa-graduation-cap title-fa").attr("aria-hidden","true");
                break;
            case "award":
                icon = $("<i>").attr("class","fa fa-star title-fa").attr("aria-hidden","true");
                break;
            case "research":
                icon = $("<i>").attr("class","fa fa-desktop title-fa").attr("aria-hidden","true");
                break;
            case "work":
                icon = $("<i>").attr("class","fa fa-briefcase title-fa").attr("aria-hidden","true");
                break;
            case "moment":
                icon = $("<i>").attr("class","fa fa-university title-fa").attr("aria-hidden","true");
                break;
            default:
                icon = $("<i>").attr("class","fa fa-caret-left title-fa").attr("aria-hidden","true");
        }
    
        cardTitle.prepend(icon);
    }

    if($(window).width() < 768) { //small screen, cards displayed vertical (no margin)
        $(".card-exp").css("margin-right","0px");
    } else { //larger screens, add seperation (cards displayed horizontal)
        $(".card-exp").css("margin-right","20px");
        $(".card-exp").css("min-height",40+"vh");
    }
}

function buildPortfolio() {
    var cardColumn = $("<div>").attr("class","row no-gutters");

    for(var i = 0; i < portfolioProjects.length; i++) {
        var col = $("<div>").attr("class","col-md-3 d-flex align-items-stretch"); //4 columns

        if($(window).width() >= 768 && $(window).width() < 1200) { //2 columns
            col = $("<div>").attr("class","col-md-6 d-flex align-items-stretch");
        }

        //add card text and img
        var cardBody = $("<div>").attr("class","card-body").append(
            $("<h5>").attr("class","card-title").append(portfolioProjects[i].title + " "),
            $("<img>").attr("id","card-img-"+i).attr("class","card-img").attr("src",portfolioProjects[i].image).attr("alt",portfolioProjects[i].title+" screenshot"),
            $("<p>").attr("class","card-text").append(portfolioProjects[i].text + " Developed for " + portfolioProjects[i].purpose + "."),
            $("<p>").attr("class","card-text card-text2").append(
                $("<i>").attr("class","fa fa-gear").attr("aria-hidden","true"),
                " " + portfolioProjects[i].tech
            )
        )

        //add try link (if available)
        if(portfolioProjects[i].link !== "x") {
            cardBody.append(
                $("<a>").attr("class","card-link").attr("href",portfolioProjects[i].link).attr('target','_blank').append(
                    $("<i>").attr("class","fa fa-external-link").attr("aria-hidden","true").append(" try " + portfolioProjects[i].title)
                ),
                $("<br>")
            )
        }

        //add code link
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

    if($(window).width() < 768) { //small screen: vertical alignment (no margins)
        $(".card-portfolio").css("margin-right","0px");
        $("#input-search").css("width","100px");
    } else { //larger screens: horizontal alignment (margins)
        $(".card-portfolio").css("margin-right","20px");
    }
}

function beginCarousel(el) {
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

    if($("#img-first").height() >= $(window).height()) { //make sure image fits on page
        $("#img-first").css("height",$(window).height()*0.95);
    }

    var w = $("#img-first").width();

    //build carousel according to num of images available
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
			case 37: // left
				$("#btn-left").click();
				break;
			case 39: //right
				$("#btn-right").click();
				break;
			case 27: // escape
				$("#btn-close").click();
				break;
			case 8: // backspace/delete
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
                    $("<td>").append(
                        $("<a>").attr("href","https://www.linkedin.com/in/allisonpoh/").attr('target','_blank').append(contactInfo[1])
                    )
                ),
                //github
                $("<tr>").append(
                    $("<td>").append(
                        $("<i>").attr("class","fa fa-lg fa-github").attr("aria-hidden","true")
                    ),
                    $("<td>").append(
                        $("<a>").attr("href","https://github.com/apoh3").attr('target','_blank').append(contactInfo[2])
                    )
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
        search("clearing search...");
    });

    $(".card-img").click(function() { 
		if(this.id !== "card-img-"+(portfolioProjects.length-1)) {
			beginCarousel(this);
		} 
    });

    $("#btn-search").click(function() {
        var input = $("#input-search").val();
        search(input);
    });
}

function search(input) {
    //for portfolio search bar

    if(input.length == 0) {
        search("clearing search...");
        return;
    }

    var container = $("#portfolio-container");

    container.find('.card').each(function(){
        this.className = "card";

        if(findWord(this.textContent.toLowerCase(), input)) {
            this.className = "card card-found";
        }
    });

    function findWord(string, word){
        return new RegExp( '\\b' + word + '\\b', 'i').test(string);
    }
}
