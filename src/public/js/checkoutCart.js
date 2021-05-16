var formatter = new Intl.NumberFormat();
var priceProducts = document.querySelectorAll(".item-checkout p:last-child");
var checkout = document.querySelector(".confirm-checkoutCart");
var formCheckout = document.querySelector(".container-inforCustomer");
var inputs = formCheckout.querySelectorAll("input[name]");
var descriptionOrder = formCheckout.querySelector("textarea");
var errorFromServer = formCheckout.querySelector("error-FromServer");

// modal
var modelConfirm = document.querySelector(".modalOverplay-paymentConfirm");
var modelSuccessPayment = document.querySelector(".modalOverplay-successfulPayment");
var closeModal = modelConfirm.querySelector(".btn-close");
var acceptPayment = modelConfirm.querySelector(".btn-confirm");

// denied payment
closeModal.addEventListener("click", () => {
    modelConfirm.classList.remove("active");
});

priceProducts.forEach((element) => {
    element.innerHTML = `${formatter.format(element.innerHTML)} đ`;
});

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

// addEventListener
checkout.addEventListener("click", confirmPayment);
acceptPayment.addEventListener("click", paymentProgress);

function confirmPayment(e) {
    modelConfirm.classList.add("active");
}

function paymentProgress() {
    // disable confirm
    modelConfirm.classList.add("disabled");

    /// clear message
    clearErrorMessage(formCheckout);

    /// get data
    let data = {};
    data[descriptionOrder.name] = descriptionOrder.value.trim();
    inputs.forEach((input) => {
        data[input.name] = input.value.trim();
    });

    axios({
        method: "post",
        url: `http://localhost:3001/cart/checkoutOrder`,
        data,
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            modelConfirm.classList.remove("active");
            modelSuccessPayment.classList.add("active");
            setTimeout(() => (window.location.href = "http://localhost:3001"), 3000);
        })
        .catch((err) => {
            modelConfirm.classList.remove("active");
            showErrorMessage(err, formCheckout, errorFromServer);
        });
}
