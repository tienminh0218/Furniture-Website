var closeBtn = document.querySelector('.close-modal');
var modalContainer = document.querySelector('.modals');
var clickModal = document.querySelector('.loginModal');
var clickBgModal = document.querySelector('.modal-backgroundColor');

closeBtn.addEventListener('click', closeModal)

clickBgModal.addEventListener('click', closeModal)

clickModal.addEventListener('click', openModal)

function closeModal() {
    modalContainer.style.display = 'none';
}

function openModal () {
    modalContainer.style.display = 'block';

}