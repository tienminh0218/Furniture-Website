var inputSearch = document.querySelector(".header__mid-left-input");
var containerSearch = document.querySelector(".container-sreachingItems");
var formatter = new Intl.NumberFormat();

inputSearch.addEventListener("keyup", sreachProducts);

function sreachProducts(e) {
    containerSearch.style.display = "none";
    axios({
        method: "get",
        url: `http://localhost:3001/all/search?keyword=${this.value.trim()}`,
    })
        .then((response) => {
            let { message } = response.data;

            if (message.length === 0) {
                return Promise.reject();
            }

            return Promise.resolve(message);
        })
        .then((products) => {
            let innerProduct = "";
            products.forEach((element) => {
                innerProduct = innerProduct.concat(`<a href="/detail?id=${
                    element._id
                }" class="card-sreachingItem">
                                            <img class="image-sreachingItem" src="${
                                                element.imageProduct
                                            }" alt="">
                                            <h3>${element.nameProduct}</h3>
                                            <span>${formatter.format(element.priceProduct)} đ</span>
                                        </a>`);
            });

            containerSearch.innerHTML = innerProduct;
            containerSearch.style.display = "block";
        })
        .catch((err) => {});
}
