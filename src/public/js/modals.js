var closeBtn = document.querySelectorAll('.close-modal');
var clickOpenLoginModal = document.querySelector('.loginModal');
var clickBgModal = document.querySelector('.modal-backgroundColor');
var clickRegister = document.querySelector('.register-suggest');

var mainModal = document.querySelector('.modals');

var modalContainers = document.querySelector('.modal-container');
var modalRegisterForm = document.querySelector('.modal-registerForm');
var modalLoginForm = document.querySelector('.modal-loginForm');


/// Button close modal form
closeBtn.forEach(btnClose => {
    btnClose.addEventListener('click', closeModal)
})

/// Click background to close modal
clickBgModal.addEventListener('click', closeModal)

/// Click open modals
clickOpenLoginModal.addEventListener('click', openModal)

/// Click open register form
clickRegister.addEventListener('click', openRegister)



function openRegister () {
    modalLoginForm.style.display = 'none';
    modalRegisterForm.style.display = 'block';
}

function closeModal() {
    mainModal.style.display = 'none';
    modalRegisterForm.style.display = 'none';
    modalLoginForm.style.display = 'none';
}

function openModal () {
    mainModal.style.display = 'block';
    modalLoginForm.style.display = 'block';
}