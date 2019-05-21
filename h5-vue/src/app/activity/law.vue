<template>
  <page-wrapfff class="page-user-center">
    <title v-title>{{title}}</title>
    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>
    <page-main :show="show">
      <div class="banner">
        <img style="display: none" src="https://assets.urwork.cn/image/lawicon.png">
        <article style="display: none">新年伊始，优客工场法务与风控中心将携手外部精品律所开启“免费法律咨询日”活动</article>
        <div class="button"></div>
      </div>
      <!--<div class="fixed">-->
        <div class="button" @click="gotoLawDay()"></div>
      <!--</div>-->
    </page-main>
  </page-wrapfff>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {getScheme, setScheme} from 'nativeFix';
  import {isApp, toLogin} from 'src/nativeFix/index';

  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '免费法律咨询日',
      }
    },
    methods:{
            gotoLawDay(){
              if(isApp()) {
                setScheme('group?groupId=1569');
              }else{
                this.$openApp('urwork://group?groupId=1569');
              }

            }
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

  .banner{
    width: 100vw;
    height: 522.9333vw;
    background: url("https://assets.urwork.cn/image/activity/lawday.jpg?x-oss-process=image/quality,q_80") no-repeat;
    background-size: 100%;
    /*.button{*/
      /*position:relative;*/
      /*top:507.2vw;*/
      /*left:2.4vw;*/
      /*//border:1px solid red;*/
      /*width: 94.6vw;*/
      /*height: 12.8vw;*/
    /*}*/
    //margin-bottom: 12.8vw;
  }
  /*.fixed{*/
    /*position: fixed;*/
    /*width: 100vw;*/
    /*height: 12.8vw;*/
    /*background-color: white;*/
   /*// border:1px solid red;*/
    /*bottom: 0;*/
    .button{
      position: fixed;
      width: 100vw;
      height: 18.1333vw;
      //border:1px solid red;
      bottom: 0;
      //left:2.65vw;
      z-index: 99;
      background: url("https://assets.urwork.cn/image/activity/lawday-but.png?x-oss-process=image/quality,q_80") no-repeat;
      background-size:  100vw  18.1333vw;
    }

  /*}*/

</style>



