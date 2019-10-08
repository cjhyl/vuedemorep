// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import axios from 'axios'
import vueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import './css/main.css'
import 'element-ui/lib/theme-chalk/index.css'
import mmUtils from './utils'


//阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;
//使用axios
Vue.use(vueAxios, axios);
//使用elementUI
Vue.use(ElementUI)

//引入mock
require("./mock");

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
		resizeTimer: null,
		hubConnection: null,
	},
	computed: {
		apiToken: function () {
			return this.$store.state.apiToken;
		},
		userToken: function () {
			return this.$store.state.userToken;
		},
	},
	mounted: function () {
		this.$router.push({
			name: 'default0',
		});
		this.checkLocalToken();
		//this.checkLogin();
		this.$router.afterEach((to, from) => {
			this.$store.commit({
				type: 'pathchange',
				data: from.fullPath
			});
		});
		this.resizeWindow();
		window.onresize = this.changeWindowHeight;
		// $(window).on('resize', this.changeWindowHeight)
	},
	methods: {
		checkLocalToken: function () {
			var localData = localStorage.getItem("userToken");
			if (!localData) {
				this.$router.push({
					name: 'login',
				});
				return;
			}
			localData = JSON.parse(localData);
			if (new Date().valueOf() > localData.expires_in) {
				localStorage.removeItem("userToken");
				this.$router.push({
					name: 'login',
				});
				return;
			}
			var timeNum = localData.expires_in - new Date().valueOf();
			console.log('store_timeNum', timeNum);
			this.$store.commit({
				type: 'usertokenchange',
				data: localData.token
			});
			this.linkByToken(localData.token.access_token, (rl) => {
				if (rl && rl.state == 'logined') {
					this.$router.push({
						name: 'default',
					});
				}
			})
			setTimeout(() => {
				this.reloadToken();
			}, timeNum);
		},
		reloadToken: function () {
			this.$store.commit({
				type: 'usertokenchange',
				data: null
			});
			this.$store.commit({
				type: 'apitokenchange',
				data: null
			});
			localStorage.removeItem("userToken");
			this.$router.push({
				name: 'login',
			});
			alert('token已过期');
			console.log('reloadToken');
		},
		checkLogin: function (obj) {
			if (!this.userToken) {
				if (obj && typeof obj.cb == 'function') {
					obj.cb(false);
				}
				if (this.$route.name != 'login') {
					this.$router.push({
						name: 'login',
					});
				}
			} else {
				if (obj && typeof obj.cb == 'function') {
					obj.cb(true);
				}
			}
		},
		changeWindowHeight: function () {
			clearTimeout(this.resizeTimer);
			this.resizeTimer = setTimeout(() => {
				this.resizeWindow()
			}, 200);
		},
		resizeWindow: function () {
			var h_win = window.innerHeight;//$(window).height();
			var h_top = document.querySelector(".el-header.mmHeader").offsetHeight;//$('.el-header.mmHeader').height();
			var h_content = h_win - h_top;
			this.$store.commit({
				type: 'cheightchange',
				data: h_content
			});
		},
		loadUrl: function (obj) {
			var urlData = mmUtils.urls[obj.urlName],
				url = urlData.str,
				type = urlData.type;
			if (obj.urlPr) {
				url += obj.urlPr;
			}
			if (obj.headerKey && obj.headerKey == 'Authorization') {
				if (obj.headerValue) {//token正常存在
					obj.headerValue = obj.headerValue.token_type + ' ' + obj.headerValue.access_token;
				} else {
					//重新获取token
				}
			}
			// $.ajax({
			// 	url: url,
			// 	type: type,
			// 	dataType: 'Json',
			// 	contentType: "application/json",
			// 	data: obj.data ? obj.data : '',
			// 	beforeSend: function (request) {
			// 		if (obj.headerKey && obj.headerValue) {
			// 			request.setRequestHeader(obj.headerKey, obj.headerValue);
			// 		}
			// 	},
			// 	success: function (result) {
			// 		console.log(obj.urlName + ' success', result);
			// 		if (result.stateCode == 100000) {
			// 			if (typeof obj.cb == 'function') {
			// 				obj.cb({ state: 'success', data: result });
			// 			}
			// 		} else if (result.stateCode == 100002) {
			// 			if (typeof obj.cb == 'function') {
			// 				obj.cb({ state: 'empty', data: result });
			// 			}
			// 		} else {
			// 			if (typeof obj.cb == 'function') {
			// 				obj.cb({ state: 'warning', data: result });
			// 			}
			// 		}

			// 	},
			// 	error: function (e) {
			// 		console.log(obj.urlName + ' Error', e);
			// 		if (typeof obj.cb == 'function') {
			// 			obj.cb({ state: 'error', data: e });
			// 		}
			// 	}
			// });
		},
		loadApiToken: function (obj) {
			var that = this;
			this.loadUrl({
				urlName: 'ApiToken',
				headerKey: 'AuthCode',
				headerValue: 'F43TJRI453TIH',
				cb: function (rl) {
					if (rl.state == 'success') {
						var result = rl.data;
						var tokenData = {
							token: result.data.Access_token,
							timeNum: result.data.Expires_in
						};
						that.$store.commit({
							type: 'apitokenchange',
							data: tokenData
						});
					}
				}
			})
		},
		login: function (obj) {
			var that = this;
			this.loadUrl({
				urlName: 'RequestToken',
				data: JSON.stringify({
					'userName': obj.userName,
					'password': obj.password
				}),
				cb: function (rl) {
					if (rl.state != 'success') {
						obj.cb({
							state: 'error',
							data: null
						});
						that.$message('登录失败');
						return;
					}
					var result = rl.data;

					that.$store.commit({
						type: 'usertokenchange',
						data: result.data
					});
					that.$store.commit({
						type: 'usertokenchange',
						data: result.data
					});
					var timeNum = result.data.expires_in * 1000;
					var localData = {
						token: result.data,
						expires_in: new Date().valueOf() + timeNum
					};
					console.log('link_timeNum', timeNum);
					setTimeout(() => {
						that.reloadToken();
					}, timeNum);
					localStorage.setItem("userToken", JSON.stringify(localData));
					that.linkByToken(result.data.access_token, obj.cb);
				}
			})
		},
		linkByToken: function (token, cb) {
			var that = this;
			let hubUrl = mmUtils.urls.tokenConnect.str;
			if (that.hubConnection) {
				that.hubConnection.stop();
			}
			that.hubConnection = new signalR.HubConnectionBuilder().withUrl(hubUrl + "?token=" + token).build();

			that.hubConnection.on('connected', data => {
				console.log('connected', data);
				that.hubConnection.invoke('Login');
				if (typeof cb == 'function') {
					cb({
						state: 'connected',
						data: data
					});
				}
			});

			that.hubConnection.on('logined', data => {
				console.log('logined', data);
				if (this.$route.name == 'login') {
					this.$router.push({
						name: 'default',
					});
				}
				if (typeof cb == 'function') {
					cb({
						state: 'logined',
						data: data
					});
				}
			});

			that.hubConnection.on('logout', data => {
				console.log('logout', data);
				if (typeof cb == 'function') {
					that.$store.commit({
						type: 'usertokenchange',
						data: null
					});
					that.$store.commit({
						type: 'apitokenchange',
						data: null
					});
					localStorage.removeItem("userToken");
					that.$router.push({
						name: 'login',
					});
					alert('你的账号在其他地方登录');
					cb({
						state: 'logout',
						data: data
					});
				}
			});
			that.hubConnection.start();
		}
	}
});
