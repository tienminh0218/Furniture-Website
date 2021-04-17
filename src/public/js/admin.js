$(".btn").click(function () {
    $(".btn i").toggleClass("rotate-bars");
    $(".sidebar").toggleClass("hide");
    $(".content").toggleClass("expand-content");
});

$(".charts-btn").click(function () {
    $("nav ul .chart-show").toggleClass("show");
    $("nav ul .first").toggleClass("rotate");
});

$(".multi-btn").click(function () {
    $("nav ul .multi-show").toggleClass("show1");
    $("nav ul .second").toggleClass("rotate");
});

$("nav ul li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});

$(".showUser").click(function () {
    $(".showUser .fas").toggleClass("color");
    $(".showNoti .fas").removeClass("color");
    $(".user-dropdown").toggleClass("showUsers");
    $(".noti-dropdown").removeClass("showNotis");
});

$(".showNoti").click(function () {
    $(".showNoti .fas").toggleClass("color");
    $(".showUser .fas").removeClass("color");
    $(".noti-dropdown").toggleClass("showNotis");
    $(".user-dropdown").removeClass("showUsers");
});
