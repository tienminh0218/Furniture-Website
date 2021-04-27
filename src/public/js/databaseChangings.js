function databaseChangings(form, url, btn, method) {
    var containerForm = document.querySelector(form);
    var elementForm = document.forms[0];
    var btnSubmit = containerForm.querySelector(btn);
    method = method.toUpperCase();
    /// do something :)))
    btnSubmit.addEventListener("click", () => submitRequest(containerForm, elementForm, method, url));
}

function submitRequest(form, elementForm, method, url) {
    var dataArr = [];

    var inputChecked = form.querySelectorAll("input[name='itemCheck']:checked");
    inputChecked.forEach((input) => {
        dataArr.push(input.getAttribute("idDatabase"));
    });
    elementForm.action = `/admin/${url}/${dataArr}?_method=${method}`;
    elementForm.submit();
}
