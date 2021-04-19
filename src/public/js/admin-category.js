var inputcheckItems = document.querySelectorAll('input[type="checkbox"][name="deleteCategory"]');
var inputCheckAll = document.querySelector('input[type="checkbox"][name="checkAll"]');
var btnDelete = document.querySelector(".btn-delete");

/// check if checkAll not null
if (inputCheckAll) {
    inputCheckAll.addEventListener("change", checkedAllInput);
    inputcheckItems.forEach((checkItem) => {
        checkItem.addEventListener("change", isCheckedAll);
    });
}

/// check all input
function checkedAllInput(e) {
    inputcheckItems.forEach((itemCheck) => {
        itemCheck.checked = this.checked;
        if (this.checked) {
            btnDelete.classList.remove("disabled");
        } else {
            btnDelete.classList.add("disabled");
        }
    });
}

/// is all input has checked
function isCheckedAll(e) {
    var inputHasCheck = document.querySelectorAll(
        "input[type='checkbox'][name='deleteCategory']:checked"
    );

    /// check if as least one input has checked
    if (inputHasCheck.length > 0) {
        btnDelete.classList.remove("disabled");
    } else {
        btnDelete.classList.add("disabled");
    }

    /// check is all input has checked
    isAllChecked = inputcheckItems.length === inputHasCheck.length;
    if (isAllChecked) {
        inputCheckAll.checked = true;
    } else {
        inputCheckAll.checked = false;
    }
}
