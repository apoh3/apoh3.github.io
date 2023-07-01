var backToTopBtn = document.getElementById("btn-back-to-top");
var titleColElements = document.getElementsByClassName('col-title');
var infoColElements = document.getElementsByClassName('col-info');
var timeOutFunctionId;

window.onscroll = function () { 
    scrollFunction(); 
};

window.addEventListener('load', function() {
    adjustColumns();
    truncateProfDev();
});

window.addEventListener('resize', function() {
    adjustColumns();

    clearTimeout(timeOutFunctionId);
    timeOutFunctionId = setTimeout(truncateProfDev, 500);
});

backToTopBtn.addEventListener("click", backToTop);

// On scroll, change the opacity of back-to-top button.
function scrollFunction() {
    if(window.scrollY > window.innerHeight / 4) {
        backToTopBtn.style.opacity = "1";
    } else {
        backToTopBtn.style.opacity = "0";
    }
}

// Scroll the page to the top.
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// For tablet view, slightly adjust column sizes.
function adjustColumns() {
    for (var i = 0; i < titleColElements.length; i++) {
        if (window.innerWidth > 768 && window.innerWidth < 992) {
            titleColElements[i].classList.remove('col-md-4');
            titleColElements[i].classList.add('col-md-5');

            infoColElements[i].classList.remove('col-md-8');
            infoColElements[i].classList.add('col-md-7');
        } else {
            titleColElements[i].classList.remove('col-md-5');
            titleColElements[i].classList.add('col-md-4');

            infoColElements[i].classList.remove('col-md-7');
            infoColElements[i].classList.add('col-md-8');
        }
    }
}

// Determine if text is split into more than two lines.
function isOverTwoLines(element) {
    var pdLongElement = document.getElementById('prof-dev-title-long');
    var pdShortElement = document.getElementById('prof-dev-title-short');

    if (pdLongElement.scrollHeight/pdShortElement.scrollHeight >= 4) {
        pdLongElement.style.visibility = "visible"
        pdShortElement.style.visibility = "hidden"
    } else {
        pdShortElement.style.visibility = "visible"
        pdLongElement.style.visibility = "hidden"
    }
}

// Truncate PROFESSIONAL DEVELOPMENT to PROF. DEV. based on screen size.
function truncateProfDev() {
    isOverTwoLines();
    // if (isOverTwoLines()) {
    //     profDevElement.textContent = 'PROF. DEV.';
    // } else {
    //     profDevElement.textContent = 'PROFESSIONAL DEVELOPMENT';
    // }
}