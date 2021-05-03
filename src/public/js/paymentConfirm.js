var priceProducts = document.querySelectorAll(".pricePreItem-cartDetails");
var priceProductUpdated = document.querySelector(".totalPrice-cartDetails p:last-child");
var quantityProductUpdated = document.querySelector(".totalQuantity-cartDetails p:last-child");
var minBtns = document.querySelectorAll(".btn-decrease");
var plusBtns = document.querySelectorAll(".btn-increase");

// btn increase and decrease
plusBtns.forEach((plusBtn) => {
    plusBtn.onclick = function (e) {
        let inputQuantity = e.target
            .closest(".priceInput-cartDetails")
            .querySelector('input[type="number"]');
        inputQuantity.value++;
    };
});

minBtns.forEach((minBtn) => {
    minBtn.onclick = function (e) {
        let inputQuantity = e.target
            .closest(".priceInput-cartDetails")
            .querySelector('input[type="number"]');
        if (!(inputQuantity.value < 2)) inputQuantity.value--;
    };
});

var formatter = new Intl.NumberFormat();

priceProducts.forEach((priceProduct) => {
    formated = formatter.format(+priceProduct.innerHTML.replace("đ", ""));
    priceProduct.innerHTML = `${formated} đ`;
});

/// delete product
var btnDeletes = document.querySelectorAll(".deleteItem-cartDetails");
btnDeletes.forEach((btnDelete) => {
    btnDelete.addEventListener("click", deleteProduct);
});

var parentNode = document.querySelector(".items-cartDetails");
function deleteProduct(e) {
    var id = e.target.getAttribute("idproduct");
    var parent = e.target.closest(".item-cartDetails");
    var priceProduct = parent.querySelector(".pricePreItem-cartDetails");
    var quantityProduct = parent.querySelector(".quantity-cartDetails");

    axios({
        method: "delete",
        url: `http://localhost:3001/cart/${id}`,
        data: {
            priceProduct: +priceProduct.innerHTML.replace("đ", "").replace(/,/g, ""),
            quantityProduct: +quantityProduct.value,
        },
        headers: { "Content-Type": "application/json" },
    })
        .then((result) => {
            var { message } = result.data;
            priceProductUpdated.innerHTML = `${message.totalPrice} đ`;
            quantityProductUpdated.innerHTML = message.totalQuantity;
            parent.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}
