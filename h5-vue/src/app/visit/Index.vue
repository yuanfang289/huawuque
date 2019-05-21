<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header :isHeadroom="false">
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="visit">

        <div @click="gotoFun('/workstageVisit/visit')" class="v-list">
          <div class="v-list-left">
            <div class="v-item-title">预约访问</div>
            <div class="v-item-desc">访问入驻会员</div>
          </div>
          <div class="v-list-right">
            <div class="v-img1"></div>
          </div>
        </div>


          <div @click="gotoFun('/workstageVisit/booking')" class="v-list">
          <div class="v-list-left">
            <div class="v-item-title">预约参观</div>
            <div class="v-item-desc">预约参观场区</div>
          </div>
          <div class="v-list-right">
            <div class="v-img2"></div>
          </div>
        </div>


        <div  v-if="isLogin" @click="gotoFun('/workstageVisit/invitation')"   class="v-list">
          <div class="v-list-left">
            <div class="v-item-title">邀请访问</div>
            <div class="v-item-desc">邀请朋友访问</div>
          </div>
          <div class="v-list-right">
            <div class="v-img3"></div>
          </div>
        </div>

      </div>

    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import { mapState } from 'vuex';
  export default {
    components: {},
    data: () => {
      return {
        show: false,
        title: '访客预约',
        dialog: false,
        isApp: isApp(),
      }
    },
    methods: {
        gotoFun(url){
          url=getLocation().origin +url;
                isLogin({
        success: () => {
          if(this.isApp) {
            this.$DANativeApi.navigateTo({
              url
            })}else{
            window.location.href = url;
          }
        },
        fail: () => {
          if(isApp()) {
            toLogin();
          }else{
            window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
          }
        }
      })

        }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      }),
    },
    created() {

    },

    mounted() {
      this.show = true;
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  /deep/.page-topbar.topbar-theme-def{
  background-color: #fff;
}
  /deep/.page-header .header-inner.has-border::before{
    border-style: none;
  }
  .visit {
    width: 100%;
    padding: 0.48rem;
    .v-list {
      width: 100%;
      height: 2.4rem;
      margin-bottom: 0.4rem;
      padding: 0.5rem 1rem;
      background: #F8F8F9;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      .v-list-left {
        height: 1.4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .v-item-title {
          height: 0.32rem;
          font-family: PingFangSC-Medium;
          font-size: 18px;
          font-weight: bold;
          color: #1D1D1D;
          line-height: 0.32rem;
          margin-bottom: 0.28rem;
        }
        .v-item-desc {
          height: 0.24rem;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #808080;
          line-height: 0.24rem;
        }
      }
      .v-list-right {
        height: 1.4rem;
        .v-img1 {
          width: 1.4rem;
          height: 1.4rem;
          background: url("https://assets.urwork.cn/image/v3/subs-visit.png") no-repeat;
          background-size: 100% 100%;
        }
        .v-img2 {
          width: 1.4rem;
          height: 1.4rem;
          background: url("https://assets.urwork.cn/image/v3/subs-look.png") no-repeat;
          background-size: 100% 100%;
        }

        .v-img3 {
          width: 1.4rem;
          height: 1.4rem;
          background: url("https://assets.urwork.cn/image/v3/subs-interview.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>

