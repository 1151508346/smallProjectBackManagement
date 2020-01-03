function instanceName(checkStr){
   // var Rex = /^[a-zA-Z][a-zA-Z0-9_!@#$%^&*]*$/;
    // var Rex = /^[a-zA-Z0-9_]*$/;
    var Rex = /^[a-zA-z][a-zA-Z0-9_]*$/
    var result;
    if(checkStr.match(Rex))
    {
        result = true
    } else{
        result = false;
    }
    return result;
}

function passwordCheckout(checkStr)
{
    var Rex = "^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{8,20}$";
    var result;
    if(checkStr.match(Rex))
    {
        result = true
    } else{
        result = false;
    }

    return result;
}
function emailCheckout (checkStr){
    var email = checkStr;
    var result;
    // var Rex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var Rex = /^([a-zA-Z]|[0-9])(\w|\-)+@uxsino+\.com$/;

    if(Rex.test(email)){
        result = true
    }else{
        result =  false;
    }
    return result;
}

export  {instanceName,passwordCheckout,emailCheckout};
