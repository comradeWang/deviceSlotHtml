$(function () {
    /*addFirstSlotDom();*/
    addSecondSlotDom();
    /*getOneLevelSlotState();*/
    $('#modal-container .slot-right-panel').hide();

    /*二级时隙pcodf初始化*/
    initPcodefDom();
    /*二级时隙wss初始化*/
    initSlotWssDom();
    /*加载色散dom*/
    initTdcmDom();
    /*加载tbs dom*/
    initSlotTbs();
    /*加载lxc dom*/
    initSlotLxc();
});

/**
 * 添加一级时隙的dom
 */
function addFirstSlotDom() {
    var $slotPortContainer = $('.slot-port-container');
    var htmlStr = "";
    var portContainerStr = "";
    //端口数
    var portCount = 1;
    var rowNum = 1;
    for (var i = 1; i <= 4; i++) {
        var portRowStr = "";
        for (var j = 1; j <= 2; j++) {
            var portStr ="";
            for (var k = 1; k <= 8; k++) {
                if(portCount.toString().length==1) {
                    portStr+='<div class="slot-port" id="slot-left-port-'+portCount+'">0'+portCount+'</div>'
                }else {
                    portStr+='<div class="slot-port" id="slot-left-port-'+portCount+'">'+portCount+'</div>'
                }
                portCount++;
            }
            portRowStr += '<div class="slot-port-row uk-flex uk-flex-center" id="port-row-'+rowNum+'">'+ portStr+ '</div>';
            rowNum++;
        }
        portContainerStr += '<div class="slot-port-row-container">' + portRowStr + '</div>';
    }
    $slotPortContainer.html(portContainerStr);
    $('.slot-color-detail').width($('.slot-left-panel').width());
    $(window).resize(function () {
        $('.slot-color-detail').width($('.slot-left-panel').width());
    })
}

/**
 * 获取一级时隙端口的状态
 */
function getOneLevelSlotState() {
   /* var $modal = document.getElementById('modal-container');*/
    var modal = UIkit.modal("#modal-container");
    modal.show();
    addFirstSlotDom();
    //现在没有数据库也没有后台，暂时随意加了些class
    $('.slot-port-container').find('.slot-port').addClass('no_cross');
    $('.slot-port-two-container').find('.slot-port').addClass('no_cross');
    portClassControl('#port-row-8 .slot-port', 'vc_4c');
    /*$('#port-row-8').find('.slot-port').removeClass('no_cross').addClass('vc_4c');*/
    portClassControl("#slot-left-port-53", "low_order_cross");
    var dropdownStr = '<div class="cross-dropdown" uk-dropdown="mode: click" style="width: 15vw">' +
        '<button class="uk-button uk-button-primary uk-width-1-1" style="border-radius: 5px">一级时隙链路图</button>' +
        '<button class="uk-button uk-button-primary uk-width-1-1" onclick="clickToSecondSlot()" style="margin-top: 10px;border-radius: 5px">二级时隙选择</button>' +
        '</div>';
    $('.slot-port-container .low_order_cross').after(dropdownStr);
}

/**
 * 添加二级时隙的dom
 */
function addSecondSlotDom() {
    var $container = $('.slot-port-two-container');
    var htmlStr = "";
    var portContainerStr = "";
    //端口数
    var portCount = 1;
    var rowNum = 1;
    for (var i = 1; i <= 4; i++) {
        var portRowStr = "";
        for (var j = 1; j <= 2; j++) {
            var portStr ="";
            for (var k = 1; k <= 8; k++) {
                if(portCount.toString().length==1) {
                    portStr+='<div class="slot-port" id="slot-right-port-'+portCount+'">0'+portCount+'</div>'
                }else {
                    portStr+='<div class="slot-port" id="slot-right-port-'+portCount+'">'+portCount+'</div>'
                }
                portCount++;
            }
            portRowStr += '<div class="slot-port-row uk-flex uk-flex-center" id="port-right-row-'+rowNum+'">'+ portStr+ '</div>';
            rowNum++;
        }
        portContainerStr += '<div class="slot-port-row-container">' + portRowStr + '</div>';
    }
    $container.append(portContainerStr);
}
/**
 * 控制port的类的添加 和 移除
 * @param portId 包含选择器
 * @param className
 */
function portClassControl(portId,className) {
    $(portId).removeClass('no_cross').addClass(className);
}

/**
 * 点击出现二级时隙
 */
function clickToSecondSlot() {
    $('.slot-right-panel').show();
    portClassControl('#slot-right-port-1', 'vc_12');
    var ele = document.getElementsByClassName('cross-dropdown');
    UIkit.dropdown(ele).hide();
    getTwoLevelSlotState();
}

/**
 * 获取二级时隙的端口状态
 */
function getTwoLevelSlotState() {
    var dropdownStr = '<div class="cross-dropdown" uk-dropdown="mode: click" style="width: 15vw">' +
        '<button class="uk-button uk-button-primary uk-width-1-1" onclick="" style="margin-top: 10px;border-radius: 5px">二级时隙链路</button>' +
        '</div>';
    $('.slot-port-two-container .vc_12').after(dropdownStr);
}

/**
 * 初始化二级时隙pcodfdom
 */
function initPcodefDom() {
    var row = 3;
    var column = 32;
    var index = 0;
    var htmlInputStr = '';
    var htmlOutputStr = '';
    var pcodefInput=$('.slot-pcodf-input');
    var pcodefOutput=$('.slot-pcodf-output');
    for (var i = 0; i < column; i++) {
        var number = 1+index*12;
        var flag = (i+1) % 2;
        htmlInputStr += '<div>';
        htmlOutputStr += '<div>';
        if(flag==0) {
            index++;
        }
        for (var j = 1; j <= row; j++) {
            if(flag==0) {
                htmlInputStr += '<div class="slot-pcodf-port-number-container clear-background-color">' +
                    '<div class="slot-pcodf-port-number">' + number + '</div>' +
                    '<div class="slot-pcodf-port-number">' + (number + 1) + '</div>' +
                    '<div class="slot-pcodf-port-number">' + (number + 2) + '</div>' +
                    '<div class="slot-pcodf-port-number">' + (number + 3) + '</div>' +
                    '</div>';
                htmlOutputStr += '<div class="slot-pcodf-port-number-container clear-background-color">' +
                    '<div class="slot-pcodf-port-number">' + number + '</div>' +
                    '<div class="slot-pcodf-port-number">' + (number + 1) + '</div>' +
                    '<div class="slot-pcodf-port-number">' + (number + 2) + '</div>' +
                    '<div class="slot-pcodf-port-number">' + (number + 3) + '</div>' +
                    '</div>';
                number += 4;
            }else {
                htmlInputStr += '<div class="slot-pcodf-input-port-container" onclick="pcodfClickByContainer(this)">' +
                    '<div class="slot-pcodf-port" id="pcodf-input-Port'+number+'" onclick="pcodfClickByPort('+number+',this)">' +
                    '</div>' +
                    '<div class="slot-pcodf-port" id="pcodf-input-Port'+(number + 1)+'" onclick="pcodfClickByPort('+(number + 1)+',this)">' +
                    '</div>' +
                    '<div class="slot-pcodf-port" id="pcodf-input-Port'+(number + 2)+'" onclick="pcodfClickByPort('+(number + 2)+',this)">' +
                    '</div>' +
                    '<div class="slot-pcodf-port" id="pcodf-input-Port'+(number + 3)+'" onclick="pcodfClickByPort('+(number + 3)+',this)">' +
                    '</div>' +
                    '</div>';
                htmlOutputStr+='<div class="slot-pcodf-output-port-container" onclick="pcodfClickByContainer(this)">' +
                    '<div class="slot-pcodf-port" id="pcodf-output-Port'+number+'" onclick="pcodfClickByPort('+(number)+',this)">' +
                    '</div>' +
                    '<div class="slot-pcodf-port" id="pcodf-output-Port'+(number + 1)+'" onclick="pcodfClickByPort('+(number + 1)+',this)">' +
                    '</div>' +
                    '<div class="slot-pcodf-port" id="pcodf-output-Port'+(number + 2)+'" onclick="pcodfClickByPort('+(number + 2)+',this)">' +
                    '</div>' +
                    '<div class="slot-pcodf-port" id="pcodf-output-Port'+(number + 3)+'" onclick="pcodfClickByPort('+(number + 3)+',this)">' +
                    '</div>' +
                    '</div>';
                number += 4;
            }
            if(j==row) {
                htmlInputStr += "</div>";
                htmlOutputStr += "</div>";
            }
        }
    }
    pcodefInput.html(htmlInputStr);
    pcodefOutput.html(htmlOutputStr);
    $('.slot-pcodf-port-number-container').hide();
    $('.slot-pcodf-port').hide();
}

/**
 * 初始化二级时隙wssdom
 */
function initSlotWssDom() {
    var row = 2;
    var number = 20;
    var wssStr = '<div class="uk-flex uk-flex-around">';
    for (var i = 1; i <= number; i++) {
         wssStr += '<div class="slot-wss-output-container">' +
            '<div class="slot-wss-output-number">'+i+'</div>' +
            '<div class="slot-wss-output-port"></div>' +
            '</div>';
         if(i==10) {
             wssStr += '</div><div class="uk-flex uk-flex-around">';
         }else if(i==20) {
             wssStr += '</div>';
         }
    }
    $('.slot-wss-output').html(wssStr);
}

/**
 * 点击button2 弹出模态框
 */
function clickModal2() {
    var modal = UIkit.modal("#modal-2");
    modal.show();
}

/**
 * 加载色散 dom
 */
function initTdcmDom() {
    var htmlStr = "";
    var $container = $('.slot-tdcm-container');
    for (var i = 1; i <= 4; i++) {
      htmlStr+='<div class="slot-tdcm-io-container uk-flex uk-flex-middle uk-flex-center">\n' +
          '<div>\n' +
          '<div class="slot-tdcm-text">IN'+i+'</div>\n' +
          '<div class="slot-tdcm-input-port"></div>\n' +
          '</div>\n' +
          '<div>\n' +
          '<div class="slot-tdcm-text">OUT'+i+'</div>\n' +
          '<div class="slot-tdcm-output-port"></div>\n' +
          '</div>\n' +
          '</div>'
    }
    $container.html(htmlStr);
/*    var left_height = $('.slot-wss-container').height();
    console.log(left_height);
    $container.height(left_height);*/
}

/**
 * 加载tbs dom
 */
function initSlotTbs() {
    var columns = 14;
    var row = 2;
    var blockNum = 8;
    var panelId = 1;
    var htmlInputStr = '';
    var htmlOutputStr = '';
    for (var i = 1; i <= columns; i++) {
        htmlInputStr += '<div class="slot-tbs-panel-container">' +
            '<div class="slot-tbs-title-number">' + i + '</div>';
        htmlOutputStr+='<div class="slot-tbs-panel-container">' +
            '<div class="slot-tbs-title-number">' + i + '</div>';
        if(i==7||i==8) {
            htmlInputStr += '<div class="slot-tbs-split-line"></div>';
            htmlOutputStr += '<div class="slot-tbs-split-line"></div>';
        }else {
            for (var j = 1; j <=row; j++) {
                htmlInputStr += '<div class="slot-tbs-port-container slot-input-color" id="slot-'+panelId+'-amc'+j+'EnterPortContainer" >';
                htmlOutputStr += '<div class="slot-tbs-port-container slot-output-color" id="slot-'+panelId+'-amc'+j+'OutputPortContainer" >';
                for (var k = 1; k <= blockNum; k++) {
                    htmlInputStr+='<div class="slot-tbs-port" id="slot-'+panelId+'-amc'+j+'EnterPort'+k+'"></div>' +
                        '<div class="slot-tbs-port-number">'+k+'</div>'
                    htmlOutputStr+='<div class="slot-tbs-port" id="slot-'+panelId+'-amc'+j+'OutputPort'+k+'"></div>' +
                        '<div class="slot-tbs-port-number" >'+k+'</div>'
                }
                htmlInputStr += '</div>';
                htmlOutputStr += '</div>';
            }
            panelId++;
        }
        htmlInputStr += '</div>';
        htmlOutputStr += '</div>';
    }
    $('#slot-tbs-input-container').html(htmlInputStr);
    $('#slot-tbs-output-container').html(htmlOutputStr);
    //隐藏所有接口
    $('.slot-tbs-port').hide();
    $('.slot-tbs-port-number').hide();
    var tbsContainerHeight = $('.slot-tbs-port-container').height();
    var tbsSplitLineHeight = 2*tbsContainerHeight+10;
    $('.slot-tbs-split-line').height(tbsSplitLineHeight);
    $(window).resize(function () {
        var tbsContainerHeight = $('.slot-tbs-port-container').height();
        var tbsSplitLineHeight = 2*tbsContainerHeight+10;
        $('.slot-tbs-split-line').height(tbsSplitLineHeight);
    });

}

/*
* 加载LXC dom
*/
function initSlotLxc() {
    var ioBlockNumber = 6;
    var portContainerNumber = 4;
    var htmlStr = '';
    var portCount = 1;
    for (var i = 1; i <= ioBlockNumber; i++) {
        htmlStr += '<div class="slot-lxc-io-container uk-flex uk-flex-middle uk-flex-around uk-width-1-2">';
        for (var j = 0; j < portContainerNumber; j++) {
            htmlStr += '<div class="slot-lxc-port-container">' +
                '<div class="slot-lxc-port-number">' + portCount + '</div>' +
                '<div class="slot-lxc-io-port-container uk-flex uk-flex-around uk-flex-middle">\n' +
                '<div class="slot-lxc-port slot-input-color"></div>' +
                '<div class="slot-lxc-port slot-output-color"></div>' +
                '</div>' +
                '<div class="slot-lxc-port-number">' + (portCount+1) + '</div>' +
                '<div class="slot-lxc-io-port-container uk-flex uk-flex-around uk-flex-middle">\n' +
                '<div class="slot-lxc-port slot-output-color"></div>' +
                '<div class="slot-lxc-port slot-input-color"></div>' +
                '</div>' +
                '</div>';
            portCount += 2;
        }
        htmlStr += '</div>';
    }
    $('.slot-lxc-container').html(htmlStr);

}