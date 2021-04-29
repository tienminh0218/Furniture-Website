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

var formCategoryUpdate = document.querySelector(".categoryProducts-container");
var btnSubmit = formCategoryUpdate.querySelector('input[type="submit"]');
var params = new URLSearchParams(window.location.search);
var idCategory = params.get("id");
var errorFromServer = formCategoryUpdate.querySelector(".error-FromServer");
var nodeCkedit = formCategoryInsert.querySelector(".ck-content p");

// event submit
btnSubmit.addEventListener("click", UpdateCategory);

function UpdateCategory(e) {
    e.preventDefault();
    clearErrorMessage(formCategoryUpdate);
    console.log("okokok");

    axios({
        method: "put",
        url: `http://localhost:3001/admin/category/update`,
        data: {
            nameCategory: formCategoryUpdate.querySelector('input[name="nameCategory"]').value,
            description: dataCkedit.getData(),
            id: idCategory,
        },
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            formCategoryUpdate.closest(".formCategory").reset();
            nodeCkedit.innerHTML = "";
            Object.assign(errorFromServer.style, {
                color: "#0f5132",
                display: "block",
                backgroundColor: "#d1e7dd",
            });
            errorFromServer.innerHTML = response.data.message;
        })
        .catch((error) => {
            showErrorMessage(error, formCategoryUpdate, errorFromServer);
        });
}
