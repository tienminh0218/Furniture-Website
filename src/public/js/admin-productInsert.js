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

/// When user want to insert a new product
var formProductInsert = document.querySelector(".products-container");

/// Check if formProductInsert not null
if (formProductInsert) {
    var btnSubmitProduct = formProductInsert.querySelector('input[type="submit"]');
    var inputTypeFile = formProductInsert.querySelector('input[type="file"]');
    var errorFromServer = formProductInsert.querySelector(".error-FromServer");
    var loadingScreen = document.querySelector(".modal-overplay-loading");

    // get nodeElement select in productInsertForm
    var selectProductForm = formProductInsert.querySelectorAll(".form-select");

    // get nodeElement input in productInsertForm
    var inputProductForm = formProductInsert.querySelectorAll("input[name]");

    btnSubmitProduct.addEventListener("click", insertProduct);

    function insertProduct(e) {
        e.preventDefault();

        /// loading screen
        loadingScreen.classList.add("displayBlock");

        /// check message
        clearErrorMessage(formProductInsert);
        const formData = new FormData();
        formData.append("imageProduct", inputTypeFile.files[0]);
        formData.append("descriptionProduct", dataCkedit.getData());

        /// get value select and add to dataProductForm
        selectProductForm.forEach((select) => {
            formData.append(select.name, select.value);
        });

        /// get value input type name and add to dataProductForm
        inputProductForm.forEach((input) => {
            if (input.name !== "descriptionProduct")
                formData.append(input.name, input.value.trim());
        });

        axios({
            method: "post",
            url: `http://localhost:3001/admin/product/insert`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                loadingScreen.classList.remove("displayBlock");
                window.location.href = "/admin/product";
            })
            .catch((error) => {
                loadingScreen.classList.remove("displayBlock");
                showErrorMessage(error, formProductInsert, errorFromServer);
            });
    }
}
