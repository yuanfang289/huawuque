<template>
  <page-wrap>
    <div v-title>{{title}}</div>

    <!--<page-header>-->
      <!--<topbar theme="white">-->
        <!--<template-->
          <!--slot="title"-->
        <!--&gt;</template>-->
      <!--</topbar>-->

    <!--</page-header>-->

    <page-main :show="show">
      <div class="main-wrapper">
        <div class="main-inner">
          <div class="banner">
            <img :src="require('./img/new.png')">
            <div class="rule" @click="diologClick('rule',1)"></div>
            <div class="more" @click="diologClick('more',1)"></div>
          </div>
          <div class="input_txt">
            <div class="input_box phone_box">
              <!--<img :src="require('./img/input_bg.png')">-->
              <div class="add-item">
                <a href="javascript:;" @click="showNationalDialog">
                  +<span>{{NationalCode}}</span><img class="arrow-down-img" :src="require('./img/arrow-down.png')">
                </a>
              </div>
              <input v-model="phoneNum" type="number" class="phone" placeholder="请输入手机号" oninput="if(value.length>11)value=value.slice(0,11)" maxlength="11">
            </div>
            <div class="input_box sns_box">
              <!--<img :src="require('./img/input_bg.png')">-->
              <input v-model="snsCode" type="number" class="sns_code" placeholder="请输入验证码" oninput="if(value.length>6)value=value.slice(0,6)" maxlength="6">
              <div class="getCode" v-on:click="getCode()" v-if="secondShow">
                <p v-if="secondShow">获取验证码</p>
              </div>
              <div class="getCode" v-else="">
                <p>{{second}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="enter" v-show="enterShow">
          <!--<img :src="require('./img/btn_bg.png')">-->
          <button @click="go()">
            立即领取
          </button>
        </div>
      </div>
      <div id="mask" v-show="diolog">
        <div class="diolog">
          <div class="content">
            <p class="tit">除100元会议室代金券（个人支付）外，新用户还可获得：</p>
            <p class="con">1、大咖线上精品课程；<br>
            2、预定会议室、活动场地、工位代金券；<br>
            3、U物上万商品优惠折扣券；<br>
            4、免费参加丰富多彩的线上线下活动；<br>
            5、免费发布个人、企业服务需求信息。</p>

          </div>
          <div class="close">
              <span @click="diologClick('more',0)"></span>
          </div>
        </div>
      </div>
      <div id="mask2" v-show="diolog2">
        <div class="diolog">
          <div class="content">
            <p class="tit">活动规则</p>
            <div class="con">
              <p>1、优鲜集新用户必须使用未在优鲜集平台注册的手机号参加此次活动；</p><br>
              <p>2、100元代金券将放入“我的-我的代金券”中；</p><br>
              <p>3、如发现任何违规套取奖励行为，将视情节严重程度进行判罚：不予发放奖励、封停邀请功能、冻结账号、依法追究法律责任；</p><br>
              <p>4、如有其它疑问，请咨询优鲜集官方客服。</p>
            </div>
          </div>
          <div class="close">
            <span @click="diologClick('rule',0)"></span>
          </div>
        </div>

      </div>
    </page-main>
  </page-wrap>
</template>

<script>
  import {redirect} from 'utils';
  import {mapState} from 'vuex';

  import {isApp, setUrl, getLocation} from 'src/utils/index';

  import FormMain from 'src/app/model/FormMain';
  import FormButton from 'src/app/model/FormButton';
  import FormBtnGroup from 'src/app/model/FormBtnGroup';
  import TitleWrapper from 'src/app/model/TitleWrapper';
  import VerificationInput from 'src/app/model/VerificationInput';
  import WebComponent from 'src/app/model/WebComponent';
  import apiLogOrReg from 'src/api/apiLogOrReg';
  import apiSendMessageCode from 'src/api/apiSendMessageCode';
  import apiSendSmsVoCode from 'src/api/apiSendSmsVoCode';
  import apiCheckValidCode from 'src/api/apiCheckValidCode';
  import apiRegisterInvite from 'src/api/apiRegisterInvite';


  /**
   * @property {boolean}   show          页面显示
   * @property {boolean}   error         接口请求是否报错
   * @property {string}    title         页面标题
   */

  export default {
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
        field: state => state.comparisonTable,
        isEn: state => state.languageEnUS
      }),
      btnActive() {
        return this.verificationCode.length === this.codeNumber;
      },
      secondTip() {
        if(this.second <= 0){
          return this.isEn ? this.field.resend.en : this.field.resend.ch;
        } else {
          return `${this.second}s`;
        }
      }
    },
    components: {
      FormMain,
      FormButton,
      FormBtnGroup,
      TitleWrapper,
      VerificationInput,
      WebComponent
    },
    data: () => {
      return {
        show: false,
        diolog:false,
        diolog2:false,
        error: false,
        enterShow:true,
        isApp: isApp(),
        title: '平行世界一点灵犀，相遇只在“优鲜集”',
        NationalCode: 86,
        NationalId: '',
        phoneNum:'',
        snsCode:'',
        inviteUserId:'',                                                                 //邀请人id
        phone: '',                                                                       //  电话号码
        nationalCode: '',                                                                //  国家号
        verifyType: '',                                                                  //  验证码短信类型
        verificationCode: '',                                                            //  验证码
        codeNumber: 4,                                                                   //  验证码位数
        second: 60,                                                                      //  倒计时秒数
        secondShow:true,
        timer: null,                                                                    //  定时器
        isVoCode: false,                                                                //  使用语音验证码
        errorMore: false,                                                               //  验证码输入错误过多提示
      }
    },
    methods: {
      initData() {
        this.inviteUserId = this.$route.params.userId;
        console.log(this.inviteUserId,'邀请人id');
//        this.sendCode();
      },
      getCode() {
          this.sendCode();
      },
      refresh() {
        // 500页面内，刷新按钮的事件，用来重新调用渲染页面的接口，达到刷新效果
        console.log('refresh')
      },
      loginFn() {
        if(!this.btnActive) return;
        this.$showLoading(this.isEn ? this.field.loading.en : this.field.loading.ch);
        if(this.verifyType == 0) {
          //  登录验证

          let data = {
            nationalCode: this.nationalCode,
            mobile: this.phone,
            snsCode: this.verificationCode
          };
          apiLogOrReg({
            type: 'post',
            processData: true,
            data
          }).then((res) => {
            // console.log(res)
            if(res.retCode === 7) {
              this.hideLoading();
              this.clearVerificationCode();
              this.$toast(this.isEn ? this.field.VerificationCodeError.en : this.field.VerificationCodeError.ch);
            }
            else if (res.retCode === 6) {
              this.hideLoading();
              this.clearVerificationCode();
              this.errorMore = true;
            }
            else {
              this.hideLoading();
              if(res.isNewUser && res.isNewUser === 1) {
                //  新用户
                this.$router.replace({name: 'setPassword', query: {changeType: 0, mobile: this.phone, nationalCode: this.nationalCode}});
              } else {
                this.$toast(this.isEn ? this.field.loginSuccess.en : this.field.loginSuccess.ch);
                redirect(true);
                console.log('登录成功');
              }
            }
          })
        }
        else if(this.verifyType == 2) {
          //  忘记密码验证

          let data = {
            type: this.verifyType,
            nationalCode: this.nationalCode,
            mobile: this.phone,
            snsCode: this.verificationCode
          };
          apiCheckValidCode({
            type: 'post',
            processData: true,
            data
          }).then((res) => {
            console.log(res)
            if(res.retCode === 7) {
              this.hideLoading();
              this.clearVerificationCode();
              this.$toast(this.isEn ? this.field.VerificationCodeError.en : this.field.VerificationCodeError.ch);
            }
            else if (res.retCode === 6) {
              this.hideLoading();
              this.clearVerificationCode();
              this.errorMore = true;
            }
            else {
              this.hideLoading();
              this.$router.replace({name: 'setPassword', query: {changeType: 2, mobile: this.phone, nationalCode: this.nationalCode}});
              console.log('请求成功');
            }
          })
        }

      },
      hideLoading() {
        this.$hideLoading();
      },
      clearVerificationCode() {
        this.verificationCode = '';
        this.$refs.verificationInput.showKeyboard();
      },
      sendCode() {
//        if(this.second > 0 && this.second !== 60) return;
//
//        if(this.errorMore) {
//          this.errorMore = false;
//        }
        if(this.phoneNum.length != 11){
          this.$toast('请输入正确的手机号！');
          return
        }

        let data = {
          nationalCode: this.NationalCode,
          mobile: this.phoneNum,
          type: 0
        };
        console.log(data,"12312312321312")
        apiSendMessageCode({
          type: 'post',
          processData: true,
          data,
          retCodeError: () => {
            this.$toast(this.isEn ? this.field.retCodeError.en : this.field.retCodeError.ch);
            this.$router.go(-1);
          }
        }).then((res) => {
           console.log(res,"验证码")
          if(res.retCode === 0) {
            this.secondShow = false;
            this.second = 60;
            this.countDown();
          } else if (res.retCode === 5) {
            this.$toast(this.isEn ? this.field.unregisteredErrorTip.en : this.field.unregisteredErrorTip.ch);
            this.$router.go(0);
          }
        })
      },
      countDown() {
        clearTimeout(this.timer);
        this.timer = setInterval(() => {
          if(this.second <= 0) {
            this.secondShow = true;
            clearTimeout(this.timer);
            return;
          }
          this.second --;
        },1000)
      },
      sendVoCode() {
        let data = {
          mobile: this.phone,
          type: this.verifyType
        };
        apiSendSmsVoCode({
          type: 'post',
          processData: true,
          data
        }).then((res) => {
          // console.log(res);
          if(res.retCode === 0){
            this.isVoCode = true;
          }
        })
      },
      showNationalDialog() {
        this.$showNationalCode({
          currentId: this.NationalId,
          onChoose: (code, id) => {
            this.NationalCode = code;
            this.NationalId = id;
            this.$emit('nationalCode-choose', this.NationalCode);
          }
        })
          var act = document.getElementsByClassName('action')[0];
          act.innerHTML = `<span style="font-size: 14px">取消</span>`;
      },
      go(){
        if(this.phoneNum.length != 11){
          this.$toast('请输入正确的手机号！');
          return
        }
        if(this.snsCode.length == 0){
          this.$toast('请输入验证码！');
          return
        }
        let data = {
        retUrl:'https://m.urwork.cn/v2/index',
        nationalCode: this.NationalCode,
        mobile: this.phoneNum,
        snsCode : this.snsCode,
        channel : '',
        inviterId : this.inviteUserId
        };
        console.log(data,"21313131231")
        apiRegisterInvite({
          type: 'post',
          processData: true,
          data
        }).then((res) => {
            console.log(res,'注册登录返回');
//            let url = res.retUrl;
//            location.href = url;
          if(this.isApp) {
            console.log('app');
            if(res.userId){
              let that = this;
              this.$dialog({
                content:'注册成功！',
                callback:function () {
                  that.phoneNum = '';
                  that.snsCode = '';
                }
              });
            }else{
              this.$toast(res.retMsg);
            }
          } else {
            console.log('h5');
            if(res.userId){
              let url = res.retUrl;
              location.href = url;
            }else{
              this.$toast(res.retMsg);
            }
          }
        })
      },
      diologClick (str,n) {
          let _this = this;
          if(str == 'more'){
              if(n == 1){
                _this.diolog = true;
              }else{
                _this.diolog = false;
              }
          }else if (str == 'rule'){
            if(n == 1){
              _this.diolog2 = true;
            }else{
              _this.diolog2 = false;
            }
          }
      }
    },
    created() {
      // redirect();
      this.show = true;
    },
    mounted() {
      this.initData();
      this.clientHeight = document.documentElement.clientHeight;
      const that = this;
      // 安卓手机键盘吊起挡住输入框
      window.onresize = function() {
        if(document.documentElement.clientHeight < that.clientHeight) {
          let scrollVal = document.documentElement.clientHeight-that.clientHeight;
          that.enterShow = false;
        }else {
          that.enterShow = true;
        }
      };
    },
    watch: {
//      verificationCode: function(newValue) {
//        if(newValue.length == this.codeNumber){
//          this.loginFn();
//        }
//      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";
  @import "../assets/scss/mixins";
  #app{
    height: 100% !important;
  }
  body{
    background: url("./img/red_bg.png") repeat!important;
  }
  .wrapper{
    height: 100%;
    background: url("./img/red_bg.png") repeat!important;
  }
  .page-wrapper{
    /*background-color: #f3643c!important;*/
    background: url("./img/red_bg.png") repeat;
    /*position: relative;*/
    overflow: scroll!important;
  }
  .banner {
    img{
      display: block;
      margin: 0 auto;
    }
    .rule{
      width: 1.45rem;
      height: 0.85rem;
      position: absolute;
      top: 0.16rem;
      right: 0;
    }
    .more{
      width: 2rem;
      height: 0.3rem;
      position: absolute;
      top: 6.8rem;
      left: 50%;
      margin-left: -1rem;
    }
  }
  .input_txt{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .input_box{
      img{
        /*margin: 0 3px;*/
      }
      input{
        width: 5.5rem;
        height: 0.9rem;
        background: #ffffff;
        border: none;
        border-radius: 2px;
        font-size: 15px;
        color: #d31a26;
        &::-webkit-input-placeholder {
          color: #d6d6d6;
          font-size: 14px;
        }
      }
    }
    .phone_box{
      margin-bottom: 0.28rem;
      position: relative;
      input{
        text-indent:1.26rem;
      }
      .add-item{
        padding-right: 10px;
        font-size: 15px;
        color: #da4538;
        position: absolute;
        top: 0.25rem;
        left: 0.26rem;
        border-right: 1px solid #ff3615;
        a{
          color: #d31a26!important;
        }
        .arrow-down-img{
          width: 7px;
          height: 4px;
          margin-top: -3px;
          margin-left: 3px;
          display: none;
        }
      }
    }
    .sns_box{
      input{
        width: 3.65rem;
        text-indent:0.26rem;
        &::-webkit-input-placeholder {
          color: #d6d6d6;
          font-size: 14px;
        }
      }
      .getCode{
        width: 1.8rem;
        height: 0.9rem;
        line-height: 0.86rem;
        display: inline-block;
        background: #fb2804 url("img/get_code_btn.png") no-repeat;
        background-size: 100%;
        p{
          text-align: center;
          font-size: 14px;
          color: #831200;
          height: 100%;
          line-height: 0.9rem;
        }
      }
    }
  }
  .main-inner{
   width: 7.5rem;
    margin: 0 auto;
  }
  .enter{
    width: 5.5rem;
    height: 1rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 0.32rem;
    margin-bottom: 0.8rem;
    border-radius: 4px;
    background: url("img/big_btn.png") no-repeat;
    background-size: 100%;
    button{
      width: 100%;
      height: 100%;
      line-height: 0.8rem!important;
      display: inline-block;
      font-size: 0.32rem;
      color: #831200;
      font-weight: 600;
    }
  }

  #mask{
      width: 100%;
      height: 100%;
      background: rgba(50,16,8,0.5);
      position: fixed;
      top: 0;
      left: 0;
    //display: none;
    .diolog{
      z-index: 10;
      width: 6rem;
      height: 6rem;
      border-radius: 0.2rem;
      background: url("img/mask.png") no-repeat;
      background-size: 100%;
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
        font-size: 12px;
        padding: 0 0.46rem;
        padding-top: 1.6rem;
        .tit{
          font-weight: 700;
          line-height: 0.4rem;
          font-size: 12px;
          margin-bottom: 0.1rem;
        }
        .con{
          line-height: 0.63rem;
        }
      }
      .close{
        text-align: center;
        span{
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background: url("img/close.png") no-repeat;
          background-size: 100%;
          margin-top: 1rem;
        }
      }
    }
  }
  #mask2{
    width: 100%;
    height: 100%;
    background: rgba(50,16,8,0.5);
    position: fixed;
    top: 0;
    left: 0;
    //display: none;
    .diolog{
      z-index: 10;
      width: 6rem;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content{
        width: 6rem;
        font-size: 12px;
        padding: 0.6rem 0.46rem;
        background: #ffffff;
        border-radius: 0.2rem;
        .tit{
          font-weight: 700;
          font-size: 0.4rem;
          color: #000;
          text-align: center;
          margin-bottom: 0.4rem;
        }
        .con{
          color: #333;
          p{
            /*margin: 0.22rem 0;*/
          }
        }
      }
      .close{
        text-align: center;
        span{
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background: url("img/close.png") no-repeat;
          background-size: 100%;
          margin-top: 0.6rem;
        }
      }
    }
  }
</style>
