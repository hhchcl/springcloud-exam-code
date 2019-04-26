<template>
	<div class="progress-bar">
		<el-row :style="rowStyle">
			<template v-for="index in items.length">
				<div :class="[
          'progress-bar-step-left',
          itemIndex >= (index-1) ? 'progress-bar-step-left-select' : '',
        ]"></div>

				<div :class="[
          'progress-bar-step',
          itemIndex >= (index-1) ? 'progress-bar-step-select' : '',
        ]">{{index}}
				</div>

				<div :class="[
          'progress-bar-step-right',
          itemIndex > (index-1) ? 'progress-bar-step-right-select' : '',
        ]"></div>
			</template>
		</el-row>
		<el-row :style="rowStyle">
			<template v-for="(item, index) in items">
				<div :class="[
          'progress-bar-text',
          itemIndex >= index ? 'progress-bar-text-select' : '',
        ]">{{item}}
				</div>
			</template>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'progress-bar',
		componentName: 'progress-bar',
		data() {
			return {
				rowStyle: {},
			}
		},
		props: {
			items: {
				type: Array
			},
			itemIndex: {
				type: Number
			}
		},
		watch: {
			items: function() {
				this.setStyle()
			}
		},
		created: function() {
			this.setStyle()
		},
		methods: {
			setStyle: function() {
				let rowWidth = (this.items.length * 216) + 'px'
				this.rowStyle = {
					width: rowWidth,
					margin: '0 auto'
				}
			}
		}

	}
</script>

<style lang="scss">
	@import '../../../styles/vars.scss';
	.progress-bar {
		color: $color-text-gray;
		text-align: center;
		height: 70px;
		margin: 0 auto;
	}
	
	.progress-bar-text {
		width: 210px;
		font-size: 14px;
		padding-top: 10px;
		float: left;
	}
	
	.progress-bar-step-left {
		float: left;
		width: 90px;
		height: 13px;
		border-bottom: 10px solid #ccc;
		margin-right: -20px;
	}
	
	.progress-bar-step {
		float: left;
		width: 76px;
		height: 39px;
		line-height: 34px;
		background: url(../../../images/common/stepBg.png) no-repeat;
		color: #fff;
		font-size: 22px;
		position: relative;
		z-index: 2;
	}
	
	.progress-bar-step-right {
		float: left;
		width: 90px;
		height: 13px;
		border-bottom: 10px solid #ccc;
		margin-left: -20px;
	}
	
	.progress-bar .progress-bar-step-left:first-child {
		border-bottom: 0px;
	}
	
	.progress-bar .progress-bar-step-right:last-child {
		border-bottom: 0px;
	}
	
	.progress-bar-text-select {
		color: #f28d01;
	}
	
	.progress-bar-step-select {
		background: url(../../../images/common/stepBgHover.png) no-repeat;
	}
	
	.progress-bar-step-left-select {
		border-bottom: 10px solid #f28d01;
	}
	
	.progress-bar-step-right-select {
		border-bottom: 10px solid #f28d01;
	}
</style>