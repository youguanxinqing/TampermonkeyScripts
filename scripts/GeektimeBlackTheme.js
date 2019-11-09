// ==UserScript==
// @name         极客时间深色主题
// @namespace    http://youguanxinqing.xyz/
// @version      0.1
// @description  Change Color During Reading!
// @author       youguanxinqing
// @match        https://time.geekbang.org/column/article/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @grant        none
// @note         参考 极客时间专栏 WEB 页面剪贴板功能还原 实现，感谢作者
// ==/UserScript==

var backgroundSelector = "#app > div"
var wordSelector = "#app > div > div > div > div > div > div > div > div > div"
var commentSelector = "#app > div > div > div > div > div > ul > li > div > div > div"

waitForKeyElements (backgroundSelector, changeBackground);
waitForKeyElements (wordSelector, changeWordColor);
waitForKeyElements (commentSelector, changeCommentColor);

function changeBackground() {
    'use strict';

    // Your code here...
    $("#app > div > div").css({"background": "rgb(45,49,44)", "border": "0px"}) // 右上
    $("#app > div > div > div").css({"background": "rgb(45,49,44)", "border": "0px"}) // 页眉，正文，左栏背景
    $("#app > div:first > div:first > div:first").css({"background": "", "border": "0px"}) // 显示 logo
    $("#app > div > div > div > div").css({"color": "gray", "border": "0px"}) // 左栏边框
    // $(backgroundSelector).css({"background": "white"})  // 右下（正文块背景）
}

function changeWordColor() {
    $(wordSelector).css({"color": "wheat"})  // 正文
    $("span[data-slate-object=mark]").css({"color": "red"}) // 正文加粗
    $("#app > div > div > div > div > div > div").css({"color": "wheat"}) // 左栏章节
    // h1 ... h6
    var hArray = new Array("h1", "h2", "h3", "h4", "h5", "h6")
    hArray.forEach(function(item, i){
        $(item).css({"color": "wheat"})
    })
    // for (var i = 0; i<hArray.length; i++) {
    //     $(hArray[i]).css({"color": "wheat"})
    // }
}

function changeCommentColor() {
    $(commentSelector).css({"color": "wheat"})
}
