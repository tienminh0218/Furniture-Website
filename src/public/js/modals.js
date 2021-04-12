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

////// When user want to login //////
var btnLoginSubmit = modalLoginForm.querySelector('input[type="submit"]');
var loginErrorMessage = modalLoginForm.querySelector(".error-FromServer");

// get nodeElement input in loginForm
var inputLoginForm = modalLoginForm.querySelectorAll("input[name]");
var dataLoginForm = {};

/// when user click Login btn
btnLoginSubmit.addEventListener("click", loginRequest);

/// Request data to login
function loginRequest(e) {
    /// prevent submit form
    e.preventDefault();

    /// Get value form input loginForm
    inputLoginForm.forEach((input) => {
        dataLoginForm[input.name] = input.value.trim();
    });

    /// Request data to login
    requestData("http://localhost:3000/account/login", "post", dataLoginForm)
        .then(function (response) {
            location.reload();
        })
        .catch(function (error) {
            /// check if isError
            if (error.response) {
                var { data } = error.response;
                var messageErrorServer = data.message.replace(/"/g, "");
                loginErrorMessage.innerHTML =
                    messageErrorServer.charAt(0).toUpperCase() +
                    messageErrorServer.slice(1) +
                    " !!!";
            }
        });
}

/// When user want to register
var btnRegisterSubmit = modalRegisterForm.querySelector("input[type=submit]");
var rePassword = modalRegisterForm.querySelector("input[name='password']");
var confirmPassword = modalRegisterForm.querySelector(
    "input[name='confirmPassword']"
);
var reGender = modalRegisterForm.querySelector(".form-select");
var registerErrorMessage = modalRegisterForm.querySelector(".error-FromServer");

// get nodeElement input in loginForm
var inputRegisterForm = modalRegisterForm.querySelectorAll("input[name]");
var dataRegisterForm = {};

/// when user click register btn
btnRegisterSubmit.addEventListener("click", registerRequest);

/// Request data to register
function registerRequest(e) {
    /// prevent submit form
    e.preventDefault();

    /// confirm password
    var isConfirm = rePassword.value !== confirmPassword.value;
    if (rePassword.value.length == 0) {
        registerErrorMessage.innerHTML = "Mật khẩu trống !!!";
        return;
    }
    if (isConfirm) {
        registerErrorMessage.innerHTML = "Mật khẩu không trùng khớp !!!";
        return;
    }

    /// Get value form input registerForm
    inputRegisterForm.forEach((input) => {
        if (input.name !== "confirmPassword")
            dataRegisterForm[input.name] = input.value.trim();
    });

    /// Request data to register
    requestData("http://localhost:3000/account/register", "POST", {
        ...dataRegisterForm,
        gender: reGender.value,
    })
        .then((result) => {
            registerErrorMessage.innerHTML = "Created successfully!!!";
            modalRegisterForm.reset();
        })
        /// error form server
        .catch((error) => {
            /// check if isError
            if (error.response) {
                var { data } = error.response;
                var messageErrorServer = data.message.replace(/"/g, "");
                registerErrorMessage.innerHTML =
                    messageErrorServer.charAt(0).toUpperCase() +
                    messageErrorServer.slice(1) +
                    " !!!";
            }
        });
}
