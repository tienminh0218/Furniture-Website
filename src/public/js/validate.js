function Validator(formSelector) {
    /// obj chưa các rule
    var formRules = {};
    var formElement = document.querySelector(formSelector);
    var _this = this;

    // Các rules
    var validatorRules = {
        require: function (value) {
            return value ? undefined : "Vui lòng nhập dòng này";
        },
        email: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : "Vui lòng nhập đúng email";
        },
        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : `Vui lòng nhập ${min} kí tự`;
            };
        },
    };

    //Xử lý khi đúng định dạng form
    if (formElement) {
        var inputs = formElement.querySelectorAll("[name][rules]");

        for (let input of inputs) {
            var rules = input.getAttribute("rules").split("|");

            for (let rule of rules) {
                var isRuleHasValue = rule.includes(":");
                var ruleValue = rule.split(":");

                if (isRuleHasValue) {
                    rule = ruleValue[0];
                }

                var ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleValue[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // Event lắng nghe các sự kiện
            input.onblur = handleValidate;

            // Event khi oninput
            input.oninput = handleClear;
        }
    }

    // Event kiểm tra khi submit
    formElement.onsubmit = handleSubmit;

    // Hàm xử kiểm tra khi submit
    function handleSubmit(event) {
        event.preventDefault();

        var inputs = formElement.querySelectorAll("[name][rules]");
        var errorMessage;
        var isValid = true;
        var formValue = {};
        for (let input of inputs) {
            var isInputValid = handleValidate({
                target: input,
            });

            if (!isInputValid) {
                isValid = false;
            } else {
                formValue[input.name] = input.value;
            }
        }

        if (isValid) {
            if (typeof _this.onSubmit === "function") {
                _this.onSubmit(formValue);
            } else {
                formElement.submit();
            }
        } else {
            console.log(" có loi");
        }
    }

    // Hàm xử lí oninput
    function handleClear(event) {
        var errorElement = event.target
            .closest(".form-group")
            .querySelector(".error-message");

        if (event.target.classList.contains("invalid")) {
            errorElement.innerText = "";
            event.target.classList.remove("invalid");
        }
    }

    // Hàm xử lý validate
    function handleValidate(event) {
        var rules = formRules[event.target.name];
        var errorMessage;

        for (let i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](event.target.value);
            if (errorMessage) break;
        }

        // Nếu có lỗi
        if (errorMessage) {
            var errorElement = event.target
                .closest(".form-group")
                .querySelector(".error-message");

            errorElement.innerText = errorMessage;
            event.target.classList.add("invalid");
        }

        return !errorMessage;
    }
}
