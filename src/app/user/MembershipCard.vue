<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show" style="height: 500px">
        <div class="card">
            <div class="img" v-if="show"  @click="mylinkto('/v2/membership/myecode')">
              <img v-if="list&&list[0].cardType==3" src="https://assets.urwork.cn/image/member/card3.png">
              <img v-if="list&&list[0].cardType==2" src="https://assets.urwork.cn/image/member/card2.png">
              <img v-if="list&&list[0].cardType==1" src="https://assets.urwork.cn/image/member/card1.png">
              <!--<div class="ecode" @click="mylinkto('/v2/membership/myecode')">-->
              
              <!--</div>-->
              <p v-if="list[0]" class="card-sn">
                {{list[0].cardSn.replace(/(.{4})/g, "$1 ")}}
              </p>
            </div>
        </div>
        <div class="ul-icon">
          <ul>
            <li>
              <img src="./img/membership/sicon2.png">
              <span>会员福袋</span>
            </li>
            <li>
              <img src="./img/membership/sicon4.png">
              <span>生日权益</span>
            </li>
            <li>
              <img src="./img/membership/sicon3.png">
              <span>尊享服务</span>
            </li>
            <li>
              <img src="./img/membership/sicon1.png">
              <span>会员专享</span>
            </li>
          </ul>
        </div>
      <div class="ad">
        <a href="/v2/mPackage/list">
          <img src="https://assets.urwork.cn/image/member/footer-ad5.jpg">
        </a>
      </div>
        <div class="rights">
            <ul class="tabUl">
              <li v-for="item in tablist" :class="{checked:item.checked}" @click="tabClick(item)">
                {{item.text}}
              </li>
            </ul>
            <div class="one-line-box">
              <ul v-if="tabShow">
                <template v-for="item in couponRightsPer">
                <!--<li @click="threeGo(item.linkUrl,item.couponName)" v-if="item.isPre == 2">-->
                  <!--<img class="img" :src="item.image" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">-->
                  <!--<div class="text_box">-->
                    <!--<div class="txt">-->
                      <!--<p class="name">{{item.couponName}}</p>-->
                      <!--<p class="p"><span class="price">{{item.discountTip}}</span><span class="left_num">不限数量</span></p>-->
                    <!--</div>-->
                    <!--<div class="btn_box">-->
                      <!--<div class="button">-->
                        <!--立即领取-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->

                <!--</li>-->
                <li @click="linkto(item)">
                  <img class="img" :src="item.image+'?imageMogr2/auto-orient/thumbnail/!320x260r/gravity/Center/crop/320x260/format/'+isWebp" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">
                  <div class="text_box">
                    <div class="txt">
                      <p class="name">{{item.couponName}}</p>
                      <p class="p"><span class="price">{{item.discountTip}}</span><span class="left_num">已领{{item.obtainQuantity}}个</span></p>
                    </div>
                    <div class="btn_box">
                      <div v-if="item.obtained == 1" class="button_grey">
                        已领取
                      </div>
                      <template v-else="">
                        <div v-if="item.remainderQuantity == 0" class="button_grey">
                          已领完
                        </div>
                        <template v-else="">
                          <div v-if="item.obtained == -1" class="button">
                            再领一张
                          </div>
                          <div v-else="" class="button">
                            立即领取
                          </div>
                        </template>
                      </template>
                    </div>
                  </div>
                </li>
              </template>
              </ul>
              <ul v-else="">
                <template v-for="item in couponRightsCom">
                  <!--<li @click="threeGo(item.linkUrl,item.couponName)" v-if="item.isPre == 2">-->
                    <!--<img class="img" :src="item.image" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">-->
                    <!--<div class="text_box">-->
                      <!--<div class="txt">-->
                        <!--<p class="name">{{item.couponName}}</p>-->
                        <!--<p class="p"><span class="price">{{item.discountTip}}</span><span class="left_num">不限数量</span></p>-->
                      <!--</div>-->
                      <!--<div class="btn_box">-->
                        <!--<div class="button">-->
                          <!--立即领取-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->

                  <!--</li>-->
                  <li @click="linkto(item)">
                    <img class="img" :src="item.image+'?imageMogr2/auto-orient/thumbnail/!320x260r/gravity/Center/crop/320x260/format/'+isWebp" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">
                    <div class="text_box">
                      <div class="txt">
                        <p class="name">{{item.couponName}}</p>
                        <p class="p"><span class="price">{{item.discountTip}}</span><span class="left_num">已领{{item.obtainQuantity}}个</span></p>
                      </div>
                      <div class="btn_box">
                        <div v-if="item.obtained == 1" class="button_grey">
                          已领取
                        </div>
                        <template v-else="">
                          <div v-if="item.remainderQuantity == 0" class="button_grey">
                            已领完
                          </div>
                          <template v-else="">
                            <div v-if="item.obtained == -1" class="button">
                              再领一张
                            </div>
                            <div v-else="" class="button">
                              立即领取
                            </div>
                          </template>
                        </template>
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
            <div class="float-box">
              <ul v-if="tabShow">
                <template v-for="item in threeRightsPer">
                  <!--<li @click="threeGo(item.linkUrl,item.couponName)" v-if="item.isPre == 2">-->
                    <!--<img class="img" :src="item.image" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">-->
                    <!--<div class="text_box">-->
                      <!--<div class="txt">-->
                        <!--<p class="name">{{item.couponName}}</p>-->
                        <!--<p class="p"><span class="price">{{item.discountTip}}</span><span class="left_num">不限数量</span></p>-->
                      <!--</div>-->
                      <!--<div class="btn_box">-->
                        <!--<div class="button">-->
                          <!--立即参与-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->

                  <!--</li>-->
                  <li @click="linkto(item)">
                    <img class="img" :src="item.image+'?imageMogr2/auto-orient/thumbnail/!320x260r/gravity/Center/crop/320x260/format/'+isWebp" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">
                    <div class="text_box">
                      <div class="txt">
                        <p class="name">{{item.couponName}}</p>
                        <p class="p"><span class="price">{{item.discountTip}}</span><span class="left_num">已领{{item.obtainQuantity}}个</span></p>
                      </div>
                      <div class="btn_box">
                        <div class="button">
                          立即参与
                        </div>
                        <!--<template v-else="">-->
                          <!--<div v-if="item.remainderQuantity == 0" class="button_grey">-->
                            <!--已领完-->
                          <!--</div>-->
                          <!--<div v-else="" class="button">-->
                            <!--立即参与-->
                          <!--</div>-->
                        <!--</template>-->
                      </div>
                    </div>
                  </li>
                </template>
                <!--手动更新-->
                <!--<li @click="threeGo('/v2/membership/coffee','寺库')">-->
                  <!--<img class="img" src="https://assets.urwork.cn/image/member/siku.jpg" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">-->
                  <!--<div class="text_box">-->
                    <!--<div class="txt">-->
                      <!--<p class="name">寺库</p>-->
                      <!--<p class="p"><span class="price">有惊喜啊</span><span class="left_num">不限数量</span></p>-->
                    <!--</div>-->
                    <!--<div class="btn_box">-->
                      <!--<div class="button">-->
                        <!--立即参与-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</li>-->
              </ul>
              <ul v-else="">
                <template v-for="item in threeRightsCom">
                  <!--<li @click="threeGo(item.linkUrl,item.couponName)" v-if="item.isPre == 2">-->
                    <!--<img class="img" :src="item.image" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">-->
                    <!--<div class="text_box">-->
                      <!--<div class="txt">-->
                        <!--<p class="name">{{item.couponName}}</p>-->
                        <!--<p class="p"><span class="price">{{item.discountTip}}</span><span class="left_num">不限数量</span></p>-->
                      <!--</div>-->
                      <!--<div class="btn_box">-->
                        <!--<div class="button">-->
                          <!--立即参与-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->

                  <!--</li>-->
                  <li @click="linkto(item)">
                    <img class="img" :src="item.image" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">
                    <div class="text_box">
                      <div class="txt">
                        <p class="name">{{item.couponName}}</p>
                        <p class="p"><span class="price">{{item.discountTip}}</span><span class="left_num">已领{{item.obtainQuantity}}个</span></p>
                      </div>
                      <div class="btn_box">
                        <div class="button">
                          立即参与
                        </div>
                        <!--<template v-else="">-->
                          <!--<div v-if="item.remainderQuantity == 0" class="button_grey">-->
                            <!--已领完-->
                          <!--</div>-->
                          <!--<div v-else="" class="button">-->
                            <!--立即参与-->
                          <!--</div>-->
                        <!--</template>-->
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
            </div>

        </div>
        <div class="ad footer">
          <a href="/v2/activity/rightspage">
            <img src="https://assets.urwork.cn/image/member/footer-ad7.jpg">
          </a>
        </div>
        <a href="q" class="ask-icon"></a>

        <div id="mask" v-show="dialog">
          <div class="dialog">
            <div class="content"  @click="tipsClick()">
              <p>提示</p>
              <div class="txt">
                本服务由第三方平台提供。相关服务和责任将由该第三方承担。如有问题请咨询该平台客服。
              </div>
              <div class="tips">
                <span :class="{'no-select':checkTips,'select':!checkTips}"></span><span class="p">不再提示</span>
              </div>
            </div>
            <div class="bot" @click="dialogClick(0)">
                我知道了
            </div>
          </div>
        </div>


    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiGetCards from 'api/user/apiGetCards';
  import apiTicket from 'api/user/apiTicket';
  import store from 'store';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '会员卡',
        userId:'',
        list:'',
        skisTicketStatusList:'',
        list0:'',
        list1:[],
        list2:[{'couponTypeCode':0,"obtained":0}],
        list3:[{'couponTypeCode':1,"obtained":0}],
        list4:[],
        clicktag:0,
        rights:'',
        checkTips:true,
        dialog:false,
        dialogName:'第三方',
        dialogUrl:'',
        tablist:[{
          id:'0',
          text:'会员权益',
          checked:true
        },{
          id:'1',
          text:'企业权益',
          checked:false
        }],
        personerRights:[],
        companyRights:[],
        couponRightsPer:[],
        threeRightsCom:[],
        couponRightsCom:[],
        threeRightsPer:[],
        tabShow:true
      }
    },
    computed: {
      isWebp (){
        if(document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0){
          return 'webp'
        }else{
          return 'jpeg'
        }
      }
    },
    methods:{
      clicktagx () {
        if (this.clicktag == 0) {
          this.clicktag = 1;
          setTimeout(function () {this.clicktag = 0}, 500);
        }else{
//          this.$toast("请勿频繁点击！");
        }
      },
      tabClick (item) {
        this.tablist.map( (obj,idx)=> {
          this.$set(obj,'checked',false)
        })
        this.tablist.map( (obj,idx)=> {
            item.id == obj.id ? this.$set(obj,'checked',true):'';
            item.id == 1 ? this.tabShow = false:this.tabShow = true;
        })
      },
      mylinkto(router) {
          if(isApp()) {
            let url = getLocation().origin + router;
            this.$DANativeApi.navigateTo({
              url
            })
          } else {
            this.$router.push(router);
          }
      },
      linkto(item) {
        this.clicktagx();
        let router = '/v2/membership/carddetail?code='+item.couponTypeCode+'_'+item.id+'_'+encodeURIComponent(item.couponName);
          if(isApp()) {
            let url = getLocation().origin + router;
            this.$DANativeApi.navigateTo({
              url
            })
          } else {
            this.$router.push(router);
          }
      },
      getinfo() {
        this.show = true;
        apiGetCards({
          "userId":this.$store.state.userInfo.userId,
          "pn":1,
          "ps":100
        }).then(res => {
          this.list = res.list;
          this.rights = res.rights[0].rightsList;
          /*企业  个人 分类*/
          res.rights[0].rightsList.map((obj,idx)=>{
            obj.isPersonal == 1 ? this.personerRights.push(obj):'';
            obj.isPersonal == 0 ? this.companyRights.push(obj):'';
          })
          /*领券  三方分类
           couponRightsPer:[],
           threeRightsCom:[],
           couponRightsCom:[],
           threeRightsPer:[]*/
          this.personerRights.map((obj,idx)=>{
            obj.isPre == 2||obj.isPre == 4||obj.isPre == 6  ? this.threeRightsPer.push(obj):'';
            obj.isPre == 0||obj.isPre == 1||obj.isPre == 3||obj.isPre == 5 ? this.couponRightsPer.push(obj):''
          })
          this.companyRights.map((obj,idx)=>{
            obj.isPre == 2||obj.isPre == 4||obj.isPre == 6 ? this.threeRightsCom.push(obj):'';
            obj.isPre == 0||obj.isPre == 1||obj.isPre == 3||obj.isPre == 5 ? this.couponRightsCom.push(obj):''
          })
          if(this.couponRightsCom.length == 0 && this.threeRightsCom.length == 0){
              this.tablist = [{
              id:'0',
              text:'会员权益',
              checked:true
            }];
          }
          if(this.couponRightsPer.length == 0 && this.threeRightsPer.length == 0){
            this.tablist = [{
              id:'1',
              text:'企业权益',
              checked:false
            }]
          }
          this.show = true;


        })
      },
      tipsClick() {
        this.checkTips = !this.checkTips;
      },
      closeDialog() {
        this.checkTips ?  localStorage.setItem(`${this.dialogName}`, '0') : localStorage.setItem(`${this.dialogName}`, '1');
        this.dialog = false;
        if(isApp()) {
          if(this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0'){
            window.location.href = this.dialogUrl;
          }else{
            let url1 = this.dialogUrl;
            if(url1.indexOf("/v2/membership") > -1){
              url1 = getLocation().origin+this.dialogUrl;
            }
            this.$DANativeApi.navigateTo({
              url:url1
            })
          }
        } else {
          window.location.href = this.dialogUrl;
        }
      },
      dialogClick(n) {
          n == 1 ? this.dialog = true:this.closeDialog();
      },
      threeGo(url,name) {
          this.dialogName = name;
          this.dialogUrl = url;

          if(localStorage.getItem(this.dialogName) == 1){
            if(isApp()) {
               if(this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0'){
                 window.location.href = this.dialogUrl;
               }else{
                 let url1 = this.dialogUrl;
                 if(url1.indexOf("/v2/membership") > -1){
                   url1 = getLocation().origin+this.dialogUrl;
                 }
                 this.$DANativeApi.navigateTo({
                   url:url1
                 })
               }
            } else {
              window.location.href = this.dialogUrl;
            }
          }else{
            this.dialogClick(1);
          }
      }
    },
    created() {
      isLogin({
        success: () => {
         this.getinfo();
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

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .ask-icon{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: url("https://assets.urwork.cn/image/member/ask-icon.jpg") no-repeat;
    background-size: 100%;
    position: fixed;
    bottom: 10%;
    right: 10px;
  }
  .tit-icon7{
      background: url("https://assets.urwork.cn/image/member/tit-icon07.png") no-repeat;
      background-size: 100%;
  }
  .tit-icon8{
    background: url("https://assets.urwork.cn/image/member/tit-icon08.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon9{
    background: url("https://assets.urwork.cn/image/member/tit-icon09.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon10{
    background: url("https://assets.urwork.cn/image/member/tit-icon10.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon11{
    background: url("https://assets.urwork.cn/image/member/tit-icon11.png") no-repeat;
    background-size: 100%;
  }
  #main{
    margin: 0 auto;
    .card{
       max-width: 7.5rem;
       height: 100%;
       margin: 0 auto;
       padding: 12px 7px;
      .img{
        position: relative;
        img{
          width: 7.5rem;
          display: inline-block;
        }
        .ecode{
          width: 0.8rem;
          height: 0.8rem;
          display: inline-block;
          position: absolute;
          bottom: 0.6rem;
          right: 0.4rem;
        }
        .card-sn{
          position: absolute;
          bottom: 0.7rem;
          left: 0.7rem;
          font-size: 16px;
          color: #ffffff;
        }
      }
     }
    .ul-icon{
      padding: 0 19px 20px 19px;
      /*border-bottom: 10px solid #f9f9f9;*/
      ul{
        display:flex;
        justify-content: space-between;
        align-items: center;
        li{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: 37px;
            height: 37px;
          }
          span{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
            margin-top: 5px;
          }
        }
      }
    }
    .rights{
      background: #ffffff;
      max-width: 7.5rem;
      padding: 0px 10px;
      margin: 0 auto;
      border-bottom: 10px solid #f9f9f9;
      border-top: 10px solid #f9f9f9;
      .tabUl{
        overflow: hidden;
        height: 30px;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #A2A2A2;
        margin-top: 15px;
        li{
          height: 24px;
          line-height: 24px;
          margin: 0 15px;
          text-align: center;
          float: left;
          position: relative;
          &:first-child{
            margin-left: 10px;
          }
        }
        .checked{
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          &:before{
            display: inline-block;
            content: '';
            width: 25px;
            height: 4px;
            border-radius: 2px;
            background: #ffcc01;
            position: absolute;
            bottom: -4px;
            left: 50%;
            -webkit-transform: translate(-50%, 0);
            -o-transform: translate(-50%, 0);
            -moz-transform: translate(-50%, 0);
            -ms-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
          }
        }
      }
      >.tit{
        height: 60px;
        line-height: 60px;
        font-weight: 600;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #F34311;
        letter-spacing: 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          border-radius: 50%;
          background: #F34311;
          display: inline-block;
          &:nth-of-type(1){
            width: 2px;
            height: 2px;
            margin-right: 6px;
          }
          &:nth-of-type(2){
            width: 4px;
            height: 4px;
            margin-right: 6px;
          }
          &:nth-of-type(3){
            width: 6px;
            height: 6px;
            margin-right: 15px;
          }
          &:nth-of-type(4){
            background: transparent;
          }
          &:nth-of-type(5){
            width: 6px;
            height: 6px;
            margin-left: 15px;
          }
          &:nth-of-type(6){
            width: 4px;
            height: 4px;
            margin-left: 6px;
          }
          &:nth-of-type(7){
            width: 2px;
            height: 2px;
            margin-left: 6px;
          }
        }
      }
      .content{
        margin-top: 5px;
        display: none;
        ul>li{
          padding: 15px 0;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #EDEDED;
          &:last-of-type{
            border: none;
          }
          .img{
            width: 90px;
            height: 105px;
            display: inline-block;
            border-radius: 5px;
          }
          .txt{
            display: none;
            height: 105px;
            flex: 1;
            display: flex;
            flex-direction: column;
            /*justify-content: space-around;*/
            padding: 0 15px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            span{
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              letter-spacing: 0;
            }
            .name{
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: #333333;
              letter-spacing: 0;
              line-height: 20px;
              font-weight: 700;
              padding-bottom: 5px;
            }
            .time{
              margin-top: 3px;
              .time-icon{
                width: 11px;
                height: 10px;
                display: inline-block;
                background: url("./img/membership/cal-icon.png") no-repeat center;
                background-size: cover;
                margin-right: 7px;
              }
            }
            .price{
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #FF4500;
              letter-spacing: 0;
              margin-top: 22px;
              font-weight: 500;
            }
          }
          .button{
            width: 75px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            background: #F34311;
            border-radius: 14px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            position: absolute;
            bottom: 15px;
            right: 0;
          }
          .received{
            position: absolute;
            top: 5px;
            right: -15px;
            width: 70px;
            height: 85px;
            background: url("./img/membership/received.png") no-repeat center;
            background-size: 100%;
          }
        }
      }
      .one-line-box{
        ul{
          overflow: hidden;
          padding: 0 13px 20px 13px;
          a{
            &:nth-of-type(odd){
              float: left;
            }
            &:nth-of-type(even){
              float: right;
            }
          }
          li{
            width: 100%;
            padding: 8px 10px;
            position: relative;
            display: flex;
            border-radius: 4px;
            border: 1px solid #e5e5e5;
            background: #f5f5f5;
            margin-top: 15px;
            .img{
              width: 2.8rem;
              height: 2.27rem;
              display: inline-block;
              background: #FFFFFF;
              border-radius: 4px;
            }
            .text_box{
              display: flex;
              flex-direction: column;
              margin-left: 10px;
              flex: 1;
              .txt{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                /*justify-content: space-around;*/
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                padding-right: 10px;
                padding-top: 5px;
                .p{
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 7px 0 5px 0;
                  .left_num{
                    display: none;
                    font-family: PingFangSC-Regular;
                    font-size: 11px;
                    color: #666666;
                    letter-spacing: 0;
                    text-align: right;
                  }
                  .price{
                    /*min-width: 55px;*/
                    height: 15px;
                    line-height: 15px;
                    text-align: center;
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    background: #F34311;
                    border-radius: 2px;
                    padding: 0 5px;
                  }
                }
                .name{
                  font-family: PingFangSC-Medium;
                  font-size: 16px;
                  color: #333333;
                  letter-spacing: 0;
                  line-height: 20px;
                  font-weight: 600;
                  white-space: initial;
                }
                .time{
                  margin-top: 3px;
                  .time-icon{
                    width: 11px;
                    height: 10px;
                    display: inline-block;
                    background: url("./img/membership/cal-icon.png") no-repeat center;
                    background-size: cover;
                    margin-right: 7px;
                  }
                }
              }
              .btn_box{
                width: 100%;
                margin: 0 auto;
                margin-top: 10px;
                margin-bottom: 5px;
                .button{
                  width: 130px;
                  height: 28px;
                  display: inline-block;
                  line-height: 28px;
                  text-align: center;
                  border-radius: 14px;
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #F34311;
                  /*border: 1px solid #F34311;*/
                  position: relative;
                  @include border(#F34311){
                    border-radius: 28px;
                  }
                  letter-spacing: 0;
                }
                .button_grey{
                  width: 130px;
                  height: 28px;
                  display: inline-block;
                  line-height: 28px;
                  text-align: center;
                  border-radius: 14px;
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #999999;
                  letter-spacing: 0;
                  background: #E9E9E9;
                }
              }
            }
          }
        }
      }
      .float-box{
        border-radius: 5px;
        background: #ffffff;
        margin-bottom: 15px;
        >.tit{
          padding: 0 13px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0;
          display: flex;
          align-items: center;
          padding-top: 7px;
          .tit-icon{
            width: 30px;
            height: 30px;
            display: inline-block;
            border-radius: 50%;
            margin-right: 8px;
          }
          .tit-txt{
            line-height: 25px;
            border-bottom: 1px dotted #c2c2c2;
            flex: 1;
          }
        }
        ul{
          overflow: hidden;
          padding: 0 13px 20px 13px;
          a{
            &:nth-of-type(odd){
              float: left;
            }
            &:nth-of-type(even){
              float: right;
            }
          }
          li{
            width: 3.2rem;
            padding: 10px 0 0 0;
            position: relative;
            display: flex;
            flex-direction: column;
            &:nth-of-type(odd){
              float: left;
            }
            &:nth-of-type(even){
              float: right;
            }
            &:nth-of-type(3){
              padding-top: 25px;
            }
            &:nth-of-type(4){
              padding-top: 25px;
            }
            .img{
              width: 100%;
              height: 2.6rem;
              display: inline-block;
              background: #FFFFFF;
              border-radius: 4px;
              border: 1px solid #e5e5e5;
            }
            .txt{
              flex: 1;
              display: flex;
              flex-direction: column;
              /*justify-content: space-around;*/
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              padding-right: 10px;
              height: 77px;
              .p{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 7px 0 5px 0;
                .left_num{
                  display: none;
                  font-family: PingFangSC-Regular;
                  font-size: 11px;
                  color: #666666;
                  letter-spacing: 0;
                  text-align: right;
                }
                .price{
                  /*min-width: 55px;*/
                  height: 15px;
                  line-height: 15px;
                  text-align: center;
                  font-family: PingFangSC-Regular;
                  font-size: 10px;
                  color: #FFFFFF;
                  letter-spacing: 0;
                  background: #F34311;
                  border-radius: 2px;
                  padding: 0 5px;
                }
              }
              .name{
                max-height: 40px;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
                line-height: 20px;
                font-weight: 600;
                white-space: initial;
                margin-top: 10px;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
              }
              .time{
                margin-top: 3px;
                .time-icon{
                  width: 11px;
                  height: 10px;
                  display: inline-block;
                  background: url("./img/membership/cal-icon.png") no-repeat center;
                  background-size: cover;
                  margin-right: 7px;
                }
              }
            }
            .btn_box{
              width: 100%;
              margin: 0 auto;
              margin-top: 10px;
              text-align: center;
              .button{
                width: 130px;
                height: 28px;
                display: inline-block;
                line-height: 28px;
                text-align: center;
                border-radius: 14px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #F34311;
                /*border: 1px solid #F34311;*/
                position: relative;
                @include border(#F34311){
                  border-radius: 28px;
                }
                letter-spacing: 0;
              }
              .button_grey{
                width: 130px;
                height: 28px;
                display: inline-block;
                line-height: 28px;
                text-align: center;
                border-radius: 14px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #999999;
                letter-spacing: 0;
                background: #f5f5f5;
              }
            }
          }
        }
      }
      .explain{
        margin-top: 10px;
      }
    }
    .ad{
      /*display: none;*/
      max-width: 7.5rem;
      height: 100%;
      margin: 0 auto;
      margin: 15px;
      img{
        width: 100%;
        height: 2.2rem;
        border-radius: 5px;
        display: inline-block;
      }
    }
    .footer{

    }
  }
  #mask {
    width: 100%;
    height: 100%;
    background: rgba(127, 126, 125, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1900;
    .dialog {
      z-index: 1901;
      width: 5.73rem;
      /*height: 3.4rem;*/
      background-color: #ffffff;
      border-radius: 0.2rem;
      padding: .3rem .5rem .3rem .5rem;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content {
        width: 100%;
        /*height: 2.2rem;*/
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
        }
        .txt{
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          margin-top: 0.27rem;
        }
        .tips{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .select{
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_checked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .no-select{
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_nochecked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .p{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666666;
            letter-spacing: 0;
          }
        }
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
          margin-top: 0.14rem;
        }
      }
      .bot {
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #097FFF;
        letter-spacing: 0;
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid #f4f4f4;
      }

    }
  }
</style>
