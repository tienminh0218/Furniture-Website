/// add to shopping cart
var btnAddCart = document.querySelector("#addcart");
var mesSgLogin = document.querySelector(".modalOverplay-mesSuggesLogin");
var quantityProduct = document.querySelector(".input-cart input[type=number]");

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
        mesSgLogin.classList.add("showDisplay");
        setTimeout(() => mesSgLogin.classList.remove("showDisplay"), 1000);
        return;
    }

    axios({
        method: "post",
        url: `http://localhost:3001/cart/add`,
        data: {
            id: idProduct,
            quantity: quantityProduct.value,
        },
        headers: { "Content-Type": "application/json" },
    });
}
