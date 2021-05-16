/// Add to shopping cart ///

// messages
var mesSgLogin = document.querySelector(".modalOverplay-mesSuggesLogin");
var mesAddSuccess = document.querySelector(".modalOverplay-addCartSuccess");
var mesAddUnsuccess = document.querySelector(".modalOverplay-addCartUnsuccess");

// shopping cart
var btnAddCart = document.querySelector("#addcart");
var cartBoxItems = document.querySelector(".cartBox-items");
var totalPriceInCart = document.querySelector(".cartBox-totalItem p:last-child");
var quantityProduct = document.querySelector(".input-cart input[type=number]");
var paymentInCart = document.querySelector(".cartBox-totalItem a:last-child");

// btn increase, decrease
var totalQuantityInCart = document.querySelector(".number-oncart");
var plusBtn = document.querySelector("#max-btncart");
var minBtn = document.querySelector("#min-btncart");
var formatter = new Intl.NumberFormat();
plusBtn.onclick = function () {
    quantityProduct.value++;
};

minBtn.onclick = function () {
    if (!(quantityProduct.value < 2)) quantityProduct.value--;
};
/// when user click btn add to cart
btnAddCart.addEventListener("click", addToCart);

//get id in url
var params = new URLSearchParams(window.location.search);
var idProduct = params.get("id");

/// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

/// add product to cart
function addToCart() {
    var cookie = getCookie("token");
    if (!cookie) {
        mesSgLogin.classList.add("active");
        setTimeout(() => mesSgLogin.classList.remove("active"), 1000);
        return;
    }

    /// show message add to cart unsuccess
    if (!(+quantityProduct.value > 0)) {
        mesAddUnsuccess.classList.add("active");
        setTimeout(() => mesAddUnsuccess.classList.remove("active"), 1000);
        return;
    }

    /// add disable
    btnAddCart.classList.add("disabledBtn");

    axios({
        method: "post",
        url: `http://localhost:3001/cart/add`,
        data: {
            id: idProduct,
            quantity: quantityProduct.value,
        },
        headers: { "Content-Type": "application/json" },
    })
        .then((data) => {
            /// remove disable
            btnAddCart.classList.remove("disabledBtn");
            paymentInCart.classList.remove("disabled-cart");
            let { message } = data.data;
            let itemInCart = "";

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

            /// add html
            let totalPriceProduct = formatter.format(message.totalPrice);
            totalQuantityInCart.innerHTML = message.totalQuantity;
            totalPriceInCart.innerHTML = `${totalPriceProduct} VNĐ`;
            cartBoxItems.innerHTML = itemInCart;

            /// message add success
            mesAddSuccess.classList.add("active");
            setTimeout(() => mesAddSuccess.classList.remove("active"), 1000);
        })
        .catch((err) => {
            if (err.response) console.log(err);

            /// remove disable
            btnAddCart.classList.remove("disabledBtn");
        });
}
