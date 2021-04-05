var btnBack = document.querySelector('.backToTop');

window.onscroll = function () {
    backToTop();
}


function backToTop() { 

    // document.body.scroll for safari , document.documentElement.scrollTop for the rest 

    if (document.body.scroll > 100 || document.documentElement.scrollTop > 100) {
        btnBack.style.display = 'block';
    }
    else {
        btnBack.style.display = 'none';

    }
}