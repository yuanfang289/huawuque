<template>
  <page-wrap
    :error="error"
    :hasDownloadBar="false"
    @refresh-page="refresh"
  >
    <div v-title>{{title}}</div>

    <page-header>
      <!--<topbar-->
        <!--:type="'back'"-->
        <!--:hideShareBtn="true"-->
      <!--&gt;-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->
      <topbar :type="'back'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
        <template slot="title">{{title}}</template>

        <template slot="actions"> <a v-on:click="teltoggle(true)">{{right_title}}</a></template>

      </topbar>

    </page-header>

    <page-main
      :show="show"
    >
      <div class="main-list">
        <course-list-item :list="list" v-if="list.length"></course-list-item>
        <no-course v-else=""><slot name="nocourse"></slot></no-course>
      </div>
    </page-main>
    <div class="mask" v-if="telshow">
      <div class="mask_content">
        <div class="but">
          <a href="tel:13716969190">客服热线：13716969190</a>
          <a v-on:click="teltoggle(false)">取消</a>
        </div>
      </div>
    </div>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import CourseListItem from 'app/classroom/modules/CourseListItem';
  import apiClassMySubjectList from 'api/classroom/apiClassMySubjectList'
  import NoCourse from 'component/nodata/NoCourse';
  import {isApp, toLogin} from 'src/nativeFix/index';

  /**
   * @property {boolean}   show          页面显示
   * @property {boolean}   error         接口请求是否报错
   * @property {string}    title         页面标题
   */
  export default {
    components: {
      CourseListItem,
      NoCourse
    },
    data: () => {
      return {
        show: false,
        isApp: isApp(),
        telshow: false,
        error: false,
        title: '我的课程',
        right_title:'联系客服',
        list: [],                       //  课程列表
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      })
    },
    methods: {
      refresh() {
        // 500页面内，刷新按钮的事件，用来重新调用渲染页面的接口，达到刷新效果
        console.log('refresh')
      },
      getList() {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(this.isApp&&isIOS){
          let version = this.$DANativeApi.apiVersionNumber;
            if(version >= 330){
              apiClassMySubjectList().then(res =>{
                this.list = res;
                this.show = true;
              })
            }else {
              if (this.isLogin) {
                apiClassMySubjectList().then(res =>{
                  this.list = res;
                  this.show = true;
                })
              }
            }
        }else{
          if (!this.isLogin) {
            return;
          }
          apiClassMySubjectList().then(res =>{
            this.list = res;
            this.show = true;
          })
        }
//        if(!this.isLogin){
//          return;
//        }
//        apiClassMySubjectList().then(res =>{
//          this.list = res;
//          this.show = true;
//        })
      },
      teltoggle(n) {
          this.telshow = n;
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style lang="scss" scoped>
  .main-list{
    padding: 0 20px;
    background: #fff;
  }
  .actions{
    padding-right: 15px!important;
    a{
      font-size: 14px!important;
      color: #666666!important;
    }
  }
  .mask{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    background-color: #000;
    background: rgba(0, 0, 0, 0.4);
    z-index: 900;
    .mask_content{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .but{
        width: 100%;
        padding: 0 9px;
        font-size: 20px;
        color: #d9d9d9;
        bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        a{
          width: 100%;
          height: 57px;
          line-height: 57px;
          font-family: PingFangSC-Regular;
          font-size: 20px;
          background: #FFFFFF;
          border-radius: 12px;
          color: #2989FF;
          letter-spacing: 0;
          text-align: center;
          margin-bottom: 8px;
        }
      }
    }
  }
</style>
