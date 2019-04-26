<template>
	<div class="main">
		<slot></slot>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'content',
		componentName: 'content',
		data() {
			return {};
		},
		props: {
			headerInformation: {
				type: Boolean
			},
			headerMenu: {
				type: Boolean
			},
			footerHasMarginTop: {
				type: Boolean,
				default: true
			},
		},
		methods: {
			...mapActions([
				'setHeaderInformation',
				'setHeaderMenu',
				'setFooterHasMarginTop'
			]),
			cancelFormSubmit() {
				let elFormLen = $('.el-form').length // 统计el-form的个数
				// console.log("form个数:" + elFormLen)
				for(let i = 0; i < elFormLen; i++) {
					let obj = $('.el-form').eq(i) //获取el-form的对象
					obj[0].onsubmit = function(e) {
						//  把el-form表单的submit默认事件禁止掉, 按enter不会刷新
						return false
					}
				}
			}
		},
		created: function() {
			let _this = this
			_this.setHeaderInformation(_this.headerInformation)
			_this.setHeaderMenu(_this.headerMenu)
			_this.setFooterHasMarginTop(_this.footerHasMarginTop)
		},
		mounted() {
			// console.log('测试每个页面form的个数:',$('.el-form').length,$('.el-form'))
			this.cancelFormSubmit()
		},
		updated() {
			//  若有新的form生成
			// console.log("form个数:" + $('.el-form').length)
			this.cancelFormSubmit()
		}
	}
</script>

<style>

</style>