<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div v-on:click="closeDiolog()">
        <div class="person">
          <img :src="require('./img/voice/banner.png')"/>
          <a class="vote_rule" :href="'voteRule'">    </a>
        </div>
        <div class="person_info">
          <div class="info_top">
            <img :src="require('./img/voice/shange_top.png')"/>
          </div>
          <div class="info">
            <div class="h3">
              <!--<span class="line"></span> <span class="con">人气榜</span> <span class="line"></span>-->
            </div>
            <h5>今日剩余票数： <span>{{voteCount}}</span>票</h5>
            <div class="list">
              <ul>
                <li v-for="item in list" v-on:click="goDetail(item.playerId,item.name)">
                  <div class="left">
                    <div class="sort">
                      {{item.sort}}
                    </div>
                    <div class="head_img">
                      <div class="hat"></div>
                      <img  :src="item.headImg"/>
                      <div class="name_num">
                        <h3>{{item.name}}</h3>
                        <p>{{item.voteNum}}票</p>
                      </div>
                    </div>
                  </div>
                  <div class="right" v-on:touchstart.stop.prevent="voteClick(item,1)" v-on:touchend.stop.prevent="voteClick(item,0)">
                    <img v-if="item.btnClick == 0" :src="require('./img/voice/vote.png')"/>
                    <img v-else="" :src="require('./img/voice/vote_click.png')"/>
                  </div>
                </li>
              </ul>
            </div>
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
  import apiSingerList from 'api/activity/apiSingerList';
  import apiSelectPlayId from 'api/activity/apiSelectPlayId';
  import apiRemainVote from 'api/activity/apiRemainVote';
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
        voted: require('./img/voice/vote.png'),
        voteCount:5,
        list:[{
                "playerId": "01",
                "voteNum": 89
              }],
        myData:{}
      }
    },
    methods:{
      vote: function (item,flag) {
        if(this.voteCount > 0){
          if(flag == 1){
            this.list.map(function (obj,idx) {
                if(obj.playerId == item.playerId){
                  obj.btnClick = 1;
                }
            })
          }else{
            this.list.map(function (obj,idx) {
              if(obj.playerId == item.playerId){
                obj.btnClick = 0;
              }
            })
          }
        }else{
          this.$toast("今日投票已达上限！")
          if(flag == 1){
            item.btnClick = 1;
          }else{
            item.btnClick = 0;
          }
        }
      },
      login:function () {
        var _this = this;
        if(_this.isApp) {
          console.log('没有登录app');
          toLogin();
        } else {
          console.log('没有登录h5');
          passport.toLogin();
        }
      },
      voteClick:function (item,flag) {
        if(this.isLogin){
          this.vote(item,flag);
          if(flag==0&&this.voteCount>0){
            apiSelectPlayId({
              playerId:item.playerId
            }).then(res => {
              console.log(res,'投票返回值')
              if(res.result){
                this.voteCount--;
                this.$toast("投票成功！")
                this.getList();
              }else{
                this.$toast(res.errMsg);
              }
            })
          }
        }else{
          this.diolog = true;
        }
      },
      getList:function () {
        apiSingerList().then(res => {
          console.log(res);
          var map = this.myData.data;
          res.list.map(function (obj,idx) {
            if(idx<9){
              obj.sort = '0'+(idx+1);
            }else{
              obj.sort = idx+1;
            }
            var id = obj.playerId;
            var ob = map.get(parseInt(id));
            obj.name = ob.realname;
            if(ob.headImg){
              obj.headImg = ob.headImg;
            }else{
              obj.headImg = ob.headImg;
            }
            obj.btnClick = 0;
          })
          this.list = res.list;
        });
      },
      getMydata:function () {
        apiGetJson().then(res => {
          console.log(res,'1231231');
          this.myData = res;
        });
      },
      getVoteCout:function () {
        apiRemainVote().then(res => {
          console.log("剩余可投票数",res);
          this.voteCount = res.remainNum;
        })
      },
      goDetail:function (id,name) {
        this.$router.push({name: 'singerDetail', params: {playId: id,name:name}})
      },
      closeDiolog:function () {
        this.diolog = false;
      }
    },
    created() {
      this.show = true;
      window.scrollTo(0,0);
      this.getMydata();
      this.getList();
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /*position: relative;*/
    img{
      display: inline-block;
    }
    .vote_rule{
      width: 80px;
      height: 40px;
      position:absolute;
      top: 5px;
      right: 0;
    }
  }
  .person_info{
    text-align: center;
    font-size: 0;
    padding-bottom: 45px;
    margin-top: 15px;
  .info_top{
    width: 337px;
    margin: 0 auto;
  }
  .info{
    width: 337px;
    padding: 10px 21px 0 21px;
    text-align: center;
    font-size: 15px;
    background: url("./img/voice/shange.png") repeat;
    background-size: 100%;
    color: #ffffff;
    display: inline-block;
    margin: 0 auto;
    .h3{
      width: 100%;
      height: 30px;
      font-size: 19px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url("./img/voice/qiren.png") no-repeat center;
      background-size: 60%;
      text-shadow:0px 0px 8px #ae3520, 0px 0px 42px #9b2d1b, 0px 0px 72px #942a1a,0px 0px 150px #7f2215;
      .con{
        padding: 0 15px;
      }
      .line{
        height: 2px;
        width: 50px;
        display: inline-block;
        background: #ffffff;
      }
    }
    h5{
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #fff64f;
      margin-top: 10px;
      display: inline-block;
      padding: 0 10px;
      background: #3e0a08;
      border-radius: 10px;
    }
    .list{
      margin-top: 17px;
      ul{
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 42px;
          &:first-child{
            margin-top: 30px;
            position: relative;
            .hat{
                width: 30px;
                height: 20px;
                background: url("./img/voice/first.png") no-repeat;
                background-size: 100%;
                position: absolute;
                top: -7px;
                left: 0;
            }
            .left{
              .sort{
                  background: url("./img/voice/01.png") no-repeat;
                  background-size: 100%;
                color:rgba(255,255,255,0)
              }
            }
          }
          &:nth-child(2){
            position: relative;
            .hat{
            width: 30px;
            height: 20px;
            background: url("./img/voice/second.png") no-repeat;
            background-size: 100%;
            position: absolute;
            top: -7px;
            left: 0;
            }
            .left{
              .sort{
                width: 39px;
                background: url("./img/voice/02.png") no-repeat;
                background-size: 100%;
                color:rgba(255,255,255,0)
              }
              .head_img{
                margin-left: 14px;
              }
            }
          }
          &:nth-child(3){
            position: relative;
            .hat {
              width: 30px;
              height: 20px;
              background: url("./img/voice/three.png") no-repeat;
              background-size: 100%;
              position: absolute;
              top: -7px;
              left: 0;
            }
            .left{
              .sort{
                width: 39px;
                background: url("./img/voice/03.png") no-repeat;
                background-size: 100%;
                color:rgba(255,255,255,0)
              }
              .head_img{
                margin-left: 14px;
              }
            }
          }
          &:last-child{
            margin-bottom: 22px;
          }
          .left{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .sort{
              width: 37px;
              font-style: italic;
              font-size: 21px;
              font-weight: bold;
              color: #ffffff;
              text-shadow: 0px 0px 15px #FF0000;
            }
            .head_img{
              margin-left: 16px;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: left;
              position: relative;
              img{
                width: 59px;
                height: 59px;
                border: 2px solid #3d0a09;
                border-radius: 50%;
                margin-right: 12px;
              }
              h3{
                font-size: 15px;
              }
              p{
                font-size: 12px;
                color: #ffc2bf;
              }
            }
          }
          .right{
            width: 75px;
            height: 42px;
            border-radius: 15px;
            overflow: hidden;
          }
        }
      }
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

