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
                if (error.response) {
                    var { data } = error.response;
                    console.log(data);
                    errorFromServer.innerHTML = data.message;
                }
            });
    }
}
