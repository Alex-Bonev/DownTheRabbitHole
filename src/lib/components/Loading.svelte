<script lang="ts">
	let color: string = '#004ba8';
	let duration: number = 1;
</script>

<div class="spinner center" style="--spinner-color: {color}; --animation-duration: {duration}s;">
	<span></span>
</div>

<style>
	.spinner {
		height: 32px;
		width: 32px;
		-webkit-animation: spinner-1 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: spinner-1 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes spinner-1 {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	@keyframes spinner-1 {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.spinner::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: auto;
		margin: auto;
		width: 8px;
		height: 8px;
		background: var(--spinner-color);
		border-radius: 50%;
		-webkit-animation: spinner-2 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: spinner-2 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes spinner-2 {
		0% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			-webkit-transform: translate3d(24px, 0, 0) scale(0.5);
		}
		100% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
	}
	@keyframes spinner-2 {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(24px, 0, 0) scale(0.5);
		}
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
	.spinner::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: auto;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 8px;
		height: 8px;
		background: var(--spinner-color);
		border-radius: 50%;
		-webkit-animation: spinner-3 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: spinner-3 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes spinner-3 {
		0% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			-webkit-transform: translate3d(-24px, 0, 0) scale(0.5);
		}
		100% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
	}
	@keyframes spinner-3 {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(-24px, 0, 0) scale(0.5);
		}
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
	.spinner span {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		height: 32px;
		width: 32px;
	}
	.spinner span::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: auto;
		right: 0;
		margin: auto;
		width: 8px;
		height: 8px;
		background: var(--spinner-color);
		border-radius: 50%;
		-webkit-animation: spinner-4 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: spinner-4 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes spinner-4 {
		0% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			-webkit-transform: translate3d(0, 24px, 0) scale(0.5);
		}
		100% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
	}
	@keyframes spinner-4 {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(0, 24px, 0) scale(0.5);
		}
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
	.spinner span::after {
		content: '';
		display: block;
		position: absolute;
		top: auto;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 8px;
		height: 8px;
		background: var(--spinner-color);
		border-radius: 50%;
		-webkit-animation: spinner-5 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: spinner-5 var(--animation-duration) cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes spinner-5 {
		0% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			-webkit-transform: translate3d(0, -24px, 0) scale(0.5);
		}
		100% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
	}
	@keyframes spinner-5 {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(0, -24px, 0) scale(0.5);
		}
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
</style>
