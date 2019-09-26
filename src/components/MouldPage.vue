<template>
    <el-container :style="{'height':(contentHeight-40)+'px'}">
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
				<template v-for="(r,idx) in dataMap">
					<el-table-column v-if="idx<dataMap.length-1&&!r.hide&&!r.template" :label="r.keyName" width="150" :prop="r.key" :resizable="false" :key="idx">
                    </el-table-column>
					<el-table-column v-if="idx==dataMap.length-1&&!r.hide&&!r.template" :label="r.keyName" :prop="r.key" :resizable="false" :key="idx">
                    </el-table-column>
					<el-table-column v-if="r.template&&r.tempType=='bool'" width="150" :label="r.keyName" :key="idx">
						<template slot-scope="scope">
							<span>{{scope.row[r.key]?'是':'否'}}</span>
						</template>
					</el-table-column>
				</template>
				<el-table-column :width="operWidth" label="操作" fixed="right" :resizable="false">
					<template slot-scope="scope">
						<el-button v-if="tableOpers.role" circle icon="el-icon-user" title="角色" size="small" @click="gridRoleEdit(scope.$index,scope.row)">
                        </el-button>
						<el-button v-if="tableOpers.permis" circle icon="el-icon-key" title="编辑权限" size="small" @click="gridPermisEdit(scope.$index,scope.row)">
                        </el-button>
						<el-button v-if="tableOpers.edit" circle icon="el-icon-edit" title="编辑" size="small" @click="gridEdit(scope.$index,scope.row)">
                        </el-button>
						<el-button v-if="tableOpers.delete" circle icon="el-icon-delete" title="删除" size="small" @click="gridDelete(scope.$index,scope.row)">
                        </el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer height="42px">
			<el-pagination
				@size-change="pageSizeChange"
				@current-change="pageCurChange"
				:current-page="pageData.curPage"
				:page-sizes="pageData.pageSizes"
				:page-size="pageData.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageData.total">
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
export default {
    props: ['gridTitle', 'tableData', 'dataMap', 'pageData', 'tableOpers'],
	data: function () {
		return {

		}
    },
    mounted: function () {

	},
	computed: {
		contentHeight: function () {
			return this.$store.state.contentHeight;
		},
		operWidth: function () {
			return 42 * Object.keys(this.tableOpers).length + 20;
		}
	},
	methods: {
		gridAdd: function () {
			this.$emit('grid-add');
		},
		gridMultiDelete: function () {
			this.$emit('grid-multi-delete');
		},
		gridRoleEdit: function (idx, row) {
			this.$emit('grid-role-edit', idx, row);
		},
		gridPermisEdit: function (idx, row) {
			this.$emit('grid-permis-edit', idx, row);
		},
		gridEdit: function (idx, row) {
			this.$emit('grid-edit', idx, row);
		},
		gridDelete: function (idx, row) {
			this.$emit('grid-delete', idx, row);
		},
		tableSelsChange: function (rows) {
			this.$emit('table-sels-change', rows);
		},
		pageSizeChange: function (val) {
			this.$emit('page-size-change', val);
		},
		pageCurChange: function (val) {
			this.$emit('page-cur-change', val);
		},
	}
}
</script>