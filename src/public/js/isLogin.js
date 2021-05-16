/// When user logged
var userExist = document.querySelector(".userExist");
var containerUser = document.querySelector(".container-user");
var logoutUser = document.querySelector(".logoutUser");
var adminUser = document.querySelector(".adminUser");

// check user logged
if (userExist) {
    userExist.onmouseover = toggleDialog;
    userExist.onmouseout = toggleDialog;
    logoutUser.addEventListener("click", eraseCookie);
    adminUser.addEventListener(
        "click",
        () => (window.location.href = "http://localhost:3001/admin")
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
    location.href = " http://localhost:3001";
}
