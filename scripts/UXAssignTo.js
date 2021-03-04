// ==UserScript==
// @name         UXAssignTo
// @namespace    http://youguanxinqing.xyz/
// @version      0.1
// @description  select for you!
// @author       youguanxinqing
// @match        // 安全起见，留空
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @grant        none
// @note         为指派一栏提供联想词提示
// ==/UserScript==

window.specifiedSelectOptionsMap = new Map()

window.getSpecifiedInputContent = function () {
    let content = $('#specified-input').val()
    if (content === '') {
        return
    }

    let names = new Array()
    for (let name of specifiedSelectOptionsMap.keys()) {
        if (name.startsWith(content)) {
            names.push(name)
        }
    }

    if (names.length !== 0) {
        $('#specified-suggestion').html('可能是:' + names.join(' , '))
    } else {
        $('#specified-suggestion').html('可能是:')
    }
}

window.enterSpecifiedInput = function(event, that) {
    let name = $('#specified-input').val()

    let id = specifiedSelectOptionsMap.get(name)
    if (id != undefined) {
        $('#issue_assigned_to_id').val(id)
    } else {
        alert('没有这个同事')
    }

    event.preventDefault()

    $(that).remove()
    $('#specified-suggestion').remove()
}

$('#issue_assigned_to_id').after("<button id='specified-box' style='margin-left:5px;'>搜索</button>")

$('#specified-box').bind('click', function(event) {
    $('#issue_assigned_to_id option').each(function() {
        if (!$(this).html().startsWith('成都')) {
            let name = $(this).html().replace(/\s+/, '')
            let id = $(this).val()
            if (id !== '') {
                specifiedSelectOptionsMap.set(name, id)
            }
        }
    })
    $(this).after('<p id=\'specified-suggestion\' style=\'padding-left:0px\'>可能是:</p><input id=\'specified-input\' type=\'text\' oninput=\'getSpecifiedInputContent()\' onkeydown=\'if(event.keyCode==13){enterSpecifiedInput(event, this)}\'/>')
    event.preventDefault()
})

