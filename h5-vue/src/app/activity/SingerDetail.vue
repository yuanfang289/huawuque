<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div v-on:click="closeDiolog()">
        <div class="person">
          <div class="head_img">
              <img :src="headImg"/>
          </div>
          <div class="ticket_num">
            <p class="name">{{name}}</p>
            <p class="num">{{voteNum}}票</p>
          </div>
          <div class="vote" v-on:touchstart.stop.prevent="voteClick(1)" v-on:touchend.stop.prevent="voteClick(0)">
            <img :src="voted"/>
          </div>
        </div>
        <div class="video_border">
          <img :src="require('./img/voice/video_border.jpg')"/>
        </div>
        <div class="video">
          <div class="play_video">
            <div class="video_box">
              <!--<video width="450" height="350" id="myshow" class="myvideo" controls="controls" preload="auto">-->
              <!--<source :src="require('./img/voice/584dac76ad6a190134e40ff3afdea66e.mp4')" type="video/mp4">-->
              <!--</video>-->

              <video id="myvideo" v-on:click="playClickPause()" :src="videoSrc" :poster="videoImg" :muted="muteStatus"  height="200px" width="100%">
                your browser does not support the video tag
              </video>
              <img v-if="videoImgBtnShow" v-on:click="playClick()" class="videoImgBtn" :src="videoImgBtn"/>
              <!--<span class="ico ico-sound" :class="{ active: isMute }" v-on:click="closeSoundClick()">22</span>-->
              <!--<span class="ico ico-skip"></span>-->
              <!--<span class="ico ico-video" :class="{ hide: isPlay }" v-on:click="playClick()">33</span>-->

            </div>
          </div>
          <!--<img :src="require('./img/voice/video.png')">-->
        </div>
        <div class="info_border">
          <img :src="require('./img/voice/info_border.jpg')"/>
        </div>
        <div class="person_info">
          <div class="info_top">
            <img :src="require('./img/voice/shange_top.png')"/>
          </div>
          <div class="info">
            <br>
            <template v-if="company">
              <span class="company">公司</span>	 {{company}}
              <br><br>
            </template>
            <template v-if="profession">
              <span class="zhiye">职业</span>  {{profession}}
              <br><br>
            </template>

            <span class="jianjie">{{introduce}}</span>
            <br><br>
            <img :src="phone">
            <!--<img style="margin-top: 10px" v-if="playId == 10" :src="require('./img/singerb/zhangxi.jpeg')">-->
            <!--<img style="margin-top: 10px" v-if="playId == 40" :src="require('./img/singerb/gengyu.png')">-->
          </div>
          <div class="info_bottom">
            <img :src="require('./img/voice/shange_bottom.png')"/>
          </div>
        </div>
      </div>
        <div id="mask" v-show="diolog">
          <div class="diolog">
            <h4>登录后即可投票</h4>
            <div class="login" v-on:click="login()">
            </div>
          </div>
        </div>

    </page-main>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {passport} from 'src/globalData';
  import apiSelectPlayId from 'api/activity/apiSelectPlayId';
  import apiRemainVote from 'api/activity/apiRemainVote';
  import apiVoteNum from 'api/activity/apiVoteNum';
  import apiGetJson from 'api/activity/apiGetJson';
  export default {
    components: {

    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      })
    },
    data: () => {
      return {
        isApp: isApp(),
        show: false,
        diolog:false,
        title: '2019中国好声音海选北京赛区优客工场专场投票通道',
        voted: require('./img/voice/person_vote.png'),
        voteCount:0,
        voteNum:0,
        playId:0,
        name:'',
        headImg:'',
        profession:'',
        company:'',
        introduce:'',
        phone:'',
        _dom:"",
        videoSrc:'',
        videoImg:'',
        videoImgBtn:require('./img/voice/video_play.png'),
        videoImgBtnShow:true,
        playStatus:'autoplay',
        muteStatus:'',
        isMute:true,
        isPlay:false,
        myData:''
      }
    },
    methods:{
      vote: function (flag) {
          if(this.voteCount > 0){
            if(flag == 1){
              this.voted = require('./img/voice/person_vote_click.png');
              this.voteCount--;
            }else{
              this.voted = require('./img/voice/person_vote.png')
            }
          }else{
              this.$toast("今日投票已达上限！")
              if(flag == 1){
                this.voted = require('./img/voice/person_vote_click.png');
              }else{
                this.voted = require('./img/voice/person_vote.png')
              }
          }
      },
      voteClick:function (flag) {
        if(this.isLogin){
            if(flag == 1){
                if(this.voteCount > 0){
                  apiSelectPlayId({
                    playerId:this.playId
                  }).then(res => {
                    console.log(res,'投票返回值')
                    if(res.result){
                      this.voteCount--;
                      this.$toast('投票成功！');
                      this.apiVoteNum();
                    }else{
                      this.$toast(res.errMsg);
                    }
                  })
                }else{
                  this.$toast("今日投票已达上限！")
                }
            }
        }else{
          this.diolog = true;
        }
      },
      login:function () {
        if(this.isApp) {
          console.log('没有登录app');
          toLogin();
        } else {
          console.log('没有登录h5');
          passport.toLogin();
        }
      },
      getVoteCout:function () {
        apiRemainVote().then(res => {
          console.log("剩余可投票数",res);
          this.voteCount = res.remainNum;
        })
      },
      apiVoteNum:function () {
        apiVoteNum({
          playerId:this.playId
        }).then(res => {
          console.log(res,'选手所得票数');
          this.voteNum = res.voteNum;
        })
      },
      closeDiolog:function () {
        this.diolog = false;
      },
      playClick(){
        this._dom = document.getElementById('myvideo');
        this._dom.play();
        this.videoImgBtnShow = false;
        this.showOtherVideo();
      },
      playClickPause(){
        this._dom = document.getElementById('myvideo');
        this._dom.pause();
        this.videoImgBtnShow = true;
        this.showOtherVideo();
      },
      showOtherVideo(){
        let _this = this;
        setTimeout(function(){
          _this.flag = _this._dom.paused;
          console.log(_this.flag,'外面');
          if(_this.flag){
            console.log(_this.flag,'里面');
            _this.videoImgBtnShow = true;
          }else{
            _this.showOtherVideo();
          }
        },1000)
      },
      getMydata:function () {
        apiGetJson().then(res => {
          console.log(res,'1231231');
          this.myData = res;
          this.getInfo();
        });
      },
      getInfo:function () {
        var map = this.myData.data;
        var id = this.playId;
        console.log(id,"1231231");
        var ob = map.get(parseInt(id));
        this.headImg = ob.headImg;
        this.profession = ob.profession;
        this.company = ob.company;
        this.introduce = ob.introduce;
        this.phone = ob.phone;
        this.videoImg = ob.videoSrc+"?vframe/jpg/offset/0";
        this.videoSrc = ob.videoSrc;
      },
      closeSoundClick(){
        this.isMute = !this.isMute;
        if(this.isMute){
          this.muteStatus = '';
        }else{
          this.muteStatus = 'muted';
        }
      }
    },
    created() {
      this.show = true;
      this.name = this.$route.params.name;
      this.playId = this.$route.params.playId;
      this.title = this.$route.params.name+"-2019中国好声音海选北京赛区优客工场专场投票通道";
      this.apiVoteNum();
      this.getMydata();
      window.scrollTo(0,0);
      if(this.isLogin){
        this.getVoteCout();
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  #main{
    background-color: #3d0a07;
    .main-inner{
      .person{
        width: 100%;
        height: 240px;
        background: url("./img/voice/person_bg.png") no-repeat;
        background-size: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .head_img{
          width: 82px;
          height: 82px;
          border: 2px solid #3d0a09;
          border-radius: 50%;
          margin-top: 20px;
          img{
            border-radius: 50%;
          }
        }
        .ticket_num{
          color: #ffffff;
          .name{
            font-size: 22px;
            text-align: center;
          }
          .num{
            font-size: 14px;
            opacity: 0.6;
            text-align: center;
          }
        }
        .vote{
          width: 120px;
          height: 50px;
          margin-bottom: 20px;
        }
      }
      .video_border{
        text-align: center;
        img{
          display: inline-block;
        }
    /*  width: 100%;
        height: 45px;
        background: url("img/voice/video_border.jpg") no-repeat;
        background-size:100% 100%;
        margin-top: -1px;*/
      }
      .info_border{
        text-align: center;
        img{
          margin-top: 26px;
          margin-bottom: 10px;
          display: inline-block;
        }
      }
      .video{
        text-align: center;
        .play_video{
          width: 337px;
          height: 213px;
          background: url("./img/voice/video.png") no-repeat;
          background-size: 100%;
          display: inline-block;
          padding: 10px;
          .video_box{
            width: 100%;
            height: 100%;
            margin-top: -5px;
            position: relative;
            .videoImgBtn{
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          .myvideo{
            width: 100%;
            height: 100%;
          }
        }
      }
      .person_info{
        text-align: center;
        font-size: 0;
        padding-bottom: 45px;
        .info_top{
          width: 337px;
          margin: 0 auto;
        }
        .info{
          width: 337px;
          padding: 10px 15px;
          text-align: left;
          font-size: 15px;
          background: url("./img/voice/shange.png") repeat;
          background-size: 100%;
          color: #ffffff;
          display: inline-block;
          margin: 0 auto;
          /*border-top:2px solid #882120;*/
          /*border-image: url("./img/voice/shange_top.png") 10 repeat;*/
          .company{
            background: #deb462;
            color: #3f0a1c;
            padding: 3px 0;
            padding-left: 7px;
            padding-right: 7px;
            border-radius: 4px;
            margin-right: 5px;
            font-size: 14px;
            font-weight: 500;
          }
          .zhiye{
            background: #deb462;
            color: #3f0a1c;
            padding: 3px 0;
            padding-left: 7px;
            padding-right: 7px;
            border-radius: 4px;
            margin-right: 5px;
            font-size: 14px;
            font-weight: 500;
          }
          .jianjie{
            font-size: 14px;
            color: #ffd7d5;
          }
        }
        .info_bottom{
          width: 337px;
          margin: 0 auto;
        }
      }
    }
    #mask{
      z-index: 10;
      width: 235px;
      height: 156px;
      /*  background: rgba(0,0,0,0.6);
        box-shadow: 5px 5px  10px 2px rgba(96,26,15,0.4) inset,5px -5px 10px 2px rgba(96,26,15,0.4) inset,-5px -5px 10px 2px rgba(96,26,15,0.4) inset,-5px 5px 10px 2px rgba(96,26,15,0.4) inset;
        border-radius: 10px;*/
      background: url("./img/voice/login_bg.png") no-repeat;
      background-size: 100%;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      .diolog{
        color: #FFFFFF;
        text-align: center;
        padding-top: 15px;
        h4{
          font-size: 15px;
        }
        .login{
          width: 89px;
          height: 45px;
          margin-top: 10px;
          line-height: 30px;
          font-size: 13px;
          display: inline-block;
          /*border: 2px solid #fdf2dd;*/
          background: #601513;
          border-radius: 17px;
          background: url("./img/voice/login_btn.png") no-repeat;
          background-size: 100%;
          /*          text-shadow:5px 5px 5px #ad3321;
                    box-shadow: 2px 2px  5px 2px #bb3a27 inset,2px -2px 5px 2px #bb3a27 inset,-2px -2px 5px 2px #bb3a27 inset,-2px 2px 5px 2px #bb3a27 inset;
                    box-shadow: 5px 5px  3px 2px rgba(114,31,17,0.6) outset,5px -5px 3px 2px rgba(114,31,17,0.6) outset,-5px -5px 3px 2px rgba(114,31,17,0.6) outset,-5px 5px 3px 2px rgba(114,31,17,0.6) outset;*/
        }
        .closed{
          position: absolute;
          top: 12px;
          right: 20px;
        }
      }
    }
  }
</style>

