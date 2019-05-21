<template>
  <section class="banner-wrapper">
    <template v-if="todayChecked==1">
      <div class="sign">
        <img src="../img/index_sign.png">
        <p v-if="userId">您已连续签到{{day}}天</p>
        <div class="sign-click">

        </div>
      </div>
    </template>
    <template v-else="">
      <div class="sign">
        <img src="../img/index_sign.png">
        <p v-if="userId">您已连续签到{{day}}天</p>
        <div class="sign-click" @click="sign(10070)">

        </div>
      </div>
    </template>

    <div id="mask" v-show="diolog">
      <div class="diolog">
        <div class="content">
            <p>本次签到获得{{point}}积分</p>
            <a href="/v2/task" class="click">

            </a>
        </div>
        <div class="close">
          <span @click="closed()"></span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import apiTask from 'api/user/apiTask';
  import apiSign from 'api/user/apiSign';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  export default {
    props: {
//      data: {
//        type: String,
//        required: true
//      }
    },
    data: () => {
      return {
        isApp: isApp(),
        diolog:false,
        point:100,
        day:0,
        todayChecked:0,
        userId:''
      }
    },
    methods: {
      getinfo:function () {
        apiTask().then(res => {
          this.day = res.week_checkin.continuedDays;
          this.todayChecked = res.week_checkin.todayChecked;
        })
      },
      sign:function (item) {
        isLogin({
          success: () => {
            apiSign({
              data: {"taskCode":item.toString(),"userId":this.userId}
            }).then(res => {
              this.point = res.rewardPoint;
              this.diolog = true;
              this.getinfo();
            })
          },
          fail: () => {
            if(this.isApp) {
              toLogin();
            }else{
              window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
            }
          }
        })
      },
      closed(){
         this.diolog = false;
      }
    },
    created() {
      isLogin({
        success: () => {
          this.getinfo();
        },
        fail: () => {
          this.userId = '';
        }
      })
    },
    mounted() {
      this.userId = this.$store.state.userInfo.userId || '';
    }
  }
</script>

<style lang="scss" scoped>
  .banner-wrapper {
    background: #f5f5f5;
  }
  .sign{
    padding: 0 20px;
    position: relative;
    font-size: 0;
    padding-bottom: 10px;
    p{
      color: #ffffff;
      font-size: 14px;
      text-align: center;
      position: absolute;
      bottom:16px;
      left: 50%;
      transform:translate(-50%,0%);
      transform-origin:50% 0%;
    }
    .sign-click{
      width: 1.4rem;
      height: 1rem;
      position: absolute;
      /* bottom: 0.4rem; */
      right: 10%;
      top: 0.3rem;
    }
  }
  #mask{
    width: 100%;
    height: 100%;
    background: rgba(23, 21, 20, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    //display: none;
    .diolog{
      z-index: 901;
      width: 6rem;
      border-radius: 0.2rem;
      position: fixed;
      left: 50%;
      top: 45%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content{
        width: 6rem;
        height: 7.5rem;
        background: url("../img/dialog_m.png") no-repeat;
        background-size: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p{
           padding-top: 4.5rem;
          text-align: center;
          font-size: 18px;
        }
        .click{
            width: 2.6rem;
            height: 0.8rem;
            margin-top: 0.7rem;
        }
      }
      .close{
        text-align: center;
        span{
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background: url("../img/close.png") no-repeat;
          background-size: 100%;
          margin-top: 1rem;
        }
      }
    }
  }
</style>

