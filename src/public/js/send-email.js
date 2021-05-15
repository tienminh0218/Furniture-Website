const formSendingMail = document.forms[0];
const btnSends = document.querySelectorAll(".send-mail");
var loadingScreen = document.querySelector(".modal-overplay-loading");

btnSends.forEach((btn) => {
    btn.addEventListener("click", sendingEmail);
});

function sendingEmail(e) {
    /// loading screen
    loadingScreen.classList.add("displayBlock");

    let getId = e.target.getAttribute("id-bill");
    formSendingMail.action = `http://localhost:3001/admin/customer/email/${getId}`;
    formSendingMail.submit();
}
