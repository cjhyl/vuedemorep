<template>
    <el-container v-loading.fullscreen="loading" class="childPage" :style="{'height':(contentHeight-40)+'px'}">
		<form-dlg
			ref="addDlg"
			title="添加"
			:datamap="dataMap"
			@ok="addDlgOk"
		>
		</form-dlg>
		<form-dlg
			ref="editDlg"
			title="编辑"
			:datamap="dataMap"
			@ok="editDlgOk"
		>
		</form-dlg>
		<el-main>
			<mould-page
				:gridTitle="gridTitle"
				:tableData="tableData"
				:dataMap="dataMap"
				:pageData="pageData"
				:tableOpers="tableOpers"
				@table-sels-change="tableSelsChange"
				@grid-edit="gridEdit"
				@grid-add="gridAdd"
				@grid-delete="gridDelete"
				@grid-multi-delete="gridMultiDelete"

				@page-size-change="pageSizeChange"
				@page-cur-change="pageCurChange"
			>
			</mould-page>
		</el-main>
	</el-container>
</template>
 
<script>
import MouldPage from '../components/MouldPage';
import FormDlg from '../components/FormDlg';
import mmUtils from '../utils';


export default {
  name: 'menuPage',
  components:{
      'mould-page':MouldPage,
      'form-dlg':FormDlg,
  },
  data () {
    return {
        loading:false,
        	
        
        gridTitle:'菜单管理',
        
        pageData:{
            curPage:1,
            pageSizes:[10, 20, 50, 100],
            pageSize:10,
            total:0,
        },
        reloadTimer:null,
        tableData:[],
        tableSels:[],
        tableOpers:{
            edit:true,
            delete:true
        },
        
        dataMap:[
            {key:'createdTime',keyName:'创建时间',canEdit:false},
            {key:'id',keyName:'ID',canEdit:false,hide:true,},
            {key:'orderId',keyName:'排序优先级',canEdit:true,editType:'text',placeholder:'请输入排序优先级--数值',reg:'number'},
            {key:'parentId',keyName:'父节点ID',canEdit:true,editType:'select',selectData:'menuCombo',placeholder:'请选择父节点'},
            {key:'title',keyName:'标题',canEdit:true,editType:'text',placeholder:'请输入标题'},
            {key:'icon',keyName:'图标',canEdit:true,editType:'text',placeholder:'请输入图标编码'},
            {key:'permissionId',keyName:'权限id',canEdit:true,editType:'select',selectData:'permissionCombo',toLabel:'permissionName',placeholder:'请选择权限'},
            {key:'permissionName',keyName:'权限标识',canEdit:true},
        ],
    }
  },
  computed:{
        languages:function(){
            return this.$store.state.languages;
        },
        contentHeight:function(){
            return this.$store.state.contentHeight;
        },
        dlgFormLabelWidth:function(){
            return this.$store.state.dlgFormLabelWidth;
        },
  },
  mounted:function(){
      this.reloadData();
  },
  beforeDestroy:function(){
  },
  methods:{
      //更新表格数据
		reloadData:function(){
			if(!this.userToken){
				return;
			}
			clearTimeout(this.reloadTimer);
			var that=this;
			this.reloadTimer=setTimeout(function(){
				var uToken=that.userToken;
				that.loading=true;
				// that.$root.loadUrl({
				// 	urlName:'getMenuByPage',
				// 	data:JSON.stringify({
				// 		pageIndex:that.pageData.curPage,
				// 		pageSize:that.pageData.pageSize,
				// 	}),
				// 	headerKey:'Authorization',
				// 	headerValue:uToken,
				// 	cb:function(rl){
				// 		that.loading=false;
				// 		if(rl.state=='success'){
				// 			var result=rl.data;
				// 			that.pageData.total=result.totalRecord;
				// 			that.tableData=result.data;
				// 		}else{
				// 			that.tableData=[];
				// 		}
				// 	}
				// });
			},100);
		},
		//更新全局数据
		reloadStoreData:function(){
			var uToken=this.userToken;
			var that=this;
			that.loading=true;
			// this.$root.loadUrl({
			// 	urlName:'getMenu',
			// 	headerKey:'Authorization',
			// 	headerValue:uToken,
			// 	cb:function(rl){
			// 		that.loading=false;
			// 		if(rl.state=='success'){
			// 			var result=rl.data;
			// 			that.$store.commit({
			// 				type: 'menudatachange',
			// 				data: result.data
			// 			});
			// 		}
			// 	}
			// });
		},
		//分页每页条数change
		pageSizeChange:function(val) {
			this.pageData.pageSize=val;
			this.reloadData();
			console.log(`每页 ${val} 条`,this.pageData);
		},
		//分页当前页数change
		pageCurChange:function(val) {
			this.pageData.curPage=val;
			this.reloadData();
			console.log(`当前页: ${val}`,this.pageData);
		},
		//表格多选change
		tableSelsChange:function(rows){
			this.tableSels = rows;
			console.log('tableSelsChange',rows);
		},
		//点击添加按钮
		gridAdd:function(){
			var data={
				orderId:'',
				parentId:'',
				title:'',
				icon:'',
				permissionId:'',
				permissionName:''
	    	};
	    	this.$refs.addDlg.show(data);
		},
		//添加面板确定
		addDlgOk:function(data){
			var that=this;
			// this.$root.loadUrl({
			// 	urlName:'addMenu',
			// 	data:JSON.stringify({
			// 		orderId:data.orderId,
			// 		parentId:data.parentId,
			// 		title:data.title,
			// 		icon:data.icon,
			// 		permissionId:data.permissionId,
			// 		permissionName:data.permissionName
			// 	}),
			// 	headerKey:'Authorization',
			// 	headerValue:that.userToken,
			// 	cb:function(rl){
			// 		if(rl.state=='success'){
			// 			that.$message('添加成功');
			// 			that.addDlgVisible=false;
			// 			that.reloadData();
			// 			that.reloadStoreData();
			// 		}else{
			// 			that.$message.error('添加失败 '+rl.data.message);
			// 		}
			// 	}
			// });
		},
		//批量删除
		gridMultiDelete:function(){
			this.$store.commit({
				type: 'usertokenchange',
				data: null
			})
			var rows=this.tableSels;
			if(!rows||rows.length<1){
				this.$message.error('请选择要删除的数据');
				return;
			}
			console.log('gridMultiDelete',rows);
		},
		//表格删除
		gridDelete:function(idx,data){
			var that=this;
			this.$confirm('确认删除'+data.title+'?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(function(){
				that.loading=true;
				// that.$root.loadUrl({
				// 	urlName:'deleteMenu',
				// 	urlPr:'/'+data.id,
				// 	headerKey:'Authorization',
				// 	headerValue:that.userToken,
				// 	cb:function(rl){
				// 		that.loading=false;
				// 		if(rl.state=='success'){
				// 			that.$message('删除成功');
				// 			that.reloadData();
				// 			that.reloadStoreData();
				// 		}else{
				// 			that.$message.error('修改失败 '+rl.data.message);
				// 		}
				// 	}
				// });
			});
		},
		//表格编辑
		gridEdit:function(idx,data){
			var editData=mmUtils.deepClone(data);
			this.$refs.editDlg.show(editData);
		},
		//编辑面板确定
		editDlgOk:function(data){
			var that=this;
			that.loading=true;
			// this.$root.loadUrl({
			// 	urlName:'updateMenu',
			// 	data:JSON.stringify({
			// 		orderId:data.orderId,
			// 		parentId:data.parentId,
			// 		title:data.title,
			// 		icon:data.icon,
			// 		permissionId:data.permissionId,
			// 		permissionName:data.permissionName
			// 	}),
			// 	urlPr:'/'+data.id,
			// 	headerKey:'Authorization',
			// 	headerValue:that.userToken,
			// 	cb:function(rl){
			// 		that.loading=false;
			// 		if(rl.state=='success'){
			// 			that.$message('修改成功');
			// 			that.editDlgVisible=false;
			// 			that.reloadData();
			// 			that.reloadStoreData();
			// 		}else{
			// 			that.$message.error('修改失败 '+rl.data.message);
			// 		}
			// 	}
			// });
		},
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>