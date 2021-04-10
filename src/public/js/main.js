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

function addCart() {
    var getQuantity = document.getElementById("cart-quantity");
    var getQuantityNumber = getQuantity.valueAsNumber;
    var getQuantityCart = document.getElementById("numberOnCart");
    var sum = getQuantityNumber + Number(getQuantityCart.innerHTML);
    getQuantityCart.innerHTML = sum;
    // console.log(sum);
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

/// When user logged
var userExist = document.querySelector(".userExist");
var containerUser = document.querySelector(".container-user");
var logoutUser = document.querySelector(".logoutUser");
var adminUser = document.querySelector(".adminUser");

// check user logged
if (userExist && containerUser) {
    userExist.onmouseover = toggleDialog;
    userExist.onmouseout = toggleDialog;
    logoutUser.addEventListener("click", eraseCookie);
    adminUser.addEventListener(
        "click",
        () => (window.location.href = "http://localhost:3000/admin")
    );
}

/// toggle dialog
function toggleDialog(e) {
    containerUser.classList.toggle("showDisplay");
}

/// delete cookie
function eraseCookie() {
    console.log(logoutUser);
    document.cookie = "token" + "=; Max-Age=0";
    location.reload();
}
