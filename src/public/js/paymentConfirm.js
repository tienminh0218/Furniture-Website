var priceProducts = document.querySelectorAll(".pricePreItem-cartDetails");
var priceProductUpdated = document.querySelector(".totalPrice-cartDetails p:last-child");
var quantityProductUpdated = document.querySelector(".totalQuantity-cartDetails p:last-child");
var minBtns = document.querySelectorAll(".btn-decrease");
var plusBtns = document.querySelectorAll(".btn-increase");
var quantityInCart = document.querySelector(".number-oncart");
var cartBoxItems = document.querySelector(".cartBox-items");
var totalPriceInCart = document.querySelector(".cartBox-totalItem p:last-child");
var confirmOrder = document.querySelector(".btn-confirmOrder");

var formatter = new Intl.NumberFormat();

// btn increase and decrease
plusBtns.forEach((plusBtn) => {
    plusBtn.addEventListener("click", (e) => {
        changeQuantity(e, 1);
    });
});

minBtns.forEach((minBtn) => {
    minBtn.addEventListener("click", (e) => {
        changeQuantity(e, 2);
    });
});

async function changeQuantity(e, option) {
    let parentNodeInput = e.target.closest(".priceInput-cartDetails");
    let inputQuantity = parentNodeInput.querySelector('input[type="number"]');
    let pricePerProduct = parentNodeInput
        .closest(".price-item")
        .querySelector(".pricePreItem-cartDetails");

    if (option === 1) {
        axios({
            method: "patch",
            url: `http://localhost:3001/cart/`,
            data: {
                idProduct: parentNodeInput.getAttribute("id-product"),
                option,
            },
            headers: { "Content-Type": "application/json" },
        })
            .then((data) => {
                inputQuantity.value++;
                let { message } = data.data;
                let itemInCart = "";
                quantityProductUpdated.innerHTML = message.totalQuantity;
                priceProductUpdated.innerHTML = `${formatter.format(message.totalPrice)} đ`;
                quantityInCart.innerHTML = message.totalQuantity;
                totalPriceInCart.innerHTML = `${formatter.format(message.totalPrice)} VNĐ`;

                /// get item in cart
                message.products.forEach((product) => {
                    if (product._id == parentNodeInput.getAttribute("id-product")) {
                        pricePerProduct.innerHTML = `${formatter.format(
                            product.priceProduct * product.quantity
                        )} đ`;
                    }

                    let totalPricePerProduct = product.priceProduct * +product.quantity;
                    let priceProductFormated = formatter.format(totalPricePerProduct);
                    itemInCart = itemInCart.concat(`<div class="itemCart">
                                            <div class="imageItem">
                                                <img src="${product.imageProduct}" alt="">
                                            </div>
                                            <div class="nameItem">
                                                <h4>${product.nameProduct}</h4>
                                            </div>
                                            <div class="priceItem">
                                                <p>${priceProductFormated}</p> <span>đ</span>
                                            </div>
                                        </div>`);
                });
                cartBoxItems.innerHTML = itemInCart;
            })
            .catch((err) => {
                console.log(err);
            });
        return;
    }
    axios({
        method: "patch",
        url: `http://localhost:3001/cart/`,
        data: {
            idProduct: parentNodeInput.getAttribute("id-product"),
            option,
        },
        headers: { "Content-Type": "application/json" },
    })
        .then((data) => {
            inputQuantity.value--;
            let { message } = data.data;
            let itemInCart = "";
            quantityProductUpdated.innerHTML = message.totalQuantity;
            priceProductUpdated.innerHTML = `${formatter.format(message.totalPrice)} đ`;
            quantityInCart.innerHTML = message.totalQuantity;
            totalPriceInCart.innerHTML = `${formatter.format(message.totalPrice)} VNĐ`;
            console.log(message);
            if (inputQuantity.value == 0) {
                inputQuantity.closest(".item-cartDetails").remove();

                // if dont have as least 1 product
                if (message.products.length == 0) {
                    cartBoxItems.innerHTML = `<h3>Chưa có sản phẩm nào</h3>`;
                    confirmOrder.classList.add("disabled-confirmOrder");
                    return;
                }

                /// get item in cart
                message.products.forEach((product) => {
                    let totalPricePerProduct = product.priceProduct * +product.quantity;
                    let priceProductFormated = formatter.format(totalPricePerProduct);
                    itemInCart = itemInCart.concat(`<div class="itemCart">
                                            <div class="imageItem">
                                                <img src="${product.imageProduct}" alt="">
                                            </div>
                                            <div class="nameItem">
                                                <h4>${product.nameProduct}</h4>
                                            </div>
                                            <div class="priceItem">
                                                <p>${priceProductFormated}</p> <span>đ</span>
                                            </div>
                                        </div>`);
                });

                cartBoxItems.innerHTML = itemInCart;
                return;
            }

            /// get item in cart
            message.products.forEach((product) => {
                if (product._id == parentNodeInput.getAttribute("id-product")) {
                    pricePerProduct.innerHTML = `${formatter.format(
                        product.priceProduct * product.quantity
                    )} đ`;
                }

                let totalPricePerProduct = product.priceProduct * +product.quantity;
                let priceProductFormated = formatter.format(totalPricePerProduct);
                itemInCart = itemInCart.concat(`<div class="itemCart">
                                            <div class="imageItem">
                                                <img src="${product.imageProduct}" alt="">
                                            </div>
                                            <div class="nameItem">
                                                <h4>${product.nameProduct}</h4>
                                            </div>
                                            <div class="priceItem">
                                                <p>${priceProductFormated}</p> <span>đ</span>
                                            </div>
                                        </div>`);
            });
            cartBoxItems.innerHTML = itemInCart;
        })
        .catch((err) => {
            console.log(err);
        });
}

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
