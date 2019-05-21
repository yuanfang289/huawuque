<template>
  <page-wrap
    :gray-bg="true"
    :hasDownloadBar="false"
  >
    <div v-title>{{title}}</div>

    <page-header
      :hideTitle="true"
      :isHeadroom="false"
      :isFixed="true"
    >
      <topbar
        type="back"
        theme="trans"
        mode="fade"
        :nativeBack="true"
        :hideNativeTitleBar="true"
        :hideNavigationBarDelay="600"
      >
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main
      :show="show"
    >
      <div class="background-image-wrap">
        <Img :src="mainData.bgimgUrl"/>
        <div class="top-mask"></div>
        <div class="bottom-mask"></div>
        <div class="background-text">
          <h2>{{mainData.name}}</h2>
          <p>{{mainData.title}}</p>
        </div>
      </div>
      <div class="course-tip" v-if="mainData.leastListeners" >
        <div class="listeners">
          <to-page
            :ios="'3.0.8'"
            :android="'3.0.9'"
            :nativePath="'subjectMain?id=' + id"
            :path="{path: v2+'/classroom/listenerList', query: {id: id,title:'最近听过'}}"
          >
            <ul>
              <li v-for="row in mainData.leastListeners.slice(0,8)"><img :src="row.headImageUrl+'?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140'" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';"/></li>
              <li class="lessonsCnt" v-if="mainData.playCnt > 8">
                <span></span>
                <span></span>
                <span></span>
              </li>
            </ul>
          </to-page>
        </div>
        <span class="lessonsCnts" v-if="mainData.playCnt > 8">{{mainData.playCnt}}人听过</span>
      </div>
      <div class="course-main">
        <sub-title title="课程内容" :asideShow="false">
          <to-native-page class="btn btn-primary" :ios="'3.0.8'" :android="'3.0.9'" :path="'subjectMain?id=' + subjectId"><i class="uricon-audio-play-big"></i>用APP听体验更佳</to-native-page>
        </sub-title>
        <div class="class-schedule">
          <div :class="item.playOver ? 'class-schedule-item listened' : 'class-schedule-item'" v-for="(item, index) in lessons" >
            <div class="audio">
              <button class="audio-play" v-show="!item.playing"  @click="audioControl(index)"><i class="uricon-audio-play"></i></button>
              <button class="audio-pause" v-show="item.playing"  @click="audioControl(index)"><i class="uricon-audio-pause"></i></button>
            </div>
            <a href="javascript:;" ref="audioWrap">
              <audio :src="item.soundUrl" type="audio/mpeg"></audio>
              <h2>{{item.title}}</h2>
              <div class="class-schedule-item-info">
                <em v-show="item.playOver">已听完</em>
                <em v-if="item.isAuditions==1&&!item.playOver" class="green">试听</em>
                <!--<button class="audio-play" v-show="!item.playing"><i class="uricon-audio-play"></i></button>-->
                <!--<button class="audio-pause" v-show="item.playing"><i class="uricon-audio-pause"></i></button>-->
                <span class="progress" v-if="item.progress!=0&&item.durationed">{{item.progress}}%</span>
                <span>{{item.durations}} / 已有{{item.playCnt}}人听过</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="course-abstract">
        <div class="course-abstract-item">
          <sub-title title="课程简介" :asideShow="false"></sub-title>
          <p class="abstract-info" v-html="mainData.info"></p>
        </div>
      </div>

      <div class="course-publish">
        <sub-title title="发布者" :asideShow="false"></sub-title>

        <div class="course-publish-info-x">
          <div class="listener">
            <img v-if="mainData.ownerLogo" class="listener-img" :src="mainData.ownerLogo"/>
            <img src="../../assets/images/def/pic_def.png" alt="" v-else>
            <div class="listener-info">
              <h2>{{mainData.ownerName}}</h2>
              <p>{{mainData.ownerCompanyName}}
                <!--<span v-if="mainData.ownerCompanyName">｜</span>{{mainData.ownerCompanyName}}-->
              </p>
              <p>{{mainData.ownerStage}}</p>
            </div>
          </div>
          <div class="follow">
            <button v-if="mainData.isFollowed === 1" @click="followFn(0)" class="already">已关注</button>
            <button  v-else="" class="one"  @click="followFn(1)"><i class="uricon-plus-w"></i>关注</button>
          </div>
        </div>


        <!--<div class="course-publish-info">-->
        <!--<div class="publish-img">-->
        <!--<img v-if="mainData.ownerLogo" :src="mainData.ownerLogo" alt="">-->
        <!--<img src="../../assets/images/def/pic_def.png" alt="" v-else>-->
        <!--&lt;!&ndash;<p>发布者</p>&ndash;&gt;-->
        <!--</div>-->
        <!--<div class="publish-text">-->
        <!--<h2>{{mainData.ownerName}}</h2>-->
        <!--<p v-if="mainData.ownerCompanyName">{{mainData.ownerCompanyName}}</p>-->
        <!--<p v-if="mainData.ownerStage">{{mainData.ownerStage}}</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<button v-if="mainData.isFollowed === 1" class="btn followed">已关注</button>-->
        <!--<button v-else class="btn" @click="followFn"><i class="uricon-plus-w"></i>关注</button>-->
      </div>

      <div class="message-list-wrap">
        <sub-title title="评论" :asideShow="false"></sub-title>
        <div v-if="comments">
          <comments
            :comments="comments"
            :ios="'3.0.8'"
            :android="'3.0.9'"
            :path="'subjectReplyList?id=' + subjectId"
          ></comments>
          <to-native-page class="more-link" :ios="'3.0.8'" :android="'3.0.9'" :path="'subjectReplyList?id=' + subjectId">查看更多<i class="uricon-arrow-right"></i></to-native-page>
        </div>
        <div v-else class="message-none">
          <p>暂无评论</p>
        </div>
      </div>
      <!--底部悬浮按钮-->
      <div class="kong"></div>

      <div v-if="mainData.isBuyed == 1" class="footer">
        <button class="btn" @click="gotoApp()">
            <span class="circle">
              <!--<span class="triangle"></span>-->
            </span>已购买
        </button>
      </div>

      <template v-else="">
      <div v-if="mainData.price==0" class="footer">
          <button class="btn" @click="gotoApp()">
            <span class="circle">
              <!--<span class="triangle"></span>-->
            </span>限时免费
          </button>
      </div>
      <div v-else="" class="footer half">
        <button class="btn btn_grey" @click="gotoApp()">
            <span class="circle">
              <!--<span class="triangle"></span>-->
            </span>试听
        </button>

        <!--<to-page-->
          <!--:ios="'3.0.8'"-->
          <!--:android="'3.0.9'"-->
          <!--:nativePath="'subjectMain?id=' + subjectId"-->
          <!--:path="{name: 'courseOrder', params: {id: subjectId}}"-->
        <!--&gt;-->
        <a v-on:click="toPay()">
          <button class="btn">
            ¥{{mainData.discountPrice}}  立即购买
          </button>
        </a>
        <!--</to-page>-->
      </div>
      </template>
    </page-main>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import SubTitle from './modules/SubTitle';
  import toPage from 'nativeFix/component/toPage/toPage'
  import apiClassGetSubjectByid from 'api/classroom/apiClassGetSubjectByid';
  import apiClassUpdateDuration from 'api/classroom/apiClassUpdateDuration';
  import apiSubjectAddPlayCnt from 'api/classroom/apiSubjectAddPlayCnt';
  import apiCompanyFollow from 'api/market/company/apiCompanyFollow';
  import apiUserFollow from 'api/market/uShow/apiUserFollow';
  import toNativePage from 'nativeFix/component/toNativePage';
  import comments from 'component/comments/comments';
  import routePrefix from 'config/config';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';

  import {passport} from 'src/globalData';

  export default {
    data: () => {
      return {
        show: false,
        isApp: isApp(),
        v2 : "",
        title:'课程主页',
        id:"",                  //  课程id
        mainData: {},           //  页面数据
        lessons: [],            //  课程数据
        comments: [],           //  评论数据
        timer: {},              //  定时器
        updateTime: 30000       //  规定的更新时间
      }
    },
    components: {
      SubTitle,
      toNativePage,
      comments,
      toPage
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      }),
      subjectId() {
        //  课程ID
        return this.$route.params.id
      }
    },
    methods: {
      isWEIxin() {
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
        }else{
          return false;
        }
      },
      getSubjectByid() {
        apiClassGetSubjectByid({
          subjectId: this.subjectId
        }).then(res => {
          this.dataDeal(res);
        })
      },
      dataDeal(data) {
        let lessons = data.lessons || [];
        lessons.forEach(item => {
          item.durations = this.s_to_hs(item.duration);
          item.progress = (parseFloat(item.durationed/item.duration)*100).toString().split('.')[0];
          item.playing = false;
          item.playOver = false;
        });
        this.mainData = data;
        this.lessons = lessons;
        this.comments = data.comments;
        this.show = true;
        console.log(this.mainData)
      },
      s_to_hs(second) {
        let minute;
        minute  =  Math.floor(second / 60);
        second  =  second % 60;
        minute    +=    '';
        second    +=    '';
        minute  = (minute.length == 1)? '0' + minute : minute;
        second  = (second.length == 1)? '0' + second : second;
        return minute + ':' + second;
      },
      audioControl(index){
          if(this.mainData.isBuyed==1||this.lessons[index].isAuditions==1||this.mainData.price==0){
              //已购买  试听  可以听
            if(this.lessons[index].playing){
              this.audioPause(index)
            } else {
              this.audioPlay(index)
            }
          }else{
              //除此之外  提示要求购买
            this.$toast("请购买课程");
          }
      },
      audioPlay(index) {
        let el = this.$refs.audioWrap[index].children[0];
        let that = this;
        clearInterval(that.timer);

        //  暂停其他正在播放的音频
        this.lessons.forEach((item, i) => {
          if(item.playing){
            this.audioPause(i);
          }
        });

        //  播放这条音频
        this.lessons[index].playing = true;
        console.log(el);
        el.play();
        el.currentTime = this.lessons[index].durationed||100;
        //  记录播放次数
        apiSubjectAddPlayCnt({
          lessonId: this.lessons[index].id
        });

        //  播放过程中每30s记录一次时长
        if(this.isLogin){
          this.timer = setInterval(() => {
            let duration = el.currentTime;
            this.updateDuration(this.lessons[index].id, duration);
          },this.updateTime);
        }

        //  播放结束
        el.addEventListener('ended',() => {
          let duration = el.currentTime;

          this.lessons[index].playOver = true;
          this.lessons[index].playing = false;

          //  结束时更新时长并且关闭定时器
          this.updateDuration(this.lessons[index].id, duration);
          if(this.isLogin){
            clearInterval(that.timer);
          }


          //  继续播放下一条音频
          if(this.lessons[index + 1]){
            this.audioPlay(index + 1);
          }
        },false)
      },
      audioPause(index) {
        let el = this.$refs.audioWrap[index].children[0];
        let that = this;
        let duration = el.currentTime;
        this.lessons[index].playing = false;
        el.pause();

        //  暂停时更新时长并且关闭定时器
        this.updateDuration(this.lessons[index].id, duration);
        if(this.isLogin){
          clearInterval(that.timer);
        }
      },
      updateDuration(id, duration) {
        if(!this.isLogin){
          return;
        }
        duration = Math.round(duration);
        apiClassUpdateDuration({
          lessonId: id,
          duration: duration
        })
      },
      followFn(status) {
        if(this.mainData.ownerType === 1) {
          // 个人
          console.log('个人'+status)
        }
        else if(this.mainData.ownerType === 2) {
          // 企业
          console.log('企业'+status)

        }
      },
      gotoApp() {
        this.audioControl(0)
//        this.$openApp(getLocation().origin+'/v2/classroom/courseDetail/'+this.id);
      },
      toPay() {
        if(!this.isLogin){
          passport.toLogin();
        }else{
          var confirmUrl = location.origin+'/v2/classroom/courseOrder/'+this.subjectId;
          if(this.isWEIxin()){
            location.href='/pay/redirect?retUrl='+encodeURIComponent(confirmUrl);
          }else{
            this.$router.push({name: 'courseOrder', params: {id: this.subjectId}})
          }
        }
      }
    },
    created() {
      this.getSubjectByid();
      this.id = this.$route.params.id;
      this.v2 = routePrefix.routePrefix;
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  $main-margin:8px;

  .background-image-wrap{
    position: relative;
    height: 210px;
    .background-text{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 10px 20px;
      color: #fff;
      h2{
        font-size: 22px;
        font-weight: bold;
        line-height: 30px;
        /*margin-bottom: 5px;*/
        @include text-overflow;
      }
      p{
        font-size: 14px;
        @include text-overflow;
      }
    }
    .top-mask{
      position: absolute;
      top: 0;
      width: 100%;
      height: 86px;
      background: url("../../assets/images/bgMask/top.png") no-repeat;
      background-size: 100% 86px;
    }
    .bottom-mask{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 69px;
      background: url("../../assets/images/bgMask/bottom.png") no-repeat;
      background-size: 100% 69px;
    }
  }
  .course-main{
    padding: 12px 20px 0;
    background: #fff;
    margin-bottom: $main-margin;
    margin-top: 8px;
    .btn{
      background: #FFCC01;
      border-radius: 28px;
      border-color: #FFCC01;
      height: 31px;
      line-height: 31px;
      color: #000;
      padding-left: 9px;
      padding-right: 9px;
      i{
        font-size: 16px;
        margin-right: 3px;
      }
    }
  }
  .class-schedule{
    background: #fff;
    .class-schedule-item{
      padding: 16px 0 15px;
      position: relative;
      display: flex;
      align-items: center;
      &:not(:last-child){
        @include border-bottom(#e5e5e5);
      }
      &.listened{
        h2{
          color: #999;
        }
      }
      .audio{
        padding-right: 15px;
        margin-bottom: 2px;
      }
      a{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .audio-play{
        color: #999;
        font-size: 10px;
      }
      .audio-pause{
        i{
          font-size: 14px;
        }
      }
      h2{
        font-size: 16px;
        line-height: 17px;
        width: 100%;
        @include text-overflow;
      }
      .class-schedule-item-info{
        line-height: 16px;
        margin-top: 7px;
        display: flex;
        align-items: center;
        span{
          color: #999;
        }
        em{
          background: #999;
          color: #fff;
          font-size: 9px;
          padding: 0 3px;
          border-radius: 2px;
          margin-right: 11px;
        }
        .progress{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #333333;
          letter-spacing: 0;
          margin-right: 9px;
        }
        .green{
          background: #42BD13;
        }
      }
    }
  }
  .course-abstract{
    background: #fff;
    padding: 13px 20px;
    margin-bottom: $main-margin;
    .course-abstract-item{
      line-height: 20px;
      padding: 10px 0 20px;
    }
    .abstract-info{
      img{
        margin: 9px 0;
        height: auto!important;
      }
    }
  }
  .message-list-wrap{
    background: #fff;
    padding: 15px 20px;
  }
  .message-none{
    padding: 40px 20px;
    background: #fff;
    text-align: center;
    color: #999;
  }
  .course-publish {
    position: relative;
    padding: 13px 20px 20px;
    background: #fff;
    margin-bottom: $main-margin;




    .btn {
      line-height: 26px;
      background: $color-primary;
      font-size: 12px;
      padding: 0 10px;
      border: none;
      border-radius: 26px;
      @include position-center-y;
      right: 20px;
      &.followed {
        background: #C4C4C4;
        color: #fff;
      }
    }
  }
  .course-publish-info-x{
    width: 100%;
    display: flex;
    flex-wrap:nowrap;
    justify-content: center;
    margin-top: 11px;
    .listener{
      display: flex;
      justify-content: center;
      align-items: center;
      .listener-img{
        width: 49px;
        height: 49px;
        border-radius: 50%;
      }
      .listener-info{
        margin-left: 10px;
        line-height: normal;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #666666;
        h2{
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #333333;
        }
      }
    }
    .follow{
      flex: 1;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      button{
        width: 60px;
        height: 25px;

        border-radius: 12.5px;
        font-size: 12px;
        color: #151515;
      }
      .one{
        border: 1px solid #333333;
        background: #ffffff;
      }
      .already{
        background: #F0F0F0;
      }
    }
  }
  .course-publish-info {
    margin-right: 70px;
    display: flex;
    align-items: center;
    .publish-img {
      position: relative;
      flex-shrink: 0;
      flex-grow: 0;
      flex-basis: 49px;
      height: 49px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #E2E2E2;
      }
      p {
        width: 100%;
        font-size: 12px;
        color: #FFFFFF;
        line-height: 22px;
        text-align: center;
        background: #80B3FD;
        border-radius: 22px;
        @include position-center-x;
        bottom: -14px;
      }
    }
    .publish-text {
      flex-grow: 1;
      min-width: 0;
      h2 {
        @include text-overflow;
        font-size: 16px;
        font-weight: bold;
      }
      p {
        color: #999999;
        font-size: 12px;
        @include text-overflow;
      }
    }
  }
  .course-tip {
    padding: 13px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: #FFFFFF;
    width: 100%;
    .margin60{
      position: relative;
      top: -26px;
      left: 0;
    }
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
            width: 26px;
            height: 26px;
            display: inline-block;
            border-radius: 50%;
            border:1px solid #ffffff;
          }
        }
        .lessonsCnt{
          width: 26px;
          height: 26px;
          text-align: center;
          border-radius: 50%;
          background: #F4F4F4;
          border: 1px solid #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          span{
            width: 3px;
            height: 3px;
            margin: 0 1px;
            display: inline-block;
            line-height: 23px;
            background: #ffffff;
          }
        }
      }
    }
    .lessonsCnts{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
    }
  }
  .kong{
    height: 58px;
  }
  .footer{
    width: 100%;
    height: 58px;
    background: #f5f5f5;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    .btn{
      width: 100%;
      height: 100%;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      font-weight: 400;
      color: #333333;
      background: #FFCD01;
      border: none;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      .circle{
        width: 16px;
        height: 16px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000000;
        border-radius: 50%;
        &:before{
          content: '';
          width: 0px;
          height: 0px;
          margin-left: 2px;
          border-top: 3px solid transparent;
          border-right: 0px solid transparent;
          border-bottom: 3px solid transparent;
          border-left: 5px solid #FFCD01;
        }
      }
    }
  }
  .half{
    width: 100%;
    height: 58px;
    background: #f5f5f5;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
     a{
      width: 49%;
      height: 100%;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      font-weight: 400;
      color: #333333;
      background: #FFCD01;
      border: none;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
       .btn{
         width: 100%;
         .circle{
           width: 16px;
           height: 16px;
           margin-right: 10px;
           display: flex;
           align-items: center;
           justify-content: center;
           background: #000000;
           border-radius: 50%;
           &:before{
             content: '';
             width: 0px;
             height: 0px;
             margin-left: 2px;
             border-top: 3px solid transparent;
             border-right: 0px solid transparent;
             border-bottom: 3px solid transparent;
             border-left: 5px solid #FFCD01;
           }
         }
       }
    }
    .btn{
      width: 49%;
      height: 100%;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      font-weight: 400;
      color: #333333;
      background: #FFCD01;
      border: none;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      .circle{
        width: 16px;
        height: 16px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000000;
        border-radius: 50%;
        &:before{
          content: '';
          width: 0px;
          height: 0px;
          margin-left: 2px;
          border-top: 3px solid transparent;
          border-right: 0px solid transparent;
          border-bottom: 3px solid transparent;
          border-left: 5px solid #FFCD01;
        }
      }
    }
    .btn_grey{
      background: #FFFFFF;
    }
  }

</style>
