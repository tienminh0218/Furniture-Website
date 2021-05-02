var priceProducts = document.querySelectorAll(".pricePreItem-cartDetails");
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
        .then((data) => {
            parent.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}
