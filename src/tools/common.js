// export 


//提示框
function alertHint(_this, title, content) {
   var result =  _this.$alert(content, title, {
        dangerouslyUseHTMLString: true,
        showClose: false,

    });
    return result
}
//loading框
function loadingHint(_this, text) {
    text = text || "loading"
    var loading = _this.$loading({
        lock: true,
        text: text,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
    });
    
    //返回的loading对象，使用loading.close()来关闭loading
    return loading;
}
//设置cookie
function setCookie(cname, cvalue, minutes) {
    // exdays = exdays || 1;// 默认过期时间是5分钟
    minutes = minutes || 5;
    var d = new Date();
    // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    d.setTime(d.getTime()+(minutes*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
//删除cookie
function removeCookie(cname) {
   setCookie(cname,"",-1);
}
//设置sessionStorage
function setSessionStorage(key,value){
    if(typeof key !== "string"){
        key = key.toString();
    }
    
    if(typeof value === "object"){
        JSON.stringify(value);
    }
    if(typeof value !== "string" &&  typeof value !== 'object'){
        value = value.toString();
    }
    if(!sessionStorage.getItem(key)){
        sessionStorage.setItem(key,value)
    }
}
//获取sessionStorage
function getSessionStorage(key){
    if(typeof key !== "string"){
        key = key.toString();
    }
    if(!sessionStorage.getItem(key)){
        return ;
    }
    return sessionStorage.getItem(key);

}
//删除sessionStorage
function removeSessionStorage(key){
    if(typeof key !== "string"){
        key = key.toString();
    }
    if(!sessionStorage.getItem(key)){
        return ;
    }
    sessionStorage.removeItem(key);
    return 1;

}
export default {
    alertHint,
    loadingHint,
    setCookie,
    getCookie,
    removeCookie,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage
}