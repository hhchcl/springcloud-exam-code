<template>
	<div id="app" class="page">
		<hc-header></hc-header>
		<div class="contentMain haveMenu-reset">
			<transition name="fade" mode="out-in">
				<!--<router-view></router-view>-->
				<index></index>
			</transition>
		</div>
		<!--</el-menu>-->
		<hc-footer></hc-footer>
		<hc-right-tools></hc-right-tools>
	</div>
</template>

<script>
	import index from './views/components/index'
	/*export default {
	  name: 'App',
	  components: {
	    index
	  }
	}*/
	//import { mapGetters } from 'vuex'
	export default {
		name: 'App',
		components: {
			index
		},
		/*computed: {
			// 使用对象展开运算符将 getters 混入 computed 对象中
			...mapGetters([
				'getHeaderInformation',
				'getHeaderMenu',
				'getFooterHasMarginTop'
			])
        },*/
	}
</script>

<style>
	.fade-enter-active,
	.fade-leave-active {
		transition: all .2s ease;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
	
	.haveMenu {
		background: #fff;
		padding: 20px 20px 20px 0px;
		margin-left: 270px;
		box-sizing: border-box;
		overflow: auto
	}
	/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>