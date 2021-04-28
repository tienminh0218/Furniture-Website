function clearErrorMessage(form) {
    let errMessNotify = form.querySelectorAll(".error-message");
    let inputs = form.querySelectorAll("input");
    form.querySelector(".error-FromServer").innerHTML = "";
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
            errorFromServer.style.color = "red";
            errorFromServer.innerHTML = data.message;
        }
    }
}

var formCategoryInsert = document.querySelector(".categoryProducts-container");
var btnSubmitCategory = document.querySelector('input[type="submit"]');
var errorFromServer = formCategoryInsert.querySelector(".error-FromServer");
btnSubmitCategory.addEventListener("click", () => {
    clearErrorMessage(formCategoryInsert);

    axios({
        method: "post",
        url: `http://localhost:3001/admin/category/insert`,
        data: {
            nameCategory: formCategoryInsert.querySelector('input[name="nameCategory"]').value,
            description: dataCkedit.getData(),
        },
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            errorFromServer.style.color = "green";
            errorFromServer.innerHTML = response.data.message;
        })
        .catch((error) => {
            // loadingScreen.classList.remove("displayBlock");
            showErrorMessage(error, formCategoryInsert, errorFromServer);
        });
});
