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
    truncateProfDev();
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

// Determine if text should be the long version or short version.
function switchPDText() {
    var pdLongElement = document.getElementById('prof-dev-title-long');
    var pdShortElement = document.getElementById('prof-dev-title-short');

    pdLongElement.style.display = "block" 
    pdShortElement.style.display = "block" 

    console.log(parseFloat(pdLongElement.scrollHeight/pdShortElement.scrollHeight))

    if (parseFloat(pdLongElement.scrollHeight/pdShortElement.scrollHeight) > 3) {
        pdShortElement.style.visibility = "visible"
        pdLongElement.style.visibility = "hidden"
        pdLongElement.style.display = "none" 
    } else {
        pdLongElement.style.visibility = "visible"
        pdShortElement.style.visibility = "hidden"
        pdShortElement.style.display = "none" 
    }
}

// Truncate PROFESSIONAL DEVELOPMENT to PROF. DEV. based on screen size.
function truncateProfDev() {
    switchPDText();
    // if (isOverTwoLines()) {
    //     profDevElement.textContent = 'PROF. DEV.';
    // } else {
    //     profDevElement.textContent = 'PROFESSIONAL DEVELOPMENT';
    // }
}