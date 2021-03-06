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
                color: "red",
                display: "block",
                backgroundColor: "#f8d7da",
            });
            errorFromServer.innerHTML = data.message;
        }
    }
}

var formCategoryInsert = document.querySelector(".categoryProducts-container");
var btnSubmitCategory = document.querySelector('input[type="submit"]');
var errorFromServer = formCategoryInsert.querySelector(".error-FromServer");
var nodeCkedit = formCategoryInsert.querySelector(".ck-content p");
var loadingScreen = document.querySelector(".modal-overplay-loading");

btnSubmitCategory.addEventListener("click", (e) => {
    e.preventDefault();
    clearErrorMessage(formCategoryInsert);

    /// loading screen
    loadingScreen.classList.add("displayBlock");

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
            loadingScreen.classList.remove("displayBlock");
            formCategoryInsert.closest(".formCategory").reset();
            nodeCkedit.innerHTML = "";
            Object.assign(errorFromServer.style, {
                color: "#0f5132",
                display: "block",
                backgroundColor: "#d1e7dd",
            });
            errorFromServer.innerHTML = response.data.message;
        })
        .catch((error) => {
            loadingScreen.classList.remove("displayBlock");
            showErrorMessage(error, formCategoryInsert, errorFromServer);
        });
});
