import {  passwordCheckout } from "./check_info";
export function blurInput(value, params, _this) {
    if (params == "newPassword") {
        // _this.isFocusPass = false;
        var checkResult = passwordCheckout(value);
        // console.log(checkResult)
        if (!checkResult || params.length < 8 || params.length > 20) {
            _this.newpasswordCheckHint = "至少一个字母、数字及特殊字符，8-20位";
        } else {
            _this.newpasswordCheckHint = "";
        }
    }
    if(params == "enterPassword"){
        var checkResult = passwordCheckout(value);
        // console.log(checkResult)
        if (!checkResult || params.length < 8 || params.length > 20) {
            _this.enterpasswordCheckHint = "至少一个字母、数字及特殊字符，8-20位";
        } else {
            _this.enterpasswordCheckHint = "";
        }
    }
}
