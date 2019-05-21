<template>
  <page-main
    :show="show"
  >
    <section class="open-door-wrapper" v-if="isApp">
      <toNativePage path="qrcode" :isAuth="true">
        <button class="open-door-btn">{{isEn ? field.unlock.en : field.unlock.ch}}</button>
        <!-- <button class="open-door-btn"></button> -->
      </toNativePage>
    </section>
    <section class="main-slide-wrapper">
      <Swiper
             :bannerList="banners"
             :paddingTop="55.970"
             :column="1"
             :transformScale="true"
      >

      </Swiper>
    </section>
    <section class="main-business-wrapper">
      <div class="icon-list-wrapper" ref="iconList">
        <icon-list :iconList="iconList" @icon-click="iconFn" :imgWidth="30">
        </icon-list>
      </div>
      <div class="notice-wrapper">
        <div class="notice-left">
          <div class="notice-title">
            <span>公</span>
            <span>告</span>
          </div>
          <div class="notice-list-wrapper">
            <notice :noticeList="noticeList">
            </notice>
          </div>
        </div>
        <div class="notice-right">
          <i class="uricon-arrow-right"></i>
        </div>
      </div>
    </section>

    <section class="sign-wrapper">
      <template v-if="todayChecked==1">
        <div class="sign" @click.stop="gototask()">
          <img src="../user/img/index_signed.png">
          <p v-if="userId">您已连续签到{{day}}天</p>
          <div class="sign-click">

          </div>
        </div>
      </template>
      <template v-else="">
        <div class="sign" @click.stop="gototask()">
          <img src="../user/img/index_sign.png">
          <p v-if="userId">您已连续签到{{day}}天</p>
          <div class="sign-click" @click.stop="sign(10070)">

          </div>
        </div>
      </template>
    </section>

    <section class="citys-wrapper">
      <city-list ref="citysTab" :data="hotCity" className="citys-list-item">
        <template  slot-scope="{list}">
          <Swiper
            ref="citysSwiper"
            :bannerList="list"
            :column="3.3"
            :paddingTop="1"
            :wrapperPadding="20"
            :autoPlay="false"
            :loop="false"
            :showDot="false"
            :isUserDefined="true"
          >
            <template slot="user" slot-scope="{item}">
              <div class="citys-item">
                <object>
                <a href="javascript:;" @click="toStageList({path: v2+'/workStage/stageList', query: {name: item.cityName, code: item.cityCode}})">
                  <div class="img-wrapper">
                    <img :src="item.imgurl"/>
                  </div>
                  <h3>{{item.cityName}}</h3>
                  <!--<h3>￥<span>{{item.price}}</span></h3>-->
                </a>
                </object>
              </div>
            </template>
          </Swiper>
        </template>
      </city-list>
    </section>


    <section class="u-class-wrapper">
      <SubTitle :title="isEn ? field.titleClassroom.en : field.titleClassroom.ch" :asideShow="false"></SubTitle>
      <div class="course-list-item-wrap">
        <course-list-item :list="subjects"></course-list-item>
      </div>
      <to-page class="more-link" :ios="'3.2.0'" :android="'3.2.0'" nativePath="subjectList" :path="{name: 'classroomIndex'}">{{isEn ? field.more.en : field.more.ch}} <i class="uricon-arrow-right"></i></to-page>
    </section>
    <ad-banner v-if="ad1" :bannerList="ad1"></ad-banner>
    <section class="activity-wrapper">
      <SubTitle :title="isEn ? field.titleEvents.en : field.titleEvents.ch" :asideShow="false"></SubTitle>
      <div class="activity-list-item-wrapper">

        <div class="activity-list-item-v" v-for="item in activityData" :key="item.id">
          <a :href="`/activity/h5Detail?id=${item.id}`">
            <dl>
              <dt>
                <Img :src="item.image3"/>
              <!--<div class="play-cnt">-->
                <!--<i class="uricon-audio-number"></i> {{item.playCnt}}-->
              <!--</div>-->
              </dt>
              <dd>
                <h3>{{item.name}}</h3>
                <h4>{{item.title}}</h4>
                <div class="course-use-info">
                  <!--<p>{{item.title}}节课</p>-->
                  <div class="course-info">
                    <p>
                      <img src="../../static/images/activity/location.png" />
                      <template>
                        <span v-if="item.workstageActivities[0].workstageId == -1">{{item.workstageActivities[0].address}}</span>
                        <span v-else>{{item.workstageActivities[0].workstage.stageName}}</span>
                      </template>
                    </p>
                    <p>
                      <img src="../../static/images/activity/time.png" />
                      {{item.status == 5 ? '活动已结束' : item.status == 4 ? '活动进行中' : dateFormat(item.startTime, 'MM/dd')}}
                    </p>
                  </div>
                  <!--<p>{{Math.round(item.durationTotal / 60)}}分钟／{{item.playCnt}}人听过</p>-->
                </div>
                <div class="course-price">
                  <p  v-if="item.ticketFlag == 1&&item.canSingup == 'buy'"><span>￥</span>{{item.price}}</p>
                  <p  v-if="item.ticketFlag == 2&&item.canSingup == 'buy'"><span>￥</span>0.0</p>
                  <p  v-else="">免费</p>
                </div>
                <div class="course-tip">
                  <div v-if="item.count > 9" class="listeners">
                    <!--<to-page-->
                      <!--:ios="'3.0.8'"-->
                      <!--:android="'3.0.9'"-->
                      <!--:nativePath="'subjectMain?id=' + item.id"-->
                      <!--:path="{path: 'classroom/listenerList', query: {id: item.id,title:'最近感兴趣'}}"-->
                    <!--&gt;-->
                      <object>
                        <a href="javascript:;" @click="toListenerList({path: v2+'/classroom/listenerList', query: {id: item.id, title: '最近感兴趣'}})">
                      <ul>
                        <li v-for="row in item.userList.slice(0,4)"><img :src="'https://image.urwork.cn/'+row.headImage+'?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140'" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';"/></li>

                        <li class="lessonsCnt" v-if="item.count > 9">{{item.count}}</li>
                      </ul>
                        </a>
                      </object>
                    <!--</to-page>-->
                  </div>
                </div>
                <div v-if="item.canSignup != 'off'" class="btn btn-primary">{{isEn ? field.podcasts.en : field.podcasts.ch}}
                  <!--<img src="../../../static/images/classroom/pause.png" alt="">-->
                </div>
              </dd>
            </dl>
          </a>
        </div>

        <!--<div class="activity-list-item" v-for="item in activityData" :key="item.id">-->
          <!--<a :href="`/activity/h5Detail?id=${item.id}`">-->
            <!--<div class="img-wrapper">-->
              <!--<Img :src="item.image3"/>-->
            <!--</div>-->
            <!--<div class="activity-text">-->
              <!--<h2>{{item.name}}</h2>-->
              <!--<div class="activity-info">-->
                <!--<p>-->
                  <!--<img  v-if="item.workstageActivities" src="../../static/images/activity/location.png" />-->
                  <!--<template v-if="item.workstageActivities">-->
                    <!--<span v-if="item.workstageActivities[0].workstageId == -1">{{item.workstageActivities[0].address}}</span>-->
                    <!--<span v-else>{{item.workstageActivities[0].workstage.stageName}}</span>-->
                  <!--</template>-->
                <!--</p>-->
                <!--<p>-->
                  <!--<img src="../../static/images/activity/time.png" />-->
                  <!--{{item.status == 5 ? '活动已结束' : item.status == 4 ? '活动进行中' : dateFormat(item.startTime, 'MM/dd')}}-->
                <!--</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</a>-->
        <!--</div>-->
      </div>
      <to-page class="more-link" :ios="'3.2.0'" :android="'3.2.0'" nativePath="activitiesList" :path="'/activity/getactivitylistpage'" :is-old-page="true">{{isEn ? field.more.en : field.more.ch}} <i class="uricon-arrow-right"></i></to-page>
    </section>
    <ad-banner v-if="ad2" :bannerList="ad2"></ad-banner>
    <section class="recommends-wrapper">
      <tab-list ref="recommendsTab" :data="recommendsData" className="recommends-list-item" @tab-change="recommendsSwiperUpdateFn">
        <template slot-scope="{list}">
          <Swiper
            ref="recommendsSwiper"
            :bannerList="list"
            :column="2"
            :wrapperPadding="20"
            :autoPlay="false"
            :loop="false"
            :showDot="false"
            :isUserDefined="true"
            @width-over="recommendsImgFn"
          >
            <template slot="user" slot-scope="{item}">
              <div class="recommends-item">
                <a :href="item.linkUrl">
                  <div class="img-wrapper">
                    <Img v-if="recommendsImageRender" :src=" imgurl + '/' + item.image"/>
                  </div>
                  <h2><span class="label red" v-if="item.hotTip">{{item.hotTip}}</span>{{item.title}}</h2>
                  <h3>￥
                    <template v-if="item.price.indexOf('起')>-1">
                      <span>{{item.price.replace(/起/g,"")}}<span class="qi">起</span></span>
                    </template>
                    <template v-else="">
                      <span>{{item.price}}</span>
                    </template>
                  </h3>
                </a>
              </div>
            </template>
          </Swiper>
        </template>
      </tab-list>
    </section>
    <section class="video-wrapper">
      <SubTitle :title="isEn ? field.titleVideo.en : field.titleVideo.ch">
        <a @click.prevent="publishVideoFn" href="javascript:;"><img src="../../static/images/index/fb.png" alt=""><span>{{isEn ? field.uploadVideos.en : field.uploadVideos.ch}}</span></a>
      </SubTitle>
      <div class="video--list-item-wrapper">
        <video-list-item :data="videoData"></video-list-item>
      </div>
      <to-page class="more-link" :ios="'3.2.0'" :android="'3.2.0'" nativePath="videoList" :path="{name: 'videoList'}">{{isEn ? field.more.en : field.more.ch}} <i class="uricon-arrow-right"></i></to-page>
    </section>
    <ad-banner v-if="ad3" :bannerList="ad3"></ad-banner>
    <section class="u-goods-wrapper">
      <SubTitle :title="isEn ? field.titleGifts.en : field.titleGifts.ch">
        <a href="/market/releaseIndex"><img src="../../static/images/index/fb.png" alt=""><span>{{isEn ? field.postGift.en : field.postGift.ch}}</span></a>
      </SubTitle>
      <div class="u-goods-list">
        <tab-list :data="uGoodsData" className="u-goods-list-item">
          <template slot-scope="{list}">
            <div class="goods-item" v-for="item in list" :key="item.id">
              <a :href="item.linkUrl">
                <div class="img-wrapper">
                  <Img :src="item.mainImg"/>
                </div>
                <h2><span class="label red" v-if="item.hotTip">{{item.hotTip}}</span>{{item.name}}</h2>
                <h3 v-if="item.marketPrice == item.price">
                  ￥<span>{{item.marketPrice}}</span>
                </h3>
                <h3 v-else="">
                  ￥<span>{{item.price}}</span>
                  <em>¥{{item.marketPrice}}</em>
                </h3>
              </a>
            </div>
          </template>
        </tab-list>
        <to-page class="more-link" :ios="'3.2.0'" :android="'3.2.0'" nativePath="mall" :path="'/product/getList'" :is-old-page="true">{{isEn ? field.more.en : field.more.ch}} <i class="uricon-arrow-right"></i></to-page>
      </div>
    </section>
    <!--<ad-banner v-if="ad4" :bannerList="ad4"></ad-banner>-->
    <div class="consult-wrapper">
      <SubTitle :title="isEn ? field.titleHottest.en : field.titleHottest.ch" :asideShow="false"></SubTitle>
      <div class="consult-list-item-wrapper">
        <Consult-list-item :list="newsList"></Consult-list-item>
      </div>
      <to-page class="more-link" :ios="'3.2.0'" :android="'3.2.0'" nativePath="newsList" :path="{name: 'news'}">{{isEn ? field.more.en : field.more.ch}} <i class="uricon-arrow-right"></i></to-page>
    </div>
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
  </page-main>
</template>

<script>
  import toNativePage from 'nativeFix/component/toNativePage';
  import toPage from 'nativeFix/component/toPage/toPage';
  import Swiper from 'lib/swiper/Swiper'
  import IconList from 'app/index/modules/IconList';
  import Notice from 'app/index/modules/Notice';
  import AdBanner from 'app/index/modules/AdBanner';
  import TabList from 'app/index/modules/TabList';
  import CityList from 'app/index/modules/CityList';
  import SubTitle from 'app/classroom/modules/SubTitle';
  import CourseListItem from 'app/classroom/modules/CourseListItem';
  import VideoListItem from 'app/video/modules/VideoListItem';
  import ConsultListItem from 'src/app/news/modules/ConsultListItem';
  import field from 'src/app/index/EnTable';
  import {mapState} from 'vuex';
  import formatDate from 'utils/formatDate';
  import routePrefix from 'config/config';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';

  import apiIndex from 'src/api/index/apiIndex';
  import Sign from 'app/user/modules/Sign';

  import apiTask from 'api/user/apiTask';
  import apiSign from 'api/user/apiSign';


  export default {
    components: {
      toNativePage,
      toPage,
      Swiper,
      IconList,
      Notice,
      SubTitle,
      TabList,
      CityList,
      CourseListItem,
      AdBanner,
      VideoListItem,
      ConsultListItem,
      Sign
    },
    computed: {
      ...mapState({
        isEn: state => state.languageEnUS
      }),
      iconList() {
        return [
          {
            linkUrl: '/reserve/index',
            picUrl: require('static/images/index/yd.png'),
//            picUrl: 'https://assets.urwork.cn/image/index/xin.png',
            text: this.isEn ? this.field.iconBook.en :  this.field.iconBook.ch,
            isRouterLink: false,
            routeName: 'classroomIndex'
          },
//          {
//            linkUrl: '/feedback/create',
//            picUrl: require('static/images/index/yjfk.png'),
//            text: this.isEn ?  this.field.iconFeed.en :  this.field.iconFeed.ch,
//            isRouterLink: false,
//            name: 'feedback'
//          },
          {
            linkUrl: '/v2/membership/card',
            picUrl: require('static/images/index/hyzx.png'),
            smpicUrl:require('static/images/index/new.png'),
//            picUrl: 'https://assets.urwork.cn/image/index/chun.png',
            text: this.isEn ?  this.field.iconVip.en :  this.field.iconVip.ch,
            isRouterLink: false
          },
          {
            linkUrl: '/company/package',
            picUrl: require('static/images/index/lb.png'),
//            picUrl: 'https://assets.urwork.cn/image/index/kuai.png',
            text: this.isEn ?  this.field.iconGifts.en :  this.field.iconGifts.ch,
            isRouterLink: false
          },

//          {
//            linkUrl: '/v2/membership/q',
//            picUrl: require('static/images/index/bzzx.png'),
//            text: this.isEn ?  this.field.iconHelp.en :  this.field.iconHelp.ch,
//            isRouterLink: false
//          },
          {
            linkUrl: '/applyList',
            picUrl: require('static/images/index/yy.png'),
//            picUrl: 'https://assets.urwork.cn/image/index/le.png',
            text: this.isEn ?  this.field.iconApplications.en :  this.field.iconApplications.ch,
            isRouterLink: false
          }
        ]
      },
      noticeList() {
        let list = [];
        this.noticeData.forEach(item => {
          list.push({
            text: item.title,
            linkUrl: `/news/noticeDetail?id=${item.id}`
          })
        });
        return list;
      }
    },
    data() {
      return {
        show: false,
        isApp: isApp(),
        field,                    // 英文化字段
        imgurl: null,             //  图片前缀
        banners: null,           //首页banner图数据
        noticeData: [],           //首页通知列表
        subjects: null,          //首页的课程推荐
        ad1: null,               //第一栏广告列表
        ad2: null,               //第二栏广告列表
        ad3: null,               //第三栏广告列表
        ad4: null,               //第四栏广告列表
        newsList: null,           //咨询列表
        uGoodsData: null,         //U物数据
        recommendsData: null,     //广告数据
        currentUGoodsTab: '',      //当前的U物选中标签
        videoData: null,          // 视频数据
        activityData: null,       //  活动数据
        recommendsImageRender: false,
        hotCity:{},
        v2:"",
        diolog:false,
        point:100,
        day:0,
        todayChecked:0,
        userId:''
      }
    },
    methods: {
      toListenerList(args) {
        let location = getLocation();
        let {
          path,
          query: {
            id,
            title
          }
        } = args;
        if (isApp()) {
            console.log('shouye')
          this.$DANativeApi.navigateTo({
            url: `${location.origin}${path}?id=${id}&title=${encodeURIComponent(title)}`
          })
        } else {
          this.$router.push(args);
        }
      },
      toStageList(args) {
        let location = getLocation();
        let {
          path,
          query: {
            name,
            code
          }
        } = args;
        if (isApp()) {
          console.log('shouye')
          this.$DANativeApi.navigateTo({
            url: `${location.origin}${path}?name=${encodeURIComponent(name)}&code=${code}`
          })
        } else {
          this.$router.push(args);
        }
      },
      iconFn(name,url) {
        if(name === 'feedback') {
          if(this.isApp) {
            isLogin({
              success: () => {
                this.$DANativeApi.navigateTo({
                  url: getLocation().origin + url
                })
              },
              fail: () => {
                toLogin();
              }
            })
          } else {
            setUrl(url);
          }
        }
      },
      publishVideoFn() {
        let url = getLocation().origin + '/companyVideo/uploadPage';
        if(this.isApp) {
          isLogin({
            success: () => {
              this.$DANativeApi.navigateTo({
                url
              })
            },
            fail: () => {
              toLogin();
            }
          })
        } else {
          this.$openApp(url);
        }
      },
      dateFormat(date, format) {
        return formatDate(date, format) + '开始';
      },
      recommendsSwiperUpdateFn(item) {
        this.$nextTick(() => {
          this.recommendsImageRender = false;
          this.$refs.recommendsSwiper.updateSlide(item);
        })
      },
      recommendsImgFn() {
        this.recommendsImageRender = true;
      },
      /*qiandao*/
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
      gototask:function () {
        if(this.isApp) {
            let url = getLocation().origin + '/v2/task';
            this.$DANativeApi.navigateTo({
              url
            })
        } else {
          this.$router.push({path: '/v2/task'});
        }
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
      apiIndex().then((res) => {
        let data = res;
        if(!data) {
          return;
        }
        // console.log(res)
        this.imgurl = data.imgurl;
        this.banners = data.banners;
        console.log(this.banners,'hahahahah')
        this.noticeData = data.noticeList;
        this.subjects = data.subjects;
        this.hotCity = {'热门':data.hotCity};
        this.ad1 = data.ad1;
        this.ad2 = data.ad2;
        this.ad3 = data.ad3;
        this.ad4 = data.ad4;
        this.newsList = data.newsList;
        this.uGoodsData = data.indexUgift;
        this.currentUGoodsTab = Object.keys(this.uGoodsData)[0];
        this.videoData = data.videoVOs;
        this.recommendsData = data.indexRecommends;
        this.activityData = data.activitys;

        this.show = true;

        console.log(this.recommendsData,"yyyyyyyyyy");
        console.log(this.hotCity,"xxxxxxxx")
      });
      this.v2 = routePrefix.routePrefix;
    },
    mounted() {
      this.userId = this.$store.state.userInfo.userId || '';
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  $border-bottom: 8px solid #F5F5F5;
  .qi{
    font-size: 14px!important;
  }
  .open-door-wrapper {
    position: fixed;
    z-index: 1000;
    bottom: 30px;
    right: 10px;
    .open-door-btn {
      width: 65px;
      height: 65px;
      background: $color-primary;
     // background: url("https://assets.urwork.cn/image/index/open_the_door.png") no-repeat;
      //background-size: 100%;
      border-radius: 50%;
      font-size: 14px;
      text-align: center;
      line-height: 52px;
    }
  }
  .main-slide-wrapper {
    padding: 10px 15px 0;
    .is-app & {
      padding-top: 2px;
    }
  }
  .main-business-wrapper {
   // background: url("https://assets.urwork.cn/image/index/cloud.png") no-repeat;
    background-size: 100% 100%;
    padding: 30px 20px 0 20px;
/*    border-bottom: $border-bottom;*/
    .icon-list-wrapper{
      padding: 0 10px 20px;
      width: 100%;
      @include border-bottom(#E5E5E5);
    }
  }
  .notice-wrapper {
    /*height: 58px;*/
/*    background: #f8f8f8;*/
    box-sizing: border-box;
    border-radius: 19px;
    padding: 15px 10px 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .notice-left {
      min-width: 0;
      flex-grow: 1;
      display: flex;
    }
    .notice-title {
      color: #fff;
      font-size: 12px;
      text-align: center;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 50px;
      span {
        display: inline-block;
        background: #68819E;
        opacity: 0.68;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
      }
      span:nth-child(2) {
        transform: translateX(-8px);
      }
    }
    .notice-list-wrapper {
      flex-grow: 1;
      min-width: 0;
    }
    .notice-right {
      flex-shrink: 0;
      flex-grow: 0;
      flex-basis: 5px;
      i {
        font-size: 10px;
        transform: scale(.7777);
      }
    }
  }
  .u-class-wrapper {
    padding: 20px;
   // background: url("https://assets.urwork.cn/image/index/lantern.png") no-repeat;
    background-size: 15%;
    background-position:96% 0px;
  }
  .activity-wrapper {
    padding: 20px;
  //  background: url("https://assets.urwork.cn/image/index/lantern.png") no-repeat;
    background-size: 15%;
    background-position:96% 0px;
  }
  .activity-list-item {
    position: relative;
    padding: 20px 0;
    &:not(:last-child) {
      @include border-bottom(#E5E5E5);
    }
    .img-wrapper {
      height: 190px;
      border-radius: 5px;
      overflow: hidden;
    }
    .activity-text {
      padding-top: 10px;
      h2 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 6px;
      }
      .activity-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #7A808F;
        font-size: 12px;
        img {
          width: 12px;
          margin-right: 3px;
          margin-top: -3px;
        }
      }
    }
  }
  .activity-list-item-v {
    position: relative;
    padding: 20px 0;
    @include border-bottom(#E5E5E5);
    &:last-child {
      @include border-bottom(transparent);
    }
    dl {
      display: flex;
    }
    dt {
      height: 140px;
      flex-shrink: 0;
      flex-grow: 0;
      flex-basis: 105px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      .play-cnt {
        position: absolute;
        left: 5px;
        bottom: 2px;
        color: #fff;
        font-size: 12px;
        i {
          font-size: 16px;
        }
      }
    }
    dd {
      position: relative;
      padding-left: 14px;
      min-width: 0;
      flex-grow: 1;
      h3 {
        font-size: 16px;
        font-weight: bold;
        @include text-overflow;
      }
      h4 {
        font-size: 14px;
        @include text-overflow;
      }
      .course-use-info {
        .course-info{
          color: #7A808F;
          font-size: 12px;
          p {
            font-size: 12px;
            line-height: 14px;
            color: #7A808F;
            padding: 8px 0 0 0;
          }
          img {
            width: 12px;
            margin-right: 3px;
            margin-top: -3px;
          }
        }
      }
      .course-price{
        position: absolute;
        bottom: 3px;
        left: 14px;
        p {
          font-size: 14px;
          font-weight: bold;
          color: $color-price;
          span{
            font-size: 10px;
          }
        }
      }
      .course-tip {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        width: 100%;
        .listeners{
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          top: 0;
          left: 0;
          ul{
            li{
              float: left;
              margin-left: -6px;
              &:first-child {
                margin-left:0;
              }
              img{
                width: 23px;
                height: 23px;
                display: inline-block;
                border-radius: 50%;
                border: 1px solid #FFFFFF;
              }
            }
            .lessonsCnt{
              width: 23px;
              height: 23px;
              line-height: 23px;
              text-align: center;
              display: inline-block;
              border-radius: 50%;
              background: #F4F4F4;
              border: 1px solid #FFFFFF;
              background: #F4F4F4;
              color: #999999;
              font-size: 9px;
            }
          }
        }
      }
      .btn {
        background: #fff;
        padding: 0 16px;
        border-radius: 28px;
        border-color: #333;
        height: 28px;
        line-height: 26px!important;
        color: #333;
        position: absolute;
        right: 0;
        bottom: 2px;
        img {
          width: 15px;
          margin-left: 3px;
        }
      }
    }
  }

  .video-wrapper {
    padding: 20px;
  }
  .recommends-wrapper {
    display: none;
    padding: 15px 0;
    border-bottom: $border-bottom;
    .sub-tab {
      padding: 0 20px;
    }
    .recommends-list-item {
      padding: 0 20px;
    }
    .recommends-item {
      .img-wrapper {
        height: 95px;
        border-radius: 5px;
        overflow: hidden;
      }
      h2 {
        font-size: 16px;
        font-weight: bold;
        width: 100%;
        padding-top: 6px;
        @include text-overflow;
        .label {
          display: inline-block;
          line-height: 15px;
          color: #fff;
          font-size: 10px;
          font-weight: normal;
          border-radius: 0 5px 5px 5px;
          padding: 0 5px;
          margin-right: 4px;
          float: left;
          margin-top: 3px;
          &.red {
            background: $color-price;
          }
          &.green {
            background: #15B165;
          }
        }
      }
      h3 {
        color: $color-price;
        font-size: 11px;
        span {
          font-size: 16px;
          font-weight: bold;
          margin-right: 4px;
        }
        em {
          font-size: 11px;
          color: #7A808F;
          text-decoration: line-through;
        }
      }
    }
  }
  .u-goods-wrapper {
    padding: 20px;
    display: none;
  }
  .u-goods-list {
    padding-top: 20px;
  }
  .sub-tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #A2A2A2;
    list-style-type: none;
    li {
      padding-bottom: 13px;
    }
    li.active {
      color: #333;
      font-weight: bold;
    }
  }
  .u-goods-list-item {
    @include clearfix;
    .goods-item {
      float: left;
      width: 48%;
      margin-bottom: 20px;
      &:nth-child(odd) {
        margin-right: 4%;
      }
    }
    .img-wrapper {
      height: 160px;
      border-radius: 5px;
      overflow: hidden;
    }
    h2 {
      font-size: 16px;
      font-weight: bold;
      width: 100%;
      padding-top: 6px;
      @include text-overflow;
      .label {
        display: inline-block;
        line-height: 15px;
        color: #fff;
        font-size: 10px;
        font-weight: normal;
        border-radius: 0 5px 5px 5px;
        padding: 0 5px;
        margin-right: 4px;
        float: left;
        margin-top: 3px;
        &.red {
          background: $color-price;
        }
        &.green {
          background: #15B165;
        }
      }
    }
    h3 {
      color: $color-price;
      font-size: 11px;
      span {
        font-size: 16px;
        font-weight: bold;
        margin-right: 4px;
      }
      em {
        font-size: 11px;
        color: #7A808F;
        text-decoration: line-through;
      }
    }
  }
  .consult-wrapper {
    padding: 20px;
  }
  .a{
    text-align: center;
  }

  /*城市*/
  .citys-wrapper{
    padding: 14px 0 14px 20px;
    border-bottom: 8px solid #F5F5F5;
    // background: url("https://assets.urwork.cn/image/index/cloud.png") no-repeat;
    background-size: 100% 100%;
    h2{
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 15px;
      padding-right: 20px;
      span{
        float: right;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        font-weight: normal;
        color: #999999;
        letter-spacing: 0;
        line-height: 30px;
      }
    }
    .citys-list-item{
      .img-wrapper{
        height: 105px;
        img{
          border-radius: 4px;
        }
      }
      h3{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        font-weight: normal;
      }
    }
  }
  /*qian*/

  .sign-wrapper{
    background: #f8f8f8;
    .sign{
      padding: 0 20px;
      position: relative;
      font-size: 0;
      padding-bottom: 10px;
      padding-top: 2px;
      p{
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        position: absolute;
        bottom:16px;
        left: 36.7%;
   /*     transform:translate(-50%,0%);
        transform-origin:50% 0%;*/
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
      width: 4.3rem;
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
        width: 4.3rem;
        height: 5.5rem;
        background: url("../user/img/dialog_m.png") no-repeat;
        background-size: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p{
          padding-top: 3rem;
          text-align: center;
          font-size: 0.28rem;
        }
        .click{
          width: 2.6rem;
          height: 0.8rem;
        }
      }
      .close{
        text-align: center;
        span{
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background: url("../user/img/chahao.png") no-repeat;
          background-size: 100%;
          margin-top: 0.5rem;
        }
      }
    }
  }
</style>
