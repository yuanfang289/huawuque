<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>
    <main id="main" class="station-main">
      <div class="lucky">
        <img v-if="code == 1" src="https://assets.urwork.cn/image/credit/banner_friend.jpg"/>
        <img v-if="code == 3" src="https://assets.urwork.cn/image/credit/banner_share.jpg"/>
        <img v-if="code == 2" src="https://assets.urwork.cn/image/credit/banner_company.jpg"/>
      </div>
      <div class="tasks">
        <div class="task">
          <ul v-if="code == 3" class="task-list">
            <li v-for="item in task_list3">
              <div class="list-info">
                <h3>
                  <p>{{item.taskName}}</p><span v-if="item.totalCount != item.completeCount">{{item.shouldGetPoint}}积分待领取</span>
                </h3>
                <div class="progress">
                  <progress :value="item.completeCount" :max="item.totalCount"></progress><span><em>{{item.completeCount}}</em>/{{item.totalCount}}</span>
                </div>
              </div>
              <div v-if="item.totalCount == item.completeCount" class="list-btn">
                已完成
              </div>
              <div v-else="" class="list-btn" @click="goto(item.jumpTo)">
                {{item.buttonText}}
              </div>
            </li>
            <!--<li>-->
            <!--<div class="list-info">-->
            <!--<h3>-->
            <!--<p>邀请好友</p>-->
            <!--</h3>-->
            <!--<div class="progress">-->
            <!--<progress value="3" max="3"></progress><span><em>3</em>/3</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="list-gbtn">-->
            <!--已完成-->
            <!--</div>-->
            <!--</li>-->
          </ul>
          <ul v-if="code == 2" class="task-list">
            <li v-for="item in task_list2">
              <div class="list-info">
                <h3>
                  <p>{{item.taskName}}</p><span v-if="item.totalCount != item.completeCount">{{item.shouldGetPoint}}积分待领取</span>
                </h3>
                <div class="progress">
                  <progress :value="item.completeCount" :max="item.totalCount"></progress><span><em>{{item.completeCount}}</em>/{{item.totalCount}}</span>
                </div>
              </div>
              <div v-if="item.totalCount == item.completeCount" class="list-btn">
                已完成
              </div>
              <div v-else="" class="list-btn" @click="goto(item.jumpTo)">
                {{item.buttonText}}
              </div>
            </li>
            <!--<li class="progress-li">-->
            <!--<div class="list-info">-->
            <!--<h3>-->
            <!--<p>关注企业</p><span>40积分待领取</span>-->
            <!--</h3>-->
            <!--<p class="list-tip">社群、找人页面均可关注</p>-->
            <!--<div class="progress">-->
            <!--<p class="num">-->
            <!--<span>30</span>-->
            <!--<span>20</span>-->
            <!--<span>10</span>-->
            <!--</p>-->
            <!--<p class="dot">-->
            <!--<span></span>-->
            <!--<span></span>-->
            <!--<span></span>-->
            <!--</p>-->
            <!--<progress value="1" max="6"></progress>-->
            <!--<p class="dot-point">-->
            <!--<span class="span"><span></span>100</span>-->
            <!--<span class="span"><span></span>200</span>-->
            <!--<span class="span"><span></span>300</span>-->
            <!--</p>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="list-btn">-->
            <!--去关注-->
            <!--</div>-->
            <!--</li>-->
          </ul>
          <ul v-if="code == 1" class="task-list">

              <template v-for="item in task_list0">
                <li v-if="item.totalCount == item.completeCount">
                <div class="list-info">
                  <h3>
                    <p>{{item.taskName}}</p><span v-if="item.totalCount != item.completeCount">{{item.shouldGetPoint}}积分待领取</span>
                  </h3>
                  <div class="p">
                    让个人形象更丰满
                  </div>
                </div>
                <div class="list-btn">
                  已完成
                </div>
                </li>
              <!--</template>-->
              <!--<template v-else="" @click="goto(item.jumpTo)">-->
                <li v-else="" @click="goto(item.jumpTo)">
                  <div class="list-info">
                    <h3>
                      <p>{{item.taskName}}</p><span v-if="item.totalCount != item.completeCount">{{item.shouldGetPoint}}积分待领取</span>
                    </h3>
                    <div class="p">
                      让个人形象更丰满
                    </div>
                  </div>
                  <div class="list-btn">
                    {{item.buttonText}}
                  </div>
                </li>
              </template>


            <li v-if="sss!=0" v-for="item in task_list1" @click="goto(item.jumpTo)">
              <div class="list-info">
                <h3>
                  <p>发动态</p><span>{{sss}}积分待领取</span>
                </h3>
                <div class="p">
                  新鲜事、找服务、招聘、法律咨询
                </div>
              </div>
              <div class="list-btn">
                {{item.buttonText}}
              </div>
            </li>
            <li v-else="">
              <div class="list-info">
                <h3>
                  <p>发动态</p>
                </h3>
                <div class="p">
                  新鲜事、找服务、招聘、法律咨询
                </div>
              </div>
              <div class="list-btn">
                已完成
              </div>
            </li>


            <!--<li class="progress-li">-->
            <!--<div class="list-info">-->
            <!--<h3>-->
            <!--<p>关注用户</p><span>100积分待领取</span>-->
            <!--</h3>-->
            <!--<p class="list-tip">社群、找人页面均可关注</p>-->
            <!--<div class="progress">-->
            <!--<p class="num">-->
            <!--<span>25</span>-->
            <!--<span>15</span>-->
            <!--<span>5</span>-->
            <!--</p>-->
            <!--<p class="dot">-->
            <!--<span></span>-->
            <!--<span></span>-->
            <!--<span></span>-->
            <!--</p>-->
            <!--<progress value="1" max="6"></progress>-->
            <!--<p class="dot-point">-->
            <!--<span class="span"><span></span>50</span>-->
            <!--<span class="span"><span></span>80</span>-->
            <!--<span class="span"><span></span>100</span>-->
            <!--</p>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="list-btn">-->
            <!--去关注-->
            <!--</div>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
      <!--<div class="explain" v-if="code == 2">-->
      <!--<p>加入企业，也可以获得积分哦～</p>-->
      <!--</div>-->
      <!--<div class="explain" v-if="code == 1">-->
      <!--<p><span>还不够？</span><br>-->
      <!--对视频、动态的评论与点赞都可以获得积分。<br>-->
      <!--快拉上小伙伴一起参加吧～<br>-->
      <!--邀请注册，还有额外积分相送！！！-->
      <!--</p>-->
      <!--</div>-->
    </main>
  </page-wrap>
</template>

<script>
  import apiTask from 'api/credit/apiTask';
  import field from 'src/app/user/EnTable';
  import {mapState} from 'vuex';
  import store from 'store';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '找朋友，发动态',
        code:1,
        task_list0:'',
        task_list1:'',
        task_list2:'',
        task_list3:'',
        userId:'',
        sss:'0',
        isApp:isApp()
      }
    },
    methods:{
      getinfo:function () {
        apiTask().then(res => {
//          console.log(res,22222222222222222);
          var list0 = [],list1 = [],list2 = [],list3 = [],list=[];
          res.task_list.map( (obj,idx)=> {
            obj.iconName == 'perfect_per_data' ? list0.push(obj):'';
            obj.iconName == 'search_for_services' ? list1.push(obj):'';
            obj.iconName == 'search_for_services' ? list.push(obj):'';
            obj.iconName == 'recruit' ? list.push(obj):'';
            obj.iconName == 'fresh_news' ? list.push(obj):'';
            obj.iconName == 'ask' ? list.push(obj):'';
            obj.iconName == 'create_company' ? list2.push(obj):'';
            obj.iconName == 'upgrade_ucompany' ? list2.push(obj):'';
            obj.iconName == 'authentication_company' ? list2.push(obj):'';
            obj.iconName == 'share_company' ? list3.push(obj):'';
            obj.iconName == 'share_per_homepage' ? list3.push(obj):'';
            obj.iconName == 'register' ? list3.push(obj):'';
          })
          this.task_list0 = list0;
          this.task_list1 = list1;
          this.task_list2 = list2;
          this.task_list3 = list3;
          let sss = 0
          list.map( (obj,idx)=> {
            sss = sss + obj.shouldGetPoint
          })
          this.sss = sss;
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
//            app:'companyMarket',
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

        if(item == 'publishService'){
            alert("请到‘发现’页发布动态，赚取积分。")
        }else{
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
        }



      }
    },
    created() {
      this.show = true;this.getinfo();
      this.code = this.$route.query.code || 1;
      if(this.code == 2){
        this.title = '企业管理'
      }
      if(this.code == 3){
        this.title = '分享精彩'
      }
    },
    mounted() {
      this.userId = this.$store.state.userInfo.userId;

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  #main{
    background: #F5F5F5;
    .lucky{
      width: 100%;
      height: 100%;
      img{
        width: 100vw;
        height: 32vw;
        display: inline-block;
      }
    }
    .tasks{
      .task{
        background: #ffffff;
        padding: 20px;
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
              padding:0 15px;
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
              .list-tip{
                margin-top: 5px;
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
            .list-gbtn{
              width: 70px;
              height: 27px;
              line-height: 27px;
              text-align: center;
              border: 1px solid #999999;
              border-radius: 17px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #999999;
              letter-spacing: 0;
              position: absolute;
              right: 15px;
              top: 50%;
              margin-top: -13px;
            }
          }
          .progress-li{
            height: 134px;
            .list-info{
              .progress{
                margin-top: 20px;
                flex-direction: column;
                height: 100%;
                .num{
                  width: 100%;
                  span{
                    display: inline-block;
                    width: 33.33%;
                    margin: 0;
                    text-align: right;
                    float: right;
                  }
                }
                .dot{
                  width: 100%;
                  height: 8px;
                  position: relative;
                  span{
                    width: 5px;
                    height: 5px;
                    display: inline-block;
                    border-radius: 50%;
                    background: #FD7F55;
                    margin: 0;
                    margin-left: -5px;
                    position: absolute;
                    top: 8px;
                    &:nth-of-type(1){
                      left: 33.33%;
                      margin-left: -8px;
                    }
                    &:nth-of-type(2){
                      left: 66.66%;
                      margin-left: -8px;
                    }
                    &:nth-of-type(3){
                      left: 99.99%;
                    }
                  }
                }
                progress{
                  width: 100%;
                }
                .dot-point{
                  width: 100%;
                  position: relative;
                  height: 18px;
                  overflow: hidden;
                  margin-top: 3px;
                  .span{
                    margin: 0;
                    display: inline-block;
                    position: absolute;
                    span{
                      width: 12px;
                      height: 12px;
                      margin: 0;
                      display: inline-block;
                      border-radius: 50%;
                      background: url("https://assets.urwork.cn/image/credit/icon_point.jpg");
                      background-size: 100%;
                      margin-right: 5px;
                    }
                    &:nth-of-type(1){
                      left: 33.33%;
                      transform: translate(-70%, 0);
                      -ms-transform: translate(-70%,0);
                      -webkit-transform: translate(-70%,0);
                      -o-transform: translate(-70%,0);
                      -moz-transform: translate(-70%,0);
                    }
                    &:nth-of-type(2){
                      left: 66.66%;
                      transform: translate(-70%, 0);
                      -ms-transform: translate(-70%,0);
                      -webkit-transform: translate(-70%,0);
                      -o-transform: translate(-70%,0);
                      -moz-transform: translate(-70%,0);
                    }
                    &:nth-of-type(3){
                      right: 0;
                    }
                  }
                }
              }
            }
            .list-btn{
              top: 25%;
            }
          }
        }
      }
    }
    .explain{
      background: #ffffff;
      padding: 20px;
      p{
        font-family: PingFangSC-Semibold;
        font-size: 12px;
        color: #666666;
        letter-spacing: 0;
      }
    }
  }
</style>
