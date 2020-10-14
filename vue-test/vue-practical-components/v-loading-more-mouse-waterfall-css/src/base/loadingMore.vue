<template>
    <button @click="onClick" v-show='show' ref='loadBtn'>{{text}}</button>
</template>

<script>
export default {
	props: {
		show: {
			type: [Boolean, String],
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		offset: {
			type: [Number, String],
			default: 100
		},
	},
	data() {
        return {
        	text: '正在加载',
        	loading: false
        }
	},
	computed: {

	},
	mounted() {
	  window.addEventListener('scroll', this.onScroll)
	},
	watch: {
	    //不显示后取消检测
	    show(newValue) {
	      newValue ? null : window.removeEventListener('scroll', this.onScroll)
	    },
	    //当可点击时取消loading状态
	    disabled(newValue) {
	      newValue ? null : this.loading = false; 
	    }
	},
	methods: {
		onScroll() {
	      //不正在axios中，按钮可点击
	      if (!this.disabled) {
	        //在视野中
	        if (this.isView(this.$refs.loadBtn)) {
	          this.$emit('loading');
	          this.loading = true;
	        } else {
	          //不在视野中
	          this.loading = false;
	        }
	      } else {
	        //正在axios中
	        this.loading = true;
	      }
	    },
	    //是否在视野内
	    isView(element) {
	        if (!element || !element.getBoundingClientRect) {
	          return false
	        };
	        const rect = element.getBoundingClientRect(),
	              top = rect.top >= 0,
	              left = rect.left >= 0,
	              bottom = rect.bottom <= (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + this.offset,
	              right = (rect.right <= (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + this.offset);
	              return (top && left && bottom && right);
	    },
	    // 立刻加载
	    onClick() {
	    	this.loading = true;
	    	this.$emit('loading')
	    }
	},
	beforeDestroy() {
	    window.removeEventListener('scroll', this.onScroll)
	}
};
</script>

<style scoped>


</style>