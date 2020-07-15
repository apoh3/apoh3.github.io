/* July 2020 */

var stepCnt = 0;
var steps = [
    {
        text:"Select how much data you would like to display.",
        element:"monthSelector",
        offsetX:0,
        offsetY:0,
        side:"left"
    },
    {
        text:"Hover over data points to see statistics. The visualization was created with D3.js.",
        element:"chartDiv",
        offsetX:-50,
        offsetY:-200,
        side:"left"
    },
    {
        text:"This is the tool for altering the visualization's data and display...",
        element:"optionsDiv",
        offsetX:+10,
        offsetY:10,
        side:"right"
    },
    {
        text:"Select chart type.",
        element:"firstDiv",
        offsetX:0,
        offsetY:-5,
        side:"right"
    },
    {
        text:"Select percentage of data to be randomly removed/imputed.",
        element:"secondDiv",
        offsetX:0,
        offsetY:-5,
        side:"right"
    },
    {
        text:"Select visualization method. Highlight, downplay, and annotate methods impute values for removed data.",
        element:"thirdDiv",
        offsetX:0,
        offsetY:0,
        side:"right"
    },
    {
        text:"Any imputed value can be changed by the user by selecting and dragging the point/bar.",
        element:"chartDiv",
        offsetX:-50,
        offsetY:-200,
        side:"left"
    },
    {
        text:"You can swap between chart types to see how the visualization technique differs.",
        element:"firstDiv",
        offsetX:0,
        offsetY:-5,
        side:"right"
    },
    {
        text:"Tour complete. Have fun!",
        element:"chartDiv",
        offsetX:-50,
        offsetY:-200,
        side:"left"
    }
];

$(document).ready(function() {
    $('#tourBtn').click(function() {
        if(!$('#tourDiv').length) {
            displayNext(0);
        } else {
            displayNext(10);
        }
    });
});

function displayNext(stepCnt) {
    if(steps[stepCnt]) {
        if(stepCnt > 0) {
            $("#tourDiv").remove();
        }

        var el = document.getElementById(steps[stepCnt].element);
		var rect = el.getBoundingClientRect();
		var xPos = rect.right + steps[stepCnt].offsetX;
        var yPos = rect.bottom + steps[stepCnt].offsetY;

        if(steps[stepCnt].side === "left" && stepCnt == steps.length-1)
            $("body").append($('<div>').attr("id","tourDiv").append(steps[stepCnt].text + "<br>(click to end tour)").css({position:"absolute",top:yPos,left:xPos,"border-top-left-radius":"0"}));
        else if(steps[stepCnt].side === "left")
            $("body").append($('<div>').attr("id","tourDiv").append(steps[stepCnt].text + "<br>(click for next)").css({position:"absolute",top:yPos,left:xPos,"border-top-left-radius":"0"}));
        else {
            xPos -= el.clientWidth*2;

            if(steps[stepCnt].element === "optionsDiv")
                yPos = rect.top + steps[stepCnt].offsetY;

            $("body").append($('<div>').attr("id","tourDiv").append(steps[stepCnt].text + "<br>(click for next)").css({position:"absolute",top:yPos,left:xPos,"border-top-right-radius":"0"}));
        }

        $('#tourDiv').click(function() {displayNext(stepCnt);});

        stepCnt++;
    } else if($("#tourDiv")) {
        $("#tourDiv").remove();
        stepCnt = 0;
    }
}

