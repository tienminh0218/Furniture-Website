var mainModal = document.querySelector(".modals");
var clickOpenLoginModal = document.querySelector(".loginModal");
var closeBtn = document.querySelectorAll(".close-modal");

/// Background Modal
var clickBgModal = document.querySelector(".modal-backgroundColor");

/// Suggest toggle form
var textSuggest = document.querySelectorAll(".text-suggest a");

/// Form
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
textSuggest.forEach((txtSuggest) => {
    txtSuggest.addEventListener("click", ToggleForm);
});

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

//// Click button X to close form
function closeModal() {
    mainModal.style.display = "none";
    modalRegisterForm.style.display = "none";
    modalLoginForm.style.display = "none";
}

///// Open form for the first time
function openModal() {
    mainModal.style.display = "block";
    modalLoginForm.style.display = "block";
}
