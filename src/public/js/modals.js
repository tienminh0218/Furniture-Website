var closeBtn = document.querySelector('.close-modal');
var clickOpenLoginModal = document.querySelector('.loginModal');
var clickBgModal = document.querySelector('.modal-backgroundColor');
var clickRegister = document.querySelector('.register-suggest');

var mainModal = document.querySelector('.modals');

var modalContainers = document.querySelector('.modal-container');
var modalRegisterForm = document.querySelector('.modal-registerForm');
var modalLoginForm = document.querySelector('.modal-loginForm');


closeBtn.addEventListener('click', closeModal)

clickBgModal.addEventListener('click', closeModal)

clickOpenLoginModal.addEventListener('click', openModal)

clickRegister.addEventListener('click', openRegister)



function openRegister () {
    modalLoginForm.style.visibility = 'hidden';
    modalRegisterForm.style.visibility = 'visible';

}

function closeModal() {
    mainModal.style.display = 'none';
}

function openModal () {
    mainModal.style.display = 'block';
    modalLoginForm.style.visibility = 'visible';
}