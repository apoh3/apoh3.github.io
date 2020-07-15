/* July 2020 */

var steps = [
    {
        text:"Select how much data you would like to display.",
        element:"monthSelector",
        offsetX:0,
        offsetY:0,
    },
    {
        text:"Hover over data points to see statistics.",
        element:"chartDiv",
        offsetX:-50,
        offsetY:-200,
    },
    {
        text:"step3",
        element:"monthSelector",
        offsetX:0,
        offsetY:0,
    }
];

$(document).ready(function() {
    var stepCnt = 0;

    $('#tourBtn').click(function(e) {
        displayNext(stepCnt);
        stepCnt++;
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

        $("body").append($('<div>').attr("id","tourDiv").append(steps[stepCnt].text).css({position:"absolute",top:yPos,left:xPos}));
    } else if($("#tourDiv")) {
        $("#tourDiv").remove();
    }
}

