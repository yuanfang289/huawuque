<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <!--<page-header>-->
      <!--&lt;!&ndash;<topbar :type="'back'" :hideShareBtn="true">&ndash;&gt;-->
        <!--&lt;!&ndash;<template slot="title">{{title}}</template>&ndash;&gt;-->
      <!--&lt;!&ndash;</topbar>&ndash;&gt;-->
    <!--</page-header>-->
      <main id="main" class="station-main">
        <div class="pink-bg">
          <!--<page-header>-->
            <topbar :type="'back'" :hideShareBtn="true" :hideNativeTitleBar="true" :nativeBack="true">
              <template slot="title">{{title}}</template>
            </topbar>
          <!--</page-header>-->
          <div class="banner">
            <div class="headimg">
              <img :src="headImage" onerror="javascript:this.src='https://assets.urwork.cn/public/images/ui/headImg.png?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140';">
            </div>
            <div class="name-info">
              <div class="total-point">{{total_integral}}积分</div>
              <div class="received">今日已领取 {{got_point}} 积分</div>
            </div>
          </div>
        </div>

        <div class="tasks">
          <div class="task">
              <ul class="task-list">
                <li>
                  <a href="childtask?code=1&title=找朋友、发动态">
                    <div class="list-info">
                      <h3>
                        <p>找朋友、发动态</p><span>200积分待领取</span>
                      </h3>
                      <div class="p">
                        展现个人魅力，抢占社交C位
                      </div>
                    </div>
                    <a class="list-btn">
                      去完成
                    </a>
                  </a>
                </li>
                <li>
                  <a href="childtask?code=2&title=企业管理">
                    <div class="list-info">
                      <h3>
                        <p>企业管理</p><span>200积分待领取</span>
                      </h3>
                      <div class="p">
                        完善企业信息，争做领头企业
                      </div>
                    </div>
                    <a class="list-btn">
                      去完成
                    </a>
                  </a>
                </li>
                <li>
                  <a href="childtask?code=3&title=分享精彩">
                    <div class="list-info">
                      <h3>
                        <p>分享精彩</p><span>200积分待领取</span>
                      </h3>
                      <div class="p">
                        分享精彩，分享优鲜集
                      </div>
                    </div>
                    <a  class="list-btn">
                      去完成
                    </a>
                  </a>
                </li>
              </ul>
          </div>
        </div>
        <!--<div class="lucky">-->
          <!--<img src="https://assets.urwork.cn/image/credit/task_banner.jpg"/>-->
        <!--</div>-->
      </main>
  </page-wrap>
</template>

<script>
  import apiTask from 'api/credit/apiTask';
  import {mapState} from 'vuex';
  import store from 'store';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '积分任务',
        dialog:false,
        week_checkin:'',
        total_integral:"",
        headImage:'',
        userId:'',
        got_point:''
      }
    },
    methods:{
      dialogFn(n){
          n == 1 ? this.dialog = true : this.dialog = false;
      },
      getinfo:function () {
        apiTask().then(res => {
          this.week_checkin = res.week_checkin;
          this.got_point = res.got_point;
          this.total_integral = res.total_integral;
        });
      }
    },
    created() {
        this.getinfo();
      this.headImage = this.$store.state.userInfo.headImage;
      this.userId = this.$store.state.userInfo.userId;
      this.show = true;
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  /deep/ .page-topbar.topbar-theme-def .title{
       /*background-color: #EE434B;*/
    color: #ffffff;
    opacity: 1;
  }
  /deep/ .page-topbar.topbar-theme-def{
    background-color: transparent;
  }
  /deep/ .page-topbar .navigate .action{
    color: #ffffff;
  }
  /deep/ .has-border {
    @include border-bottom(#EE434B);
  }
  #main{
    background: #F5F5F5;
    .pink-bg{
      background: url("https://assets.urwork.cn/image/credit/pink_bg.jpg") no-repeat;
      background-size: 100%;
    }
    .banner{
      width: 100vw;
      height: 98px;
      /*background-image: linear-gradient(#EE434B 0%, #FF6756 94%);*/
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .headimg{
        width: 65px;
        height: 65px;
        margin-left: 5px;
        margin-right: 15px;
        img{
          width: 65px;
          height: 65px;
          border-radius: 50%;
        }
      }
      .name-info{
        height: 65px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .total-point{
          font-family: PingFangSC-Medium;
          font-size: 17px;
          color: #FFFFFF;
        }
        .received{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FFFFFF;
        }
      }
    }
    .tasks{
      .task{
        background: #ffffff;
        padding: 20px 20px 0 20px;
        .task-list{
          padding-bottom: 15px;
          li{
            height: 80px;
            background: #FFFFFF;
            box-shadow: 0 1px 8px -1px rgba(208,211,213,0.58);
            border-radius: 2px;
            margin-bottom: 15px;
            position: relative;
            &:last-of-type{
              margin-bottom: 0;
            }
            .list-info{
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              padding-left: 15px;
              h3{
                display: flex;
                align-items: center;
                font-family: PingFangSC-Medium;
                font-size: 15px;
                color: #333333;
                margin-top: 20px;
                span{
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #FB6020;
                  letter-spacing: 0;
                  margin-left: 5px;
                }
              }
              .p{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666666;
              }
            }
            .list-btn{
              width: 70px;
              height: 27px;
              line-height: 27px;
              text-align: center;
              border: 1px solid #EF454C;
              border-radius: 17px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #F34E4F;
              letter-spacing: 0;
              position: absolute;
              right: 15px;
              top: 50%;
              margin-top: -13px;
            }
          }
        }
      }
    }
    .lucky{
      background-color: #ffffff;
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
      img{
        width: 93.333vw;
        height: 23.333vw;
        display: inline-block;
      }
    }
  }
</style>
