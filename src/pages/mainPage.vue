<template>
    <el-container v-loading.fullscreen="initLoading">
		<el-header class="mmHeader" height="50px" >
			<div class="lBg">
				<div class="rc">
					<img class="logo" src="../../static/images/logo.png" />
				</div>
				<!--<div class="rc">
					<el-select v-model="selM1" placeholder="请选择">
						<el-option
							v-for="(r,idx) in m1"
							:key="idx"
							:label="r.name"
							:value="r.id"
							>
						</el-option>
					</el-select>
				</div>
				<div class="rc">
					<el-select v-model="selM2" placeholder="请选择">
						<el-option
							v-for="(r,idx) in m2"
							:key="idx"
							:label="r.name"
							:value="r.id"
							>
						</el-option>
					</el-select>
				</div>-->
			</div>
			<div class="rBg">
				<el-select v-model="selLan" placeholder="请选择">
					<el-option
						v-for="(r,idx) in languages"
						:key="idx"
						:label="selLan=='en'?r.en:r.cn"
						:value="r.val"
						>
					</el-option>
				</el-select>
				<el-select v-model="selRole" placeholder="请选择">
					<el-option
						v-for="(r,idx) in roles"
						:key="idx"
						:label="r.label"
						:value="r.value"
						>
					</el-option>
				</el-select>
			</div>
		</el-header>
		<el-container>
			<el-aside :width="isCollapse?'65px':'201px'" :style="{'height':contentHeight+'px'}" class="leftMenu">
				<el-scrollbar>
					<div class="collapseBg">
						<i :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}" @click="handleCollapse"></i>
					</div>
					<data-menu 
					:mycollapse="isCollapse"
					:datas="menuTree"
					:sel="selMenu"
					@myselect="handleSelect">
					</data-menu>
				</el-scrollbar>
			</el-aside>
			<el-main >
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
 
<script>
import DataMenu from '../components/DataMenu';


export default {
  name: 'mainPage',
  components:{
      'data-menu':DataMenu
  },
  data () {
    return {
      isCollapse:true,
//				{key:'orderId',keyName:'排序优先级',canEdit:true},
//				{key:'parentId',keyName:'父节点ID',canEdit:true},
//				{key:'title',keyName:'标题',canEdit:true},
//				{key:'permissionId',keyName:'权限id',canEdit:true},
//				{key:'permissionName',keyName:'权限名',canEdit:true},
//				{key:'icon',keyName:'图标',canEdit:true},
//				{key:'createdTime',keyName:'创建时间',canEdit:false},
//				{key:'id',keyName:'ID',canEdit:false}
			menuMap:{
				'1':'menu',
				'2':'permission',
				'6BA1B9E47508CCE6':'role',
				'09A27FAB4840BB30':'user',
				'0BA8AB1013593657':'test1',
				'3C67E0DC97760D33':'app',
				'4CB5F3E5298E9331':'app_role',
				'A156AF0B9344D7B0':'app_action',
				'ECC1AE4EEB782190':'app_module',
			},
			selLan:'cn',
			roles:[
				{label:'admin',value:'1'},
				{label:'guest',value:'2'}
			],
			selRole:'1',
			
			loading:false,
			
			initMenu:false,
			initPermission:false,
			initRole:false,
			initApiUserStatus:false,
			initAppRoleStatus:false,
			initAppRole:false,
			initAppAction:false,
    }
  },
  computed:{
    languages:function(){
        return this.$store.state.languages;
    },
    copyrightStr:function(){
        return this.$store.state.copyright;
    },
    contentHeight:function(){
        return this.$store.state.contentHeight;
    },
    menuTree:function(){
        return this.$store.getters.menuTree;
    },
    selMenu:function(){
        return this.$store.state.selMenu;
    },
    initLoading:function(){
        // var bEnd=this.initMenu&&this.initPermission&&this.initRole&&this.initApiUserStatus&&this.initAppRoleStatus&&this.initAppRole&&this.initAppAction;
        // return !bEnd;
        return false;
    }
  },
  mounted:function(){
	this.$root.resizeWindow();
	var that=this;
	setTimeout(function(){
		console.log('ddd',that.selMenu);
		that.handleSelect(that.selMenu);
	});
  },
  beforeDestroy:function(){
  },
  methods:{
    //   loadMenu:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getMenu',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initMenu=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'menudatachange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadPermission:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getPermission',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initPermission=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'permissiondatachange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadRole:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getRole',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initRole=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'roledatachange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadApiUserStatus:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getApiUserStatus',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initApiUserStatus=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'apiuserstatuschange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadAppRoleStatus:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getApp_RoleStatus',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initAppRoleStatus=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'approlestatuschange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadAppRole:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getApp_Role',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initAppRole=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'approlechange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadAppAction:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getAppAction',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initAppAction=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'appactionchange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
		handleCollapse:function(){
			console.log('this',this);
			this.isCollapse=!this.isCollapse;
		},
		handleSelect:function(key,keyPath){
			this.$store.commit({
				type: 'selmenuchange',
				data: ''+key
			});
			this.$router.push({
				name: this.menuMap[key]?this.menuMap[key]:'default',
			});
			console.log('handleSelect',key,keyPath);
		},
//		handleOpen(key, keyPath) {
//			console.log(key, keyPath);
//		},
//		handleClose(key, keyPath) {
//			console.log(key, keyPath);
//		}
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>