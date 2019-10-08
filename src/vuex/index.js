import Vue from 'vue'
import Vuex from 'vuex'
import mmUtils from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    helloMsg:"Welcome to Your Vue.js App",
    lastPath: '',
		languages: [
			{ val: 'en', en: 'English', cn: '英文' },
			{ val: 'cn', en: 'Chinese', cn: '中文' }
		],
		copyright: 'copyright © 2007-2019 chaunve Inc. 保留所有权利。',
		dlgFormLabelWidth: '120px',
		contentHeight: 600,
		apiToken: null,
		userToken: null,
		menuData: [{
        index:'1',
        label:'菜单管理',
        icon:'el-icon-setting',
        orderId:0,
        title:'菜单管理',
        parentId:'0',
        permissionId:'1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"1",
      },{
        index:'2',
        label:'权限管理',
        icon:'el-icon-location',
        orderId:0,
        title:'权限管理',
        parentId:'0',
        permissionId:'2',
        permissionName:'bbbccc',
        createdTime:'19820221',
        id:"2",
      },{
        index:'3',
        label:'测试3',
        icon:'el-icon-setting',
        orderId:0,
        title:'测试3',
        parentId:'0',
        permissionId:'1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"3",
      },{
        index:'3-1',
        label:'测试3-1',
        icon:'el-icon-setting',
        orderId:0,
        title:'测试3-1',
        parentId:'3',
        permissionId:'1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"3-1",
      },{
        index:'3-2',
        label:'测试3-2',
        icon:'el-icon-setting',
        orderId:0,
        title:'测试3-1',
        parentId:'3',
        permissionId:'1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"3-2",
      },
    ],
		selMenu: "0",
		permissionData: null,
		permissionCombo: null,
		permissionTree: null,
		roleData: null,
		roleCombo: null,
		apiUserStatus: null,
		apiUserStatusCombo: null,

		appStatusCombo:null,
		
		appRole:null,
		appRoleCombo:null,
		appRoleStatus:null,
		appRoleStatusCombo:null,
		appAction:null,
    appActionCombo:null,
  },
  getters:{
    otherHelloMsg(state){
      return "Other "+state.helloMsg;
    },
    menuCombo(state){
      var newAry=mmUtils.deepClone(state.menuData);
      newAry.unshift({
				value: '0',
				label: '根节点'
			});
      return newAry;
    },
    menuTree(state){
      var newAry = state.menuData.map(function (item) {
				item.index = item.id;
				item.label = item.title;
				return item;
			});
      var treeAry = mmUtils.menuToTree(newAry, '0');
      return treeAry;
    },
  },
  mutations:{
    helloMsgChange(state,data){
      state.helloMsg=data
    },
    pathchange(state, data) {
			state.lastPath = data.data;
		},
    cheightchange(state, data) {
			state.contentHeight = data.data;
    },
    selmenuchange: function (state, data) {
			state.selMenu = data.data;
		},
  },
  actions:{

  }
})
