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
        icon:'el-icon-setting',
        orderId:0,
        title:'菜单管理',
        parentId:'0',
        permissionId:'1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"1",
      },{
        icon:'el-icon-location',
        orderId:0,
        title:'权限管理',
        parentId:'0',
        permissionId:'2',
        permissionName:'bbbccc',
        createdTime:'19820221',
        id:"2",
      },{
        icon:'el-icon-setting',
        orderId:0,
        title:'测试3',
        parentId:'0',
        permissionId:'1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"3",
      },{
        icon:'el-icon-setting',
        orderId:0,
        title:'测试3-1',
        parentId:'3',
        permissionId:'1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"3-1",
      },{
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
		permissionData:[{
      createdTime:'2019-10-08',
      id:'aa1',
      parentId:'0',
      briefDesc:'菜单管理权限',
      title:'菜单管理',
      permissionName:'menu permission'
    },{
      createdTime:'2019-10-08',
      id:'rg3',
      parentId:'0',
      briefDesc:'角色管理权限',
      title:'角色管理',
      permissionName:'role permission'
    }],
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
      var newAry=[{
        value: '0',
        label: '根节点'
      }];
      var oldAry=state.menuData.map(function(item){
        item.label=item.title;
        item.value=item.id;
        return item;
      });
      if(!oldAry||oldAry.length<1){
        return newAry;
      }else{
        return newAry.concat(oldAry);
      }
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
    permissionCombo(state){
      var newAry=[{
        value: '0',
        label: '根节点'
      }];
      var oldAry=state.permissionData.map(function(item){
        item.label=item.title;
        item.value=item.id;
        return item;
      });
      if(!oldAry||oldAry.length<1){
        return newAry;
      }else{
        return newAry.concat(oldAry);
      }
    },
		permissionTree(state){
      var newAry = state.permissionData.map(function (item) {
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
    selmenuchange(state, data) {
			state.selMenu = data.data;
    },
    menudatachange(state, data) {
			state.menuData = data.data;
    },
    permissiondatachange(state, data) {
			state.permissionData = data.data;
    },
  },
  actions:{

  }
})
