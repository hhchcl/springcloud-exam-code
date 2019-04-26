<template>
	<div id="detComponents" class="main-container">
		<el-dialog title="详情组件" :visible.sync="visible" v-if="visible">
			<el-form ref="comsInfoDetail" :model="comsInfoDetail" class="formEmbedTable mt20">
				<table>
					<tr>
						<td>组件名称：</td>
						<td>
							<el-form-item>
								{{ comsInfoDetail.com_NAME }}
							</el-form-item>
						</td>
						<td>类型：</td>
						<td>
							<el-form-item>
								{{ comsInfoDetail.com_TYPE }}

							</el-form-item>
						</td>
					</tr>
					<tr>
						<td>版本：</td>
						<td>
							<el-form-item>
								{{ comsInfoDetail.com_VERSION }}
							</el-form-item>
						</td>
						<td>状态：</td>
						<td>
							<el-form-item>
								{{ comsInfoDetail.com_STATUS }}
							</el-form-item>
						</td>
					</tr>
				</table>
				<div class="mt20 tac btn">
					<el-button type="primary" :disabled="true" @click="confirm('comsInfo')">确定</el-button>
					<el-button type="primary" @click="cancel()">取消</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		name: 'detComponents',
		props: ['comsInfoDetail'],
		data() {
			return {
				visible: false,
			}
		},
		methods: {
			show() {
				let _this = this
				_this.visible = true
			},
			cancel() {
				let _this = this
				_this.visible = false
			},
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