<template>
	<div id="addComponents" class="main-container">
		<el-dialog title="新增组件" :visible.sync="visible" v-if="visible">
			<el-form ref="comsInfo" :rules="rules" :model="comsInfo" class="formEmbedTable mt20">
				<table>
					<tr>
						<td><span class="cRed">* </span>组件名称：</td>
						<td>
							<el-form-item prop="COM_NAME">
								<el-input v-model="comsInfo.COM_NAME"></el-input>
							</el-form-item>
						</td>
						<td><span class="cRed">* </span>类型：</td>
						<td>
							<el-form-item prop="COM_TYPE">
								<template>
									<el-select v-model="comsInfo.COM_TYPE" clearable @clear="clearType()" placeholder="请选择">
										<el-option v-for="item in optionTypes" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-form-item>
						</td>
					</tr>
					<tr>
						<td><span class="cRed">* </span>版本：</td>
						<td>
							<el-form-item prop="COM_VERSION">
								<el-input v-model="comsInfo.COM_VERSION"></el-input>
							</el-form-item>
						</td>
						<td><span class="cRed">* </span>状态：</td>
						<td>
							<el-form-item prop="COM_STATUS">
								<template>
									<el-select v-model="comsInfo.COM_STATUS" clearable @clear="clearStatus()" placeholder="请选择">
										<el-option v-for="item in optionStatus" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-form-item>
						</td>
					</tr>
				</table>
				<div class="mt20 tac btn">
					<el-button type="primary" @click="confirm('comsInfo')">确定</el-button>
					<el-button type="primary" @click="cancel()">取消</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		name: 'addComponents',
		data() {
			return {
				visible: false,
				comsInfo: {
					COM_ID: '',
					COM_NAME: '',
					COM_TYPE: '',
					COM_VERSION: '',
					COM_STATUS: '',
				},
				optionTypes: [{
					value: '基础设施',
					label: '基础设施'
				}, {
					value: '业务中台',
					label: '业务中台'
				}],
				optionStatus: [{
					value: '上架',
					label: '上架'
				}, {
					value: '下架',
					label: '下架'
				}],
				rules: {
					COM_NAME: [{
						required: true,
						message: '组件名称不能为空!'
					}, {
						validator: this.$tools.validator.isName,
						trigger: 'blur',
						vm: this,
						forName: 'comsInfo'
					}],
					COM_TYPE: [{
						required: true,
						message: '类型不能为空!'
					}, {
						validator: this.$tools.validator.isName,
						trigger: 'blur',
						vm: this,
						forName: 'comsInfo'
					}],
					COM_VERSION: [{
						required: true,
						message: '版本不能为空!'
					}, {
						validator: this.$tools.validator.isName,
						trigger: 'blur',
						vm: this,
						forName: 'comsInfo'
					}],
					COM_STATUS: [{
						required: true,
						message: '状态不能为空!'
					}, {
						validator: this.$tools.validator.isName,
						trigger: 'blur',
						vm: this,
						forName: 'comsInfo'
					}],
				},
			}
		},
		methods: {
			clearType() {
				let _this = this
				_this.queryForm.COM_TYPE = ""
			},
			clearStatus() {
				let _this = this
				_this.queryForm.COM_STATUS = ""
			},
			show() {
				let _this = this
				_this.visible = true
			},
			cancel() {
				let _this = this
				_this.visible = false
				_this.comsList = {}
			},
			confirm(formName) {
				let _this = this
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						axios.post('/api' + '/consumer/add.do', _this.comsInfo).then(data => {
							if(data.data.count > 0) {
								_this.$alert("该组件名称已存在!", "提示", {
									confirmButtonText: '确定',
									type: 'warning',
									callback: action => {}
								})
							} else {
								if(data.data.code == 200) {
									_this.$alert("新增成功!", "提示", {
										confirmButtonText: '确定',
										type: 'success',
										callback: action => {}
									})
									_this.comsInfo = {}
									_this.$emit("back")
								} else {
									_this.$alert(data.data.errorMsg, "提示", {
										confirmButtonText: '确定',
										type: 'warning',
										callback: action => {}
									})
									_this.$emit("back")
								}
							}
						})
					}
				})
			}
		},
	}
</script>
<style>
	.el-dialog {
		border-radius: 10px !important;
	}
	
	.el-dialog__body {
		padding: 0px 20px !important;
	}
	
	.btn {
		padding: 10px 0px;
	}
	
	.mt20 {
		margin-top: 10px;
	}
</style>