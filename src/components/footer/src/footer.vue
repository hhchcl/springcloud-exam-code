<template>
	<footer class="footer">
		<div class="main-container tac position-r">
			<p>&copy;hhc</p>
			<!--<img src="../../../images/common/footerlogo.png" class="position-a">-->
		</div>
	</footer>
</template>

<script>
	export default {
		name: 'footer',
		componentName: 'footer',
		props: {
			hasMarginTop: {
				type: Boolean,
				default: true
			},
		},
	}
</script>

<style>
	.footer {
		line-height: 50px;
		color: #fff;
		height: 50px;
		background-color: #594841;
		position: fixed;
		bottom: 0px;
		width: 100%;
		z-index: 9999;
	}

	.footer .position-a {
		top: 0px;
		right: 0px;
	}
</style>
