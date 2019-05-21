<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <!--<page-header :isHeadroom="false" v-if="titleShow" v-bind:style="{ opacity: opacityNum }">-->
      <!--<topbar :type="'back'" :hideShareBtn="true" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle='1'>-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->
    <!--</page-header>-->
    <main id="main" class="station-main">
        <div class="pink-bg">
          <page-header>
            <topbar v-bind:style="{ backgroundColor: 'rgba(238, 67, 75,'+opacityNum+')'}" :type="'back'" :hideShareBtn="true" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle='nativeStatusBarStyle'>
              <template slot="title">{{title}}</template>
            </topbar>
          </page-header>
          <div class="kong45"></div>
          <div class="banner">
            <div class="headimg">
              <img :src="userInfo.headImageUrl" onerror="javascript:this.src='https://assets.urwork.cn/public/images/ui/headImg.png?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140';">
            </div>
            <div class="name-info">
              <div class="name-job">{{userInfo.realname}}  <span v-if="userInfo.duties">|  {{userInfo.duties}}</span></div>
              <div class="company">{{userInfo.companyName}}
                    <!--<span class="icon">-->
                        <!--<i class="urimg-join"></i><i v-if="userInfo.member" class="urimg-vip"></i>-->
                    <!--</span>-->
              </div>
            </div>
          </div>
        </div>
        <div class="date">
          <div class="point-box">
            <div class="point">
              <a  @click="linkto(0)">
                <div class="credit">
                  <span>{{total_integral}}</span>
                  <p>积分</p>
                </div>
              </a>
              <span class="r-line"></span>
              <a  @click="linkto(1)">
                <div class="u-point">
                  <span>{{total_upoint}}</span>
                  <p>U点</p>
                </div>
              </a>
            </div>
            <div class="sign">
              <div class="left">
                <h2>已连续签到{{week_checkin.continuedDays}}天</h2>
                <p>再签到{{week_checkin.doublePointDays}}天，可获双倍积分</p>
              </div>
              <div class="right" v-if="week_checkin.todayChecked == 0">
                <div @click="sign(10070)">签到</div>
              </div>
              <div class="right" v-if="canReplenish != 0&&week_checkin.todayChecked == 1">
                <div v-if="loading" @click="repLenish(1)">补签</div>
                <div v-else="">补签</div>
                <p>补签消耗50</p>
              </div>
            </div>
            <div class="calendar">
                <ul v-show="!moreCalendar">
                  <template v-for="item in checkInDataSeven">
                      <template v-if="item.hasChecked==0">
                        <li v-if="item.doublePoint==0">
                          <span>+{{item.rewardPoint}}</span>
                          <p v-if="item.currentDay == 1" class="day">今天</p>
                          <p v-else="" class="day">{{item.checkInDate.split('-')[1]}}.{{item.checkInDate.split('-')[2]}}</p>
                        </li>
                        <template v-else="">
                          <li class="double" v-if="item.hasChecked == 0">
                            <span>+{{item.rewardPoint}}</span>
                            <p v-if="item.checkInDate >= today">双倍积分</p>
                            <p v-else="" style="color: #999999">双倍积分</p>
                          </li>
                          <li v-else="" class="double-color">
                            <span>+{{item.rewardPoint}}</span>
                            <p v-if="item.checkInDate >= today">双倍积分</p>
                            <p v-else="" style="color: #999999">双倍积分</p>
                          </li>
                        </template>

                      </template>
                      <template v-else="">
                        <li v-if="item.doublePoint==1" class="double-color">
                          <span>+{{item.rewardPoint}}</span>
                          <p>双倍积分</p>
                        </li>
                        <li class="red" v-else="">
                          <span>+{{item.rewardPoint}}</span>
                          <p v-if="item.currentDay == 1" class="day">今天</p>
                          <p v-else="" class="day">{{item.checkInDate.split('-')[1]}}.{{item.checkInDate.split('-')[2]}}</p>
                        </li>
                      </template>
                  </template>
                </ul>
                <ul v-for="(item,index) in checkInData" v-show="moreCalendar">
                  <template v-for="role in item">
                    <template v-if="role.hasChecked==0">
                      <li v-if="role.doublePoint==0">
                        <span>+{{role.rewardPoint}}</span>
                        <p v-if="role.currentDay == 1" class="day">今天</p>
                        <p v-else="" class="day">{{role.checkInDate.split('-')[1]}}.{{role.checkInDate.split('-')[2]}}</p>
                      </li>
                      <template v-else="">
                        <li class="double" v-if="role.hasChecked == 0">
                          <span>+{{item.rewardPoint}}</span>
                          <p v-if="item.checkInDate >= today">双倍积分</p>
                          <p v-else="" style="color: #999999">双倍积分</p>
                        </li>
                        <li v-else="" class="double-color">
                          <span>+{{item.rewardPoint}}</span>
                          <p v-if="item.checkInDate >= today">双倍积分</p>
                          <p v-else="" style="color: #999999">双倍积分</p>
                        </li>
                      </template>
                    </template>
                    <template v-else="">
                      <li v-if="role.doublePoint==1" class="double-color">
                        <span>+{{role.rewardPoint}}</span>
                        <p>双倍积分</p>
                      </li>
                      <li class="red" v-else="">
                        <span>+{{role.rewardPoint}}</span>
                        <p v-if="role.currentDay == 1" class="day">今天</p>
                        <p v-else="" class="day">{{role.checkInDate.split('-')[1]}}.{{role.checkInDate.split('-')[2]}}</p>
                      </li>
                    </template>
                  </template>
                </ul>
            </div>
            <div class="down-more">
              <div class="spanbox" @click="moreCalendarClick()">
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="lucky">
          <a href="/v2/credit/lotterydraw">
            <img src="https://assets.urwork.cn/image/credit/award.jpg"/>
          </a>
        </div>
        <div class="tasks">
          <div class="earn-points task">
              <h3 class="task-tit">赚积分</h3>
              <p class="task-tips">今日已领{{got_point}}积分</p>
              <ul class="task-list">
                <li v-for="item in task_list">
                  <div class="list-info">
                    <h3>
                      <p>{{item.taskName}}</p><span>{{item.shouldGetPoint}}积分待领取</span>
                    </h3>
                    <div class="progress">
                      <progress :value="item.completeCount" :max="item.totalCount"></progress><span><em>{{item.completeCount}}</em>/{{item.totalCount}}</span>
                    </div>
                  </div>
                  <a v-if="item.completeCount != item.totalCount" class="list-btn" @click="goto(item.jumpTo)">
                      {{item.buttonText}}
                  </a>
                  <a v-else="" class="list-btn grey">
                    已完成
                  </a>
                </li>
                <p class="more">
                  <a href="/v2/credit/task">更多积分</a>
                </p>
              </ul>
          </div>
          <div class="u-point task">
            <h3 class="task-tit">购物送U点</h3>
            <p class="task-tips">消费越多，赚得越多</p>
            <div class="scroll-x">
              <div class="card meeting-room">
                <p class="todo">订会议室</p>
                <p class="how-much">Meeting Room</p>
                <button class="go" v-on:click="go(1)">去预订</button>
                <img class="bg" src="./img/meeting-room.png">
              </div>
              <div class="card ground">
                <p class="todo">订工位</p>
                <p class="how-much">Spaces</p>
                <button class="go" v-on:click="go(2)">去预订</button>
                <img class="bg" src="./img/ground.png">
              </div>
          <!--    <div class="card ugoods">
                <p class="todo">买U物</p>
                <p class="how-much">U Gifts</p>
                <button class="go" v-on:click="go(3)">去购买</button>
                <img class="bg" src="./img/ugoods.png">
              </div>-->
              <div class="card ugift">
                <p class="todo">U礼包</p>
                <p class="how-much">U Packs</p>
                <button class="go" v-on:click="go(4)">去购买</button>
                <img class="bg" src="./img/ugift.png">
              </div>
              <div class="card huodong">
                <p class="todo">付费活动</p>
                <p class="how-much">Activities</p>
                <button class="go" v-on:click="go(5)">去参与</button>
                <img class="bg" src="./img/huodong.png">
              </div>
            </div>
          </div>
          <div class="exchange task">
            <h3 class="task-tit">积分兑换</h3>
            <div class="tab">
                <ul>
                  <li v-for="item in tab" :class="{'click':item.click}" @click="tabClick(item)">
                    {{item.name}}
                  </li>
                </ul>
            </div>
            <div class="goods">
              <ul v-if="goodslist.length>0">
                <a v-for="item in goodslist" :href="'/v2/credit/giftexchange?id='+item.id">
                  <li>
                    <div class="img">
                      <img :src="'https://image.urwork.cn/'+item.imgUrl" onerror="this.src='https://assets.urwork.cn/image/ugift/g_def.png'">
                      <div v-if="item.identity == 1" class="icon-zhijiao"></div>
                      <p v-if="item.identity == 1" class="text-zhijiao">企业</p>
                    </div>
                    <div class="detail">
                      <p class="name">{{item.name}}</p>
                      <p class="price">{{item.points}}积分</p>
                      <div class="vip-price"><span class="vipicon"></span>{{item.memberPoints}}积分</div>
                    </div>
                  </li>
                </a>
              </ul>
              <ul v-else="">
                <p>
                  积分太少，没有可以兑换的礼品哦~<br>
                  快去赚积分吧！</p>
              </ul>
            </div>
          </div>
        </div>
        <div id="mask" v-show="dialog">
          <div class="dialog">
            <div class="content">
              <p>本次补签获得{{buqian}}积分</p>
              <span>明天记得来签到哦~~~</span>
            </div>
            <div class="close" @click="dialogFn(0)">
              <span>朕知道了</span>
            </div>
          </div>
        </div>
      <transition name="my-trans">
        <div id="point-mask" v-show="tipsDialog">
          <div class="content">
            <div class="left">
              <div class="logo">
                <img src="https://assets.urwork.cn/image/credit/icon_logo.jpg">
              </div>
              <div class="p">
                <h4>恭喜你得到{{tipsDialogTxt}}积分</h4>
                <p>可以兑换商品或抽奖哦～</p>
              </div>
            </div>
            <div class="add-point">
                +{{tipsDialogTxt}}
            </div>
          </div>
        </div>
      </transition>
      </main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiTask from 'api/credit/apiTask';
  import apiMonthCheckin from 'api/credit/apiMonthCheckin';
  import apiSign from 'api/credit/apiSign';
  import apiReplenish from 'api/credit/apiReplenish';
  import apiReplenishStatus from 'api/credit/apiReplenishStatus';
  import apiExchangeList from 'api/credit/apiExchangeList';
  import apiGetUcenter from 'api/user/apiGetUcenter';
  import field from 'src/app/user/EnTable';
  import {mapState} from 'vuex';
  import store from 'store';
  import {getScheme, setScheme} from 'nativeFix';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '积分中心',
        tab:[
          {id:0,
           name:'全部',
           click:true
          },
//          {id:1,
//           name:'热门',
//           click:false
//          },
          {id:2,
           name:'我能兑换',
           click:false
          }
          ],
        dialog:false,
        moreCalendar:false,
        task_list:'',
        week_checkin:{},
        userId:"",
        total_integral:'00',
        goodslist:[],
        got_point:'0',
        userInfo:'',
        iphoneXtop:32,
        opacitysNum:1,
        nativeStatusBarStyle:2,
        titleShow:true,
        opacityNum:0,
        tipsDialog:false,
        tipsDialogTxt:1,
        main:45,
        total_upoint:'',
        isApp: isApp(),
        checkInData:'',
        checkInDataSeven:'',
        lastReplenishDate:'',
        loading:true,
        buqian:'',
        canReplenish:0,
        today:''
      }
    },
    methods:{
      linkto(n) {
        localStorage.setItem('creditToMyAccount', n)
        this.$router.push({
            name: 'myAccount'
        })
      },
      tabClick(ret) {
          ret.id == 0 ? this.ecchangelist({}):'';
          ret.id == 1 ? this.ecchangelist({"isHot":1}):'';
          ret.id == 2 ? this.ecchangelist({"points":this.total_integral},this.userId):'';
          this.tab.map( (obj,idx) => {
             ret.id == obj.id ? obj.click = true : obj.click = false
          })
      },
      dialogFn(n){
          n == 1 ? this.dialog = true : this.dialog = false;
      },
      repLenish (){
        this.moreCalendar = true;
        apiReplenish({
          "userId":this.userId,
          "checkInDate":this.lastReplenishDate
        }).then(res => {
           if(res.retCode == 0){
             this.replenishStatus(res.data.orderId)
           }else{
             this.$toast(res.retMsg);
             this.loading = true;
           }
        })
      },
      replenishStatus (code){
        apiReplenishStatus({
          "userId":this.userId,
          "orderId":code
        }).then(res => {
          if(res.data.status == 1){
            this.buqian = res.data.rewardPoint;
            this.dialogFn(1);
//            this.total_integral = this.total_integral-50;
            this.paystatusNum = 0;
            this.getinfo();
            this.loading = true;
          }else if(res.data.status == 0){
            this.paystatusNum++;
            if(this.paystatusNum > 5){
              this.$toast(res.data.msg);
              this.loading = true;
              this.paystatusNum = 0;
            }else{
              setTimeout(() => {this.replenishStatus(code)},200);
            }
          }else{
            this.$toast("补签失败");
            this.loading = true;
          }
        })
      },
      moreCalendarClick() {
          this.moreCalendar = !this.moreCalendar;
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
            app:'postFeedDirectly?infoType=1',
            h5:''
          },
          publishQuestion:{
            app:'postFeedDirectly?infoType=8',
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
          publishLawQuestion:{
            app:'publishLawQuestion',
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
                    if(item=='publishNovelty'||item=='publishQuestion'){
                      let version = this.$DANativeApi.apiVersionNumber;
                      if(version < 339){
                        setScheme('postFeed')
                      }else{
                        setScheme(jumpToObj[item].app);
                      }
                    }else{
                      if(item=='publishLawQuestion'){
                        let version = this.$DANativeApi.apiVersionNumber;
                        if(version < 400){
                          this.$updateApp('4.0.0');
                        }else{
                          setScheme(jumpToObj[item].app);
                        }
                      }else{
                        setScheme(jumpToObj[item].app);
                      }
                    }
                  }
                }else{
                  if(item=='publishNovelty'||item=='publishQuestion'){
                    let version = this.$DANativeApi.apiVersionNumber;
                    if(version < 339){
                      setScheme('postFeed')
                    }else{
                      setScheme(jumpToObj[item].app);
                    }
                  }else{
                    if(item=='publishLawQuestion'){
                      let version = this.$DANativeApi.apiVersionNumber;
                      if(version < 400){
                        this.$updateApp('4.0.0');
                      }else{
                        setScheme(jumpToObj[item].app);
                      }
                    }else{
                      setScheme(jumpToObj[item].app);
                    }
                  }
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
          this.getinfo();
          this.tipsDialogFn(res.rewardPoint);
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
      },
      getUserInfo() {
        apiGetUcenter().then(res => {
          this.userInfo = res;
          this.show = true;
        })
      },
      scroll:function (currentY, targetY) {// 计算需要移动的距离
        let needScrollTop = targetY - currentY
        let _currentY = currentY
        setTimeout(() => {// 一次调用滑动帧数，每次调用会不一样
          const dist = Math.ceil(needScrollTop / 10)
          _currentY += dist
          window.scrollTo(_currentY, currentY) // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
          if (needScrollTop > 10 || needScrollTop < -10) {
            scroll(_currentY, targetY)
          } else {
            window.scrollTo(_currentY, targetY)
          }
        }, 1)
      },
      handleScroll (el) {
        let  _this = this;
        _this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let main = _this.main;
        console.log(_this.scrollTop)
        if(_this.scrollTop > 20){
          _this.opacityNum = (_this.scrollTop)/main;
        }else{
          _this.opacityNum = 0;
        }
        if(_this.scrollTop > main+10){
          _this.citySelectShow = false;
          _this.nativeStatusBarStyle = 2;
          _this.opacitysNum = 0;
        }else{
          _this.citySelectShow = true;
          _this.nativeStatusBarStyle = 1;
          _this.opacitysNum = 1;
        }
      },
      tipsDialogFn (n){
        this.tipsDialogTxt = n;
        this.tipsDialog = true;
        let t = window.setTimeout( ()=> {
          this.tipsDialog = false;
          window.clearInterval(t);
        }, 2000);
      },
      getMouthDay () {
        apiMonthCheckin({
          data: {"userId":this.userId}
        }).then(res => {
          this.canReplenish = res.canReplenish;
          this.lastReplenishDate = res.lastReplenishDate;
          this.checkInData = [];
          for(let n=0;n < res.checkInData.length+1;n=n+7){
            var arr = res.checkInData.slice(n,n+7);
            this.checkInData.push(arr);
          }
          this.show = true;
        });
      },
      getSevenDay() {
        apiTask().then(res => {
          this.week_checkin = res.week_checkin;
          this.canReplenish = res.week_checkin.canReplenish;
        });
      },
      getinfo:function () {
        apiTask().then(res => {
          var list = [];
          res.task_list.map( (obj,idx)=> {
//            obj.iconName == 'fresh_news' ? list.push(obj):'';
            obj.iconName == 'ask' ? list.push(obj):'';
          })
          this.task_list = list;
          this.week_checkin = res.week_checkin;
          this.canReplenish = res.week_checkin.canReplenish;
          this.lastReplenishDate = res.week_checkin.lastReplenishDate;
          this.checkInData = [];
          for(let n=0;n < res.week_checkin.checkInData.length+1;n=n+7){
            var arr = res.week_checkin.checkInData.slice(n,n+7);
            this.checkInData.push(arr);
          }
          this.checkInDataSeven = this.checkInData[this.checkInData.length-2];
          this.total_integral = res.total_integral;
          this.total_upoint = res.total_upoint;
          this.got_point = res.got_point;
          res.week_checkin.checkInData.map( (obj,idx) => {
            obj.currentDay == 1 ? this.today = obj.checkInDate:''
          });
          this.show = true;
        });
      },
      ecchangelist:function (data,userid) {
        apiExchangeList(
          data,userid||""
        ).then(res => {
//           console.log(res)
          res.retCode == 0 ? this.goodslist = res.data :  this.$toast(res.retMsg)
        })
      }
    },
    created() {
      isLogin({
        success: () => {
          this.getinfo();
          this.ecchangelist();
          this.getUserInfo();
        },
        fail: () => {
          if(isApp()) {
            toLogin();
          }else{
            window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
          }
        }
      })
    },
    mounted() {
      this.userId = this.$store.state.userInfo.userId;
      if(this.isApp) {
        this.main = 70;
      }
      window.addEventListener('scroll', this.handleScroll);
      const systemInfo = this.$systemInfo();
      if(systemInfo.isIphoneX){
        this.iphoneXtop = 52;
      }
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .4s ease-out;
  }

  .my-trans-enter {
    transform: translateY(200px);
    opacity: 0;
  }

  .my-trans-leave-active {
    transform: translateY(200px);
    opacity: 0;
  }


  [class^=urimg-] {
    background: url('http://m.urwork.cn/assets/public/center/images/mark.png') no-repeat;
    width: 15px;
    height: 15px;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    background-size: cover;
  }
  /deep/ .page-wrapper{
    background: #e5e5e5;
  }
  /deep/ .page-topbar .navigate .action{
    color: #ffffff;
  }
  /deep/ .page-topbar.topbar-theme-def{
    background: transparent;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #EE434B;
    z-index: 999;
  }
  /deep/ .page-topbar.topbar-theme-def .title{
       /*background-color: #EE434B;*/
       color: #ffffff;
  }
  /deep/ .page-header .header-inner.has-border::before{
    border-bottom: 1px solid #EE434B;
  }
  .kong45{
    height: 45px;
  }
  #main{
    background: #F5F5F5;
    .pink-bg{
      background: url("https://assets.urwork.cn/image/credit/pink_bg.jpg") no-repeat;
      background-size: 100%;
    }
    .banner{
      width: 100vw;
      height: 138px;
      /*background-image: linear-gradient(#EE434B 0%, #FF6756 94%);*/
      padding: 14px 20px;
      display: flex;
      align-items: flex-start;
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
        .name-job{
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #FFFFFF;
        }
        .company{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FFFFFF;
          .urimg-join{
            width: 15px;
            height: 100%;
            /*background: url("");*/
          }
          .urimg-join {
            width: 15px;
            height: 15px;
            display: inline-block;
            margin-left: 4px;
            background-position: 0 0;
          }
          .urimg-vip {
            width: 15px;
            height: 15px;
            display: inline-block;
            margin-left: 4px;
            background-position: 0 -14px;
          }
        }
      }
    }
    .date{
      background-color: #ffffff;
      /*height: 205px;*/
      /*padding: 0 20px;*/
      padding-bottom: 7px;
      position: relative;
      .point-box{
        width: 100%;
        padding: 0 20px;
        position: relative;
        padding-top: 38px;
     /*   position: absolute;
        top: -37px;*/
        .point{
          width: calc(100% - 40px);
          height: 75px;
          display: flex;
          align-items: center;
          /*justify-content: space-around;*/
          background: #FFFFFF;
          box-shadow: 0 3px 8px 0 rgba(208,211,213,0.58);
          border-radius: 4px;
          position: absolute;
          top: -37px;
          a{
            width: 50%;
          }
          .credit{
             flex: 1;
            text-align: center;
          }
          .r-line{
            width: 1px;
            height: 36px;
            background: #ebebeb;
          }
          .u-point{
            flex: 1;
            text-align: center;
          }
          span{
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #333333;
            text-align: center;
            font-weight: 600;
          }
          p{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            text-align: center;
          }
        }
        .sign{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          .left{
            >h2{
              font-family: PingFangSC-Medium;
              font-size: 16px;
              color: #333333;
              text-align: left;
            }
            >p{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              line-height: 25px;
            }
          }
          .right{
            >div{
              width: 65px;
              height: 26px;
              line-height: 26px;
              color: #ffffff;
              border-radius: 13px;
              background-image: linear-gradient(-180deg, #FF6756 0%, #EE434B 100%);
              text-align: center;
              font-family: PingFangSC-Medium;
              font-size: 14px;
            }
            >p{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #999999;
              line-height: 25px;
            }
          }
        }
        .calendar{
          margin-top: 18px;
          >ul{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            li{
              color: #999999;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              /*float: left;*/
              /*text-align: center;*/
              width: 32px;
              span{
                width: 26px;
                height: 26px;
                box-sizing: content-box;
                border: 3px solid #EAEEED;
                line-height: 26px;
                display: inline-block;
                border-radius: 50%;
                background: #FFFFFF;
                box-shadow: 0 1px 2px 0 #EAEEED;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #BBBBBB;
              }
              p{
                font-weight: 100;
                width: 56px;
                text-align: center;
                font-size: 10px;
              }
            }
            .red{
              color: #F1494D;
              span{
                width: 26px;
                height: 26px;
                border: 3px solid transparent;
                line-height: 26px;
                display: inline-block;
                border-radius: 50%;
                background: #FF6756;
              /*  background-image: linear-gradient(-180deg, #FF6756 0%, #EE434B 100%);*/
                box-shadow: 0 1px 2px 0 #E7594C;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #FFFFFF;
              }
            }
            .double{
              span{
                width: 32px;
                height: 32px;
                border: none;
                background: url("https://assets.urwork.cn/image/credit/points_grey.jpg") no-repeat;
                background-size: 100%;
                font-size: 0;
              }
            }
            .double-color{
              span{
                width: 32px;
                height: 32px;
                border: none;
                background: url("https://assets.urwork.cn/image/credit/double_point.jpg") no-repeat;
                background-size: 100%;
                font-size: 0;
              }
              p{
                color: #E7594C;
              }
              .grey-p{
                color: #999999;
              }
            }
          }
        }
        .down-more{
          text-align: center;
          .spanbox{
            height: 100%;
            display: inline-block;
            span{
              width: 20px;
              height: 4px;
              display: inline-block;
              border-top: 1px solid #e3e3e3;
              border-bottom: 1px solid #e3e3e3;
            }
          }
        }
      }
    }
    .task-item{
      .sign2{
        position: relative;
        margin-top: 20px;
        .sign-desk{
          height: 30px;
          padding: 0 9px;
          border-radius: 15px;
          background-image: linear-gradient(-90deg, #FF8846 0%, #FF3A2F 100%);
          color: #FFFFFF;
          font-size: 14px;
          position: absolute;
          top: 7px;
          right: 0px;
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
        .item-title{
           font-size: 16px;
          color: #333;
          font-weight: 600;
        }
        .item-tip{
          font-size: 12px;
          color: #666;
        }
      }
    }

    .lucky{
      width: 100%;
      text-align: center;
      padding:0.25rem 0.26rem;
      img{
        display: inline-block;
      }
    }
    .tasks{
      .task{
        background: #ffffff;
        padding: 20px;
        .task-tit{
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
        }
        .task-tips{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #666666;
          margin-bottom: 15px;
        }
        .task-list{
          li{
            height: 80px;
            background: #FFFFFF;
            box-shadow: 0 1px 8px -1px rgba(208,211,213,0.58);
            border-radius: 2px;
            margin-bottom: 15px;
            position: relative;
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
              .progress{
                height: 6px;
                display: flex;
                align-items: center;
                margin-top: 10px;
                font-family: PingFangSC-Regular;
                font-size: 11px;
                progress{
                  width: 100px;
                  height: 6px;
                  border: none;
                  background-color:#f2f2f2;
                  color: #f8c1bd; /*IE10*/
                  border-radius: 3px;
                  &::-moz-progress-bar { background: #f2f2f2;border-radius: 3px; }
                  &::-webkit-progress-bar { background: #f2f2f2; border-radius: 3px;}
                  &::-webkit-progress-value  { background-image: linear-gradient(-90deg, #FF8A56 0%, #EE434B 72%); border-radius: 3px;}
                }
                span{
                  color: #3F3F3F;
                  margin-top: 1px;
                  margin-left: 5px;
                  em{
                    color: #F34E4F;
                  }
                }
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
          .more{
            text-align: center;
            padding-top: 10px;
            a{
              color: #F34E4F;
            }
          }
        }
      }
     .u-point{
       margin-top: 8px;
       .scroll-x::-webkit-scrollbar {
         display: none; //Safari and Chrome
       }
       .scroll-x{
         white-space:nowrap;
         width: 100%;
         overflow: scroll;
         /*padding: 0 10px 5px 20px;*/
         margin-top:18px;
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
      .exchange{
        margin-top: 8px;
        .tab{
          ul{
            overflow: hidden;
            li{
              float: left;
              margin: 0 18px;
              padding: 15px 0;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #A2A2A2;
              &:first-child{
                margin-left: 0;
              }
            }
            .click{
              font-family: PingFangSC-Medium;
              color: #333333;
              font-weight: 600;
              position: relative;
              &::after{
                content: '';
                width: 11px;
                height: 2px;
                display: inline-block;
                background: #FE4C27;
                position: absolute;
                left: 50%;
                bottom: 12px;
                transform: translate(-50%, 0);
                -ms-transform: translate(-50%,0);
                -webkit-transform: translate(-50%,0);
                -o-transform: translate(-50%,0);
                -moz-transform: translate(-50%,0);
              }
            }
          }
        }
        .goods{
          ul{
            a{
              width: calc(50% - 10px);
              padding-bottom: 30px;
              &:nth-of-type(odd){
                  float: left;
              }
              &:nth-of-type(even){
                float: right;
              }
              .img{
                width: 100%;
                height: 3rem;
                line-height: 3rem;
                border: 1px solid #f2f2f2;
                overflow: hidden;
                position: relative;
                .icon-zhijiao{
                  width: 0px;
                  height: 0px;
                  border-color: #FFCD26 transparent transparent #FFCD26;
                  border-width: 20px 20px 20px 20px;
                  border-style: solid;
                  position: absolute;
                  top: 0;
                  left: 0;
                }
                .text-zhijiao{
                  font-family: PingFangSC-Medium;
                  font-size: 10px;
                  font-weight: 600;
                  color: #2D2D2D;
                  width: 40px;
                  height: 40px;
                  line-height: 20px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  transform: rotate(-45deg);
                }
              }
          
              .detail{
                text-align: center;
                margin-top: 8px;
                .name{
                  font-family: PingFangSC-Medium;
                  font-size: 16px;
                  color: #333333;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-weight: 500;
                }
                .price{
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #666666;
                  margin-top: 5px;
                }
                .vip-price{
                  display: inline-block;
                  margin-top: 9px;
                  font-family: PingFangSC-Regular;
                  font-size: 13px;
                  color: #F0484C;
                  text-align: right;
                  background: #FFFFFF;
                  border: 1px solid #FD6255;
                  border-left:none;
                  border-radius:0 2px 2px 0;
                  padding: 0 5px;
                  padding-left: 30px;
                  position: relative;
                  .vipicon{
                    width: 27px;
                    height: 100%;
                    box-sizing: content-box;
                    padding: 1px 0;
                    display: inline-block;
                    position: absolute;
                    top: -1px;
                    left: -2px;
                    background: url(https://assets.urwork.cn/image/credit/vip_icon.jpg) no-repeat;
                    background-size: 100% 100%;
                  }
                }
              }
            }
            p{
              text-align: center;
              line-height: 30px;
              padding-bottom: 5px;
              color: #cccccc;
            }
          }
        }
      }
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
    .dialog{
      z-index: 901;
      width: 5.4rem;
      background-color: #ffffff;
      border-radius: 0.2rem;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content{
        width: 5.4rem;
        height: 1.98rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
        }
        span{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
          margin-top: 11px;
        }
      }
      .close{
        text-align: center;
        height: 0.9rem;
        line-height: 0.9rem;
        position: relative;
        @include border-top(#c1c1c1);
        span{
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #F0474C;
          letter-spacing: 0;
        }
      }
    }
  }
  #point-mask{
    width: 100%;
    height: 60px;
    padding: 0 10px;
    position: fixed;
    bottom: 10%;
    .content{
      height: 100%;
      background: rgba(0,0,0,0.8);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content:space-between;
      padding: 0 15px;
      .left{
        display: flex;
        align-items: center;
        justify-content:space-between;
        .p{
          margin-left: 10px;
          h4{
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
          }
          p{
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #FFFFFF;
            letter-spacing: 0;
          }
        }
        .logo{
          width: 24px;
          height: 24px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .add-point{
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #F0484C;
        letter-spacing: 0;
      }
    }
  }
</style>
