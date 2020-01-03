import { instanceName, passwordCheckout, emailCheckout } from "./check_info";
import { createCode } from "./checkcode";

var Tools = {
    focusInput(params, _this) {
        /**
         * 传入的参数验证input框是哪个
         * username  : 用户名框
         * password  : 密码框
         * checkcode : 校验码框
         * 获取焦点时，一系列操作
         */
        // console.log(_this);
        if (params == "username") _this.isFocusUser = true;
        if (params == "password") _this.isFocusPass = true;
        if (params == "email") _this.isFocusEmail = true;
        if (params == "checkcode") _this.isFocusCode = true;
        if (params == "emailcheckcode") _this.isFocusCode = true;
    },
    //当用户输入数据时进行校验
    handleInputEvent(value, params, _this){
        if (params == "email") {
            var checkResult = emailCheckout(value);
        }
        if (!checkResult) {
            _this.emailCheckHint = "企业邮箱以@uxsino.com结尾";
            _this.isSendedEmail = false;
        } else {
            if(_this.isStartSendEmail){
                _this.isSendedEmail = true;
            }
            _this.emailCheckHint = "";
        }
    },
    blurInput(value, params, _this) {
        /**
         * 传入的参数验证input框是哪个
         * 失去焦点时，一系列操作
         */
        // var checkResult = instanceName(value);
        if (params == "username") {
            _this.isFocusUser = false;
            var checkResult = instanceName(value);
            if (!checkResult || (params.length <= 4 || params.length >= 20)) {
                _this.usernameCheckHint = "字母、数字、下划线组成，4-20位";
                _this.submitUserInfo.userName = '';
            } else {
                _this.usernameCheckHint = "";
                _this.submitUserInfo.userName = value;
            }

        };
        if (params == "password") {
            _this.isFocusPass = false;
            var checkResult = passwordCheckout(value);
            // console.log(checkResult)
            if (!checkResult || params.length < 8 || params.length > 20) {
                _this.passwordCheckHint = "至少一个字母、数字及特殊字符，8-20位";
                _this.submitUserInfo.userPassword = "";
            } else {
                _this.passwordCheckHint = "";
                _this.submitUserInfo.userPassword = value;
            }
        };
        if (params == "email") {
            _this.isFocusEmail = false;
            var checkResult = emailCheckout(value);
            if (!checkResult) {
                _this.emailCheckHint = "企业邮箱以@uxsino.com结尾";
                _this.isSendedEmail = false;
                _this.submitUserInfo.userEmail = "";
            } else {
                _this.emailCheckHint = "";
                _this.submitUserInfo.userEmail = value
            }
        };
        if (params == "checkcode") {
            _this.isFocusCode = false;
            if (_this.checkCode.toLowerCase() !== value.toLowerCase()) {
                _this.checkCodeCheckHint = "校验码不正确";
                _this.checkCode = createCode();
            } else {
                _this.checkCodeCheckHint = "";
            
            }

        };
        if (params == "emailcheckcode") {
            _this.isFocusCode = false;
            // value 和接收到企业邮箱的验证码进行对比；
            // 6 表示发送个企业邮箱的验证码是六位数
            if (value.length !== 6) {
                _this.sendEmailCodeHint = "验证码不正确";
                // console.log(_this.receiveCode)
            } else {
                _this.sendEmailCodeHint = "";
            }
        }
    },
    //节流处理请求后端发送验证码，每隔60s才能再次发送一次请求
    requestEmailCodeThrottle(_this,loading) {
        _this.isStartSendEmail = false;
        var laterTime = 60 ; //发送邮箱验证码60s后重新发送
        var timer = null;
        _this.isSendedEmail = false;
        _this.brand = laterTime + "(s)";
        clearInterval(timer)
        timer = setInterval(() => {
            if (laterTime > 0) {
                _this.brand = --laterTime + "(s)";
            } else {
                _this.isSendedEmail = true;  
                _this.isStartSendEmail = true;
                _this.brand = "验证码"
                clearInterval(timer);
                if(loading){
                    loading.close();
                }
            }
        }, 1000);
        return timer;
    }
}


export default Tools;
