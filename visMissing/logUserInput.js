var s = [];
var drags = [];

var startDate;
var startTime;
var endTime;

var btns = [];

var a = [];

var d = [];

var standErrors = [];
var standDevs = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SAVE: save all information to string s to be written to downloaded file
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function save(num) {
	if(num == 1) {
	
		var dateInfo = formatTimeAndDate();
		
		s = [
			"date: " + dateInfo[0], 
			"start time: " + dateInfo[1], 
			"end time: " + dateInfo[2],
			"elapsed time: " + dateInfo[3]
		];
		
		s.push("");
		s.push("predefined settings:");
		s.push(a[0]);
		s.push(a[1]);
		s.push(a[2]);
		s.push("months -> 3 months");
		s.push("");
		s.push("user interactions: ");
		
		for(var i = 3; i < a.length; i++) {
			s.push(a[i]);
		}

		s.push(" ");
		s.push("standard deviation: "+calcStandDev(1));
		s.push("standard error: "+calcStandDev(2));
		
		//s.push(getStandDev());
		//s.push(getStandError());
		
		download("missingDataExample_results.txt", s);
	}
}


function calcStandDev(num) {
	var array = [];
	var corrArray = [];
	var days = [];
	
	for(var i = 0; i < a.length; i++) {
		if(a[i].includes("user")) {
			var split = a[i].split(" ");	
			var res = Number(split[split.length-1].replace(/[^0-9\.]+/g,""));
			corrArray.push(res);
		}
		if(a[i].includes("-->")) {
			 var res = Number(a[i].replace(/[^0-9\.]+/g,""));
			 array.push(res);
		}
	}
	
	var n = array.length;
	if(n > 0) {
		var mean = array.reduce((a,b) => a+b)/n;
		var se = Math.sqrt(array.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/(n-1));
		
		standErrors.push(round(se/(Math.sqrt(n)),2));
		standDevs.push(round(se,2));
		
		if(num == 0) 
			return round(array.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/(n-1),2); //variance
		else if(num == 2)
			return round(se/(Math.sqrt(n)),2); //standard error
		else if(num == 1)
			return round(se,2); //standard deviation
	} else return 0;
}

function getStandError() {
	var sum = 0;
	for(var i = 0; i < standErrors.length; i++)
		sum+=standErrors[i];
	return sum/standErrors.length;
}

function getStandDev() {
	var sum = 0;
	for(var i = 0; i < standDevs.length; i++)
		sum+=standDevs[i];
	return sum/standDevs.length;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOWNLOAD: write string s to a text file and download it (on "save" button click)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function download(filename, s) {
    text="";
	
	for(var i = 0; i < s.length; i++) {
		text+=s[i]+"\r\n";
		
		if(i === s.length-1) {
			text+="\r\n";
		}
	}
	
	var element = document.createElement('a');
	
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETDATAARRAY: sets data to be the array the user is using
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setDataArray(d) {
	this.d = d;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETDATASET: gets and formats dataclone
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getDataSet(data) {
	var d = [];
	
	for(var i = 0; i < data.length; i++) {
		d.push("Day: " + data[i].Day + ", Temperature: " + data[i].Temperature + ", Max: " + data[i].Max + ", Min: " + data[i].Min);
	}
	
	return d;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADDUSERDRAG: add point/bar change to array for printing
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addUserDrag(c) {
	a.push(c);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETSTARTTIME: set start date and time, declared when begin is called (visScript)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setStartTime(d,st) {
	startDate = d;
	startTime = st;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETSELECTEDBTN: set btn that was selected and add to btn array
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setSelectedBtn(btn) {
	a.push(btn);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FORMATTIMEANDDATE: format all date and time information for better reading
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function formatTimeAndDate() {
	var date = new Date();
	var endTime = [date.getHours(),date.getMinutes(),date.getSeconds()];
	
	//PLACE ALL DATE/TIME COMPONENTS INTO SINGLE ARRAY
	var allObj = [];
	
	for(var i = 0; i < startDate.length; i++) {
		allObj.push(startDate[i]);
	}
	
	for(var i = 0; i < startTime.length; i++) {
		allObj.push(startTime[i]);
	}
	
	for(var i = 0; i < endTime.length; i++) {
		allObj.push(endTime[i]);
	}
	
	for(var i = 0; i < allObj.length; i++) {
		if(allObj[i] < 10) {
			allObj[i] = "0"+allObj[i];
		}
	}
	
	startDate = allObj[0] + "/" + allObj[1] + "/" + allObj[2];
	startTime = allObj[3] + ":" + allObj[4] + ":" + allObj[5];
	endTime = allObj[6] + ":" + allObj[7] + ":" + allObj[8];
	
	//BUILD ELAPSED TIME
	var elapsedTime;
	
	if(allObj[6]-allObj[3] > 0) {
		if(allObj[6]-allObj[3] < 10)
			elapsedTime = "0" + (allObj[6]-allObj[3]).toString() + ":";
		else
			elapsedTime = allObj[6]-allObj[3] + ":";
	} else {
		elapsedTime = "00:";
	}
	
	if(allObj[7]-allObj[4] > 0) {
		if(allObj[7]-allObj[4] < 10)
			elapsedTime += "0" + (allObj[7]-allObj[4]).toString() + ":";
		else 
			elapsedTime += allObj[7]-allObj[4] + ":";
	} else {
		elapsedTime += "00:";
	}
	
	if(allObj[8]-allObj[5] > 0) {
		if(allObj[8]-allObj[5] < 10)
			elapsedTime += "0" + (allObj[8]-allObj[5]).toString();
		else
			elapsedTime += allObj[8]-allObj[5];
	} else {
		elapsedTime += "00";
	}
	
	//RETURN FULLY FORMATTED DATE AND TIME INFO
	var formatted = [startDate, startTime, endTime, elapsedTime];
	return formatted;
}