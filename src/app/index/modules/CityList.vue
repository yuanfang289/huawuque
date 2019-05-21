<template>
  <div class="tab-list-wrapper">
    <h2>热门社区
      <object>
        <!--<a href="javascript:;"></a>-->
      <span class="all_citys" @click="to_list({path:'/v2/workStage/stageList', query: {name: '全部社区', code: ''}})">全部社区</span>
      </object>
    </h2>
    <div :class="[className, 'list-wrapper']">
      <slot :list="list"></slot>
    </div>
  </div>
</template>

<script>
  /**
   * @property {Object}   data         数据列表
   * @property {String}   className    列表class名
   */



  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  export default {
    props: {
      data: {
        type: Object
      },
      className: {
        type: String
      }
    },
    data() {
      return {
        show: false,
        isApp: isApp()
      }
    },
    computed: {
      list() {
        let list = [];
        for(let item in this.data) {
          if(item === this.currentTab) {
            list = this.data[item];
            break;
          }
        }
        return list;
      },
      tab() {
        if(this.data) {
          return Object.keys(this.data);
        }
        return false;
      },
    },
    data: () => {
      return {
        currentTab: '',       //当前的选中标签
      }
    },
    methods: {
      changeTab(item) {
        this.currentTab = item;
        setTimeout(() => {
          this.$emit('tab-change');
        },100)
      },
      to_list:function (args) {
//          let location = getLocation();
//          if (isApp()) {
//            this.$DANativeApi.navigateTo({
//              url: `${location.origin}v2/workStage/stageList?name=全部城市&code=`
//            })
//          } else {
//            this.$router.push({path: 'workStage/stageList', query: {name : '全部城市',code:''}});   //{path:'editmovie', query: {id : 111}}
//          }

        let location = getLocation();
        let {
          path,
          query: {
            name,
            code
          }
        } = args;
        if (isApp()) {
          this.$DANativeApi.navigateTo({
            url: `${location.origin}${path}?name=${encodeURIComponent(name)}&code=${code}`
          })
        } else {
          this.$router.push(args);
        }
      }
    },
    created() {
      this.currentTab = Object.keys(this.data)[0];
    }
  }
</script>

<style lang="scss" scoped>

</style>

