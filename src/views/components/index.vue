<template>
	<hc-content id="operateMain" :headerInformation="true" :headerMenu="true">
		<div class="main-container lrb pt10" v-if="main">
			<el-form ref="queryForm" :model="queryForm" class="formEmbedTable mt20">
				<table>
					<tr>
						<td>组件名称：</td>
						<td>
							<el-form-item porp="inputName">
								<!--@focus="cleanOther()"-->
								<el-input v-model="queryForm.inputName"></el-input>
							</el-form-item>
						</td>
						<td>类型：</td>
						<td>
							<el-form-item porp="inputType">
								<el-select v-model="queryForm.inputType" clearable @clear="clearType()" placeholder="请选择">
									<el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</td>
						<td>状态：</td>
						<td>
							<el-form-item porp="inputStatus">
								<el-select ref="status" v-model="queryForm.inputStatus" clearable @clear="clearStatus()" placeholder="请选择">
									<el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</td>
						<td class="td_01">
							<el-button type="primary" @click="queryList()">查询</el-button>
							<el-button @click="clearAll()">重置</el-button>
						</td>
					</tr>
				</table>
				<div class="div_test">
					<el-button type="primary" @click="add()">新增</el-button>
					<el-button type="danger" @click="deletes()">删除</el-button>
					<el-button type="primary" @click="shelves()">上架</el-button>
					<el-button type="primary" @click="theShelves()">下架</el-button>
				</div>
				<div class="fourForm tableForm mt20 tableData">
					<el-table :data="querysList" :height="tableHeight"
						v-loading="loading2" element-loading-text="拼命加载中" 
						@selection-change="handleSelectionChange">
						<el-table-column label="选择" width="100" align="center" type="selection">
							<!--<template slot-scope="scope">
										<el-radio-group v-model="selectedCst">
											<el-radio class="radio ml10" :label="scope.row" @change="handleSelectChange(scope.row)">&nbsp;</el-radio>
										</el-radio-group>
									</template>-->
						</el-table-column>
						<el-table-column prop="com_NAME" label="组件名称" align="center">
							<template slot-scope="scope">
								<el-button type="text" @click="openDetail(scope.row.com_NAME)" class="cBlue"><span>{{scope.row.com_NAME}}</span></el-button>
							</template>
						</el-table-column>
						<el-table-column prop="com_TYPE" label="类型" align="center"></el-table-column>
						<el-table-column prop="com_VERSION" label="版本" align="center"></el-table-column>
						<el-table-column prop="com_STATUS" label="状态" align="center">
							<!--<template slot-scope="scope">
									{{$tools.dict.getStt(scope.row.com_STATUS)}}
								</template>-->
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button @click.native.prevent="update(scope.row.com_NAME)">修改</el-button>
								<el-button type="primary" @click="openDetail(scope.row.com_NAME)">查看</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="pagination tar mt20">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Number(queryForm.currentPage)" :page-sizes="[5, 10, 15, 20]" :page-size="Number(queryForm.turnPageShowNum)" layout="total, sizes, prev, pager, next, jumper" :total="Number(turnPageTotalNum)">
						</el-pagination>
				    </div>
				</div>
			</el-form>
			<div class="main-container">
				<AddComponents ref="isAdd" v-if="addFlag" @back="backMain"></AddComponents>
				<UpdComponents ref="isUpd" :shows="updFlag" @closeModal="closeModal" :comsInfoDetail="comsInfoDetail" @back="backMain"></UpdComponents>
				<DetComponents ref="isDet" v-if="detFlag" :comsInfoDetail="comsInfoDetail" @back="backMain"></DetComponents>
			</div>
	    </div>
	</hc-content>
</template>
<script>
	import axios from 'axios'
	import AddComponents from './components/addComponents'
	import UpdComponents from './components/updComponents'
	import DetComponents from './components/detComponents'
	export default {
		name: 'index',
		components: {
			AddComponents,
			UpdComponents,
			DetComponents
		},
		data() {
			return {
				loading2: false,
				main: true,
				addFlag: false,
				updFlag: false,
				detFlag: false,
				tableHeight: window.innerHeight * 0.6, // 表格自适应高度（不太友好，能用）
				queryForm: {
					inputName: '',
					inputType: '',
					inputStatus: '',
					COM_NAME: '',
					COM_TYPE: '',
					COM_STATUS: '',
					currentPage: '1',
					turnPageShowNum: '10'
				},
				turnPageTotalNum: '',
				selectRadio: {},
				selectedCst: {},
				querysList: [],
				comsInfoDetail: {},
				multipleSelection: [],
				optionsType: [{
						value: '基础设施',
						label: '基础设施'
					},
					{
						value: '业务中台',
						label: '业务中台'
					}
				],
				optionsStatus: [{
						value: '上架',
						label: '上架'
					},
					{
						value: '下架',
						label: '下架'
					}
				],
				inputName: '',
				inputType: '',
				inputStatus: '',
			}
		},
		methods: {
			closeModal(...data) {
				this.showAlertModal = data[0]
			},
			clearAll() {
				let _this = this
				_this.queryForm.inputName = ""
				_this.queryForm.COM_NAME = ""
				_this.queryForm.inputType = ""
				_this.queryForm.COM_TYPE = ""
				_this.queryForm.inputStatus = ""
				_this.queryForm.COM_STATUS = ""
			},
			clearType() {
				let _this = this
				_this.queryForm.inputType = ""
				_this.queryForm.COM_TYPE = ""
			},
			clearStatus() {
				let _this = this
				_this.queryForm.inputStatus = ""
				_this.queryForm.COM_STATUS = ""
			},
			queryList() {
				let _this = this
				_this.querysList = []
				if(_this.queryForm.inputName != '' || _this.queryForm.inputName != null) {
					_this.queryForm.COM_NAME = _this.queryForm.inputName
				}
				if(_this.queryForm.inputType != '' || _this.queryForm.inputType != null) {
					_this.queryForm.COM_TYPE = _this.queryForm.inputType
				}
				if(_this.queryForm.inputStatus != '' || _this.queryForm.inputStatus != null) {
					_this.queryForm.COM_STATUS = _this.queryForm.inputStatus
				}
				axios.post('/api' + '/consumer/queryList.do', _this.queryForm).then(data => {
					if(data.data.code == 200) {
						_this.querysList = data.data.queryList
						_this.turnPageTotalNum = data.data.turnPageTotalNum
						_this.loading2 = false
					} else {
						_this.turnPageTotalNum = data.data.turnPageTotalNum
						_this.querysList = []
						_this.$alert(data.data.errorMsg, "提示", {
							confirmButtonText: '确定',
							type: 'warning',
							callback: action => {}
						})
						_this.loading2 = false
					}
				})
			},
			handleCurrentChange(val) { //分页方法
				let _this = this
				_this.queryForm.currentPage = val;
				_this.queryList()
			},
			handleSizeChange(val) { //切换每页显示条数方法
				let _this = this
				_this.queryForm.turnPageShowNum = ''
				_this.queryForm.currentPage = '1'
				_this.queryForm.turnPageShowNum = val;
				_this.queryList()
			},
			handleSelectionChange(val) { //多选删除
				let _this = this
				for(let i = 0; i < val.length; i++) {
					_this.multipleSelection.push(val[i].com_NAME)
				}
				console.log("_this.multipleSelection", _this.multipleSelection)
			},
			openDetail(val) {
				let _this = this
				for(let i = 0; i < _this.querysList.length; i++) {
					if(_this.querysList[i].com_NAME == val) {
						_this.comsInfoDetail = _this.querysList[i];
						break;
					}
				}
				if(_this.detFlag) {
					_this.$refs['isDet'].show()
				} else {
					_this.$refs['isDet'].cancel()
				}
			},
			backMain() {
				let _this = this
				_this.$refs['isAdd'].cancel()
				_this.$refs['isUpd'].cancel()
				_this.$refs['isDet'].cancel()
				_this.querysList = []
				_this.queryList()
			},
			add() {
				let _this = this
				if(_this.addFlag) {
					_this.$refs['isAdd'].show()
				} else {
					_this.$refs['isAdd'].cancel()
				}
			},
			update(val) {
				let _this = this
				for(let i = 0; i < _this.querysList.length; i++) {
					if(_this.querysList[i].com_NAME == val) {
						_this.comsInfoDetail = _this.querysList[i];
						break;
					}
				}
				_this.updFlag = true
			},
			deletes() {
				let _this = this
				if(_this.multipleSelection == '') {
					_this.$alert("请选择一条或多条记录!", "提示", {
						confirmButtonText: '确定',
						type: 'warning',
						callback: action => {}
					})
				} else {
					_this.$confirm("确定要删除记录？", "提示", {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						axios.post('/api' + '/consumer/delete.do', _this.multipleSelection).then(data => {
							if(data.data.code == 200) {
								_this.$alert("删除成功!", "提示", {
									confirmButtonText: '确定',
									type: 'success',
									callback: action => {}
								})
							} else {
								_this.$alert("删除失败!", "提示", {
									confirmButtonText: '确定',
									type: 'warning',
									callback: action => {}
								})
							}
						})
						_this.queryList();
					}).catch(() => {})
				}
			},
			shelves() {
				let _this = this
				_this.queryForm.currentPage = '1'
				_this.queryForm.inputStatus = '上架'
				_this.queryList();

			},
			theShelves() {
				let _this = this
				_this.queryForm.currentPage = '1'
				_this.queryForm.inputStatus = '下架'
				_this.queryList();
			}
		},
		mounted() {
			let _this = this
			_this.loading2 = true
			_this.queryList()
			_this.$refs['queryForm'].validate((valid) => {
				if(valid) {
					_this.addFlag = true
					_this.detFlag = true
					//_this.updFlag = true
				}
			})
			//_this.tableHeight = document.body.clientHeight
    console.log("tableHeight",_this.tableHeight)
		},
	}
</script>
<style>
	.td_01 {
		text-align: left;
	}
	
	.div_test {
		text-align: left;
		margin-top: 5px;
	}
</style>