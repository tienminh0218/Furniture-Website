function formDetele(form) {
    var containerForm = document.querySelector(form);
    var deleteForm = document.forms[0];
    console.log(deleteForm);
    var btnDeleteSubmit = containerForm.querySelector(".btn-delete");

    /// do something :)))
    btnDeleteSubmit.addEventListener("click", () => deleteSomething(containerForm, deleteForm));
}

function deleteSomething(form, deleteForm) {
    var dataArr = [];
    var inputChecked = form.querySelectorAll("input[name='deleteCategory']:checked");
    inputChecked.forEach((input) => {
        dataArr.push(input.getAttribute("idProduct"));
    });
    deleteForm.action = `/admin/product/${dataArr}?_method=DELETE`;
    deleteForm.submit();
}
