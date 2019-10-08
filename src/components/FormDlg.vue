<template>
    <el-dialog :title="title" :visible.sync="shown">
		<el-form ref="form" :model="formData" :rules="rules" v-if="formData">
			<template v-for="(r,idx) in datamap">

				<el-form-item v-if="r.canEdit&&(r.editType=='text'||!r.editType)&&!r.hide" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx">
					<el-input v-model="formData[r.key]" :disabled="r.editType?false:true" :placeholder="r.placeholder"></el-input>
				</el-form-item>

				<el-form-item v-if="r.canEdit&&r.editType=='checkBox'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx">
					<el-checkbox v-model="formData[r.key]"></el-checkbox>
				</el-form-item>

				<el-form-item v-if="r.canEdit&&r.editType=='select'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx">
					<el-select v-model="formData[r.key]" :placeholder="r.placeholder" @change="selectChange(r)">
                        <template v-if="r.selectData=='permissionCombo'">
                            <el-option v-for="(r2,idx2) in permissionCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                            </el-option>
                        </template>
						
                        <template v-if="r.selectData=='permisCombo'">
                            <el-option v-for="(r2,idx2) in permisCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                            </el-option>
                        </template>
						
                        <template v-if="r.selectData=='menuCombo'">
                            <el-option v-for="(r2,idx2) in menuCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                            </el-option>
                        </template>
						
                        <template v-if="r.selectData=='roleCombo'">
                            <el-option v-for="(r2,idx2) in roleCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                            </el-option>
                        </template>
						
                        <template v-if="r.selectData=='apiUserStatusCombo'">
                            <el-option v-for="(r2,idx2) in apiUserStatusCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                            </el-option>
                        </template>
                        <template v-if="r.selectData=='appRoleStatusCombo'">
                            <el-option v-for="(r2,idx2) in appRoleStatusCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                            </el-option>
                        </template>
						
                        <template v-if="r.selectData=='appStatusCombo'">
                            <el-option v-for="(r2,idx2) in appStatusCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                            </el-option>
                        </template>
						
                        <template v-if="r.selectData=='appActCombo'">
                            <el-option v-for="(r2,idx2) in appActCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                            </el-option>
                        </template>
					</el-select>
				</el-form-item>

				<el-form-item v-if="r.canEdit&&r.editType=='mselect'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx">
					<el-select v-model="formData[r.key]" :placeholder="r.placeholder" multiple style="width:100%;" >
                        <template v-if="r.selectData=='appRoleCombo'">
                            <el-option v-for="(r2,idx2) in appRoleCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                            </el-option>
                        </template>
					</el-select>
				</el-form-item>
				
				<el-form-item v-if="r.canEdit&&r.editType=='date'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx">
					<el-date-picker v-model="formData[r.key]" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions">
    			</el-date-picker>
				</el-form-item>
				
			</template>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancel">取 消</el-button>
			<el-button type="primary" @click="ok">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import mmUtils from '../utils'

export default {
    props: ['title', 'datamap'],
    data: function () {
		return {
			shown: false,
			formData: null,
			value1: '',
			// 日期时间控件配置
			pickerOptions: {
				shortcuts: [{
					text: '今天',
					onClick(picker) {
						picker.$emit('pick', new Date());
					}
				}, {
					text: '明天',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() + 3600 * 1000 * 24);
						picker.$emit('pick', date);
					}
				}, {
					text: '一周后',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
						picker.$emit('pick', date);
					}
				}]
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
		permissionCombo: function () {
			return this.$store.state.permissionCombo;
		},
		permisCombo: function () {
			var newData = mmUtils.deepClone(this.permissionCombo);
			if (!newData) {
				newData = [{
					value: '0',
					label: '根节点'
				}];
			} else {
				newData.unshift({
					value: '0',
					label: '根节点'
				});
			}
			return newData;
		},
		menuCombo: function () {
			return this.$store.state.menuCombo;
		},
		roleCombo: function () {
			return this.$store.state.roleCombo;
		},
		apiUserStatusCombo: function () {
			return this.$store.state.apiUserStatusCombo;
		},
		appRoleStatusCombo: function () {
			return this.$store.state.appRoleStatusCombo;
		},
		appStatusCombo: function () {
			return this.$store.state.appStatusCombo;
		},
		appRoleCombo: function () {
			return this.$store.state.appRoleCombo;
		},
		appActionCombo: function () {
			return this.$store.state.appActionCombo;
		},
		appActCombo: function () {
			var newData = mmUtils.deepClone(this.appActionCombo);
			if (!newData) {
				newData = [{
					value: '0',
					label: '根节点'
				}];
			} else {
				newData.unshift({
					value: '0',
					label: '根节点'
				});
			}
			return newData;
		},
		rules: function () {
			var dm = this.datamap;
			var rObj = {};
			for (let i = 0; i < dm.length; i++) {
				rObj[dm[i].key] = [];
				if (dm[i].canEdit && dm[i].editType && !dm[i].canEmpty) {//非空验证
					if (dm[i].editType !== 'date') {
						rObj[dm[i].key].push({ required: true, message: dm[i].keyName + '不能为空' });
					}
				}
				if (dm[i].reg && dm[i].reg == 'number') {//数值验证
					rObj[dm[i].key].push({
						validator: (rule, value, callback) => {
							if (mmUtils.checkNum(value)) {
								callback();
							} else {
								callback(new Error(dm[i].keyName + '必须为数值'));
							}
						}
					});
				}
				if (dm[i].reg && dm[i].reg == 'phone') {//手机号验证
					rObj[dm[i].key].push({
						validator: (rule, value, callback) => {
							if (mmUtils.checkPhone(value)) {
								callback();
							} else {
								callback(new Error(dm[i].keyName + '须为正确的手机号格式'));
							}
						}
					});
				}
				if (dm[i].reg && dm[i].reg == 'idcard') {//身份证验证
					rObj[dm[i].key].push({
						validator: (rule, value, callback) => {
							if (mmUtils.checkIdcard(value)) {
								callback();
							} else {
								callback(new Error(dm[i].keyName + '须为正确的身份证格式'));
							}
						}
					});
				}
				if (dm[i].reg && dm[i].reg == 'email') {//邮箱验证
					rObj[dm[i].key].push({
						validator: (rule, value, callback) => {
							if (mmUtils.checkEmail(value)) {
								callback();
							} else {
								callback(new Error(dm[i].keyName + '须为正确的邮箱格式'));
							}
						}
					});
				}
			}
			return rObj;
		},
	},
	methods: {
		show: function (data) {
			this.formData = data;
			console.log('this.formData',this.formData)
			this.shown = true;
		},
		cancel: function () {
			this.shown = false;
		},
		ok: function () {
			var data = this.formData;
			console.log(data)
			this.$refs.form.validate((valid) => {
				if (valid) {
					console.log('数据验证通过');
					this.$emit('ok', data);
					this.shown = false;
				} else {
					this.$message.error('数据验证未通过');
					return false;
				}
			});

		},
		selectChange: function (r) {
			if (r.toLabel && r.selectData) {
				var comboData = this[r.selectData];
				for (var i = 0; i < comboData.length; i++) {
					if (this.formData[r.key] == comboData[i].value) {
						this.formData[r.toLabel] = comboData[i].label;
						break;
					}
				}
			}
		}
	}
}
</script>