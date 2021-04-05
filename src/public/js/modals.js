var closeBtn = document.querySelectorAll(".close-modal");
var clickOpenLoginModal = document.querySelector(".loginModal");
var clickBgModal = document.querySelector(".modal-backgroundColor");
var registerSuggest = document.querySelector(".register-suggest a");
var loginSuggest = document.querySelector(".login-suggest a");

var mainModal = document.querySelector(".modals");

var modalContainers = document.querySelector(".modal-container");
var modalRegisterForm = document.querySelector(".modal-registerForm");
var modalLoginForm = document.querySelector(".modal-loginForm");

/// Button close modal form
closeBtn.forEach((btnClose) => {
    btnClose.addEventListener("click", closeModal);
});

/// Click background to close modal
clickBgModal.addEventListener("click", closeModal);

/// Click open modals
clickOpenLoginModal.addEventListener("click", openModal);

/// Click change register form
registerSuggest.addEventListener("click", ToggleForm);

loginSuggest.addEventListener("click", ToggleForm);

//// Toggle Form
function ToggleForm() {
    isLoginFormOpen = modalLoginForm.style.display;

    if (isLoginFormOpen == "none") {
        modalLoginForm.style.display = "block";
        modalRegisterForm.style.display = "none";
    } else {
        modalLoginForm.style.display = "none";
        modalRegisterForm.style.display = "block";
    }
}

function closeModal() {
    mainModal.style.display = "none";
    modalRegisterForm.style.display = "none";
    modalLoginForm.style.display = "none";
}

function openModal() {
    mainModal.style.display = "block";
    modalLoginForm.style.display = "block";
}
