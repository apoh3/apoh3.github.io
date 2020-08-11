$(document).ready(function() {
    addHTMLText();
    buildNavOptions();
    buildExperience(); //timeline
    buildSkills();     //donut chart
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
        }
     });
});

function addHTMLText() {
    document.title = name + " | " + jobAbbr;
    $(".navbar-brand").append(name).css({
		"color":"#fbfbfb",
		"font-family":"Arizonia",
		"font-size":"160%"});
    $("#jumbotron-1").append(navOptions[0]);
	$("#jumbotron-2").append(navOptions[1]);
	$("#jumbotron-3").append(navOptions[2]);
	$("#jumbotron-4").append(navOptions[3]);
    $("#jumbotron-5").append(navOptions[4]);
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

function buildExperience() {
    var timeline = $("<div>").attr("id","timeline").append(
        $("<div>").attr("class","timeline-line").append(
            $("<div>").attr("class","timeline-circle").append(
                $("<span>").attr("id","circle-1").attr("class","timeline-circle-text").append("2016")
            ),
            $("<div>").attr("class","timeline-circle").append(
                $("<span>").attr("id","circle-2").attr("class","timeline-circle-text").append("2017")
            ),
            $("<div>").attr("class","timeline-circle").append(
                $("<span>").attr("id","circle-3").attr("class","timeline-circle-text").append("2018")
            ),
            $("<div>").attr("class","timeline-circle").append(
                $("<span>").attr("id","circle-4").attr("class","timeline-circle-text").append("2019")
            ),
            $("<div>").attr("class","timeline-circle").append(
                $("<span>").attr("id","circle-5").attr("class","timeline-circle-text").append("2020")
            ),
        )
    );

    $("#experience-container").append(timeline);

    for(var i = 0; i < expereince.length; i++) {
        addExperienceInfo(i);
    }
}

function addExperienceInfo(idx) {
    var infoDiv = $("<div>").attr("class","timeline-info").append(
        $("<div>").attr("class","timeline-info-title").append(expereince[idx].job),
        $("<div>").attr("class","timeline-info-years").append(expereince[idx].years)
    );

    $("#circle-" + (idx+1)).append(infoDiv);

    if(expereince[idx].pos === "top")
        infoDiv.addClass("timeline-info-top");
}

function buildSkills() {
    var width = 450;
    var height = width;
    var margin = 5;
    var radius = Math.min(width,height)/2-margin

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
            .innerRadius(150)
            .outerRadius(radius)
        )
        .attr('class', 'slice')
        .attr('fill', function(d,i){ return(color(skills[i].title)) })
        .attr("stroke", "white")
        .style("stroke-width",function(d,i) {
            if(i == 0) {
                return "0px";
            } else {
                return "20px";
            }
        })
        .on('mouseover', function (d,i) {
            clearTexts();
            updateInnerText(i);
            d3.selectAll(".slice")
                .style("stroke-width", "20px");
            d3.select(this)
                .style("stroke-width", "0px");
        });

    //inner circle
    svg
        .append("circle")
        .attr("r", radius * 0.6)
        .style("fill", "rgba(169,160,139,0.3)")

    //inner circle text
    svg.append('text')
        .attr('class', 'inner-text-title')
        .attr('y', radius * -0.25)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text(skills[0].title);
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
                .attr('y', radius * -0.10*pos)
                .attr('text-anchor', 'middle')
                .text(skillInfo[i]);

            pos--;
        }
    }

    //remove skills info
    function clearTexts() {
        d3.selectAll(".inner-text-info").remove();
    }
}

function buildPortfolio() {
    var cardColumn = $("<div>").attr("class","row no-gutters");

    for(var i = 0; i < portfolioProjects.length; i++) {
        var col = $("<div>").attr("class","col-md-3 d-flex align-items-stretch");

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
        
        col.append($("<div>").attr("class","card").append(cardBody));
        cardColumn.append(col);
    }
	
    $("#portfolio-container").append(cardColumn);
	
	$("#card-img-"+(portfolioProjects.length-1)).css({"opacity":"1","cursor":"default"});
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

function enlargeImage(el) {
    var idSplit = el.id.split('-');
    var num = idSplit[idSplit.length-1];
    var path = "img/"+portfolioProjects[num].title.charAt(0)+"/";

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
                    $("<img>").attr("class","d-block").attr("src",path+"1.PNG").attr("alt","First slide")
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

    //build slideshow according to num of images available
    for(var i = 0; i < portfolioProjects[num].slides-1; i++) {
        $(".carousel-indicators").append($("<li data-target='#carousel' data-slide-to='"+(i+1)+"'>"));
        $(".carousel-inner").append(
            $("<div>").attr("class","carousel-item").append(
                $("<img>").attr("class","d-block").attr("src",path+(i+2)+".PNG").attr("alt",portfolioProjects[num].title+" screenshot")
            )
        );
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
