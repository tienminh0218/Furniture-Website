var counter = 1;
// setInterval(function(){
// 	document.getElementById('radio' + counter).checked = true;
// 	counter++;
// 	if(counter > 3){
// 		counter = 1;
// 	}
// },5000);

const prevbtn = document.querySelector("#prevbtn");
const nextbtn = document.querySelector("#nextbtn");

if (nextbtn) {
    nextbtn.addEventListener("click", () => {
        document.getElementById("radio" + counter).checked = true;
        counter++;
        if (counter > 3) {
            counter = 1;
        }
    });

    prevbtn.addEventListener("click", () => {
        counter--;
        if (counter < 1) {
            counter = 3;
        }
        document.getElementById("radio" + counter).checked = true;
    });
}

document.getElementById("click-bars").addEventListener("click", function () {
    document.getElementById("click-bars").style.color = "cyan";
});

// detail
function decreaseCart() {
    document.getElementById("cart-quantity").value -= 1;
    var x = document.getElementById("cart-quantity");
    if (x.value < 1) {
        x.value = 1;
    }
}

function increaseCart() {
    document.getElementById("cart-quantity").value++;
}

function myFunction() {
    document.getElementById("active").style.display = "block";
    document.getElementById("active2").style.display = "none";
    document.getElementById("active3").style.display = "none";
}

function myFunction2() {
    document.getElementById("active").style.display = "none";
    document.getElementById("active2").style.display = "block";
    document.getElementById("active3").style.display = "none";
}

function myFunction3() {
    document.getElementById("active").style.display = "none";
    document.getElementById("active2").style.display = "none";
    document.getElementById("active3").style.display = "block";
}

// slide img detail
function slideImgRight() {
    document.getElementById("detail-slideimg").style.marginLeft = "0%";
    document.getElementById("detail-slideimg").style.transition = "ease-in 0.5s";
    document.getElementById("imgSlideone").style.border = "1px solid black";
    document.getElementById("imgSlidetwo").style.border = "none";
}

function slideImgLeft() {
    document.getElementById("detail-slideimg").style.marginLeft = "-100%";
    document.getElementById("detail-slideimg").style.transition = "ease-in 0.5s";
    document.getElementById("imgSlidetwo").style.border = "1px solid black";
    document.getElementById("imgSlideone").style.border = "none";
}
