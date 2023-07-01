let backToTopBtn = document.getElementById("btn-back-to-top");
let titleColElements = document.getElementsByClassName('col-title');
let infoColElements = document.getElementsByClassName('col-info');

window.onscroll = function () { scrollFunction() };
window.addEventListener('load', adjustColumns);
window.addEventListener('resize', adjustColumns);

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