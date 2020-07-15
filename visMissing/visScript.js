/***********************************************************************************************************************
	Main source code for all visualizations and interactions with Missing Data Example interface.
***********************************************************************************************************************/

var linechart = document.getElementById("chartDiv");
var barchart = document.getElementById("chartDiv");

var maxTemp = Math.max.apply(Math, data.map(function(d) { return d.Temperature; })); //maxTemp = upperbound of yaxis
var selected = []; //selected = array of btns selected by user (ex: selected = [lineBtn,10btn,highBtn,points_Highlight] )

var visBtns = ["barBtn", "lineBtn"];	//visBtns, missingBtns, methodBtns = arrays of buttons created in index.html
var missingBtns = ["zeroBtn", "fiveBtn", "tenBtn", "fiftBtn", "twentyBtn", "tweFiveBtn"];
var methodBtns = ["removeBtn", "highBtn", "downpBtn", "annotBtn"];

var lastMethodClicked = "remove"; //lastMethodClicked = preserves the missing data method for when switching between visualizations or percents

var dataClone = cloneData(data); //dataClone = copy of data

var addedBarOrigTemp;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN: prepares the data and initializes the first button clicks (line chart, 0% missing, data removal method)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function begin() {
	//log start time
	var date = new Date();
	var startDate = [(date.getMonth()+1),date.getDate(),date.getFullYear()];
	var startTime = [date.getHours(),date.getMinutes(),date.getSeconds()];
	//setStartTime(startDate,startTime);
	
	prepareData(dataClone); 
	
	//initialize clicks
	document.getElementById("lineBtn").click();
	document.getElementById("zeroBtn").click();
	document.getElementById("removeBtn").click();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLONEDATA: creates a copy of data array in data.js to preserve the original data values (important for data "removal")
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function cloneData(data) {
	var clone = [];
	var val, key;

	for(key in data) {
		val = data[key];
		clone[key] = (typeof val === "object") ? cloneData(val):val;
	}

	return clone;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PREPAREDATA: pairs data for plotting and calls DRAWCHART
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function prepareData(data) {
	var parseTime = d3.timeParse("%m/%d/%Y");
	
	data.forEach(function(d) {
		d.Day = parseTime(d.Day);
		d.Temperature = +d.Temperature;
	});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REMOVEDATA: makes a percentage of data y-value equal to NaN and type to "miss", and calls preparedata
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeData(val) {
	dataClone = cloneData(data);
	
	var n = Math.floor(getLength()*val*0.01); //n = number of data values to "remove"
	var nums = []; //nums = keeps track of indexes removed to avoid repetition
	
	var i = 0;
	
	while(i != n) {
		var index = Math.floor(Math.random() * getLength());
		
		if(!nums.includes(index)) {
			nums.push(index);
			dataClone[index].Temperature = NaN;
			dataClone[index].Type = "miss";
			i++;
		}
	}
	
	prepareData(dataClone);
};


/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRAWORIGINAL: draws original charts
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function drawOriginal(chartType) {
	if(chartType === "linechart") {
		var chart = linechart;
		
		//SCALES
		var x = d3.scaleTime()
			.range([0, width])
			.domain(d3.extent(dataClone, function(d,i) {if(i<getLength()) return d.Day }));
		var y = d3.scaleLinear()
			.range([height, 0])
			.domain([0, maxTemp]);
		
		//LINE
		var line = d3.line()
			.defined(function(d) {return d; })
			.x(function(d) { return x(d.Day) })
			.y(function(d) { return y(d.Temperature) });
		
		//APPEND PATH
		var path = svg.append("path")
			.attr("class", "line")
			.attr("d", line(dataClone))
			.attr('stroke', 'green')
			.attr('stroke-width', '1px');

		//APPEND POINTS/DOTS
		svg.selectAll(".dot")
			.data(data.filter(function(d,i) { while(i < getLength()) return d.Temperature;}))
			.enter().append("circle")
				.attr("class", "dot")
				.attr("cx", line.x())
				.attr("cy", line.y())
				.attr("r", 2)
				.style("fill", "green")
				.style("stroke", "green");
				
	} else if(chartType === "barchart") {
		var chart = barchart;	
	}
}*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUTTONSELECTED: determines which button was selected by user, changes its color, and calls drawChart accordingly
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function buttonSelected(btn,method) {
	//VISUALIZATION BUTTON SELECTED (all other vis buttons turn unselected)
	if(btn.id === "lineBtn" || btn.id === "barBtn") {
		btn.style.background = "white";  
		btn.style.color = "black";
		
		for(var i = 0; i < visBtns.length; i++) {
			if(visBtns[i] != btn.id) {
				document.getElementById(visBtns[i]).style.background = "rgba(255,255,255,0.4)";
				document.getElementById(visBtns[i]).style.color = "white";
				
				document.getElementById("origBtn").style.background = "rgba(255,255,255,0.4)"
				document.getElementById("origBtn").style.color = "white"
			}
		}
		
		selected[0] = btn.id;
		
		closeAllScreenshots();
	}
	
	//PERCENT MISSING (all other percent missing buttons turn unselected)
	if(btn.id === "zeroBtn" || btn.id === "fiveBtn" || btn.id === "tenBtn" || btn.id === "fiftBtn" || btn.id === "twentyBtn" || btn.id === "tweFiveBtn") {
		btn.style.background = "white";  
		btn.style.color = "black";
		
		for(var i = 0; i < missingBtns.length; i++) {
			if(missingBtns[i] != btn.id) {
				document.getElementById(missingBtns[i]).style.background = "rgba(255,255,255,0.4)";
				document.getElementById(missingBtns[i]).style.color = "white";
			}
		}
		
		selected[1] = btn.id;
	}
	
	//METHOD (all other method buttons turn unselected)
	if(btn.id === "removeBtn" || btn.id === "highBtn" || btn.id === "downpBtn" || btn.id == "annotBtn") {
		btn.style.background = "white";  
		btn.style.color = "black";
		
		for(var i = 0; i < methodBtns.length; i++) {
			if(methodBtns[i] != btn.id) {
				document.getElementById(methodBtns[i]).style.background = "rgba(255,255,255,0.4)";
				document.getElementById(methodBtns[i]).style.color = "white";
			}
		}
		
		selected[2] = btn.id;
	}
	
	//SET LASTMETHODCLICKED (preserve the state)
	if(btn.id === "barBtn" && (lastMethodClicked === "points_Highlight" || lastMethodClicked === "pointsAndLines_Highlight")) {
		method = "bars_Highlight";
		lastMethodClicked = "pointsAndLines_Highlight";
	} else if(btn.id === "barBtn" && (lastMethodClicked === "points_Downplay" || lastMethodClicked === "pointsAndLines_Downplay")) {
		method = "barsDashed_Downplay";
		lastMethodClicked = "pointsAndLines_Downplay";
	} else if(btn.id === "barBtn" && (lastMethodClicked === "blurredLines_Downplay")) {
		method = "blurredBars_Downplay";
		lastMethodClicked = method;
	} else if(btn.id === "lineBtn" && (lastMethodClicked === "blurredBars_Downplay")) {
		method = "blurredLines_Downplay";
		lastMethodClicked = method;
	} else if(btn.id === "lineBtn" && (lastMethodClicked === "bars_Highlight")) {
		method = "pointsAndLines_Highlight";
		lastMethodClicked = method;
	} else if(btn.id === "lineBtn" && (lastMethodClicked === "barsWithErrors_Annot")) {
		method = "connectedLines_Annot";
		lastMethodClicked = method;
	} else if(btn.id === "barBtn" && (lastMethodClicked === "connectedLines_Annot" || lastMethodClicked === "connectedLinesRED_Annot")) {
		method = "barsWithErrors_Annot";
		lastMethodClicked = method;
	} else if(btn.id === "lineBtn" && (lastMethodClicked === "pointsWithErrors_Annot")) {
		method = "disconnectedLines_Annot";
		lastMethodClicked = method;
	} else if(btn.id === "barBtn" && (lastMethodClicked === "disconnectedLines_Annot")) {
		method = "pointsWithErrors_Annot";
		lastMethodClicked = method;
	} else if(btn.id === "lineBtn" && (lastMethodClicked === "barsDashed_Downplay" || lastMethodClicked === "barsGradient1_Downplay" || lastMethodClicked === "barsGradient2_Downplay" || lastMethodClicked === "barsGradient3_Downplay" || lastMethodClicked === "barsSketched_Downplay" || lastMethodClicked === "blurredBars_Downplay")) {
		method = "pointsAndLines_Downplay";
		lastMethodClicked = method;
	} else if(typeof method !== "undefined") {
		lastMethodClicked = method;
	} else {
		method = lastMethodClicked;
	}
	
	//CLEAR
	clearChart();
	
	//CALL TO REDRAW CHART (pass the type of chart, percecnt missing, method for showing missing)
	if(selected[0] === "lineBtn")
		drawChart("linechart",selected[1],selected[2],method);
	else if(selected[0] === "barBtn")
		drawChart("barchart",selected[1],selected[2],method);
	
	//SET LASTMETHODCLICKED TO CURRENT METHOD
	if(lastMethodClicked !== method)
		lastMethodClicked = method;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VISSELCTED: returns current visualization in view
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function visSelected() {
	if(document.getElementById("lineBtn").style.backgroundColor === "white") 
		return "line";
	else if(document.getElementById("barBtn").style.backgroundColor === "white") 
		return "bar";
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRAWCHART: creates a line chart or bar chart, depending on users selection and visualization styling
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function drawChart(chartType, percent, method, styles) {
	//CHART TYPE
	if(chartType === "linechart")
		var chart = linechart;
	else if(chartType === "barchart")
		var chart = barchart;
	
	//DIMENSIONS
	var margin = {top: 25, right: 50, bottom: 80, left: 50};
	var width = (chart.clientWidth - margin.left - margin.right);
	var height = (chart.clientHeight - margin.top - margin.bottom);
	
	//FORMAT TIME
	var formatTime = d3.timeFormat("%b %d, %Y");

	//SCALES
	if(chartType === "linechart")
		var x = d3.scaleTime().range([0, width]);
	else if(chartType === "barchart")
		var x = d3.scaleBand().range([0, width]).padding(0.1);	
	var y = d3.scaleLinear().domain([0, maxTemp]).range([height, 0]);

	//TOOLTIP
	tooltip = d3.select("body")
		.append("div")
		.attr("class", "tooltipDiv")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden");

	//SVG
	var svg = d3.select(chart).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.on("contextmenu",function(d){d3.event.preventDefault();})
		.append("g").attr("transform", "translate(" + (margin.left+20) + "," + (margin.top) + ")");		
	
	//APPEND Y-AXIS
	svg.append("g")
		.call(d3.axisLeft(y)); 
	
	//APPEND Y-AXIS LABEL
	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left-5)
		.attr("x",0 - (height / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Mean Temperature (\xB0F)"); 
	
	//DRAW LINE CHART
	if(chartType === "linechart") {
		x.domain(d3.extent(dataClone, function(d,i) {if(i<getLength()) return d.Day }));
		y.domain([0, maxTemp]);

		var line = d3.line()
			.defined(function(d) {return d; })
			.x(function(d) { return x(d.Day) })
			.y(function(d) { return y(d.Temperature) })
			//.curve(d3.curveMonotoneX);
		
		if(percent === missingBtns[0] || method === methodBtns[0]) //remove method styling (default)
			removeMissingFromLineChart(dataClone, line, height, svg, tooltip, formatTime, x, y);
		else if(method === methodBtns[1] || method === methodBtns[2] || method === methodBtns[3]) //highlight, downplay, or annotate styling
			changeLineChart(line, width, height, svg, tooltip, formatTime, styles, x);
	}
	//DRAW BAR CHART
	else if(chartType === "barchart") {		
		if(percent === missingBtns[0] || method === methodBtns[0]) //remove method styling (default)
			removeMissingFromBarChart(x, y, width, height, svg, tooltip, formatTime);	
		else if(method === methodBtns[1] || method === methodBtns[2] || method === methodBtns[3]) //highlight, downplay, or annotate styling
			changeBarChart(x, y, width, height, svg, tooltip, formatTime, styles);				
	}
	
	//APPEND X-AXIS		
	var xaxis = svg.append("g")
		.attr("class", "xaxisN") 
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")))
		.selectAll("text")	
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-65)");
	
	//APPEND X-AXIS LABEL
	svg.append("text") 
		.attr("class", "xaxisL") 
		.attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 40) + ")")
		.style("text-anchor", "middle")
		.text("Date");
	
	//EDIT XAXIS LABELS
	d3.selectAll(".xaxisN text")
		.each(function (d, i) {
			if(chartType === "barchart" && !(i < getLength() && ((i % 9) == 0) && i < getLength()) || d==null)	{
				this.remove();
			}
    });
	
	d3.selectAll(".xaxisN line")
		.each(function (d, i) {
			if(chartType === "barchart" && !(i < getLength() && ((i % 9) == 0) && i < getLength()) || d==null)	{
				this.remove();
			}
    });		
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLEARCHART: removes everything from chartDiv so that chart can be redrawn based on users' selections
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clearChart() {
	d3.select('#chartDiv').selectAll('svg').remove();
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REMOVEMISSINGFROMLINECHART: break path into several paths, omitting dots and associated lines for missing data AND
// allows user to add and interact with point for missing values
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeMissingFromLineChart(dataClone, line, height, svg, tooltip, formatTime, x, y) {	
	var nonMissingSlices = []; //nonMissingSlices = holds slices of non-missing data
	var start = 0; //start = used to signal beginning of slices for missing data

	//CREATE ARRAY OF ARRAYS
	for(var i = 0; i < getLength(); i++) {
		if(dataClone[i] == null || isNaN(dataClone[i].Temperature) || dataClone[i].Type === "miss") {
			var tempArray = dataClone.slice(start, i);
			nonMissingSlices.push(tempArray);
			start = i+1;
		}
	}
	
	nonMissingSlices.push(dataClone.slice(start, i));
	 
	//APPEND NONMISSING LINES/PATHS
	for(var i = 0; i < nonMissingSlices.length; i++) {
		var path = svg.append("path")
			.attr("class", "line")
			.attr("d", line(nonMissingSlices[i]))
			.attr('stroke-width', '1px');
	}
	
	//APPEND NONMISSING POINTS/DOTS
	svg.selectAll(".dot")
		.data(dataClone.filter(function(d,i) { while(i < getLength()) return d;}))
		.enter().append("circle")
			.attr("id", function(d,i) {if(d.Type === "miss") d.Temperature = 0; return "d_"+i})
			.attr("class", "dot")
			.attr("cx", line.x())
			.attr("cy", line.y())
			.attr("r", 2)
			.style("fill", function(d) {if(d.Type === "miss") {d.Temperature = NaN; return "none"; }else return "blue"})
			.style("stroke", function(d) {return (d.Type === "miss") ? "none":"blue";})
			.on("mouseover", function(d){d3.select(this).attr("r", 4); tooltip.html(formatTime(d.Day) + "<br/>mean: "  + d.Temperature + "&degF" + "<br/>min: "  + d.Min + "&degF" + "<br/>max: "  + d.Max + "&degF"); return tooltip.style("visibility", "visible");})
			.on("mousemove", function(){d3.select(this).attr("r", 4); return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
			.on("mouseout", function(){d3.select(this).attr("r", 2); return tooltip.style("visibility", "hidden");});
	
	
	//ALLOW USER TO ADD DOT IF RIGHT CLICK ON INVISIBLE BAR
	var barWidth = svg.selectAll("#d_"+2).attr("cx")-svg.selectAll("#d_"+1).attr("cx");
	var addedArray = []; //addedArray = holds all points added by user
	var idx = 0; //idx = counter used for id naming
	var pathNum = 0; //pathNum = counter used for distinguishing paths
	var missingArray = []; //missingArray = used for not duplicating dots when updating missing paths
	var greyed = []; //greyed = used for building path (curr, before, and after)
	
	//create missing bar
	svg.selectAll(".missingBar")
		.data(dataClone.filter(function(d,i) {while(i < getLength()) return d.Type;}))
		.enter().append("rect")
			.attr("class", "missingBar")
			.attr("x", function(d) {svg.selectAll('.missingBar').lower(); return x(d.Day)-barWidth/2;})
			.attr("width", barWidth)
			.attr("y", function(d) {return y(maxTemp); })
			.attr("height", function(d) {return y(0); }) 
			.attr("fill", function(d,i) {return (d.Type === "miss") ? "white":"none";})
			.style("padding-left", "-30px")
			.on("contextmenu",function(d){ //right click action
				d3.event.preventDefault(); 	
				
				//if dot not already added, add
				if(!addedArray.includes(d)) {
					var before, after; //dots to the left and right of d
					
					d.Added = "new";
					var newy = Math.max(0, d3.mouse(this.parentNode)[1]);
					d.Temperature = round(y.invert(newy),2);
					d.UserSelection = round(y.invert(newy),2);
					var temp = d.Temperature;
					
					d.MissingValue = d.Temperature;
					
					d.PathNum = pathNum;
					
					addedArray.push(d);
					
					var missingArraySlices = [];
					
					var correctTemp = 0;
					var formatDate = d3.timeFormat("%m/%d/%Y");
					
					var daysWithPadding = [];
					for(var i = 0; i < getLength(); i++) {
						var s = data[i].Day.split("/");
						
						if(s[1].length < 2) {
							var str = s[0]+"/"+"0"+s[1]+"/"+s[2];
						} else {
							var str = s[0]+"/"+s[1]+"/"+s[2];
						}
						daysWithPadding.push(str);
					}
					
					for(var i = 0; i < getLength(); i++) {
						if(formatDate(d.Day) === daysWithPadding[i]) {
							correctTemp = data[i].Temperature;
							break;
						}
					}
					
					//log user actions
					d.LastDrag = temp;
					
					//addUserDrag("user added point [" + formatDate(d.Day) + ", " + d.Temperature + "] (correct value = " + correctTemp + ")");
					
					var dif = round(correctTemp-d.Temperature,2);
					var dir;
					if(dif > 0)
						dir = "lower";
					else if(dif < 0) {
						dir = "higher";
						dif = dif*-1;
					}
					//addUserDrag("	--> " + dif + " degrees " + dir + " than correct value");
					
					var greyedPath = [];
					
					//build path
					for(var i = 0; i < getLength(); i++) {
						if(dataClone[i].Day === d.Day) {
							var j = i-1;
							
							//get leftmost (before) dot
							while(j >= 0) {
								if(dataClone[j].Type !== "miss" || greyed.includes(dataClone[j])) {
									before = dataClone[j];
									missingArraySlices.push(dataClone[j]);
									greyed.push(dataClone[j]);
									greyedPath.push(dataClone[j]);
									break;
								} else {
									j--;
								}
							}
							
							//add current dot
							missingArraySlices.push(d);
							greyed.push(d);
							greyedPath.push(d);
							
							var j = i+1;
							
							//get rightmost (after) dot
							while(j < getLength()) {
								if(dataClone[j].Type !== "miss"  || greyed.includes(dataClone[j])) {
									after = dataClone[j];
									missingArraySlices.push(dataClone[j]);
									greyed.push(dataClone[j]);
									greyedPath.push(dataClone[j]);
									break;
								} else {
									j++;
								}
							}
							
							break;
						}
					}
					
					//update path (if path already exists, remove and rebuild adding new dot)
					var a1 = [];
					var a2 = [];
					
					for(var i = 0; i < missingArray.length; i++) {
						for(var j = 0; j < missingArray[i].length; j++) {
							if(missingArray[i].includes(before)) {
								var s = "#missingPath_"+i;
								a1 = missingArray[i];
								d3.select(s).remove();
							}
							
							if(missingArray[i].includes(after)) {
								var s = "#missingPath_"+i;
								a2 = missingArray[i];
								d3.select(s).remove();
							}
						}
					}	

					//update missingArraySlices
					var a3 = a1.concat(a2.filter(function(d) {return a1.indexOf(d) < 0;}));					
					var a4 = a3.concat(missingArraySlices.filter(function(d) {return a3.indexOf(d) < 0;}));					
					if(a4.length > 0) {
						missingArraySlices = a4;
						greyedPath = a4;
					}
				
					missingArraySlices.sort(function(a,b){return new Date(a.Day) - new Date(b.Day)})
					
					
					for(var i = 0; i < missingArraySlices.length; i++) {
						missingArraySlices[i].PathNum = pathNum;
					}
					
					//append perm dot
					if(!document.getElementById('permDot_'+idx)) {
						d.SelectedRemoveLocation = round(y.invert(newy),2);
						
						var points = [];
						
						var permLine = d3.line()
							.defined(function(d) {return d; })
							.x(function(d) { return x(d.Day) })
							.y(function(d) { return y(d.SelectedRemoveLocation) })
							
						if(greyedPath.length > 0) {
							var p = svg.append("path")
								.attr("id", "p")
								.attr("class", "line")
								.attr("d", line(greyedPath))
								.attr('stroke-width', '1px')
								.style("stroke", "lightgrey")
								.style("visibility", "hidden");
						}					
						
						svg.selectAll(".permDot")
							.data(addedArray)
							.enter().append("circle")
								.attr("id", 'permDot_'+idx)
								.attr("class", "permDot")
								.attr("cx", permLine.x())
								.attr("cy", permLine.y())
								.attr("r", 2)
								.style("fill", "lightgrey")
								.style("stroke", "lightgrey")
								.on("mouseover", function() {svg.selectAll(".ppp").style("visibility", "visible"); p.style("visibility", "visible");})
								.on("mouseout", function() {svg.selectAll(".ppp").style("visibility", "hidden"); p.style("visibility", "hidden");});
					}
					
					//append path
					var path = svg.append("path")
						.attr("id", "missingPath_"+pathNum)
						.attr("class", "line")
						.attr("d", line(missingArraySlices))
						.attr('stroke-width', '1px')
						.style("stroke", "red");
						
					pathNum++;
					missingArray.push(missingArraySlices);	
					
					//append dot
					svg.selectAll(".newDot")
						.data(addedArray.filter(function(d,i) { while(i < getLength()) return d.Added;}))
						.enter().append("circle")
							.attr("id", 'newDot_'+idx)
							.attr("class", "newDot")
							.attr("cx", line.x())
							.attr("cy", newy)
							.attr("r", 2)
							.style("fill", "red")
							.style("stroke", "red")
							.on("mouseover", function(d){	
								tooltip.html(formatTime(d.Day) + "<br/>mean: " + d.UserSelection + "&degF<br/><i>user-placed dot</i>")
									.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
								d3.select(this).attr("r", 4);
								return tooltip.style("visibility", "visible");})
							.on("mousemove", function(){d3.select(this).attr("r", 4); return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
							.on("mouseout", function(){d3.select(this).attr("r", 2); return tooltip.style("visibility", "hidden");});
					
					idx++;
					
					svg.selectAll('.dot').raise();
					dragDots("newDot",addedArray,height,y,line,missingArray,"removeLineChart");
				}			
			});	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHANGELINECHART: break path into several paths, using styling to distinguish paths of missing data from
// paths of observed data
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeLineChart(line, width, height, svg, tooltip, formatTime, type, x) {	
	var y = d3.scaleLinear().domain([0, maxTemp]).range([height, 0]);

	var missingDataSlices = [];
	var missingStart = 0;
	
	var observedDataSlices = [];
	var observedStart = 0;
	
	var flag = 0; //flag = used to determine when to start new missing data slice
	
	var se = standError(); //se = standard error
	var errors = []; //errors = used to know where to add error bar

	var pathNum = 0; //pathNum = counter for distinguishing between paths
	
	//SPLIT DATA INTO MISSING AND OBSERVED ARRAYS
	for(var i = 0; i < getLength(); i++) {
		if(dataClone[i] == null || dataClone[i].Type === "miss") {
			if(isNaN(dataClone[i].Temperature) || (!isNaN(dataClone[i].SelectedRemoveLocation) && isNaN(dataClone[i].FlagForSomething))) {
				//meanImpute
				var total = 0;
				var nums = 0;
						
				for(var j = -3; j < 5; j++) {
					if(((i+j) >= 0) && ((i+j) < getLength()) && dataClone[i+j].Type !== "miss") {
						total = total + dataClone[i+j].Temperature;
						nums++;
					}
				}
				
				dataClone[i].Temperature = meanImpute(total,nums);
				dataClone[i].Orig = +dataClone[i].Temperature;
			}
			
			//begin/continue missing data slice
			if(flag == 0) {
				missingStart = i-1;
			} 
			
			if(i == 0)
				missingStart = i;
			
			flag = 1;	
			
			//end observed data slice
			var tempArray = dataClone.slice(observedStart, i);
			observedDataSlices.push(tempArray);
			observedStart = i+1;
			
			//if last data point is missing, end missing data slice		
			if(i == getLength()-1) {			
				var tempArray = dataClone.slice(missingStart, i+1);
				missingDataSlices.push(tempArray);
			}
			
			//gather data for error bars
			var day = dataClone[i].Day;
			var temp = dataClone[i].Temperature;
			var max = dataClone[i].Max;
			var min = dataClone[i].Min;
			
			var upperTemp = +temp+se;
			var lowerTemp = +temp-se;
			
			var bar = dataClone[i];
			
			//push error bar
			errors.push(bar);

			dataClone[i].PathNum = pathNum;
		} else {
			//end missing data slice
			if(flag != 0) { 			
				var tempArray = dataClone.slice(missingStart, i+1);
				missingDataSlices.push(tempArray);
				flag = 0;
				pathNum++;
			}
		}
		
		if(isNaN(dataClone[i].Orig))
			dataClone[i].Orig = dataClone[i].Temperature;
	}
	
	//add final slices
	if(observedStart == 89)
		missingDataSlices.push(dataClone.slice(missingStart, i));
	observedDataSlices.push(dataClone.slice(observedStart, i));
	
	//FUZZINESS/BLUR
	var filter = svg.append("defs")
		.append("filter")
		.attr("id","glow");

	filter.append("feGaussianBlur")
		.attr("class", "blur")
		.attr("stdDeviation","2")
		.attr("result","coloredBlur");
	
	//DETERMINE VISUALIZATION COLORING BASED ON TYPE
	var pointColor, lineColor, lineStroke;
	
	if(type === "points_Highlight") {
		pointColor = "red";
		pointStroke = "red";
		lineColor = "blue";
		lineStroke = "0,0";
		filter = "none";
	} else if(type === "pointsAndLines_Highlight" || type === "bars_Highlight") {
		pointColor = "red";
		pointStroke = "red";
		lineColor = "red";
		lineStroke = "0,0";
		filter = "none";
	} else if(type === "points_Downplay") {
		pointColor = "white";
		pointStroke = "blue";
		lineColor = "blue";
		lineStroke = "0,0";
		filter = "none";
	} else if(type === "pointsAndLines_Downplay" || type === "barsDashed_Downplay" || type === "barsGradient1_Downplay" || type === "barsGradient2_Downplay" || type === "barsGradient3_Downplay") {
		pointColor = "white";
		pointStroke = "blue";
		lineColor = "blue";
		lineStroke = "6,2";
		filter = "none";
	}  else if(type === "blurredLines_Downplay") {
		pointColor = "blue";
		pointStroke = "blue";
		lineColor = "blue";
		lineStroke = "0,0";
		filter = "url(#glow)";
	} else if(type === "connectedLines_Annot") {
		pointColor = "blue";
		pointStroke = "blue";
		lineColor = "blue";
		lineStroke = "0,0";
		filter = "none";
	} else if(type === "connectedLinesRED_Annot") {
		pointColor = "red";
		pointStroke = "red";
		lineColor = "blue";
		lineStroke = "0,0";
		filter = "none";
	} else if(type === "disconnectedLines_Annot") {
		pointColor = "blue";
		pointStroke = "blue";
		lineColor = "none";
		lineStroke = "0,0";
		filter = "none";
	}
	
	var tempDataClone = []; //tempDataClone = dataClone cut off a
	for(var i = 0; i < getLength(); i++) {
		tempDataClone.push(dataClone[i]);
	}
	
	var tempLine = d3.line()
		.defined(function(d) {return d; })
		.x(function(d) { return x(d.Day) })
		.y(function(d) { return y(d.Orig) })
	
	if(type !== "disconnectedLines_Annot") {
		var path = svg.append("path")
			.attr("class", "line obs")
			.attr("d", tempLine(tempDataClone))
			.style("stroke", "lightgrey");
	}
			
	//APPEND LINE/PATH FOR EACH MISSING DATA SLICE
	for(var i = 0; i < missingDataSlices.length; i++) {
		var path = svg.append("path")
			.attr("class", "line")
			.attr("id", "pathNum_"+i)
			.attr("d", line(missingDataSlices[i]))
			.style("stroke-dasharray", lineStroke)
			.style("filter", filter)
			.style("stroke", lineColor);
	}
	
	//APPEND LINE/PATH FOR EACH OBSERVED DATA SLICE
	for(var i = 0; i < observedDataSlices.length; i++) {
		var path = svg.append("path")
			.attr("class", "line obs")
			.attr("d", line(observedDataSlices[i]))
			.style("stroke", "blue");
	}
	
	var error = "F";
	
	//APPEND ERROR BARS
	if(type === "connectedLines_Annot" || type === "connectedLinesRED_Annot" || type === "disconnectedLines_Annot") {
		if(type === "connectedLines_Annot" || type === "disconnectedLines_Annot")
			var color = "blue";
		else if(type === "connectedLinesRED_Annot")
			var color = "red";
		
		var h = height-y(se*2);
		
		var line2 = d3.line()
			.defined(function(d) { return d; })
			.x(function(d) { return x(d.Day)})
			.y(function(d) { return y(d.Temperature+se) })
		
		var tempLine2 = d3.line()
			.defined(function(d) { return d; })
			.x(function(d) { return x(d.Day)})
			.y(function(d) { return y(d.Orig+se) })
		
		for(var i = 0; i < errors.length; i++) {
			svg.selectAll(".rc")
			.data(tempDataClone.filter(function(d,i) { while(i < getLength()) return d.Orig;}))
			.enter().append("rect")
				.attr("class", "rc")
				.attr("x", tempLine2.x())
				.attr("y", tempLine2.y())
				.attr("height", function(d) {return h;})
				.attr("width", 2)
				.attr("fill", function(d,i) {return (d.Type === "miss") ? "lightgrey":"none"})
		};
		
		for(var i = 0; i < errors.length; i++) {
			svg.selectAll(".rec")
			.data(dataClone.filter(function(d,i) { while(i < getLength()) return d.Temperature;}))
			.enter().append("rect")
				.attr("id", function(d,i) {return (d.Type === "miss") ? ('rect_'+i):'none'})
				.attr("class", "rec")
				.attr("x", line2.x())
				.attr("y", line2.y())
				.attr("height", function(d) {return h;})
				.attr("width", 2)
				.attr("fill", function(d,i) {return (d.Type === "miss") ? color:"none"})
		};
		
		error = "T";
	}
	
	svg.selectAll(".td")
		.data(tempDataClone.filter(function(d,i) { while(i < getLength()) return d.Orig;}))
		.enter().append("circle")
			.attr("class", "td")
			.attr("cx", tempLine.x())
			.attr("cy", tempLine.y())
			.attr("r", 2)
			.style("fill", function(d) {return (d.Type === "miss") ? "lightgrey":"blue";})
			.style("filter", function(d) {return (d.Type === "miss") ? "lightgrey":"blue";})
			.style("stroke", function(d) {return (d.Type === "miss") ? "lightgrey":"blue";});
	
	//APPEND POINTS/DOTS
	svg.selectAll(".dot")
		.data(dataClone.filter(function(d,i) { while(i < getLength()) return d.Temperature;}))
		.enter().append("circle")
			.attr("id", function(d,i) {return (d.Type === "miss") ? ('dot_'+i):'none'})
			.attr("class", "dot")
			.attr("cx", line.x())
			.attr("cy", line.y())
			.attr("r", 2)
			.style("fill", function(d) {return (d.Type === "miss") ? pointColor:"blue";})
			.style("filter", function(d) {return (d.Type === "miss") ? filter:"blue";})
			.style("stroke", function(d) {return (d.Type === "miss") ? pointStroke:"blue";})
			.on("mouseover", function(d){d3.select(this).attr("r", 4); return (d.Type === "miss") ? toolTipMiss(tooltip,formatTime,d):toolTipObs(tooltip,formatTime,d);})
			.on("mousemove", function(){d3.select(this).attr("r", 4); return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
			.on("mouseout", function(){d3.select(this).attr("r", 2); return tooltip.style("visibility", "hidden");});	
			
	dragDots("dot",dataClone,height,y,line,missingDataSlices,"lineChart",error,h);	
} 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REMOVEMISSINGFROMBARCHART: omits bars for missing data
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeMissingFromBarChart(x, y, width, height, svg, tooltip, formatTime) {	
	x.domain(dataClone.map(function(d,i) {while(i<getLength()) return d.Day; }));
	y.domain([0, maxTemp]);		
	
	var newData = [];
	var missData = [];
	
	for(var i = 0; i < getLength(); i++) {
		if(!(dataClone[i] == null || dataClone[i].Type === "miss")) {
			newData.push(dataClone[i]);
		} else {
			missData.push(dataClone[i]);
		}	
	}
	
	//APPEND BARS
 	svg.selectAll(".bar")
		.data(newData.filter(function(d) { return d.Temperature;}))
		.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) {return x(d.Day); })
			.attr("width", x.bandwidth())
			.attr("y", function(d) {return y(d.Temperature); })
			.attr("height", function(d) {return height-y(d.Temperature); }) 
			.attr("fill", "blue")
			.style("padding-left", "-30px") 
			.on("mouseover", function(d){tooltip.html(formatTime(d.Day) + "<br/>mean: "  + d.Temperature + "&degF" + "<br/>min: "  + d.Min + "&degF" + "<br/>max: "  + d.Max + "&degF"); return tooltip.style("visibility", "visible");})
			.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
			.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
	
	//ALLOW USER TO ADD BAR IF RIGHT CLICK ON INVISIBLE BAR
	var addedArray = []; //addedArray = keeps track of points added by user
	
	svg.selectAll(".missBar")
		.data(missData)
		.enter().append("rect")
			.attr("id", function(d,i) {if(d.MissingValue > 0) return "d_"+i})
			.attr("class", "missBar")
			.attr("x", function(d) {return x(d.Day); })
			.attr("width", x.bandwidth())
			.attr("y", y(maxTemp))
			.attr("height", height-y(maxTemp))
			.attr("fill", "white")
			.style("padding-left", "-30px")
			.on("mouseover", function(d){tooltip.html(formatTime(d.Day) + "<br/>mean: " + d.UserSelection + "&degF<br/><i>user-placed bar</i>"); if(d.MissingValue > 0)return tooltip.style("visibility", "visible");})
			.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
			.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
			.on("contextmenu",function(d,i){
				d3.event.preventDefault(); 	
				
				//if point not already added by user
				if(!addedArray.includes(d)) {
					addedArray.push(d);
					
					var day = d.Day;
					d.Added = "new";
					var newy = Math.max(0, d3.mouse(this.parentNode)[1]);
					d.Temperature = round(y.invert(newy),2);
					d.Orig = round(y.invert(newy),2);
					d.SelectedRemoveLocationBar = round(y.invert(newy),2);
					
					var correctTemp = 0;
					var formatDate = d3.timeFormat("%m/%d/%Y");
					
					var daysWithPadding = [];
					for(var i = 0; i < getLength(); i++) {
						var s = data[i].Day.split("/");
						
						if(s[1].length < 2) {
							var str = s[0]+"/"+"0"+s[1]+"/"+s[2];
						} else {
							var str = s[0]+"/"+s[1]+"/"+s[2];
						}
						daysWithPadding.push(str);
					}
					
					for(var i = 0; i < getLength(); i++) {
						if(formatDate(d.Day) === daysWithPadding[i]) {
							correctTemp = data[i].Temperature;
							break;
						}
					}
					
					//log user interactions
					d.LastDrag = d.Temperature;
					
					//addUserDrag("user added bar [" + formatDate(d.Day) + ", " + d.Temperature + "] (correct value = " + correctTemp + ")");
					
					var dif = round(correctTemp-d.Temperature,2);
					var dir;
					if(dif > 0)
						dir = "lower";
					else if(dif < 0) {
						dir = "higher";
						dif = dif*-1;
					}
					//addUserDrag("	--> " + dif + " degrees " + dir + " than correct value");
					
					addedBarOrigTemp = d.Temperature;
					
					var dt = formatDate(d.Day);
					var st = dt.split("/");
					var str = st[0]+"_"+st[1];
					
					//shadow rectangle
					svg.append("rect")
						.attr("x", x(d.Day))
						.attr("width", x.bandwidth())
						.attr("y", newy)
						.attr("height", function(d) {return height-newy;})	
						.attr("fill", "lightgrey");
						
					//added rectangle
					svg.append("rect")
						.attr("id", "missBar_"+str)
						.attr("class", "m")
						.attr("x", x(d.Day))
						.attr("width", x.bandwidth())
						.attr("y", newy)
						.attr("height", function(d) {return height-newy;})	
						.attr("fill", "red");
					
					//rectangle for showing original rectangle's height when user guesses higher value than original
					svg.append("rect")
						.attr("id", 'origMarker_'+i)
						.attr("x", x(d.Day))
						.attr("width", x.bandwidth())
						.attr("y", newy)
						.attr("height", 2)	
						.attr("fill", "none");				

					dragBars("missBar_"+str,missData,height,y);
				}
			});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHANGEBARCHART: styles bars according to user selections AND allows user to add and interact with point for 
// missing values
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeBarChart(x, y, width, height, svg, tooltip, formatTime, type) {	
	x.domain(dataClone.map(function(d,i) {while(i<getLength()) return d.Day; }));
	y.domain([0, maxTemp]);
	
	var missingBars = []; //missingBars = holds missing values
	
	var se = standError(); //se = standard error
	var errors = []; //errors = used for error bars
	
	//DETERMINE IF BAR HAS MISSING OR OBSERVED DATA
	for(var i = 0; i < getLength(); i++) {
		if(dataClone[i] == null || dataClone[i].Type === "miss") {
			if(isNaN(dataClone[i].Temperature) || (!isNaN(dataClone[i].SelectedRemoveLocationBar) && isNaN(dataClone[i].BarDragged))) {
				//meanImpute
				var total = 0;
				var nums = 0;
						
				for(var j = -3; j < 5; j++) {					
					if(((i+j) >= 0) && ((i+j) < getLength()) && dataClone[i+j].Type !== "miss") {
						total = total + dataClone[i+j].Temperature;
						nums++;
					}
				}
				
				dataClone[i].Temperature = meanImpute(total,nums);
				dataClone[i].Orig = +dataClone[i].Temperature;
			}
			
			missingBars.push(dataClone[i]);
				
			//gather data for error bars
			var day = dataClone[i].Day;
			var temp = dataClone[i].Temperature;
			var max = dataClone[i].Max;
			var min = dataClone[i].Min;
			
			var upperTemp = +temp+se;
			var lowerTemp = +temp-se;
			
			var bar = [{"Day":day,"Temperature":upperTemp,"Max":max,"Min":min},{"Day":day,"Temperature":lowerTemp,"Max":max,"Min":min}];
			
			//push error bar
			errors.push(bar);
		} 
		
		if(isNaN(dataClone[i].Orig))
			dataClone[i].Orig = dataClone[i].Temperature;
	}
	
	//STYLING
	var barColor;
	if(type === "bars_Highlight") {
		barColor = "red";
	} else if(type === "barsDashed_Downplay") {
		barColor = "white";
	} else if(type === "barsWithErrors_Annot") {
		barColor = "blue";
	} else if(type === "pointsWithErrors_Annot") {
		barColor = "none";
	}
	
	//GRADIENT 1
	var gradient = svg.append("defs")
		.append("svg:linearGradient")
		.attr("id", "gradient1")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "0%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad");

    gradient.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "white")
		.attr("stop-opacity", 0);

    gradient.append("stop")
		.attr("offset", "50%")
		.attr("stop-color", "blue")
		.attr("stop-opacity", 1);
		
	//GRADIENT 2
	var gradient2 = svg.append("defs")
		.append("svg:linearGradient")
		.attr("id", "gradient2")
		.attr("x1", "0%")
		.attr("y1", "25%")
		.attr("x2", "0%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad");

    gradient2.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "red")
		.attr("stop-opacity", 0.8);

    gradient2.append("stop")
		.attr("offset", "25%")
		.attr("stop-color", "blue")
		.attr("stop-opacity", 1);
		
	//GRADIENT 3
	var gradient3 = svg.append("defs")
		.append("svg:linearGradient")
		.attr("id", "gradient3")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "0%")
		.attr("y2", "100%")
		.attr("spreadMethod", "reflect");
		
	var colours = ["white", "blue", "blue", "blue", "white"];

    gradient3.selectAll(".stop")
		.data(colours)
		.enter().append("stop")
		.attr("offset", function(d,i) {return i/(colours.length-1);})
		.attr("stop-color", function(d) {return d;});
		
		
	//STRIPES/SKETCHINESS
	var stripes = svg.append("defs")
		.append('pattern')
			.attr('id', 'stripes')
			.attr('patternUnits', 'userSpaceOnUse')
			.attr('width', 4)
			.attr('height', 4)
		.append('path')
			.attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
			.attr('stroke', 'blue')
			.attr('stroke-width', 1);
			
	//FUZZINESS/BLUR
	var filter = svg.append("defs")
		.append("filter")
		.attr("id","glow");

	filter.append("feGaussianBlur")
		.attr("class", "blur")
		.attr("stdDeviation","4")
		.attr("result","coloredBlur");
	
	var tempDataClone = []; //tempDataClone = copy of dataClone cut off at certain value
	for(var i = 0; i < getLength(); i++) {
		tempDataClone.push(dataClone[i]);
	}
	
	//SET BAR COLOR
	var tempBarColor;
	if(type === "pointsWithErrors_Annot") 
		tempBarColor = "none";
	else
		tempBarColor = "lightgrey";
	
	//APPEND SHADOW BARS
	svg.selectAll(".b")
		.data(tempDataClone.filter(function(d,i) {while(i < getLength()) return d.Orig;}))
		.enter().append("rect")
			.attr("class", "b")
			.attr("x", function(d) { return x(d.Day); })
			.attr("width", x.bandwidth())
			.attr("y", function(d) {return y(d.Orig); })
			.attr("height", function(d) {return height - y(d.Orig); })
			.attr("fill", function(d) {return (missingBars.includes(d)) ? tempBarColor:barColor})		
			.style("padding-left", "-30px");
	
	//APPEND BARS
	svg.selectAll(".bar")
		.data(dataClone.filter(function(d,i) {while(i < getLength()) return d.Temperature;}))
		.enter().append("rect")
			.attr("id", function(d,i) {return (d.Type === "miss") ? ('bar_'+i):'none'})
			.attr("class", "bar real")
			.attr("x", function(d) { return x(d.Day); })
			.attr("width", x.bandwidth())
			.attr("y", function(d) {return y(d.Temperature); })
			.attr("height", function(d) {return height - y(d.Temperature); }) 
			.attr("fill", function(d) {return (d.Type === "miss") ? barColor:"blue";})
			.style("padding-left", "-30px") 			
			.on("mouseover", function(d){return (d.Type === "miss") ? toolTipMiss(tooltip,formatTime,d):toolTipObs(tooltip,formatTime,d);})
			.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
			.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
	
	//APPLY DASHED OUTLINE
	if(type === "barsDashed_Downplay") {
		d3.selectAll(".real")
			.attr("width", x.bandwidth()-1)
			.style("stroke", function(d) {return (d.Type === "miss") ? "blue":"blue";})
			.style("stroke-dasharray", function(d) {return (d.Type === "miss") ? "6,2":"0,0";});
	}
	
	//APPLY GRADIENT 1
	if(type === "barsGradient1_Downplay")
		d3.selectAll(".real").style("fill", function(d) {return (d.Type === "miss") ? "url(#gradient1)":"blue";});
	
	//APPLY GRADIENT 2
	if(type === "barsGradient2_Downplay")
		d3.selectAll(".real").style("fill", function(d) {return (d.Type === "miss") ? "url(#gradient2)":"blue";});
	
	//APPLY GRADIENT 3
	if(type === "barsGradient3_Downplay")
		d3.selectAll(".real").style("fill", function(d) {return (d.Type === "miss") ? "url(#gradient3)":"blue";});
	
	//APPLY STRIPES/SKETCHINESS
	if(type === "barsSketched_Downplay")
		d3.selectAll(".real").style("fill", function(d) {return (d.Type === "miss") ? "url(#stripes)":"blue";});
	
	//APPLY FUZZINESS/BLUR
	if(type === "blurredBars_Downplay") {
		d3.selectAll(".real")
			.style("fill", "blue")
			.style("filter", function(d) {return (d.Type === "miss") ? "url(#glow)":"blue";});
	}
	
	var padding = x.bandwidth()/2; //padding = placement of error bars and dots
	
	//INVISIBLE LINE TO APPEND ERROR BARS TO
	var line = d3.line()
		.defined(function(d) { return d; })
		.x(function(d) { return x(d.Day)-3+padding })
		.y(function(d) { return y(d.Temperature) });
		
	var tempLine = d3.line()
		.defined(function(d) { return d; })
		.x(function(d) { return x(d.Day)-3+padding })
		.y(function(d) { return y(d.Orig) });
	
	var error = "F";
	var bar = "F";
	var h = height-y(se*2);
	
	var line2 = d3.line()
		.defined(function(d) { return d; })
		.x(function(d) { return x(d.Day)+padding })
		.y(function(d) { return y(d.Temperature+se) })
		
	var tempLine2 = d3.line()
		.defined(function(d) { return d; })
		.x(function(d) { return x(d.Day)+padding })
		.y(function(d) { return y(d.Orig+se) })
	
	//APPEND ERROR BARS
	if(type === "barsWithErrors_Annot" || type === "pointsWithErrors_Annot") {
		var color = "black";
		if(type === "pointsWithErrors_Annot") {
			color = "blue";
		}
		
		//append shadow error lines
		for(var i = 0; i < errors.length; i++) {
			svg.selectAll(".r")
			.data(tempDataClone.filter(function(d,i) { while(i < getLength()) return d.Orig;}))
			.enter().append("rect")
				.attr("class", "r")
				.attr("x", tempLine2.x())
				.attr("y", tempLine2.y())
				.attr("height", function(d) {return h;})
				.attr("width", 2)
				.attr("fill", function(d,i) {return (d.Type === "miss") ? "lightgrey":"none"});
		}
		
		//append error lines
		for(var i = 0; i < errors.length; i++) {
			svg.selectAll(".rec")
			.data(dataClone.filter(function(d,i) { while(i < getLength()) return d.Temperature;}))
			.enter().append("rect")
				.attr("id", function(d,i) {return (d.Type === "miss") ? ('rect_'+i):'none'})
				.attr("class", "rec")
				.attr("x", line2.x())
				.attr("y", line2.y())
				.attr("height", function(d) {return h;})
				.attr("width", 2)
				.attr("fill", function(d,i) {return (d.Type === "miss") ? color:"none"});
		}
		
		//append shadow error dots
		if(type === "pointsWithErrors_Annot") {
			error = "T";
			svg.selectAll(".dt")
				.data(tempDataClone.filter(function(d,i) { while(i < getLength()) return d.Orig;}))
				.enter().append("circle")
					.attr("class", "dt")
					.attr("cx", tempLine.x())
					.attr("cy", tempLine.y())
					.attr("r", 2)
					.attr("transform", "translate(4,0)")
					.style("fill", function(d) {return (d.Type === "miss") ? "lightgrey":"none";});
					
			svg.selectAll(".dot")
				.data(dataClone.filter(function(d,i) { while(i < getLength()) return d.Temperature;}))
				.enter().append("circle")
					.attr("id", function(d,i) {return (d.Type === "miss") ? ('dot_'+i):'none'})
					.attr("class", "dot")
					.attr("cx", line.x())
					.attr("cy", line.y())
					.attr("r", 2)
					.attr("transform", "translate(4,0)")
					.style("fill", function(d) {return (d.Type === "miss") ? "blue":"none";})
					.on("mouseover", function(d){d3.select(this).attr("r", 4); return (d.Type === "miss") ? toolTipMiss(tooltip,formatTime,d):toolTipObs(tooltip,formatTime,d);})
					.on("mousemove", function(){d3.select(this).attr("r", 4); return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
					.on("mouseout", function(){d3.select(this).attr("r", 2); return tooltip.style("visibility", "hidden");});		
					
			dragDots("dot",dataClone,height,y,line,0,"barChart",error,h);
		}
		
		bar = "T";
	}
	
	var origLine = d3.line()
		.defined(function(d) { return d; })
		.x(function(d) { return x(d.Day) })
		.y(function(d) { return y(d.Orig) })

	for(var i = 0; i < errors.length; i++) {
		svg.selectAll(".r")
		.data(tempDataClone.filter(function(d,i) { while(i < getLength()) return d.Orig;}))
		.enter().append("rect")
			.attr("id", function(d,i) {return (d.Type === "miss") ? ('origMarker_'+i):'none'})
			.attr("class", "r")
			.attr("x", origLine.x())
			.attr("y", origLine.y())
			.attr("height", 2)
			.attr("width", x.bandwidth())
			.attr("fill", function(d,i) {return (d.Temperature > d.Orig) ? "lightgrey":"none"});
	}
	
	dragBars("bar",dataClone,height,y,bar,h);	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRAGDOTS: allows for moving of dots in line chart and moving of error dots in bar chart
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dragDots(idName,array,height,scaleY,line,missingDataSlices,chartType,err,h) {
	var num;
	var date;
	var formatDate = d3.timeFormat("%m/%d/%Y");
	var originalValue;
	var y;
	
	var drag1 = d3.drag()
		.on('drag', function() {
			y = Math.max(0, d3.mouse(this.parentNode)[1]);
			
			if(y > height)
				y = height-1;
			
			//REPOSITION DOT
			d3.select(this).attr('cy', y + 'px');
			
			date = d3.select(this).datum().Day;
			
			for(var i = 0; i < getLength(); i++) {
				if(dataClone[i].Day === date) {
					addedBarOrigTemp = dataClone[i].Orig;
					
					dataClone[i].Temperature = round(scaleY.invert(y),2);
					dataClone[i].MissingValue = round(scaleY.invert(y),2);
					
					if(chartType === "removeLineChart") {
						dataClone[i].UserSelection = round(scaleY.invert(y),2);
					}
					
					originalValue = data[i].Temperature;
								
					//REPOSITION ERROR BAR
					if(err === "T") {
						d3.select("#rect_"+i).attr('y', +(y-h/2) + 'px');
					}

					break;					
				}
			}
			
			//REPOSITION LINE
			if(chartType === "lineChart") {
				num = d3.select(this).datum().PathNum;
				d3.select(this).datum().FlagForSomething = round(scaleY.invert(y),2);
				d3.select("#pathNum_"+num).attr('d', line(missingDataSlices[num]));
			}
			
			//REPOSITION MISSING LINE FOR REMOVE
			if(chartType === "removeLineChart") {
				num = d3.select(this).datum().PathNum;
				d3.select("#missingPath_"+num).attr('d', line(missingDataSlices[num]));
			}
		})
		.on("end", function(d) {
			if(isNaN(d.LastDrag)) {
				//addUserDrag("user moved point [" + formatDate(date) + ", " + addedBarOrigTemp + "] to [" + formatDate(date) + ", " + round(scaleY.invert(y),2) + "] (correct value = " + originalValue + ")");
			} else {
				//addUserDrag("user moved point [" + formatDate(date) + ", " + d.LastDrag + "] to [" + formatDate(date) + ", " + round(scaleY.invert(y),2) + "] (correct value = " + originalValue + ")");
			}	

			var dif = round(originalValue-round(scaleY.invert(y),2),2);
			var dir;
			if(dif > 0)
				dir = "lower";
			else if(dif < 0) {
				dir = "higher";
				dif = dif*-1;
			}
			//addUserDrag("	--> " + dif + " degrees " + dir + " than correct value");
			
			d.LastDrag = d.Temperature;
		})
	
	//make all missing points draggable
	for(var i = 0; i < array.length; i++) {
		if(array[i].Type === "miss") {
			var relengthOfDataDot = d3.select('#'+idName+'_'+i);
			relengthOfDataDot.call(drag1);
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRAGBARS: allows for resizing of bars in barchart
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dragBars(idName,array,height,scaleY,bar,h) {
	var date;
	var formatDate = d3.timeFormat("%m/%d/%Y");
	var formatDate2 = d3.timeFormat("%b %d, %Y");
	var originalValue;
	var temp;
	
	var lastPosition;
	
	var drag2 = d3.drag()
		.on('drag', function() {	
			y = Math.max(0, d3.mouse(this.parentNode)[1]);
			
			if(y > height)
				y = height-1;

			//REPOSTITION BAR
			d3.select(this).style('y', y + 'px');
			d3.select(this).style('height', +(height-y) + 'px');
			
			if(idName.charAt(0) !== 'm') {
				date = d3.select(this).datum().Day;
			}		
			
			for(var i = 0; i < getLength(); i++) {
				var idParts = idName.split("_");
				var idStr = idParts[1] + "_" + idParts[2];
				
				var dt = formatDate(dataClone[i].Day);
				var st = dt.split("/");
				var str = st[0]+"_"+st[1];
				
				if(idName.includes('missBar_') && str === idStr) {
					temp = round(scaleY.invert(y),2);
					date = idParts[1] + "/" + idParts[2] + "/2018";
						
					if(temp > dataClone[i].Orig) {
						d3.select("#origMarker_"+idParts[1]).attr('fill', 'lightgrey');	
					}
					
					originalValue = data[i].Temperature;
					
					break;
				} else if(dataClone[i].Day === date) {
					dataClone[i].BarDragged = round(scaleY.invert(y),2);
					dataClone[i].Temperature = round(scaleY.invert(y),2);
					dataClone[i].MissingValue = dataClone[i].Temperature;
					
					addedBarOrigTemp = data[i].Temperature;
					
					temp = round(scaleY.invert(y),2);
					
					if(dataClone[i].Temperature > dataClone[i].Orig) {
						d3.select("#origMarker_"+i).attr('fill', 'lightgrey');
					}
					
					//REPOSITION ERROR BAR
					if(bar === "T") {
						d3.select("#rect_"+i).attr('y', +(y-h/2) + 'px');
					}
					
					originalValue = data[i].Temperature;
					
					break;
				}
			}
			
			d3.select("#"+idName)
				.on("mouseover", function(d){
					if(idName.charAt(0) === 'm') {
						var idParts = idName.split("_");
						var month;
						
						if(idParts[1].includes("01")) month = "Jan";
						else if(idParts[1].includes("02")) month = "Feb";
						else if(idParts[1].includes("03")) month = "Mar";
						else if(idParts[1].includes("04")) month = "Apr";
						else if(idParts[1].includes("05")) month = "May";
						else if(idParts[1].includes("06")) month = "Jun";
						else if(idParts[1].includes("07")) month = "Jul";
						else if(idParts[1].includes("08")) month = "Aug";
						else if(idParts[1].includes("09")) month = "Sep";
						else if(idParts[1].includes("10")) month = "Oct";
						else if(idParts[1].includes("11")) month = "Nov";
						else if(idParts[1].includes("12")) month = "Dec";
						var tooltipDate = month + " " + idParts[2] + ", 2018";
					} else {
						var tooltipDate = formatDate2(date);
					}
					
					tooltip.html(tooltipDate + "<br/>mean: " + temp + "&degF<br/><i>user-placed bar</i>")
							.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")
							.style("visibility", "visible");})
				.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
				.on("mouseout", function(){return tooltip.style("visibility", "hidden");});  
		})
		.on("end", function(d) {
			if(idName.charAt(0) === 'm') {
				var idParts = idName.split("_");
				
				if(!isNaN(lastPosition)) {
					//addUserDrag("user moved bar [" + date + ", " + lastPosition + "] to [" + date + ", " + temp + "] (correct value = " + originalValue + ")");
				} else {
					//addUserDrag("user moved bar [" + date + ", " + addedBarOrigTemp + "] to [" + date + ", " + temp + "] (correct value = " + originalValue + ")");
				}
				
				lastPosition = temp;
			} else {
				if(!isNaN(lastPosition)) {
					//addUserDrag("user moved bar [" + formatDate(date) + ", " + lastPosition + "] to [" + formatDate(date) + ", " + temp + "] (correct value = " + originalValue + ")");
				} else {
					//addUserDrag("user moved bar [" + formatDate(date) + ", " + addedBarOrigTemp + "] to [" + formatDate(date) + ", " + temp + "] (correct value = " + originalValue + ")");
				}
				
				lastPosition = temp;
			}
			
			var dif = round(originalValue-round(scaleY.invert(y),2),2);
			var dir;
			if(dif > 0)
				dir = "lower";
			else if(dif < 0) {
				dir = "higher";
				dif = dif*-1;
			}
			//addUserDrag("	--> " + dif + " degrees " + dir + " than correct value");
		})
	
	//make missing bars draggable
	if(idName.charAt(0) === 'm' || idName.charAt(0) === 'd') {
		var relengthOfDataBar = d3.select('#'+idName);
		relengthOfDataBar.call(drag2);
	} else {
		for(var i = 0; i < array.length; i++) {
			if(array[i].Type === "miss") {
				var relengthOfDataBar = d3.select('#'+idName+'_'+i);
				relengthOfDataBar.call(drag2);
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MEANIMPUTE: simple mean imputation (ex: if indx i = 10, sum = values at indx 7,8,9,10,11,12,13,14
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function meanImpute(sum,nums) {
	var mean = sum/nums;

	if(typeof mean === "undefined")
		mean = 0;
	
	return round(mean,1);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STANDERROR: calculates 2SE by dividing the sample SD by the sqrt of the sample lengthOfData
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function standError() {
	var array = [];
	
	for(var i = 0; i < getLength(); i++) {
		if(dataClone[i].Type !== "miss") {
			array.push(dataClone[i].Temperature);
		}
	}
	
	var n = array.length;
	var mean = array.reduce((a,b) => a+b)/n;
	var se = Math.sqrt(array.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/(n-1));
	
	return 2*se/(Math.sqrt(n)); //2 times the standard error
	//return se; //standard deviation
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ROUND: rounds value to number of decimal places
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function round(v, d) {
    return Number(Math.round(v + 'e' + d) + 'e-' + d);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TOOLTIPMISS: formats tooltip to say meanImputed
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function toolTipMiss(tooltip,formatTime,d) {	
	tooltip.html(formatTime(d.Day) + "<br/>mean: "  + d.Temperature + "&degF" + "<br/><i>(imputed: " + d.Orig + "&degF)</i>"); 
	//tooltip.html(formatTime(d.Day) + "<br/>mean: " + d.Temperature + "&degF<br/><i>user-placed dot</i><br/><i>(orig loc: " + d.UserSelection + "&degF)</i>");
	
	return tooltip.style("visibility", "visible");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TOOLTIPOBS: fomats tooltip to display stats
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function toolTipObs(tooltip,formatTime,d) {
	tooltip.html(formatTime(d.Day) + "<br/>mean: "  + d.Temperature + "&degF" + "<br/>min: "  + d.Min + "&degF" + "<br/>max: "  + d.Max + "&degF")
	return tooltip.style("visibility", "visible");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OPENDIV: opens either highlightExpandedDivLine or downplayExpandedDivLine (div w/ options to highlight/downplay missing)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openDiv(element) {
	var divs = ["highlightExpandedDivLine","downplayExpandedDivLine","expDiv3"];

	if(element.style.display == 'none'){
		element.style.display='block';
		element.style.border='1px solid rgb(50,50,50)';
		element.style.position='absolute';
		element.style.right='150px';
		element.style.background='rgb(50,50,50)';	
	} else {
		element.style.display='none';
	}				
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLOSEDIV: closes either highlightExpandedDivLine or downplayExpandedDivLine (div w/ options to highlight/downplay missing)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function closeDiv(element) {
	element.style.display='none';					
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLOSEALLDIVS: closes all side divs
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function closeAllDivs() {
	closeDiv(highlightExpandedDivLine);  
	closeDiv(downplayExpandedDivLine); 
	closeDiv(highlightExpandedDivBar);  
	closeDiv(downplayExpandedDivBar); 
	closeDiv(annotateExpandedDivLine); 
	closeDiv(annotateExpandedDivBar);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLOSEALLSCREENSHOTS: closes all "view original" screenshots
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function closeAllScreenshots() {
	closeDiv(org1_line);  
	closeDiv(org2_line); 
	closeDiv(org3_line);  
	closeDiv(org4_line); 
	closeDiv(org5_line); 
	closeDiv(org1_bar);  
	closeDiv(org2_bar); 
	closeDiv(org3_bar);  
	closeDiv(org4_bar); 
	closeDiv(org5_bar); 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VIEWORIGINALIMG: allows user to see static image of chart without any filters
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function viewOriginalImg() {
	var linePics = ["org1_line","org2_line","org3_line","org4_line","org5_line"];
	var barPics = ["org1_bar","org2_bar","org3_bar","org4_bar","org5_bar"];

	var pic; //pic = pic id name
	
	if(document.getElementById("lineBtn").style.background === "white") { //line chart
		pic = linePics[getM()-1];
		element = document.getElementById(pic);
	} else { //bar chart
		pic = barPics[getM()-1];
		element = document.getElementById(pic);
	}

	//hide all other pictures and display selected one
	if(element.style.display == 'none'){
		element.style.display='block';
		element.style.border='1px solid black';
		element.style.position='absolute';
		element.style.right='150px';
		element.style.background='black';
		
		for(var i = 0; i < linePics.length; i++) {
			if(linePics[i] !== pic)
				document.getElementById(linePics[i]).style.display='none';
		}
		
		for(var i = 0; i < barPics.length; i++) {
			if(barPics[i] !== pic)
				document.getElementById(barPics[i]).style.display='none';
		}
		
		document.getElementById("origBtn").style.background = "white"
		document.getElementById("origBtn").style.color = "black"
	} else {
		closeAllScreenshots();
		
		document.getElementById("origBtn").style.background = "rgba(255,255,255,0.4)"
		document.getElementById("origBtn").style.color = "white"
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATEACCORDINGTOMONTHS: redraw the chart based on the number of months (amount of data) selected in vis
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateAccordingToMonths(m) {
	closeAllDivs();
	
	var months = ["m1","m2","m3","m4","m5"];
	var txt = ["1 month","2 months","3 months","6 months","12 months"];
	var num = [31, 31+28, 31+28+31, 31+28+31+30+31+30, 365];
	
	var selected = months[m-1];
	
	document.getElementById(selected).style.background = "grey"
	document.getElementById(selected).style.color = "white"
	
	for(var i = 0; i < months.length; i++) {
		if(months[i] !== selected) {
			document.getElementById(months[i]).style.background = "white"
			document.getElementById(months[i]).style.color = "grey"
		} else {
			document.getElementById("monthSelector").innerHTML = ""+txt[i];
		}
	}
	
	l = num[m-1];
	
	var lastVisClicked = document.getElementById(visSelected()+"Btn");
	
	buttonSelected(lastVisClicked,lastMethodClicked);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATEMONTHDIV: change styling based on selection
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateMonthDiv() {
	if(document.getElementById("monthSelDiv").style.display === "block") {
		document.getElementById("monthSelDiv").style.display = "none";
	} else {
		document.getElementById("monthSelDiv").style.display = "block";
	}
	
	closeAllDivs();
}