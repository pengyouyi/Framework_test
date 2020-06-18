<template>
  <div class="news">
    <ul class="news-section">
      <li v-for="item in newses">
        <h2>{{item.title}}</h2>
        <img class="img-news" :src="item.image" alt="">
        <div>{{item.content}}</div>
      </li>
    </ul>
    <button @click="getNews" v-show='haveMore' ref='loadBtn'>loading-more</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to News',
      token:'',
      limit: 1,
      newses: [],
      defaultOrdering: '-publication_date',
      page:0,
      haveMore: true,
      disabled: false,
      offset: 100,
      loading: false
    }
  },

  mounted() {
    this.getNews();
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
          this.getNews();
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
    // 获取项目数据
    getNews() {
      this.disabled = true;
      this.page++;
      // 获取newses
      this.$axios.get('http://test.pandanc.com/api/v1/news/entry/', {
        params: {
          limit: this.limit,
          offset: this.limit * (this.page - 1),
          ordering: this.defaultOrdering
        }
      }).then( res => {
        this.haveMore = res.data.next;
        this.pushNews(res.data.results)
      }).catch(err => {
        console.log(err)
        this.disabled = false;
      })
    },
    pushNews(results, index = 0) {
      if (results[index]) {
        this.newses.push(results[index]);
        this.$nextTick(() => {
          this.pushNews(results, index + 1)
        })
      } else {
        this.disabled = false;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

.img-news {
  width: 300px;
  height: 300px;
}
</style>