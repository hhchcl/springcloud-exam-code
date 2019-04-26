<template>
	<div id="updComponents" class="main-container">
		<el-dialog title="修改组件" :visible.sync="visible" v-if="visible">
			<el-form ref="comsInfo" :model="comsInfo" :rules="rules" class="formEmbedTable mt20">
				<table>
					<tr>
						<td>组件名称：</td>
						<td>
							<el-form-item>
								<el-input v-model="comsInfo.com_NAME" readonly="readonly"></el-input>
							</el-form-item>
						</td>
						<td><span class="cRed">* </span>类型：</td>
						<td>
							<el-form-item>
								<template>
									<el-select v-model="comsInfo.com_TYPE" clearable @clear="clearType()" placeholder="请选择">
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
							<el-form-item>
								<el-input v-model="comsInfo.com_VERSION"></el-input>
							</el-form-item>
						</td>
						<td><span class="cRed">* </span>状态：</td>
						<td>
							<el-form-item>
								<template>
									<el-select v-model="comsInfo.com_STATUS" clearable @clear="clearStatus()" placeholder="请选择">
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
		name: 'updComponents',
		props: ['comsInfoDetail', 'shows'],
		mounted() {
			let _this = this
			_this.visible = _this.shows
			_this.comsInfo = $.extend({}, this.comsInfo, this.comsInfoDetail);
		},
		watch: {
			visible: function(newV, oldV) {
				// 告诉父元素改变show的值
				this.$emit('closeModal', newV)
			},
			shows: function(newV, oldV) {
				this.visible = newV
			},
			comsInfoDetail: function(newV, oldV) {
				this.comsInfo = $.extend({}, this.comsInfo, newV)
			},
		},
		data() {
			return {
				visible: false,
				comsInfo: {
					com_ID: '',
					com_NAME: '',
					com_TYPE: '',
					com_VERSION: '',
					com_STATUS: '',
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
					com_TYPE: [{
						required: true,
						message: '类型不能为空!'
					}, {
						validator: this.$tools.validator.isName,
						trigger: 'blur',
						vm: this,
						forName: 'comsInfo'
					}],
					com_VERSION: [{
						required: true,
						message: '版本不能为空!'
					}, {
						validator: this.$tools.validator.isName,
						trigger: 'blur',
						vm: this,
						forName: 'comsInfo'
					}],
					com_STATUS: [{
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
				_this.comsInfo.com_TYPE = ""
			},
			clearStatus() {
				let _this = this
				_this.comsInfo.com_STATUS = ""
			},
			show() {
				let _this = this
				_this.visible = true
			},
			cancel() {
				let _this = this
				_this.visible = false
				_this.comsInfo = {}
			},
			confirm(formName) {
				let _this = this
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						axios.post('/api' + '/consumer/update.do', _this.comsInfo).then(data => {
							if(data.data.code == 200) {
								_this.$alert("修改成功!", "提示", {
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