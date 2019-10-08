<template>
    <el-container v-loading.fullscreen="loading" class="childPage" :style="{'height':(contentHeight-40)+'px'}">
		<!--<el-dialog title="添加" :visible.sync="addDlgVisible">
			<el-form :model="addData">
				<template v-for="(r,idx) in dataMap" :key="idx">
					<el-form-item v-if="r.canEdit&&(r.editType=='text'||!r.editType)" :label="r.keyName" :label-width="dlgFormLabelWidth">
						<el-input v-model="addData[r.key]" :disabled="r.editType?false:true" :placeholder="r.placeholder"></el-input>
					</el-form-item>
					<el-form-item v-if="r.canEdit&&r.editType=='select'" :label="r.keyName" :label-width="dlgFormLabelWidth">
						<el-select v-model="addData[r.key]" :placeholder="r.placeholder" @change="addDlgSelectChange(r,addData)">
							<el-option v-if="r.selectData=='permissionCombo'" v-for="(r2,idx2) in permissionCombo" :key="''+r2.id+idx2" :label="r2.label" :value="r2.value"></el-option>
						</el-select>
					</el-form-item>
				</template>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addDlgCancel">取 消</el-button>
				<el-button type="primary" @click="addDlgOk">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="editDlgVisible">
			<el-form :model="editData">
				<template v-for="(r,idx) in dataMap" :key="idx">
					<el-form-item v-if="r.canEdit&&(r.editType=='text'||!r.editType)" :label="r.keyName" :label-width="dlgFormLabelWidth">
						<el-input v-model="editData[r.key]" :disabled="r.editType?false:true" :placeholder="r.placeholder"></el-input>
					</el-form-item>
					<el-form-item v-if="r.canEdit&&r.editType=='select'" :label="r.keyName" :label-width="dlgFormLabelWidth">
						<el-select v-model="editData[r.key]" :placeholder="r.placeholder" @change="editDlgSelectChange(r,editData)">
							<el-option v-if="r.selectData=='permissionCombo'" v-for="(r2,idx2) in permissionCombo" :key="''+r2.id+idx2" :label="r2.label" :value="r2.value"></el-option>
						</el-select>
					</el-form-item>
				</template>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editDlgCancel">取 消</el-button>
				<el-button type="primary" @click="editDlgOk">确 定</el-button>
			</div>
		</el-dialog>
		<el-header height="50px" >
			<el-row>
				<el-col :span="6">
					<div class="gridTitle" v-text="gridTitle"></div>
				</el-col>
				<el-col :span="18">
					<div class="gridTopOpers">
						<el-button icon="el-icon-plus" title="新增" @click="gridAdd"></el-button>
						<el-button icon="el-icon-delete" title="批量删除" @click="gridMultiDelete" ></el-button>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<el-table ref="datatable" :data="tableData" border @selection-change="tableSelsChange" style="width: 100%">
				<el-table-column type="selection" width="50" align="center" fixed :resizable="false"></el-table-column>
				<template v-for="(r,idx) in dataMap" :key="idx">
					<el-table-column v-if="idx<dataMap.length-1" width="150"  :label="r.keyName" :prop="r.key" :resizable="false"></el-table-column>
					<el-table-column v-if="idx==dataMap.length-1" :label="r.keyName" :prop="r.key" :resizable="false"></el-table-column>
				</template>
				<el-table-column width="110" label="操作" fixed="right" :resizable="false">
					<template slot-scope="scope">
						<el-button circle icon="el-icon-edit" title="编辑" size="small" @click="gridEdit(scope.$index,scope.row)"></el-button>
						<el-button circle icon="el-icon-delete" title="删除" size="small" @click="gridDelete(scope.$index,scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer height="42px">
			<el-pagination
				@size-change="pageSizeChange"
				@current-change="pageCurChange"
				:current-page="curPage"
				:page-sizes="pageSizes"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</el-footer>-->
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
	</el-container>
</template>
 
<script>
import MouldPage from '../components/MouldPage';
import FormDlg from '../components/FormDlg';
import mmUtils from '../utils';


export default {
  name: 'permissionPage',
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
        
        loading:false,

			gridTitle:'权限管理',
			
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
				{key:'parentId',keyName:'父节点ID',canEdit:true,editType:'select',selectData:'permisCombo',placeholder:'请选择父节点'},
				{key:'briefDesc',keyName:'描述',canEdit:true,editType:'text',placeholder:'请输入描述'},
				{key:'title',keyName:'标题',canEdit:true,editType:'text',placeholder:'请输入标题'},
				{key:'permissionName',keyName:'权限标识',canEdit:true,editType:'text',placeholder:'请输入权限标识'},
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
				// 	urlName:'getPermissionByPage',
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
			// 	urlName:'getPermission',
			// 	headerKey:'Authorization',
			// 	headerValue:uToken,
			// 	cb:function(rl){
			// 		that.loading=false;
			// 		if(rl.state=='success'){
			// 			var result=rl.data;
			// 			that.$store.commit({
			// 				type: 'permissiondatachange',
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
			var addData={
				briefDesc:'',
				parentId:'',
				title:'',
				permissionName:''
	    	};
			this.$refs.addDlg.show(addData);
		},
		//添加面板确定
		addDlgOk:function(data){
			var that=this;
			// this.$root.loadUrl({
			// 	urlName:'addPermission',
			// 	data:JSON.stringify({
			// 		briefDesc:data.briefDesc,
			// 		parentId:data.parentId,
			// 		title:data.title,
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
				// 	urlName:'deletePermission',
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
			// 	urlName:'updatePermission',
			// 	data:JSON.stringify({
			// 		briefDesc:data.briefDesc,
			// 		parentId:data.parentId,
			// 		title:data.title,
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