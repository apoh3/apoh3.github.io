let back_to_top_btn = document.getElementById("btn-back-to-top");

window.onscroll = function () {
    scrollFunction();
};

back_to_top_btn.addEventListener("click", backToTop);

function scrollFunction() {
    if(window.scrollY > window.innerHeight / 4) {
        back_to_top_btn.style.opacity = "1";
    } else {
        back_to_top_btn.style.opacity = "0";
    }
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}