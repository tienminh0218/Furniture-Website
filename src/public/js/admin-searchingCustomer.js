var inputSearch = document.querySelector("input[type=text]");
var containerSearch = document.querySelector(".container-sreachingItems");
var formatter = new Intl.NumberFormat();
inputSearch.addEventListener("keyup", sreachProducts);

function sreachProducts(e) {
    containerSearch.style.display = "none";
    axios({
        method: "get",
        url: `http://localhost:3001/admin/customer/search?keyword=${this.value.trim()}`,
    })
        .then((response) => {
            let { message } = response.data;
            console.log(message);
            if (message.length === 0) {
                return Promise.reject();
            }

            return Promise.resolve(message);
        })
        .then((customers) => {
            let innerCustomers = "";
            customers.forEach((element) => {
                innerCustomers = innerCustomers.concat(`<a href="/admin/customer/${element.customer.username}" class="card-sreachingItem">
                                        <h3>${element.customer.fullname}</h3>
                                        <span>${element.customer.username}</span>
                                    </a>`);
            });
            containerSearch.innerHTML = innerCustomers;
            containerSearch.style.display = "block";
        })
        .catch((err) => {});
}
