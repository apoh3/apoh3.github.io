/***********************************************************************************************************************
	Onclick functions for each button created in index.html. All functions called here reside in visScript.js.
***********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VISUALIZATION BUTTON FUNCTIONS: line chart, bar chart
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function visLineChartFunction() {
	////setSelectedBtn("visualization -> line chart");
	closeAllDivs();
	closeDiv(monthSelDiv);
	clearChart(); 
	buttonSelected(lineBtn);
}

function visBarChartFunction() {
	//setSelectedBtn("visualization -> bar chart");
	closeAllDivs();
	closeDiv(monthSelDiv);
	clearChart(); 
	buttonSelected(barBtn);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PERCENT MISSING BUTTON FUNCTIONS: 0%, 10%, 20%, 30%, 40%, 50%
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function percZeroFunction() {
	////setSelectedBtn("% missing -> 0%");
	closeAllDivs();
	closeDiv(monthSelDiv);
	removeData(0); 
	clearChart(); 
	buttonSelected(zeroBtn);
}

function percFiveFunction() {
	//setSelectedBtn("% missing -> 5%");
	closeAllDivs();
	closeDiv(monthSelDiv);
	removeData(5); 
	clearChart(); 
	buttonSelected(fiveBtn);
}

function percTenFunction() {
	//setSelectedBtn("% missing -> 10%");
	closeAllDivs();
	closeDiv(monthSelDiv);
	removeData(10); 
	clearChart(); 
	buttonSelected(tenBtn);
}

function percFiftFunction() {
	//setSelectedBtn("% missing -> 15%");
	closeAllDivs();
	closeDiv(monthSelDiv);
	removeData(15); 
	clearChart(); 
	buttonSelected(fiftBtn);
}

function percTwentyFunction() {
	//setSelectedBtn("% missing -> 20%");
	closeAllDivs();
	closeDiv(monthSelDiv);
	removeData(20); 
	clearChart(); 
	buttonSelected(twentyBtn);
}

function percTweFiveFunction() {
	//setSelectedBtn("% missing -> 25%");
	closeAllDivs();
	closeDiv(monthSelDiv);
	removeData(25); 
	clearChart(); 
	buttonSelected(tweFiveBtn);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// METHOD BUTTON FUNCTIONS: remove, highlight (color points, color points and lines), downplay (unfilled points, 
// unfilled points and dashed lines)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function methRemoveFunction() {
	//////setSelectedBtn("method -> remove");
	closeAllDivs();
	closeDiv(monthSelDiv);
	clearChart(); 
	buttonSelected(removeBtn);
}

function methHighlightFunction(chart) {
	if(visSelected() === "line") {
		openDiv(highlightExpandedDivLine); 
		closeDiv(downplayExpandedDivLine); 
		closeDiv(highlightExpandedDivBar);  
		closeDiv(downplayExpandedDivBar);
		closeDiv(annotateExpandedDivLine); 
		closeDiv(annotateExpandedDivBar);
		closeDiv(monthSelDiv);
	} else {
		openDiv(highlightExpandedDivBar); 
		closeDiv(highlightExpandedDivLine);  
		closeDiv(downplayExpandedDivLine);  
		closeDiv(downplayExpandedDivBar);
		closeDiv(annotateExpandedDivLine); 
		closeDiv(annotateExpandedDivBar);
		closeDiv(monthSelDiv);
	}	
}

function highlightPoints() {
	//setSelectedBtn("method -> highlight -> color points");
	clearChart(); 
	buttonSelected(highBtn,"points_Highlight");
}

function highlightPointsAndLines() {
	//setSelectedBtn("method -> highlight -> color points and lines");
	clearChart(); 
	buttonSelected(highBtn,"pointsAndLines_Highlight");
}

function highlightBars() {
	//setSelectedBtn("method -> highlight -> color bars");
	clearChart(); 
	buttonSelected(highBtn,"bars_Highlight");
}

function methDownplayFunction(chart) {
	if(visSelected() === "line") {
		openDiv(downplayExpandedDivLine); 
		closeDiv(highlightExpandedDivLine);  
		closeDiv(highlightExpandedDivBar);  
		closeDiv(downplayExpandedDivBar);
		closeDiv(annotateExpandedDivLine); 
		closeDiv(annotateExpandedDivBar);
		closeDiv(monthSelDiv);
	} else {
		openDiv(downplayExpandedDivBar); 
		closeDiv(highlightExpandedDivBar);
		closeDiv(highlightExpandedDivLine);  
		closeDiv(downplayExpandedDivLine); 
		closeDiv(annotateExpandedDivLine); 
		closeDiv(annotateExpandedDivBar);
		closeDiv(monthSelDiv);
	}
}

function downplayPoints() {
	//setSelectedBtn("method -> downplay -> unfilled points");
	clearChart(); 
	buttonSelected(downpBtn,"points_Downplay");
}

function downplayPointsAndLines() {
	//setSelectedBtn("method -> downplay -> unfilled points and dashed lines");
	clearChart(); 
	buttonSelected(downpBtn,"pointsAndLines_Downplay");
}

function downplayBlurredLines() {
	//setSelectedBtn("method -> downplay -> blurred points and lines");
	clearChart(); 
	buttonSelected(downpBtn,"blurredLines_Downplay");
}

function downplayDashed() {
	//setSelectedBtn("method -> downplay -> dashed-outlined bars");
	clearChart(); 
	buttonSelected(downpBtn,"barsDashed_Downplay");
}

function downplayGradient(num) {
	if(num == 1) {
		//setSelectedBtn("method -> downplay -> white/blue gradient bars");
		var id = "barsGradient1_Downplay";
	} else if(num == 2) {
		//setSelectedBtn("method -> downplay -> red/blue gradient bars");
		var id = "barsGradient2_Downplay";
	} else if(num == 3) {
		//setSelectedBtn("method -> downplay -> white/blue/white gradient bars");
		var id = "barsGradient3_Downplay";
	}
	
	clearChart(); 
	buttonSelected(downpBtn,id);
}

function downplaySketched() {
	//setSelectedBtn("method -> downplay -> sketched/striped bars");
	clearChart(); 
	buttonSelected(downpBtn,"barsSketched_Downplay");
}

function downplayBlurredBars() {
	//setSelectedBtn("method -> downplay -> blurred bars");
	clearChart(); 
	buttonSelected(downpBtn,"blurredBars_Downplay");
}

function methAnnotateFunction(chart) {
	if(visSelected() === "line") {
		openDiv(annotateExpandedDivLine); 
		closeDiv(annotateExpandedDivBar); 
		closeDiv(highlightExpandedDivLine); 
		closeDiv(downplayExpandedDivLine); 
		closeDiv(highlightExpandedDivBar);  
		closeDiv(downplayExpandedDivBar);
		closeDiv(monthSelDiv);
	} else {
		openDiv(annotateExpandedDivBar); 
		closeDiv(annotateExpandedDivLine); 
		closeDiv(highlightExpandedDivLine); 
		closeDiv(downplayExpandedDivLine); 
		closeDiv(highlightExpandedDivBar);  
		closeDiv(downplayExpandedDivBar);
		closeDiv(monthSelDiv);
	}	
}

function addConnErrorBar(val) 
{	if(val == 0) {
		//setSelectedBtn("method -> annotate -> connected points with error bars");
		id = "connectedLines_Annot";
	} else if(val == 1) {
		//setSelectedBtn("method -> annotate -> colored connected points with error bars");
		id = "connectedLinesRED_Annot";
	}
	
	clearChart(); 
	buttonSelected(annotBtn, id);
}

function addDisconnErrorBar() {
	//setSelectedBtn("method -> annotate -> disconnected points with error bars");
	clearChart(); 
	buttonSelected(annotBtn,"disconnectedLines_Annot");
}

function addErrorBarsToBars() {
	//setSelectedBtn("method -> annotate -> bars with error bars");
	clearChart(); 
	buttonSelected(annotBtn,"barsWithErrors_Annot");
}

function addErrorPointsToBars() {
	//setSelectedBtn("method -> annotate -> points with error bars");
	clearChart(); 
	buttonSelected(annotBtn,"pointsWithErrors_Annot");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VIEW ORIGINAL SCREENSHOTS OF CHARTS FUNCTION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function originalFunction() {
	//setSelectedBtn("view original");
	viewOriginalImg();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SELECT MONTHS TO DISPLAY DATA FOR
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var l = 31+28+31; //l = length of xaxis based on number of days on xaxis (initialized to 3 months)
var mS = 3;

function monthDivFunction() {
	updateMonthDiv();
}

function monthSelectedFunction(m) {
	var monthString;
	
	if(m === 1)
		monthString = "1 month";
	else if(m === 2)
		monthString = "2 months";
	else if(m === 3)
		monthString = "3 months";
	else if(m === 4)
		monthString = "6 months";
	else if(m === 5)
		monthString = "12 months";
	
	//setSelectedBtn("months -> " + monthString);
	updateAccordingToMonths(m);
	setM(m);
	closeDiv(monthSelDiv);
}

function getLength() {
	return l;
}

function setM(m) {
	mS = m;
}

function getM() {
	return mS;
}