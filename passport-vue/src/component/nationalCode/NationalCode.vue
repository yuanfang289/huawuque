<template>
  <div>
    <div class="web-national-code" v-if="isWeb && show">
      <div class="mask"></div>
      <div class="web-dialog-wrapper">
        <header class="web-header">
          <div class="header-title">选择国家或地区</div>
          <a href="javascript:;" class="header-close" @click="hide"><img src="../../assets/images/login/close-btn.png" alt=""></a>
        </header>
        <div class="list-wrapper" ref="listWrapper" v-if="data">
          <div class="state-wrapper">
            <div v-for="(item, index) in data" :key="index">
              <a href="javascript:;"
                 @click="choose(i.nationalCode, i.id)"
                 :class="currentId == i.id ? 'active state-items' : 'state-items'"
                 v-for="i in item.nationalCodeList" :key="i.id">
                <div class="sorted-symbol">{{item.sorted}}</div>
                <div class="state-item">
                  <span>{{i.region}}</span>
                  <span>+{{i.nationalCode}}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <page-loading v-else/>
      </div>
    </div>
    <div class="app-national-code" v-if="!isWeb && show">
      <div class="dialog-wrapper">
        <header class="header">
          <div class="header-inner">
            <div class="navigate">
              <a href="javascript:;" class="action" @click="hide">
                <i class="psicon-arrow-left"></i>
              </a>
            </div>
            <h1 class="title">{{title}}</h1>
            <div class="actions"></div>
          </div>
        </header>
        <div class="list-wrapper" ref="listWrapper" v-if="data">
          <div class="state-wrapper">
            <div class="state-items" v-for="(item, index) in data" :key="index">
              <h2 class="sorted-symbol">{{item.sorted}}</h2>
              <ul v-for="i in item.nationalCodeList" :key="i.id">
                <li class="state-item">
                  <a href="javascript:;" @click="choose(i.nationalCode, i.id)" :class="currentId == i.id ? 'active' : ''">
                    <span>{{i.region}}</span>
                    <span>+{{i.nationalCode}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <page-loading v-else/>
      </div>
    </div>
  </div>
</template>

<script>
  import PageLoading from 'lib/loading/PageLoading';
  import BScroll from 'better-scroll';
  import apiGetNationalCodes from 'src/api/apiGetNationalCodes';

  export default {
    name: 'NationalCode',
    components: {
      PageLoading,
    },
    data() {
      return {
        title: '选择国家或地区',
        show: true,                     //  弹窗显示
        scroll: null,                   //  scroll实例
        data: null,                     //  列表数据
        currentId: '',                   //  当前选中的Id
        isWeb: false                    //  web页面
      }
    },
    methods: {
      initScroll() {
        if(!this.$refs.listWrapper) return;

        this.scroll = new BScroll(this.$refs.listWrapper,{
          probeType: 1,
          click:true,
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300
          },
          scrollbar: {
            fade: true,
            interactive: false
          }
        })
      },
      hide() {
        this.show = false;
      },
      choose(code, id) {
        this.$emit('choose-over',code, id);
        typeof this.onChoose === 'function' && this.onChoose(code, id);
        this.show = false;
      }
    },
    mounted() {
      apiGetNationalCodes().then((res) => {
        // console.log(res)
        this.data = res;
        this.$nextTick(() => {
          this.initScroll();
        });
      }) ;
    },
    created() {
      const systemInfo = this.$systemInfo();
      if(!systemInfo.isMobile){
        this.isWeb = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .dialog-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #fff;
    display: flex;
    flex-direction: column;
    .header {
      height: 45px;
      background: #fff;
    }
    .header-inner {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      min-height: 45px;
      @include border-bottom(#e6e6e6);


      .navigate {
        position: absolute;
        left: 8px;
        bottom: 7px;
        z-index: 10;
        width: 34px;
        height: 34px;
        font-size: 18px;
        text-align: center;
        line-height: 34px;

        .action {
          display: block;
          width: 100%;
          height: 100%;
          color: #666;
          transition: .1s;
        }
      }

      .title {
        position: relative;
        z-index: 1;
        @include text-overflow;
        width: 100%;
        padding: 7px 80px 8px;
        font-size: 18px;
        font-weight: bold;
        line-height: 30px;
        text-align: center;
      }
    }
    .list-wrapper {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    .sorted-symbol {
      height: 44px;
      padding-right: 20px;
      padding-left: 20px;
      color: #666;
      font-size: 14px;
      line-height: 44px;
      background-color: #f5f5f5;
    }
    .state-item {
      padding-right: 20px;
      padding-left: 20px;
      background-color: #fff;
      a{
        color: #333;
        font-size: 14px;
        padding-right: 10px;
        padding-left: 10px;
        height: 55px;
        line-height: 54px;
        display: flex;
        justify-content: space-between;
        &.active{
          color: $color-primary;
        }
      }
    }
  }

  .web-national-code {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,.3);
    }
    .web-dialog-wrapper {
      width: 400px;
      height: 340px;
      background: #fff;
      padding-bottom: 15px;
      overflow: hidden;
      @include position-center;
    }
    .web-header {
      width: 100%;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      .header-title {
        font-size: 20px;
        font-weight: 600;
      }
      .header-close {
        font-size: 20px;
        color: #666;
      }
    }
    .list-wrapper {
      position: relative;
      height: 325 - 68px;
      overflow: hidden;
    }
    .state-items {
      display: flex;
      height: 40px;
      line-height: 40px;
      &.active {
        background: $color-primary;
      }
      .sorted-symbol {
        width: 90px;
        text-align: center;
        font-size: 14px;
        color: #999999;
      }
      .state-item {
        padding-right: 50px;
        flex: 1;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        span:nth-child(2){
          width: 38px;
        }
      }
    }
  }
</style>
