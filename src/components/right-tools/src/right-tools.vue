<template>
	<div class="right-tools">
		<div class="toolsBox" @click="scrollTop"><i class="el-icon-arrow-up"></i></div>
	</div>
</template>

<script>
	export default {
		name: 'right-tools',
		componentName: 'right-tools',
		data() {
			return {

			};
		},
		props: {
			//headerInformation:{type:Boolean,default:false},
			//headerMenu:{type:Boolean,default:false}
		},
		methods: {
			scrollTop() {
				this.$tools.scrollTop()
			}
		}, // methods
		mounted() {
			$(window).scroll(function() {
				let st = $(this).scrollTop()
				if(st > 400) {
					$(".right-tools").addClass("showRightTools")
				} else {
					$(".right-tools").removeClass("showRightTools")
				}
			})
		},
		updated() { // 更新完成状态

		}
	}
</script>