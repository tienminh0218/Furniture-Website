/// Axios
function requestData(url, method = "GET", data) {
    return axios({
        method,
        url,
        data,
    });
}

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
if (clickOpenLoginModal)
    clickOpenLoginModal.addEventListener("click", openModal);

/// Click change register form
textSuggest.forEach((txtSuggest) => {
    txtSuggest.addEventListener("click", ToggleForm);
});

//// Toggle Form
function ToggleForm() {
    /// check status login form is open or not
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

///// Open form at the first time
function openModal() {
    mainModal.style.display = "block";
    modalLoginForm.style.display = "block";
}

////// When user want to login
var btnLoginSubmit = modalLoginForm.querySelector('input[type="submit"]');
var username = modalLoginForm.querySelector('input[name="username"]');
var password = modalLoginForm.querySelector('input[name="password"]');
var errorNode = modalLoginForm.querySelector(".error-FromServer");

/// when user click Login btn
btnLoginSubmit.addEventListener("click", loginRequest);

function loginRequest(e) {
    /// prevent submit form
    e.preventDefault();

    /// Request data to login
    requestData("http://localhost:3000/account/login", "post", {
        username: username.value,
        password: password.value,
    })
        .then(function (response) {
            location.reload();
        })
        .catch(function (error) {
            var { data } = error.response;
            errorNode.innerHTML = data.message;
        });
}

/// When user want to register
var btnRegisterSubmit = modalRegisterForm.querySelector("input[type=submit]");
var reFullname = modalRegisterForm.querySelector("input[name='fullname']");
var reUsername = modalRegisterForm.querySelector(
    "input[name='RegisterUsername']"
);
var rePassword = modalRegisterForm.querySelector(
    "input[name='RegisterPassword']"
);
var confirmPassword = modalRegisterForm.querySelector(
    "input[name='reRegisterPassword']"
);
var rePhoneNumber = modalRegisterForm.querySelector(
    "input[name='phonenumber']"
);
var reGender = modalRegisterForm.querySelector(".form-select");
var reAddress = modalRegisterForm.querySelector("input[name='address']");
var reErrorMessage = modalRegisterForm.querySelector(".error-FromServer");

/// when user click register btn
btnRegisterSubmit.addEventListener("click", registerRequest);

function registerRequest(e) {
    /// prevent submit form
    e.preventDefault();

    /// confirm password
    var isConfirm = rePassword.value !== confirmPassword.value;
    if (rePassword.value.length == 0) {
        reErrorMessage.innerHTML = "Mật khẩu trống";
        return;
    }
    if (isConfirm) {
        reErrorMessage.innerHTML = "Mật khẩu không trùng khớp";
        return;
    }

    /// Request data to register
    requestData("http://localhost:3000/account/register", "POST", {
        username: reUsername.value,
        password: rePassword.value,
        fullname: reFullname.value,
        phonenumber: rePhoneNumber.value,
        gender: reGender.value,
        address: reAddress.value,
    })
        .then((result) => {
            console.log(2);
            modalRegisterForm.reset();
            reErrorMessage.innerHTML = result.data.message;
        })
        .catch((error) => {
            console.log(1);
            var { data } = error.response;
            reErrorMessage.innerHTML = data.message;
        });
}
