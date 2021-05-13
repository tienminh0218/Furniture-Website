var formatter = new Intl.NumberFormat();
var priceProducts = document.querySelectorAll(".item-checkout p:last-child");
var checkout = document.querySelector(".confirm-checkoutCart");
var formCheckout = document.querySelector(".container-inforCustomer");
var inputs = formCheckout.querySelectorAll("input[name]");
var descriptionOrder = formCheckout.querySelector("textarea");
console.log(descriptionOrder);

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

// addEventListener
checkout.addEventListener("click", confirmPayment);
acceptPayment.addEventListener("click", paymentProgress);

function confirmPayment(e) {
    modelConfirm.classList.add("active");
}

function paymentProgress() {
    // disable confirm
    modelConfirm.classList.add("disabled");

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
        .catch((err) => console.log(err));
}
