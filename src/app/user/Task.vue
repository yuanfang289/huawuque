<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header :isHeadroom="false">
      <topbar :type="'back'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
        <template slot="title">{{ isEn ? field.title.en : field.title.ch}}</template>

        <template slot="actions"> <a :href="'task/detail'">{{ isEn ? field.right_title.en : field.right_title.ch}}</a></template>

      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="station-main">

        <div class="task-total">
          <span class="logo"></span><span class="total-num">{{data.total_integral}}</span>积分
        </div>
        <!--slide-->
        <div class="swiper-container index-slide">
          <section class="main-slide-wrapper">
            <!--<Swiper-->
            <!--:bannerList= "banners"-->
            <!--:paddingTop="55.970"-->
            <!--:column="1"-->
            <!--:transformScale="true"-->
            <!--&gt;-->

            <!--</Swiper>-->
            <Banner v-if="banners.length > 0" :bannerList="banners" :autoPlay="autoPlay" :click="clickAw"></Banner>
          </section>

          <!--slide-->
        </div>
        <!--<div class="notice">-->
        <!--<span class="notice-icon"></span>-->

        <!--积分商城即将上线，精彩礼品等你来领！-->
        <!--</div>-->


        <div class="notice-wrapper">
          <div class="notice-left">
            <div class="notice-icon">
            </div>
            <div class="notice-list-wrapper">
              <notice v-if="noticeList.length > 0" :noticeList="noticeList">
              </notice>
            </div>
          </div>
        </div>



      </div>
      <section class="task-item">
        <div class="sign item">
          <div v-if="week_checkin.todayChecked == 0" class="sign-desk" v-on:click="sign(10070)">
            签到<span class="desk-integral">+{{week_checkin.todayShouldRewardPoint}}</span><span class="logo"></span>
          </div>
          <h1 v-if="week_checkin.todayChecked == 0" class="item-title">签到任务</h1>
          <h1 v-else="" class="item-title">已连续签到{{week_checkin.continuedDays}}天</h1>
          <h3 v-if="week_checkin.todayChecked == 0" class="item-tip">签到可领取积分哦</h3>
          <h3 v-else="" class="item-tip">明日签到可领{{(week_checkin.continuedDays+1)>7 ? 7:(week_checkin.continuedDays+1)}}积分</h3>
          <div class="sign-date">
            <div class="date" v-for="item in week_checkin.weekCheckInData">
              <div v-if="item.hasChecked==0" class="circle">
                <p>未签</p>
                <span>+{{item.rewardPoint}}</span>
              </div>
              <div v-else="" class="circle signed">
                <p>已签</p>
                <span>+{{item.rewardPoint}}</span>
              </div>
              <template v-if="item.hasChecked==0">
                <p v-if="item.currentDay == 1" class="day">今天</p>
                <p v-else="" class="day">{{item.checkInDate.split('-')[1]}}月{{item.checkInDate.split('-')[2]}}</p>
              </template>
              <template v-else="">
                <p v-if="item.currentDay == 1" class="day orange">今天</p>
                <p v-else="" class="day orange">{{item.checkInDate.split('-')[1]}}月{{item.checkInDate.split('-')[2]}}</p>
              </template>

            </div>
            <!--<div class="date">-->
            <!--<div class="circle signed">-->
            <!--<p>已签</p>-->
            <!--<span>+2</span>-->
            <!--</div>-->
            <!--<p class="day">1月2日</p>-->
            <!--</div>-->
          </div>
        </div>
        <div class="convert item">
          <h1 class="item-title">热门兑换</h1>
          <div class="scroll-x">
            <div class="card meeting-room">
              <p class="todo">订会议室</p>
              <p class="how-much">Meeting Room</p>
              <!--<a href="/rentMeetingRoom/list?plantId=">-->
              <button class="go" v-on:click="go(1)">去预订</button>
              <!--</a>-->
              <img class="bg" src="./img/meeting-room.png">
            </div>
            <div class="card ground">
              <p class="todo">订工位</p>
              <p class="how-much">Spaces</p>
              <!--<a href="/rentSation/getStationListView">-->
              <button class="go" v-on:click="go(2)">去预订</button>
              <!--</a>-->
              <img class="bg" src="./img/ground.png">
            </div>
            <!--<div class="card ugoods">-->
              <!--<p class="todo">买U物</p>-->
              <!--<p class="how-much">U Gifts</p>-->
              <!--&lt;!&ndash;<a href="/productIndex/getIndex">&ndash;&gt;-->
              <!--<button class="go" v-on:click="go(3)">去购买</button>-->
              <!--&lt;!&ndash;</a>&ndash;&gt;-->
              <!--<img class="bg" src="./img/ugoods.png">-->
            <!--</div>-->
            <!--<div class="card ugift">-->
              <!--<p class="todo">U礼包</p>-->
              <!--<p class="how-much">U Packs</p>-->
              <!--&lt;!&ndash;<a href="/company/package">&ndash;&gt;-->
              <!--<button class="go" v-on:click="go(4)">去购买</button>-->
              <!--&lt;!&ndash;</a>&ndash;&gt;-->
              <!--<img class="bg" src="./img/ugift.png">-->
            <!--</div>-->
            <div class="card huodong">
              <p class="todo">付费活动</p>
              <p class="how-much">Activities</p>
              <!--<a href="/company/package">-->
              <button class="go" v-on:click="go(5)">去参与</button>
              <!--</a>-->
              <img class="bg" src="./img/huodong.png">
            </div>
          </div>
        </div>
        <div class="task-list item">
          <h1 class="item-title">积分任务</h1>
          <p class="today-integral">今日已领{{data.got_point}}积分</p>
          <ul class="items">
            <!--<li class="item-li">-->
            <!--<img class="icon" src="./img/logo.png">-->
            <!--<div class="mid">-->
            <!--<span class="name-score">-->
            <!--<span class="task-name">创建企业</span>-->
            <!--<span class="task-score">-->
            <!--<span class="icon"></span>-->
            <!--+40积分</span>-->
            <!--</span>-->
            <!--<span>完成<span class="orange">4</span>/5</span>-->
            <!--</div>-->
            <!--<div class="gobox">-->
            <!--<button class="go">-->
            <!--去升级-->
            <!--</button>-->
            <!--</div>-->
            <!--</li>-->
            <li class="item-li" v-for="item in task_list">
              <img class="icon" :src="require('./img/icon/'+item.iconName+'.png')">
              <div class="mid">
                            <span class="name-score">
                                <span class="task-name">{{item.taskName}}</span>
                                <span class="task-score" v-if="item.shouldGetPoint!=0">
                                    <span class="icon"></span>
                                    +{{item.shouldGetPoint}}积分</span>
                            </span>
                <span class="score-x">完成
                  <span  v-if="item.completeCount == item.totalCount">{{item.completeCount}}</span>
                   <span  v-else="" class="orange">{{item.completeCount}}</span>/{{item.totalCount}}</span>
              </div>
              <div class="gobox">
                <button v-if="item.completeCount == item.totalCount" class="gone">
                  已完成
                </button>
                <template v-else="">
                  <button v-if="item.buttonText!=''" class="go" v-on:click="goto(item.jumpTo)">
                    {{item.buttonText}}
                  </button>
                  <button v-else="" class="go" v-on:click="goto(item.jumpTo)">
                    去完成
                  </button>
                </template>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </page-main>

    <div id="mask" v-show="diolog">
      <div class="diolog">
        <span class="kong"></span><p class="content">积分+{{diolog_text}}</p><span class="right"></span>
      </div>
    </div>
  </page-wrap>
</template>

<script>
  import toPage from 'nativeFix/component/toPage/toPage';
  import Banner from 'app/user/modules/Banner';
  import apiTask from 'api/user/apiTask';
  import apiSign from 'api/user/apiSign';
  import Notice from 'app/user/modules/Notice';
  import field from 'src/app/user/EnTable';
  import {mapState} from 'vuex';
  import store from 'store';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  export default {
    components: {
      toPage,
      Notice,
      Banner
    },
    computed: {
      ...mapState({
        isEn: state => state.languageEnUS
      })
    },
    data: () => {
      return {
        isApp: isApp(),
        field,                    // 英文化字段
        show: false,
        title:'积分任务',
        right_title: '积分明细',
        userId:"",
        banners:[],
        noticeList:[],
        data:{},
        task_list:[],
        week_checkin:{},
        diolog:false,
        autoPlay:2500,
        clickAw:true,
        diolog_text:0
      }
    },
    methods:{
      getinfo:function () {
        apiTask().then(res => {
          console.log(res,22222222222222222);
          this.noticeList = res.noticeList;
          this.task_list = res.task_list;
          this.week_checkin = res.week_checkin;
          this.banners = res.banners;
          this.show = true;
          this.data = res;
          if(this.banners.length == 1){
            this.autoPlay = false;
            this.clickAw = false;
          }
        })
      },
      goto:function (item) {
        var jumpToObj = {
          createCompany:{
            app:'company/create',
            h5:'/company/companyShort'
          },
          upgradeCompany:{
            app:'companySelect',
            h5:'/company/becomeCompanyList'
          },
          proveCompany:{
            app:'myCompanyList',
            h5:'/company/myCompanyList'
          },
          saveUserProfile:{
            app:'editProfileInfo',
            h5:''
          },
          publishService:{
            app:'postFeed',
            h5:''
          },
          publishRecruit:{
            app:'postFeed',
            h5:''
          },
          publishNovelty:{
            app:'postFeed',
            h5:''
          },
          publishQuestion:{
            app:'postFeed',
            h5:''
          },
          publishComment:{
            app:'fieldList',
            h5:''
          },
          praiseMessage:{
            app:'fieldList',
            h5:''
          },
          shareCompany:{
            app:'myCompanyList',
            h5:''
          },
          shareUGoods:{
            app:'mall',
            h5:''
          },
          sharePersonalPage:{
            app:'',
            h5:'/user/userDetail?userId='+this.userId
          },
          login:{
            app:'',
            h5:''
          },
        };

        let url = getLocation().origin + jumpToObj[item].h5;
        if(this.isApp) {
          isLogin({
            success: () => {
              if(jumpToObj[item].app == ''){
                this.$DANativeApi.navigateTo({
                  url
                })
              }else{
                var u = navigator.userAgent;
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

                if (isIOS) {
                  if(item=='publishComment'||item=='praiseMessage'){
                    setScheme('social');
                  }else{
                    setScheme(jumpToObj[item].app);
                  }
                }else{
                  setScheme(jumpToObj[item].app);
                }
              }
            },
            fail: () => {
              toLogin();
            }
          })
        } else {
          if(jumpToObj[item].h5!=''){
            window.location.href = jumpToObj[item].h5;
          }else{
            this.$openApp(url);
          }
        }
      },
      sign:function (item) {
        apiSign({
          data: {"taskCode":item.toString(),"userId":this.userId}
        }).then(res => {
          this.diolog_text = res.rewardPoint;
          this.getinfo();
          var _this = this;
          _this.diolog = true;
          //定时器 异步运行
          function hello(){
            _this.diolog = false;
            window.clearTimeout(t2);
          }
          var t2 = window.setTimeout(hello,2000); t2;
        })
      },
      go:function (id) {
        var obj = {
          1:{
            app:"meetingRoom",
            h5:"/rentMeetingRoom/list?plantId="
          },
          2:{
            app:"bookingStation",
            h5:"/rentSation/getStationListView"
          },
          3:{
            app:"mall",
            h5:"/productIndex/getIndex"
          },
          4:{
            app:"",
            h5:"/company/package"
          },
          5:{
            app:"activitiesList",
            h5:"/activity/getactivitylistpage"
          }
        };
        if(this.isApp) {
          if(obj[id].app == ''){
            let url = getLocation().origin + obj[id].h5;
            this.$DANativeApi.navigateTo({
              url
            })
          }else{
            setScheme(obj[id].app);
          }
        } else {
          window.location.href = obj[id].h5;
        }
      }
    },

    created() {
      isLogin({
        success: () => {
          this.getinfo();
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
//    computed: {
//       userId:this.store.state.userInfo
//    },
    mounted() {
      this.userId = this.$store.state.userInfo.userId;
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  /*swiper*/
  .swiper-container-horizontal>.swiper-pagination-bullets{
    bottom: 5px!important;
  }
  /*swiper*/

  #main{
    background: #f5f5f5;
  }
  .station-main{
    position: relative;
    background: #f5f5f5;
  }
  .actions{
    padding-right: 15px!important;
    a{
      font-size: 14px!important;
      color: #666666!important;
    }
  }
  .main-slide-wrapper {
    width: 100%;
    height: 135px;
    .swiper-slide{
      width: 100%;
    }
  }
  .task-mask{
    position: absolute;
    background-color: rgba(2,2,2,0.6);
    opacity: 0.2;
    right: 0;
    top: 55px;
    z-index: 2;
  }
  .task-total{
    display: flex;
    align-items: center;
    height: 30px;
    color: #FFFFFF;
    font-size: 14px;
    text-align: center;
    border-radius: 15px 0 0 15px;
    position: absolute;
    right: 0;
    top: 16px;
    z-index: 3;
    padding: 0 5px;
    background: transparent;
    background:rgba(2,2,2,0.6);
    .logo{
      width: 19px;
      height: 19px;
      border-radius: 50%;
      display: inline-block;
      background: url("./img/logo.png") no-repeat;
      background-size: 100%;
    }
    .total-num{
      color: #c87224;
      margin-left: 5px;
      margin-right: 5px;
      font-weight: 700;
    }
  }
  .swiper-container{
    width: 100wh;
    height: 135px;
  }
  .notice{
    text-align: left;
    padding-left: 20px;
    height: 50px;
    color: #666666;
    font-size: 13px;
    background: #ffffff;
    display: flex;
    align-items: center;
    .notice-icon{
      min-width: 21px;
      margin-right: 10px;
      background: url("./img/notice.png") no-repeat;
      background-size: 100%;
    }
  }

  .notice-wrapper {
    text-align: left;
    padding: 0 20px;
    height: 35px;
    color: #666666;
    font-size: 13px!important;
    background: #ffffff;
    display: flex;
    align-items: center;
    .notice-left {
      min-width: 0;
      display: flex;
    }
    .notice-icon{
      min-width: 21px;
      margin-right: 10px;
      background: url("./img/notice.png") no-repeat;
      background-size: 100%;
    }
    .notice-list-wrapper {
      flex-grow: 1;
      min-width: 0;
    }
  }
  .task-item{
    margin-top: 8px;
    background: #FFFFFF;
    .item-title{
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #333333;
    }
    .item-tip{
      line-height: 20px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #999999;
    }
    .item{
      border-bottom: 1px solid #f3f3f3;
      padding: 20px 20px 0 20px;
    }
    .sign{
      position: relative;
      .sign-desk{
        height: 30px;
        padding: 0 9px;
        border-radius: 15px;
        background-image: linear-gradient(-90deg, #FF8846 0%, #FF3A2F 100%);
        color: #FFFFFF;
        font-size: 14px;
        position: absolute;
        top: 26px;
        right: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .desk-integral{
          margin-left: 5px;
          font-size: 12px;
        }
        .logo{
          width: 14px;
          height: 14px;
          margin-left: 2px;
          border-radius: 50%;
          background: url("./img/logo.png") no-repeat;
          background-size: 100%;
        }
      }
      .sign-date{
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        padding: 15px 0 18px 0;
        .circle{
          background:#c2c2c2;
          color: #FFFFFF;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          text-align: center;
          font-size: 0;
          margin: 0;
          padding: 0;
          p{
            padding-top: 7px;
            text-shadow:0px 0px -2px #FF992F;
            font-size: 10px;
          }
          span{
            font-size: 10px;
          }
          //display: flex;
          //flex-direction: column;
          //justify-content: center;
          //align-items: center;
        }
        .signed{
          background:url("img/icon/already_sign_in.png") no-repeat;
          background-size: 100%;
          font-weight: 700;
        }
        .day{
          text-align: center;
          margin-top: 4px;
          font-size: 10px;
          color: #999999;
        }
        .orange{
          color: #FF7A38;
          font-weight: 700;
        }
      }
    }
    .convert{
      padding: 20px 0 0 0;
      .item-title{
        padding: 0 0 0 20px;
      }
      .scroll-x::-webkit-scrollbar {
        display: none; //Safari and Chrome
      }
      .scroll-x{
        white-space:nowrap;
        width: 100%;
        overflow: scroll;
        padding: 0 10px 5px 20px;
        margin:18px 0;
        -webkit-overflow-scrolling : touch;
        scrollbar-3dlight-color:#fff; // 3d亮色阴影边框(threedlightshadow)的外观颜色
        scrollbar-highlight-color:#fff; // 滚动条3d高亮边框(threedhighlight)的外观颜色
        scrollbar-arrow-color:#fff; // 滚动条方向箭头的颜色
        scrollbar-shadow-color:#fff; // 滚动条方向箭头的颜色
        scrollbar-darkshadow-color:#fff; // 滚动条3d暗色阴影边框(threeddarkshadow)的外观颜色
        scrollbar-base-color:#fff; // 滚动条基准颜色
        scrollbar-track-color:#fff; // 滚动条拖动区域的外观颜色
        .meeting-room{
          background-image: linear-gradient(135deg, #9C35BA 0%, #563BC3 100%);
          box-shadow: 0 2px 3px 0 rgba(94,59,194,0.31);
          .go{
            color: #8837BD;
          }
        }
        .ground{
          background-image: linear-gradient(135deg, #4470DC 0%, #293AC6 100%);
          box-shadow: 0 2px 3px 0 rgba(58,93,212,0.40);
          .go{
            color: #3653D0;
          }
        }
        .ugoods{
          background-image: linear-gradient(135deg, #FD8812 0%, #FA482F 100%);
          box-shadow: 0 2px 3px 0 rgba(251,98,35,0.40);
          .go{
            color: #FC6A20;
          }
        }
        .ugift{
          background-image: linear-gradient(135deg, #18BAC3 0%, #2467D8 100%);
          box-shadow: 0 2px 3px 0 rgba(28,161,202,0.40);
          .go{
            color: #2083D0;
          }
        }
        .huodong{
          background-image: linear-gradient(135deg, #FFA36F 0%, #FF487A 100%);
          box-shadow: 0 2px 3px 0 rgba(255,107,118,0.40);
          .go{
            color: #FF7574;
          }
        }
        .card{
          position: relative;
          width: 102px;
          height: 93px;
          display: inline-block;
          color: #FFFFFF;
          border-radius: 6px;
          margin-right: 8px;
          padding-left: 10px;
          a{
            display: inline-block;
          }
          .todo{
            margin-top: 10px;
            font-family: PingFangSC-Medium;
            font-size: 15px;
            color: #FFFFFF;
            letter-spacing: 0;
          }
          .how-much{
            font-size: 11px;
            opacity: 0.7;
          }
          .go{
            width: 54px;
            height: 23px;
            text-align: center;
            font-size: 11px;
            border-radius: 11.5px;
            background: #FFFFFF;
            margin-top: 9px;
          }
          .bg{
            width: 30px;
            height: 30px;
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }
    }
    .task-list{
      position:relative;
      .today-integral{
        font-size: 12px;
        color: #FF7A38;
        position: absolute;
        top: 23px;
        right: 20px;
      }
      .item-li{
        display: flex;
        align-items: center;
        padding: 13px 0;
        img{
          width: 40px;
          height: 40px;
          //background: #0f9dfd;
          display: inline-block;
          border-radius: 50%;
          margin-right: 11px;
        }
        .mid{
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 11px;
          .name-score{
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            .task-name{
              font-size: 16px;
              font-family: PingFangSC-Regular;
              color: #333333;
            }
            .task-score{
              @include border(#FF7A38){
                border-radius: 14px;
              };
              color: #FF7A38;
              padding-right: 5px;
              font-size: 8px;
              height: 14px;
              display: flex;
              align-items: center;
              margin-left: 10px;
              .icon{
                width: 13px;
                height: 13px;
                display: inline-block;
                background: url("./img/logo.png") no-repeat;
                background-size: 100%;
                margin-right: 5px;
              }
            }
          }
          .score-x{
            color: #999999!important;
          }
          .orange{
            color: #FF7A38;
          }
        }
        .gobox{
          flex: 1;
          text-align: right;
          font-size: 14px;
          button{
            float: right;
            width: 70px;
            height: 30px;
            border-radius: 15px;
            color:#FFFFFF;
          }
          .go{
            background: #ffb736;
          }
          .gone{
            background: #ffe6b9;
          }
        }
      }
    }
  }
  #mask{
    z-index: 10;
    width: 163px;
    height: 46px;
    background: url("./img/tip.png") no-repeat;
    background-size: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    //display: none;
    .diolog{
      float: left;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      //justify-content: space-around;
      .kong{
        width: 46px;
        height: 46px;
        display: inline-block;
      }
      .content{
        width: 75px;
        height: 46px;
        line-height: 46px;
      }
      .right{
        width: 10px;
        height: 16px;
        background: url("./img/tipr.png") no-repeat;
        background-size: cover;
      }
    }
  }
</style>
