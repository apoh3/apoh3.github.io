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
    checkExpandedNavBar();
});

window.addEventListener('DOMContentLoaded', function() {
    checkExpandedNavBar()
});

document.querySelector('.navbar-toggler').addEventListener('click', function() { 
    checkExpandedNavBar()
});

// Expand or collapse details about each item in a section
document.addEventListener('DOMContentLoaded', function() {
    var expandAllListItem = document.querySelector('.nav-item.expand-all');
    var collapseAllListItem = document.querySelector('.nav-item.collapse-all');
    var hiddenDetailsDivs = document.querySelectorAll('.div-hidden-details');

    var sectionResearch = document.querySelector('#research');
    var sectionTeaching = document.querySelector('#teaching');
    var sectionService = document.querySelector('#service');

    expandAllListItem.addEventListener('click', function() {
        sectionResearch.style.fontWeight = 'bold';
        sectionTeaching.style.fontWeight = 'bold';
        sectionService.style.fontWeight = 'bold';

        hiddenDetailsDivs.forEach(function(div) {
            if(div.style.display == 'block') {
                div.style.display = 'none';
                expandAllListItem.style.display = 'block';
                collapseAllListItem.style.display = 'none';
            } else {
                div.style.display = 'block';
                div.style.fontWeight = 'normal';
                expandAllListItem.style.display = 'none';
                collapseAllListItem.style.display = 'block';
            }
        });   
    });

    collapseAllListItem.addEventListener('click', function() {
        sectionResearch.style.fontWeight = 'normal';
        sectionTeaching.style.fontWeight = 'normal';
        sectionService.style.fontWeight = 'normal';

        hiddenDetailsDivs.forEach(function(div) {
            if(div.style.display == 'block') {
                div.style.display = 'none';
                expandAllListItem.style.display = 'block';
                collapseAllListItem.style.display = 'none';
            } else {
                div.style.display = 'block';
                expandAllListItem.style.display = 'none';
                collapseAllListItem.style.display = 'block';
            }
        });
    });
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

// Checks is a link is visible to the user.
function isLinkVisibleInViewport(link) {
    var linkRect = link.getBoundingClientRect();

    return (
        linkRect.top >= 0 &&
        linkRect.left >= 0 &&
        linkRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        linkRect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// If navbar is not expanded amd not all links are visible, shrink font.
function checkExpandedNavBar() {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var links = document.querySelectorAll('.nav-link');
    var isExpanded = false
    var allLinksVisible = true

    if (navbarToggler.offsetParent !== null && navbarToggler.offsetWidth > 0) {
        isExpanded = true
    }

    if (isExpanded == false) {
        links.forEach((link) => {
            if (!isLinkVisibleInViewport(link)) {
              allLinksVisible = false
              return
            }
        });
    }

    if (!isExpanded && !allLinksVisible) {
        links.forEach((link) => {
            link.style.fontSize = '80%'
        });
    } else {
        links.forEach((link) => {
            link.style.fontSize = '100%'
        });
    }

    if (isExpanded) {
        
    }
}