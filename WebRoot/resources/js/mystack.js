﻿//var _SMTCLFYWEB3DVAR_ifistest = 1;
//var URL = "w.asmx/"; //WEB SERVICE 地址
//function RequestByPost(methods, datastring, where, targets)//通用AJAX接口，
//{
//    if (_SMTCLFYWEB3DVAR_ifistest == 1)
//        $.ajax({
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            url: URL + methods,
//            data: datastring,
//            dataType: 'json',
//            cache: false,
//            success: function (result) {
//                //alert(result.d)
//                eval(targets + "('" + result.d + "')");
//                //     alert("nothing return");
//                //eval(targets + "('" + where + "','" + result.d + "')");
//            },
//            error: function (x, e) {
//                //alert(x.responseText)
//                var ss = x.responseText.substr(0, x.responseText.length - 10);
//                eval(targets + "('" + ss + "')");
//            },
//            complete: function (x) {
//            }
//        });
//    else
//        $.ajax({
//            url: "/machinearchive/" + methods,
//            data: datastring,
//            cache: false,
//            dataType: 'text',
//            success: function (returnData) {
//                eval(targets + "('" + returnData + "')");
//                /*var d=JSON.parse(returnData);
//                data=d.content;
//			
//                if(data==undefined||data==""){
//                $("#bgd").hide();
//                $("body").css("background-color","rgb(233,233,233)");
//                //$("#type").hide();
//                $("#no").show();
//                return false;
//                }*/
//            }
//        });
//}

//$(function () {
//    var mtNo = "0";
//    if (_SMTCLFYWEB3DVAR_ifistest == 0)
//        RequestByPost("Order/getaaaaa.json", "mtNo=" + mtNo, "", "stackdochart");
//    if (_SMTCLFYWEB3DVAR_ifistest == 1)
//        RequestByPost("getaaaaa", "{mtNo:'" + mtNo + "'}", "", "stackdochart");
//});

function DateDiff(d1, d2) {
    var day = 24 * 60 * 60 * 1000;
    try {
        var df1 = d1.split(" ");
        var dateArr = df1[0].split("-");
        var checkDate = new Date();
        checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
        var checkTime = checkDate.getTime();

        var df2 = d2.split(" ");
        var dateArr2 = df2[0].split("-");
        var checkDate2 = new Date();
        checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
        var checkTime2 = checkDate2.getTime();

        var cha = (checkTime - checkTime2) / day;
        return cha;
    } catch (e) {
        alert(e)
        return false;
    }
} //end fun

var dataMachineEvent = null;
function loadData() {
	var thedata = document.getElementById("myform:machineEvent").value;
	//alert(thedata);
	dataMachineEvent = eval("(" + thedata + ")");
    
    if(dataMachineEvent.content.length>0){
    	document.getElementById("chart1").style.display="block";
		document.getElementById("chart2").style.display="block";
		document.getElementById("chart3").style.display="none";
    	stackdochart();
    	
    }else{
    	//alert(2);
    	//提示暂无数据
    	document.getElementById("chart1").style.display="none";
		document.getElementById("chart2").style.display="none";
	    document.getElementById("chart3").innerHTML= "<span data-i18n='zwxxts'></span>";
	    document.getElementById("chart3").style.display="block";
    }
}



var date_array = [];
var nowdatearrayindex = 0;
function stackdochart() {	//缺失数据整理
    //thedata = vv;
	date_array=[]
    if(dataMachineEvent.content.length > 0)
    {
	    //alert(kk.content.length);
	    for (var i = 0; i < dataMachineEvent.content.length; i++) {
	        var gotit = false;
	        for (var ij = 0; ij < date_array.length; ij++) {
	            if (date_array[ij] == dataMachineEvent.content[i].EVENTTIME.replace(/-/g, "/").split(" ")[0])
	                gotit = true;
	        }
	        if (!gotit) {
	            date_array.push(dataMachineEvent.content[i].EVENTTIME.replace(/-/g, "/").split(" ")[0]);
	        }
	    }
	    stackdochart2();
    }
    
}
function preday() {
    //    if (nowdatearrayindex < date_array.length - 1) {
    //        nowdatearrayindex++;
    //tobeclick("p");
	document.getElementById("myform:black").click();
    //stackdochart();
    //    }
}
function nexday() {
    //    if (nowdatearrayindex > 0) {
    //        nowdatearrayindex--;
    //tobeclick("n");
	 document.getElementById("myform:next").click();
    //stackdochart();
    //    }
}

var textStr = "content.tabtitle";
dataTranslate("stat_device_machine_event", function(t) { textStr = t(textStr);});
function stackdochart2() {	//绘制图表
	var kk = dataMachineEvent;
    //alert("2:"+thedata)
    var mydata = [];
    if(dataMachineEvent.content.length > 0) {
	    //var startdate = kk.content[kk.content.length - 1].EVENTTIME.replace(/-/g, "/").split(" ")[0];
	    var startdate = date_array[nowdatearrayindex];
	    //alert(startdate)
	    var founded = false;
	    
	    for (var i = 1; i < kk.content.length; i++) {//kk.content.length
	        var startdate_r = kk.content[i].EVENTTIME.replace(/-/g, "/").split(" ")[0];
	
	        // if (startdate_r == startdate || (startdate_r != startdate && founded)) {
	        if (startdate == startdate_r)
	            if (i == 1) {
	                var str_3 = kk.content[0].EVENTTIME.replace(/-/g, "/");
	                var str2_3 = startdate + " 00:00:00";
	                var date1_3 = new Date(str_3);
	                var date2_3 = new Date(str2_3);
	                mycolor = "#ff0000";
	                switch (kk.content[0].EVENTNAME) {
	                    case "准备":
	                    case "Preparing":
	                        mycolor = "rgba(0,129,206,0.4)";
	                        break;
	                    case "运行":
	                    case "Running":
	                        mycolor = "rgba(108,204,71,1)";
	                        break;
	                    case "空闲":
	                    case "Idle":
	                        mycolor = "rgba(244,221,12,1)";
	                        break;
	                    case "关机":
	                    case "Power Off":
	                        mycolor = "rgba(160,160,160,1)";
	                        break;
	                    case "开机":
	                    case "Power On":
	                        mycolor = "rgba(0,129,206,1)";
	                        break;
	                    case "故障":
	                    case "Error":
	                        mycolor = "rgba(251,117,0,1)";
	                        break;
	                    case "保持":
	                    case "Maintain":
	                        mycolor = "rgba(108,204,71,0.6)";
	                        break;
	                    case "加工":
	                    case "Processing":
	                        mycolor = "rgba(108,204,71,0.4)";
	                        break;
	                    case "中断":
	                    case "Suspended":
	                        mycolor = "rgba(244,221,12,0.4)";
	                        break;
	                    case "急停":
	                    case "Emergency":
	                        mycolor = "rgba(251,117,0,0.4)";
	                        break;
	                    case "复位":
	                    case "Reset":
	                        mycolor = "rgba(0,129,206,0.6)";
	                        break;
	                }
	                var ak3 = { name: kk.content[0].EVENTNAME, data: [(3600 * 24 * 1000 - (date1_3.getTime() - date2_3.getTime())) / 1000 / 3600], myd: kk.content[i].EVENTTIME, color: mycolor };
	                mydata.push(ak3);
	            }
	
	        var str = kk.content[i - 1].EVENTTIME.replace(/-/g, "/");
	        var str2 = kk.content[i].EVENTTIME.replace(/-/g, "/");
	        var str_3 = kk.content[i - 1].EVENTTIME.replace(/-/g, "/").split(" ")[0];
	        var str2_3 = kk.content[i].EVENTTIME.replace(/-/g, "/").split(" ")[0];
	        if (str_3 != str2_3) {
	            if (str2_3 == startdate)
	                str = kk.content[i - 1].EVENTTIME.replace(/-/g, "/").split(" ")[0] + " 00:00:00";
	            if (str_3 == startdate)
	                str2 = kk.content[i - 1].EVENTTIME.replace(/-/g, "/").split(" ")[0] + " 00:00:00";
	        }
	
	        if (founded)
	            founded = false
	        else
	            founded = true;
	
	
	        var date1 = new Date(str);
	        var date2 = new Date(str2);
	        var mycolor = "#000000";
	        switch (kk.content[i].EVENTNAME) {
		        case "准备":
		        case "Preparing":
		            mycolor = "rgba(0,129,206,0.4)";
		            break;
		        case "运行":
		        case "Running":
		            mycolor = "rgba(108,204,71,1)";
		            break;
		        case "空闲":
		        case "Idle":
		            mycolor = "rgba(244,221,12,1)";
		            break;
		        case "关机":
		        case "Power Off":
		            mycolor = "rgba(160,160,160,1)";
		            break;
		        case "开机":
		        case "Power On":
		            mycolor = "rgba(0,129,206,1)";
		            break;
		        case "故障":
		        case "Error":
		            mycolor = "rgba(251,117,0,1)";
		            break;
		        case "保持":
		        case "Maintain":
		            mycolor = "rgba(108,204,71,0.6)";
		            break;
		        case "加工":
		        case "Processing":
		            mycolor = "rgba(108,204,71,0.4)";
		            break;
		        case "中断":
		        case "Suspended":
		            mycolor = "rgba(244,221,12,0.4)";
		            break;
		        case "急停":
		        case "Emergency":
		            mycolor = "rgba(251,117,0,0.4)";
		            break;
		        case "复位":
		        case "Reset":
		            mycolor = "rgba(0,129,206,0.6)";
		            break;
	        }
	        var ak = { name: kk.content[i].EVENTNAME, data: [(date1.getTime() - date2.getTime()) / 1000 / 3600], myd: kk.content[i].EVENTTIME, color: mycolor };
	        mydata.push(ak);
	
	        if (i == kk.content.length - 1) {
	            var str_2 = kk.content[kk.content.length - 1].EVENTTIME.replace(/-/g, "/");
	            var str2_2 = startdate + " 00:00:00";
	            var date1_2 = new Date(str_2);
	            var date2_2 = new Date(str2_2);
	            mycolor = "#d2d2d2"; //d2d2d2
	            
	            var chart_tip4="content.chart_tip4";
	    		dataTranslate("stat_device_machine_event", function(t) { 
	    			chart_tip4 = t(chart_tip4); 
	    		});
	
	            var ak2 = { name:chart_tip4, data: [(date1_2.getTime() - date2_2.getTime()) / 1000 / 3600], myd: kk.content[i].EVENTTIME, color: mycolor };
	            mydata.push(ak2);
	        }
	
	        // }
	
	    }
    }
    var kk = "";
    for (var k = 0; k < mydata.length; k++) {
        kk += mydata[k].name + "=" + mydata[k].data + "----" + mydata[k].myd + "........";
    }
   
	
    try {
    	 
        $('#stachchartcontainer').highcharts({
            chart: {
                width: $("#stachchartcontainer").width(),
                height: $("#stachchartcontainer").height(),
                type: 'bar'
            },
            exporting: {
                enabled: false
            },
            title: {
                text:textStr,
                style:{
            		color:'#7A7A7A'
            	 }
            },
            xAxis: {
                categories: [startdate]
            },
            yAxis: {
                min: 0,
                max: 24,
                tickInterval: 1,
                title: {
                    text: ''
                }
            },
            credits: {
            	 enabled: false
       	 	},
            legend: {
                reversed: true,
                enabled: false,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            tooltip: {
                formatter: function () {
                	var chart_tip11="content.chart_tip11";
            		dataTranslate("stat_device_machine_event", function(t) { 
            			chart_tip11 = t(chart_tip11); 
            		});
                    return this.series.name + "<br/>"+chart_tip11+"：" + MillisecondToDate(this.y * 3600 * 1000);
                }
            },
            series: mydata
        });
    } catch (e) { alert(e) }
    //alert(kk)
    //alert(nowdatearrayindex);
}

//制保留2位小数，如：2，会在2后面补上00.即2.00  
function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

function MillisecondToDate(msd) {
    var time = parseFloat(msd) / 1000;
    var h,m,s;
	dataTranslate("stat_device_machine_event", function(t) { 
		h = t("content.xiaoshi");
		m = t("content.fenzhong");
		s = t("content.miao");
	});
	
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + m + parseInt((parseFloat(time / 60.0) -
                parseInt(time / 60.0)) * 60) + s;
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + h + parseInt((parseFloat(time / 3600.0) -
                parseInt(time / 3600.0)) * 60) + m +
                parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + s;
        } else {
            time = parseInt(time) + s;
        }
    } else {
        time = " 0 "+h+" 0 "+m+" 0 "+s;
    }
    return time;
}

//$(document).ready(function () {
//    $(".show").mousedown(function (e)//e鼠标事件  
//    {
//        $(this).css("cursor", "move"); //改变鼠标指针的形状  

//        var offset = $(this).offset(); //DIV在页面的位置  
//        var x = e.pageX - offset.left; //获得鼠标指针离DIV元素左边界的距离  
//        var y = e.pageY - offset.top; //获得鼠标指针离DIV元素上边界的距离  
//        $(document).bind("mousemove", function (ev)//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件  
//        {
//            $(".show").stop(); //加上这个之后  

//            var _x = ev.pageX - x; //获得X轴方向移动的值  
//            var _y = ev.pageY - y; //获得Y轴方向移动的值  
//            $(".show").animate({ left: _x + "px" }, 10);
//            //            $(".show").animate({ left: _x + "px", top: _y + "px" }, 10);
//        });

//    });

//    $(document).mouseup(function () {
//        $(".show").css("cursor", "default");
//        $(this).unbind("mousemove");
//    })


//})

var iswide = false;
function larger() {
    if (!iswide) {
        document.getElementById("stackpanelcontainer").style.width = "300%";
        stackdochart2();
        document.getElementById("bili").innerHTML = "缩小比例";
        iswide = true;
    }
    else {
        document.getElementById("stackpanelcontainer").style.width = "100%";
        document.getElementById("stackpanelcontainer").style.left = "0px";
        stackdochart2();
        document.getElementById("bili").innerHTML = "放大比例";
        iswide = false;
    }
}

function tobeclick(vv) {
    document.getElementById("bili").innerHTML = vv;
}