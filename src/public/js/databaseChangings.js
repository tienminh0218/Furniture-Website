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

<<<<<<< HEAD
    var inputChecked = form.querySelectorAll(
        "input[name='deleteCategory']:checked"
    );
=======
    var inputChecked = form.querySelectorAll("input[name='itemCheck']:checked");
>>>>>>> 1c2b99deae4bde7f628d465abfc0512f01e78817
    inputChecked.forEach((input) => {
        dataArr.push(input.getAttribute("idDatabase"));
    });
    console.log(dataArr);
    elementForm.action = `/admin/${url}/${dataArr}?_method=${method}`;
    elementForm.submit();
}
