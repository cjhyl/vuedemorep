var urlBase = {
	url: 'http://47.97.249.174:8050',
	vers: 'v1.0'
};
var utils = {
    timeSpan: 'YYYY-MM-DDThh:mm:ss.000+08:00',
    urls: {
		'ApiToken': {
			str: urlBase.url + '/PlatformToken/' + urlBase.vers + '/ApiToken/',
			type: 'GET',
		},
		'RequestToken': {
			str: urlBase.url + '/UserLogin/' + urlBase.vers + '/RequestToken',
			type: 'POST'
		},
		'tokenConnect': {
			str: 'http://47.97.249.174:8051/Notification/tokenConnect',
			type: 'longLink'
		},
		//Menu
		'getMenu': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Menu',
			type: 'GET'
		},
		'getMenuByPage': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Menu/Page',
			type: 'POST'
		},
		'updateMenu': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Menu',
			type: 'PUT'
		},
		'addMenu': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Menu',
			type: 'POST'
		},
		'deleteMenu': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Menu',
			type: 'DELETE'
		},
		//Permission
		'getPermission': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Permission',
			type: 'GET'
		},
		'getPermissionByPage': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Permission/Page',
			type: 'POST'
		},
		'updatePermission': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Permission',
			type: 'PUT'
		},
		'addPermission': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Permission',
			type: 'POST'
		},
		'deletePermission': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Permission',
			type: 'DELETE'
		},
		//Role
		'getRole': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Role',
			type: 'GET'
		},
		'getRoleByPage': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Role/Page',
			type: 'POST'
		},
		'updateRole': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Role',
			type: 'PUT'
		},
		'addRole': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Role',
			type: 'POST'
		},
		'deleteRole': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/Role',
			type: 'DELETE'
		},
		//RolePermission
		'getRolePermission': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/RolePermission',
			type: 'GET'
		},
		'getRolePermissionByPage': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/RolePermission/Page',
			type: 'POST'
		},
		'updateRolePermission': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/RolePermission',
			type: 'PUT'
		},
		'addRolePermission': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/RolePermission',
			type: 'POST'
		},
		'deleteRolePermission': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/RolePermission',
			type: 'DELETE'
		},
		//apiUser
		'getApiUser': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/ApiUser',
			type: 'GET'
		},
		'getApiUserByPage': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/ApiUser/Page',
			type: 'POST'
		},
		'getApiUserStatus': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/ApiUser/Status',
			type: 'GET'
		},
		'updateApiUser': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/ApiUser',
			type: 'PUT'
		},
		'addApiUser': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/ApiUser',
			type: 'POST'
		},
		'deleteApiUser': {
			str: urlBase.url + '/UserCenter/' + urlBase.vers + '/ApiUser',
			type: 'DELETE'
		},

		// app
		'addApp': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/App',
			type: 'POST'
		},
		'deleteApp': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/App',
			type: 'DELETE'
		},
		'batchDeleteApp': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/App',
			type: 'DELETE'
		},
		'updateApp': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/App',
			type: 'PUT'
		},
		'getAppByPage': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/App/Page',
			type: 'POST'
		},
		'getAppStatus': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/App/Status',
			type: 'GET'
		},

		//app role
		'getApp_Role': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Role',
			type: 'GET'
		},
		'addApp_Role': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Role',
			type: 'POST'
		},
		'deleteApp_Role': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Role',
			type: 'DELETE'
		},
		'updateApp_Role': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Role',
			type: 'PUT'
		},
		'getApp_RoleByPage': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Role/Page',
			type: 'POST'
		},
		'getApp_RoleStatus': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Role/Status',
			type: 'GET'
		},
		//app's role
		'getAppsRole': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/AppRole',
			type: 'GET'
		},
		'deleteAppsRole': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/AppRole',
			type: 'DELETE'
		},
		'addAppsRole': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/AppRole',
			type: 'POST'
		},
		//app action
		'getAppAction': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/ActionMenu',
			type: 'GET'
		},
		'getAppActionByPage': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/ActionMenu/Page',
			type: 'POST'
		},
		'addAppAction': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/ActionMenu',
			type: 'POST'
		},
		'deleteAppAction': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/ActionMenu',
			type: 'DELETE'
		},
		'updateAppAction': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/ActionMenu',
			type: 'PUT'
		},
		//app module
		'getAppModule': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Module',
			type: 'GET'
		},
		'getAppModuleByPage': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Module/Page',
			type: 'POST'
		},
		'addAppModule': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Module',
			type: 'POST'
		},
		'deleteAppModule': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Module',
			type: 'DELETE'
		},
		'updateAppModule': {
			str: urlBase.url + '/AppCenter/' + urlBase.vers + '/Module',
			type: 'PUT'
		},
			
    },
    createRandomId:function() {
        return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
    },
    isPrime:function(num){
	    if ( num == 1 || num == 4 ){
	    	return false;
	    }
	    if ( num == 2 || num == 3 ){
	    	return true;
	    }
	    for ( var i = 2; i<= Math.sqrt(num); i++ ){
	        if ( num % i == 0 ){
	        	return false;
	        }
	    }
	    return true;
	},
	getNums:function(num){
		var numAry=[];
		for(var i=1;i<num;i++){
			if(this.isPrime(i)){
				numAry.push(i);
			}
		}
		return numAry;
	},
	getNums2:function(num){
		var numAry=[2];
		if(num==2){
			return numAry;
		}
		for (var i = 1; i < num ; i++) {
			for (var j = 2; j < i; j++) {
				if (i%j==0){
					break;
				}else if(j==i-1){
					numAry.push(i);
				}
			}
		}
		return numAry;
	},
	menuToTree: function (data, parentId) {
		var itemArr = [];
		for (var i = 0; i < data.length; i++) {
			var node = data[i];
			if (node.parentId == parentId) {
				var newNode = this.deepClone(data[i]);
				newNode.children = this.menuToTree(data, node.id);
				itemArr.push(newNode);
			}
		}
		if (itemArr.length > 0) {
			return itemArr;
		} else {
			return null;
		}

    },
    initRem: function (doc, win) {
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function () {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) return;
				docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
				//			      if(paLeader){
				//			      	paLeader.clientWidth=clientWidth;
				//			      	paLeader.winTimes=clientWidth / 1920;
				//			      }
			};
		// Abort if browser does not support addEventListener
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	},
	/*
	 *格式化日期 date Date对象  fmt格式化字符，例如'YYYY-MM-DD hh:mm:ss'
	 */
	formatTimeSpan: function (date, fmt) {
		var o = {
			"M+": date.getMonth() + 1, //月份 
			"D+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds(), //秒 
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
			"S": date.getMilliseconds() //毫秒 
		};
		if (/(Y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	},
	//检测身份证
	checkIdcard: function (sId) {
		var aCity = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外"
		};
		var iSum = 0
		var info = ""
		if (!/^\d{17}(\d|x)$/i.test(sId)) return false;
		sId = sId.replace(/x$/i, "a");
		if (aCity[parseInt(sId.substr(0, 2))] == null) return false; //"Error:非法地区";
		sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"))
		if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false; //"Error:非法生日";
		for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
		if (iSum % 11 != 1) return false; //"Error:非法证号";
		return aCity[parseInt(sId.substr(0, 2))] + "," + sBirthday + "," + (sId.substr(16, 1) % 2 ? "男" : "女");
	},
	getAgeFromIdCard: function (identityCard) {
		var len = (identityCard + "").length;
		if (len == 0) {
			return 0;
		} else {
			if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
			{
				return 0;
			}
		}
		var strBirthday = "";
		if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
		{
			strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
		}
		if (len == 15) {
			strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
		}
		//时间字符串里，必须是“/”
		var birthDate = new Date(strBirthday);
		var nowDateTime = new Date();
		var age = nowDateTime.getFullYear() - birthDate.getFullYear();
		//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
		if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	},
	checkPhone: function (str) {
		var phoneRegexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
		return phoneRegexp.test(str);
	},
	checkDate: function (str) {
		if (isNaN(str) && !isNaN(Date.parse(str))) {
			return true;
		}
		return false;
	},
	checkTime: function (str) {
		var timeRegexp = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
		return timeRegexp.test(str);
	},
	checkEmail: function (str) {
		var emailRegexp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		return emailRegexp.test(str);
	},
	checkNum: function (str) {
		if (parseInt(str).toString() == "NaN") {
			return false;
		} else {
			return true;
		}
	},
	parseNum: function (str) {
		var num = parseInt(str);
		if (!num && num !== 0) {
			return '';
		} else {
			return num;
		}
	},
	//深度复制
	deepClone: function (obj) {
		if (obj === null || obj === undefined || obj != obj) {
			return obj;
		}
		var str, newobj = obj.constructor === Array ? [] : {};
		if (typeof obj !== 'object') {
			return;
		} else if (window.JSON) {
			str = JSON.stringify(obj),
				newobj = JSON.parse(str);
		} else {
			for (var i in obj) {
				newobj[i] = typeof obj[i] === 'object' ?
					cloneObj(obj[i]) : obj[i];
			}
		}
		return newobj;
	},
	//css中px替换为rem
	pxToRem: function (str) {
		var reg = /(\d)+(px)/gi;
		let newStr = str.replace(reg, function (item) {
			item = item.replace(/px/i, '');
			return parseFloat(item) / 100 + 'rem';
		});
		return newStr;
	},
	getScrollOffsets: function (w) {
		w = w || window;

		if (w.pageXOffset != null) return {
			x: w.pageXOffset,
			y: w.pageYOffset
		};

		var d = w.document;
		if (document.compatMode == "CSS1Compat")
			return {
				x: d.documentElement.scrollLeft,
				y: d.documentElement.scrollTop
			};

		return {
			x: d.body.scrollLeft,
			y: d.body.scrollTop
		};
	},
	/* 拖拽事件
	 * obj.toDrag拖动影响的元素
	 * obj.event源事件
	 * obj.moving拖动中的回调函数
	 * obj.moved拖动结束的回调函数
	 */
	eleDrag: function (obj) {
		var scroll = this.getScrollOffsets();

		var startX = obj.event.clientX + scroll.x;
		var origX = obj.toDrag.offsetLeft;
		var deltaX = startX - origX;

		var startY = obj.event.clientY + scroll.y;
		var origY = obj.toDrag.offsetTop;
		var deltaY = startY - origY;

		if (document.addEventListener) { // Standard event model
			document.addEventListener("mousemove", moveHandler, true);
			document.addEventListener("mouseup", upHandler, true);
		} else if (document.attachEvent) { // IE Event Model for IE5-8
			obj.toDrag.setCapture();
			obj.toDrag.attachEvent("onmousemove", moveHandler);
			obj.toDrag.attachEvent("onmouseup", upHandler);
			obj.toDrag.attachEvent("onlosecapture", upHandler);
		}

		if (obj.event.stopPropagation) obj.event.stopPropagation(); // Standard model
		else obj.event.cancelBubble = true; // IE

		// Now prevent any default action.
		if (obj.event.preventDefault) obj.event.preventDefault(); // Standard model
		else obj.event.returnValue = false; // IE

		var that = this;

		function moveHandler(e) {
			if (!e) e = window.event; // IE event Model
			var scroll = that.getScrollOffsets();
			obj.toDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
			obj.toDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";

			if (e.stopPropagation) e.stopPropagation(); // Standard
			else e.cancelBubble = true; // IE

			if (typeof obj.moving == 'function') {
				obj.moving(obj.toDrag)
			}
		}

		function upHandler(e) {
			if (!e) e = window.event; // IE Event Model

			if (document.removeEventListener) { // DOM event model
				document.removeEventListener("mouseup", upHandler, true);
				document.removeEventListener("mousemove", moveHandler, true);
			} else if (document.detachEvent) { // IE 5+ Event Model
				obj.toDrag.detachEvent("onlosecapture", upHandler);
				obj.toDrag.detachEvent("onmouseup", upHandler);
				obj.toDrag.detachEvent("onmousemove", moveHandler);
				obj.toDrag.releaseCapture();
			}

			if (e.stopPropagation) e.stopPropagation(); // Standard model
			else e.cancelBubble = true; // IE

			if (typeof obj.moved == 'function') {
				obj.moved(obj.toDrag)
			}
		}
	},
	isJSON: function (str) {
		if (typeof str == 'string') {
			try {
				var obj = JSON.parse(str);
				if (typeof obj == 'object' && obj) {
					return true;
				} else {
					return false;
				}

			} catch (e) {
				console.log('error：' + str + '!!!' + e);
				return false;
			}
		}
		console.log('It is not a string!')
	},
	linkWebsocket: function (obj) {
		var websocket = null;

		//判断当前浏览器是否支持WebSocket
		if ('WebSocket' in window) {
			websocket = new WebSocket(obj.url);
		}
		else {
			alert('Not support websocket')
		}

		//连接发生错误的回调方法
		websocket.onerror = function () {
			if (typeof obj.error == 'function') {
				obj.error();
			}
		};

		//连接成功建立的回调方法
		websocket.onopen = function (event) {
			if (typeof obj.open == 'function') {
				obj.open();
			}
		}

		//接收到消息的回调方法
		websocket.onmessage = function (event) {
			if (typeof obj.message == 'function') {
				obj.message(event.data);
			}
		}

		//连接关闭的回调方法
		websocket.onclose = function () {
			if (typeof obj.close == 'function') {
				console.log('websocket close');
				obj.close();
			}
		}
		return websocket;
	},
}
 
export default utils;