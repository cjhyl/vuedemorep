<template>
    <el-dialog v-loading="loading" :title="title" :visible.sync="shown">
		<span>权限列表</span>
		<el-tree 
			ref="tree"
			show-checkbox 
			:data="permissionTree" 
			:props="treeProps" 
			node-key="id"
			@check-change="checkChange"
		>
		</el-tree>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancel">取 消</el-button>
			<el-button type="primary" @click="ok">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
    props: [],
	data: function () {
		return {
			title: '添加',
			shown: false,
			roleData: null,
			permisData: [],
			loading: false,
			operType: 'add',
			treeProps: {
				children: 'children',
				label: 'label'
			},
		}
    },
    mounted: function () {
		//this.sel=this.sel;
	},
	computed: {
		dlgFormLabelWidth: function () {
			return this.$store.state.dlgFormLabelWidth;
		},
		permissionData: function () {
			return this.$store.state.permissionData;
		},
		permissionTree: function () {
			return this.$store.state.permissionTree;
		},
		apiToken: function () {
			return this.$store.state.apiToken;
		},
		userToken: function () {
			return this.$store.state.userToken;
		},
		checks: function () {
			return this.permisData.map(function (item) {
				return item.id;
			});
		}
	},
	methods: {
		show: function (data) {
			this.shown = true;
			this.roleData = data;
			this.title = '添加';
			this.permisData = [];
			this.operType = 'add';
			this.loadRolePermisData(data);
		},
		loadRolePermisData: function (data) {
			this.loading = true;
			var that = this;
			var uToken = this.userToken;
			this.$root.loadUrl({
				urlName: 'getRolePermission',
				urlPr: '/' + data.id,
				headerKey: 'Authorization',
				headerValue: uToken,
				cb: function (rl) {
					that.loading = false;
					if (rl.state == 'success' || rl.state == 'empty') {
						var result = rl.data;
						var data = result.data;
						if (data && data.length > 0) {
							that.title = "编辑";
							that.operType = 'edit';
							that.permisData = data.map(function (item) {
								for (var i = 0; i < that.permissionData.length; i++) {
									if (item.permissionId == that.permissionData[i].id) {
										return that.permissionData[i];
									}
								}
							});
							that.$refs.tree.setCheckedNodes(that.permisData);
						} else {
							that.$refs.tree.setCheckedNodes([]);
						}
					} else {
						that.$refs.tree.setCheckedNodes([]);
					}
				}
			});
		},
		cancel: function () {
			//this.shown=false;
			this.permisData = [];
		},
		ok: function () {
			var urlPr = '',
				urlName = 'addRolePermission',//默认为添加
				data = JSON.stringify({
					roleId: this.roleData.id,
					permissionlst: this.permisData.map(function (item) {
						return {
							permissionId: item.id,
							permissionName: item.permissionName
						}
					})
				});
			if (this.operType == 'edit') {//判定为编辑
				urlPr = '/' + this.roleData.id;
				urlName = 'updateRolePermission';
			}
			var that = this;
			var uToken = this.userToken;
			that.loading = true;
			//添加或编辑操作
			this.$root.loadUrl({
				urlName: urlName,
				urlPr: urlPr,
				data: data,
				headerKey: 'Authorization',
				headerValue: uToken,
				cb: function (rl) {
					that.loading = false;
					if (rl.state == 'success') {
						that.$emit('ok');
						that.shown = false;
						that.$message(that.title + '成功');
					} else {
						that.$message(that.title + '失败');
					}
				}
			});

		},
		checkChange: function () {
			this.permisData = this.$refs.tree.getCheckedNodes();
			console.log(this.permisData);
		},
	}
}
</script>