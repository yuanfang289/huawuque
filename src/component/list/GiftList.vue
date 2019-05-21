<template>
  <section class="list-wrapper">
    <page-loading v-if="!show"/>

    <div class="list-inner" v-show="show">
      <ul :class="className">
        <li v-if="result.length" class="list-item" v-for="item in result" :key="item.id">
          <slot :item="item"></slot>
        </li>
        <li v-if="!result.length">
          <no-data><slot name="nodata"></slot></no-data>
        </li>
      </ul>

      <div class="pullup-wrapper" v-if="result.length">
        <div class="before-trigger" v-show="!isPullUpLoad || queryChange">
          <span>{{pullUpTxt}}</span>
        </div>
        <div class="after-trigger" v-show="isPullUpLoad && !queryChange">
          <span class="pullUpIcon"></span>加载中...
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {getDocumentRect} from 'utils/dom';
  import PageLoading from 'lib/loading/PageLoading';
  import NoData from 'component/nodata/NoData';

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
      PageLoading,
      NoData
    },
    props: {
      apiFn: {
        type: Function,
        required: true
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
       * @property {boolean}  isPullUpLoad   是否触发pullUpload
       * @property {boolean}  noMore         是否有更多数据
       * @property {boolean}  refresh        刷新页面
       * @property {boolean}  queryChange    查询参数是否发生变化
       */
      return {
        show: false,
        isInit: true,
        currentPageNo: 1,
        result: [],
        isPullUpLoad: false,
        noMore: false,
        refresh: false,
        queryChange: false
      }
    },
    watch: {
//      queryData(newVal, oldVal) {
//        const _new = JSON.stringify(newVal);
//        const _old = JSON.stringify(oldVal);
//
//        if (_new !== _old) {
//          this.refresh = true;
//          this.queryChange = true;
//          this.fetchData();
//          this.$showLoading();
//        }
//      }
    },
    computed: {
      pullUpTxt() {
        return this.noMore || this.queryChange ? '没有更多了' : '加载更多'
      },
    },
    methods: {
      fetchData() {

        // 重置页码
        if (this.forceRefresh || this.refresh) {
          this.currentPageNo = 1;
          this.isPullUpLoad = false;
          this.noMore = false;
        }

        // 没有更多了
        if (this.noMore) return;
        if (this.isPullUpLoad) return;
        this.isPullUpLoad = true;
        let data = Object.assign( this.queryData,{
          pageSize: this.pageSize,
          currentPageNo: this.currentPageNo
        });
        this.apiFn(data).then(res => {
          this.$hideLoading();
          console.log("res",res);
          this.isPullUpLoad = false;

          this.currentPageNo++;
          let result = [];
          if(res.result){
            result = res.result;
          }
          let typeTxt='';
          result.map(item=>{
            if(item.packageType==1){
              typeTxt='个人包';
            }
            if(item.packageType==2){
              typeTxt='企业包';
            }
            item.memberPackageName=item.memberPackageName+"("+typeTxt+")";
            return item;
          })
          // 没有更多了
          if (!result || !result.length || result.length < this.pageSize) {
            this.noMore = true;
          }

          if (this.forceRefresh || this.refresh) {
            this.forceRefresh = false;
            this.refresh = false;
            this.queryChange = false;
            this.result = [...result];

            this.$nextTick(() => {
              window.scrollTo(0, 0);
            });
          } else {
            this.result = [
              ...this.result,
              ...result
            ];
          }
          if (this.isInit) {
            this.$emit('init-list');
            this.isInit = false;
            this.show = true;
          }
        }).catch(() => {
          this.$hideLoading();
        });
      },
      onPullingUp() {
        if (this.noMore) return;
        this.fetchData();
      },
      onReachBottom() {
        const {
          clientHeight,
          scrollHeight,
          scrollTop
        } = getDocumentRect();

        // onReachBottom
        if (scrollTop >= scrollHeight - clientHeight - 20) {
          this.onPullingUp();
        }
      }
    },
    created() {
      this.fetchData();
    },
    mounted() {
      window.addEventListener('scroll', this.onReachBottom, false);
    },
    destroyed() {
      window.removeEventListener('scroll', this.onReachBottom, false);
    }
  }
</script>

<style lang="scss">
  .list-wrapper {
    .pullup-wrapper {
      width: 100%;
      padding: 10px 0;
      color: #999;
      font-size: 13px;
      text-align: center;

      span {
        line-height: 24px;
        vertical-align: middle;
      }

      .after-trigger .pullUpIcon {
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 10px;
        background: url('../../assets/images/interface/ajax-loading.gif') no-repeat;
        background-size: 100%;
      }
    }
  }
</style>

