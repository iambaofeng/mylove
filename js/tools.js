// 自定义元素选择器
function $(sele) {
    var first = sele.substr(0, 1),
        isArr = sele.split("");
    if (first == "#" && isArr.length == 1) {
        return document.getElementById(sele.substr(1));
    } else {
        //ES6 Array.from新方法，把类似数组的对象转换成数组，常用于nodelist集合或函数内保的arguments对象
        var arr = Array.from(document.querySelectorAll(sele));
        return arr.length == 1 ? arr[0] : arr;
    }
}

// 自定义判断有无样式
function hasClass(ele, cls) {

    // ES6 字符串模板字符串，动态字符串用反引号写，变量写在${}中，静态字符串用单引号或反引号写
    var re = new RegExp(`\\b${cls}\\b`);
    if (re.test(ele.className)) {
        return true;
    } else {
        return false;
    }
}


//用来给某个元素添加class
function addClass(ele,cls) {
    if (!hasClass(ele,cls)) {
        ele.className+=` ${cls}`;
    }
     ele.className=ele.className.trim();
}

//用来给某个元素删除class
function removeClass(ele,cls) {
    var re = new RegExp(`\\b${cls}\\b`);
if (hasClass(ele,cls)) {
ele.className=ele.className.replace(re,'').replace(/\s{2}/," ").trim();
} else {

}
}