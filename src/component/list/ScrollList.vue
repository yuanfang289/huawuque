<template>
  <scroll ref="scroll" @pullingUp="onPullingUp" :pullUpLoad="true" :bounce="false" :data="result">
    <ul slot-scope="{listData}" :class="className">
      <li v-if="listData.length" class="list-item" v-for="item in listData" :key="item.id">
        <slot :item="item"></slot>
      </li>
      <li v-if="!result.length">
        <slot name="null">没有数据</slot>
      </li>
    </ul>
  </scroll>
</template>

<script>
  import Scroll from 'lib/scroll/Scroll';

  // TODO 未完成 ZhangHaiBin

  /**
   *
   * @property {function} props.apiFn         数据请求函数
   * @property {number}   props.pageSize      每页的数据长度
   * @property {object}   props.queryData     发送请求时提交的查询数据
   * @property {boolean}  props.forceRefresh  强制刷新，一般用在查询参数发生变化时
   * @property {string}   props.className     添加到ul上的class
   */
  export default {
    components: {
      Scroll
    },
    props: {
      apiFn: {
        type: Function,
        required: true,
        default: () => {}
      },
      pageSize: {
        type: Number,
        default: 20
      },
      queryData: {
        type: Object,
        default() {
          return {}
        }
      },
      forceRefresh: {
        type: Boolean,
        default: false
      },
      className: {
        type: String
      }
    },
    data: () => {
      /**
       * @property {number}   currentPageNo  当前页码
       * @property {array}    resultData     接口返回的list数据
       * @property {boolean}  noMore         是否有更多数据
       * @property {boolean}  refresh        刷新页面
       */
      return {
        isInit: true,
        currentPageNo: 1,
        result: [],
        noMore: false,
        refresh: false
      }
    },
    watch: {
      queryData(newVal, oldVal) {
        const _new = JSON.stringify(newVal);
        const _old = JSON.stringify(oldVal);

        if (_new !== _old) {
          this.refresh = true;
          this.fetchData();
        }
      }
    },
    methods: {
      fetchData() {

        // 重置页码
        if (this.forceRefresh || this.refresh) {
          this.currentPageNo = 1;
          this.forceRefresh = false;
          this.noMore = false;
        }

        // 没有更多了
        if (this.noMore) return;

        let data = Object.assign({
          pageSize: this.pageSize,
          currentPageNo: this.currentPageNo
        }, this.queryData);

        this.apiFn(data).then(res => {

          if (this.isInit) {
            this.$emit('init-list');
            this.isInit = false;
          }

          this.currentPageNo++;

          let {
            result
          } = res;

          // 没有更多了
          if (!result || !result.length || result.length < this.pageSize) {
            this.noMore = true;
            this.$refs.scroll.forceUpdate();
          }

          if (this.forceRefresh || this.refresh) {
            this.forceRefresh = false;
            this.refresh = false;
            this.result = [...result];

          } else {
            this.result = [
              ...this.result,
              ...result
            ];
          }
        });
      },
      onPullingUp() {
        if (this.noMore) {
          this.$refs.scroll.forceUpdate();
          return
        }
        this.fetchData();
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>
