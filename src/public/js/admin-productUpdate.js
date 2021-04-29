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
var formProductUpdate = document.querySelector(".products-container");
var params = new URLSearchParams(window.location.search);
var idProduct = params.get("id");
/// Check if formProductUpdate not null
if (formProductUpdate) {
    var btnSubmitProduct = formProductUpdate.querySelector('input[type="submit"]');
    var inputTypeFile = formProductUpdate.querySelector('input[type="file"]');
    var errorFromServer = formProductUpdate.querySelector(".error-FromServer");
    var loadingScreen = document.querySelector(".modal-overplay-loading");

    // get nodeElement select in productInsertForm
    var selectProductForm = formProductUpdate.querySelectorAll(".form-select");

    // get nodeElement input in productInsertForm
    var inputProductForm = formProductUpdate.querySelectorAll("input[name]");

    btnSubmitProduct.addEventListener("click", updateProduct);

    function updateProduct(e) {
        e.preventDefault();

        /// loading screen
        loadingScreen.classList.add("displayBlock");

        /// check message
        clearErrorMessage(formProductUpdate);

        const formData = new FormData();
        formData.append("imageProduct", inputTypeFile.files[0]);
        formData.append("id", idProduct);

        /// get value select and add to dataProductForm
        selectProductForm.forEach((select) => {
            formData.append(select.name, select.value);
        });

        /// get value input type name and add to dataProductForm
        inputProductForm.forEach((input) => {
            formData.append(input.name, input.value.trim());
        });
        axios({
            method: "put",
            url: `http://localhost:3001/admin/product/update`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                loadingScreen.classList.remove("displayBlock");
                // formProductUpdate.closest(".formCategory").reset();
                //  nodeCkedit.innerHTML = "";
                Object.assign(errorFromServer.style, {
                    color: "#0f5132",
                    display: "block",
                    backgroundColor: "#d1e7dd",
                });
                errorFromServer.innerHTML = response.data.message;
            })
            .catch((error) => {
                loadingScreen.classList.remove("displayBlock");
                showErrorMessage(error, formProductUpdate, errorFromServer);
            });
    }
}
