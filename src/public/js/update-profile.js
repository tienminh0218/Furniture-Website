function clearErrorMessage(form) {
    let errMessNotify = form.querySelectorAll(".error-message");
    let inputs = form.querySelectorAll("input");

    /// clear err from server
    let errFromServer = form.querySelector(".error-FromServer");
    errFromServer.innerHTML = "";
    errFromServer.style.display = "none";

    /// clear err message
    inputs.forEach((input) => {
        input.style.borderColor = "#ccc";
    });
    errMessNotify.forEach((err) => {
        err.innerHTML = "";
    });
}

function showErrorMessage(error, form, errorFromServer) {
    if (error.response) {
        var { data } = error.response;
        if (Array.isArray(data.message)) {
            data.message.forEach((err) => {
                let inputError = form.querySelector(`input[name=${err.path[0]}]`);
                inputError.style.borderColor = "red";
                inputError.closest(".form-group").querySelector(".error-message").innerHTML =
                    err.message;
            });
        } else {
            Object.assign(errorFromServer.style, {
                color: "#842029",
                display: "block",
                backgroundColor: "#f8d7da",
            });
            errorFromServer.innerHTML = data.message;
        }
    }
}

/// update profile
var profileContainer = document.querySelector(".card-bodyInput");
var btnUpdateSubmit = profileContainer.querySelector("input[type=submit]");
var passwordProfile = profileContainer.querySelector("input[name='password']");
var confirmPasswordProfile = profileContainer.querySelector("input[name='confirmPassword']");
var genderProfile = profileContainer.querySelector(".form-select");
var profileErrorMessage = profileContainer.querySelector(".error-FromServer");
var inputTypeFile = document.querySelector("#image-product");

// get nodeElement input in loginForm
var inputProfileForm = profileContainer.querySelectorAll("input[name]");

/// when user click register btn
btnUpdateSubmit.addEventListener("click", updateProfileUser);

/// Request data to register
function updateProfileUser(e) {
    /// prevent submit form
    e.preventDefault();

    // clear error
    clearErrorMessage(profileContainer);

    const formData = new FormData();
    formData.append("imageUser", inputTypeFile.files[0]);
    formData.append("gender", genderProfile.value);

    /// check is empty password
    if (passwordProfile.value.length == 0) {
        Object.assign(profileErrorMessage.style, {
            color: "#842029",
            display: "block",
            backgroundColor: "#f8d7da",
        });
        profileErrorMessage.innerHTML = "Password should not be empty";
        return;
    }

    /// confirm password
    var isConfirm = passwordProfile.value !== confirmPasswordProfile.value;
    if (isConfirm) {
        Object.assign(profileErrorMessage.style, {
            color: "#842029",
            display: "block",
            backgroundColor: "#f8d7da",
        });
        profileErrorMessage.innerHTML = "Your confirm password is incorrect";
        return;
    }

    /// Get value form input registerForm
    inputProfileForm.forEach((input) => {
        if (input.name !== "confirmPassword") formData.append(input.name, input.value.trim());
    });
    // console.log(inputProfileForm);
    // console.log(dataProfileForm);

    /// Request data to register
    axios({
        method: "patch",
        url: `http://localhost:3001/account/profile`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((result) => {
            Object.assign(profileErrorMessage.style, {
                color: "#155724",
                display: "block",
                backgroundColor: "#d1e7dd",
            });
            console.log(result);
            profileContainer.closest(".registerFormParent").reset();
            profileErrorMessage.innerHTML = result.data.message;
        })
        /// error form server
        .catch((error) => {
            var { data } = error.response;
            console.log(data);

            /// check if isError
            showErrorMessage(error, profileContainer, profileErrorMessage);
        });
}
