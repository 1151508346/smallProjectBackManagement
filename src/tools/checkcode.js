var code;
function createCode()
{
    code = "";
    var codeLength = 6; //验证码的长度
    var checkCode = document.getElementById("checkCode");
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
    var length = codeChars.length;
        for(var i = 0; i < codeLength; i++)
    {   
        var charNum = Math.floor(Math.random() * length);
        code += codeChars[charNum];
    }
   return   code;
    // if(checkCode)
    // {
    //     checkCode.className = "code";
    //     checkCode.innerHTML = code;
    // }
}
// function validateCode()
// {
//     var result;
//     var inputCode = document.getElementById("validation").value;
//     if(inputCode.length <= 0)
//     {
//         result = 1;
//     }
//     else if(inputCode.toUpperCase() != code.toUpperCase())
//     {
//         d3.select('#validation').property("value","");
//         d3.select("#validation").attr("autofocus",true);
//         createCode();
//         result = 2;
//     }
//     else
//     {
//         result = 3;
//     }
//     return result;
// }

export { createCode };