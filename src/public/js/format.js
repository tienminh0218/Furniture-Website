/// format number
var priceItemCarts = document.querySelectorAll(".priceItem p");
var formatter = new Intl.NumberFormat();

priceItemCarts.forEach((priceItemCart) => {
    formated = formatter.format(+priceItemCart.innerHTML.replace("đ", ""));
    priceItemCart.innerHTML = `${formated}`;
});
