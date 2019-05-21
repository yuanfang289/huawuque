<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">

        <div class="top">
          <img :src="require('./img/invite/top.png')" alt="">
          <div class="invite_btn" @click="invite()">

          </div>
        </div>
        <img :src="require('./img/invite/bottom.png')" alt="">

    </page-main>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {passport} from 'src/globalData';
  import {requestUrl} from 'config/config';
  export default {
    components: {

    },
    computed:{
      ...mapState({
        isLogin: state => state.isLogin,
      })
    },
    data: () => {
      return {
        isApp: isApp(),
        show: false,
        title: '平行世界一点灵犀，相遇只在“优鲜集”',
        desc:'注册即领100元超级大礼！还有更多精彩功能，等你体验！',
        shareImg: require('../../assets/images/feature/loading.png'),
        userId:''
      }
    },
    methods:{
      login:function () {
        if(this.isApp) {
          console.log('没有登录app');
          toLogin();
        } else {
          console.log('没有登录h5');
//          passport.toLogin();
          let url = location.href+'?userId='+this.userId;
          this.$openApp(url);
        }
      },
      invite:function () {
        if(this.isLogin){
          if(this.isApp) {
            console.log('app');
            let _this = this;
//            let url = getLocation().origin +`/v2/invite/`+this.userId;
            let url = "https://passport2.urwork.cn/passport/inviteRegister/"+this.userId;
            this.$DANativeApi.share({
              title: _this.title,
              desc: _this.desc,
              url: url,
              imgUrl: "http://img.urwork.cn/100ico.png",
              completion: function (res) {
                //app 分享成功之后的回调！！
              }
            });
          } else {
            console.log('h5');
            let url = location.href+'/'+this.userId;
            this.$openApp(url);
          }
        }else{
          this.login();
        }
      }
    },
    created() {
      this.show = true;
    },
    mounted() {
      this.userId = this.$store.state.userInfo.userId;
    }
  }
</script>

<style lang="scss">
  body {
    background-color: #f26946;
  }
  #main{
    img {
      display: block;
      margin: 0 auto;
    }
    .top{
      position: relative;
      .invite_btn {
        width: 50%;
        height: 12%;
        display: inline-block;
        border-radius: 4px;
        position: absolute;
        bottom: 19%;
        left: 25%;
        z-index: 100;
      }
    }
  }
</style>
