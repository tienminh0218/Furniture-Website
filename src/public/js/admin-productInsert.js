var inputImage = document.querySelector(".form-control-typeFile");
var imgPreview = document.querySelector(".preview-image img");

if (inputImage) inputImage.addEventListener("change", showPreview);

/// Show image when upload
function showPreview(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        imgPreview.src = src;
        imgPreview.style.display = "block";
    }
}

function clearErrorMessage(form) {
    let errMessNotify = form.querySelectorAll(".error-message");
    form.querySelector(".error-FromServer").innerHTML = "";
    errMessNotify.forEach((err) => {
        err.innerHTML = "";
    });
}

function showErrorMessage(error, form, errorFormServer) {
    if (error.response) {
        var { data } = error.response;
        if (Array.isArray(data.message)) {
            data.message.forEach((err) => {
                let inputError = form.querySelector(`input[name=${err.path[0]}]`);
                inputError.closest(".form-group").querySelector(".error-message").innerHTML =
                    err.message;
            });
        } else {
            errorFormServer.style.color = "red";
            errorFormServer.innerHTML = data.message;
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

    // get nodeElement select in productInsertForm
    var selectProductForm = formProductInsert.querySelectorAll(".form-select");

    // get nodeElement input in productInsertForm
    var inputProductForm = formProductInsert.querySelectorAll("input[name]");

    btnSubmitProduct.addEventListener("click", insertProduct);

    function insertProduct(e) {
        e.preventDefault();

        /// check message
        clearErrorMessage(formProductInsert);

        const formData = new FormData();
        formData.append("imageProduct", inputTypeFile.files[0]);

        /// get value select and add to dataProductForm
        selectProductForm.forEach((select) => {
            formData.append(select.name, select.value);
        });

        /// get value input type name and add to dataProductForm
        inputProductForm.forEach((input) => {
            formData.append(input.name, input.value.trim());
        });

        axios({
            method: "post",
            url: `http://localhost:3001/admin/product/insert`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                location.reload();
            })
            .catch((error) => {
                showErrorMessage(error, formProductInsert, errorFromServer);
            });
    }
}
