<template>
  <page-wrap>
    <div v-title>{{title}}</div>

    <page-header>
      <topbar theme="white">
        <template
          slot="title"
        ></template>
      </topbar>

    </page-header>

    <page-main :show="show">
      <div class="main-wrapper">
        <div class="main-inner">
          <FormMain>
            <TitleWrapper>
              <div class="form-title">
                <a
                  class="active" href="javascript:;"
                >{{isEn ? field.verificationTitle.en : field.verificationTitle.ch}}</a>
              </div>
              <div class="form-title-tip">
                <p>+{{nationalCode}} {{phone}} <a href="javascript:;" class="orange" @click="sendCode">{{secondTip}}</a></p>
              </div>
            </TitleWrapper>
            <div class="verification-code-wrapper">
              <VerificationInput ref="verificationInput" v-model="verificationCode"></VerificationInput>
              <p class="error-more-tip" v-show="errorMore">
                <img src="../assets/images/login/error-tip.png" alt="">
                {{isEn ? field.reacquireVerificationCode.en : field.reacquireVerificationCode.ch}}
              </p>
            </div>
            <FormBtnGroup :top="54">
              <template slot="button">
                <FormButton :active="btnActive" :text="isEn ? field.plButtonText.en : field.plButtonText.ch"  @click-btn="loginFn"></FormButton>
              </template>
              <template slot="tip">
                <p v-show="!isVoCode">
                  {{isEn ? field.vlNoMsm.en : field.vlNoMsm.ch}}
                  <a href="javascript:;" class="orange" @click="sendVoCode">{{isEn ? field.vlVoiceCode.en : field.vlVoiceCode.ch}}</a>
                </p>
                <p v-show="isVoCode">{{isEn ? field.sendVoiceCode.en : field.sendVoiceCode.ch}}</p>
              </template>
            </FormBtnGroup>
          </FormMain>
        </div>
      </div>

    </page-main>

    <WebComponent></WebComponent>

  </page-wrap>
</template>

<script>
  import {redirect} from 'utils';
  import {mapState} from 'vuex';
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


  /**
   * @property {boolean}   show          页面显示
   * @property {boolean}   error         接口请求是否报错
   * @property {string}    title         页面标题
   */

  export default {
    computed: {
      ...mapState({
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
        error: false,
        title: '登录',
        phone: '',                                                                       //  电话号码
        nationalCode: '',                                                                //  国家号
        verifyType: '',                                                                  //  验证码短信类型
        verificationCode: '',                                                            //  验证码
        codeNumber: 4,                                                                   //  验证码位数
        second: 60,                                                                      //  倒计时秒数
        timer: null,                                                                    //  定时器
        isVoCode: false,                                                                //  使用语音验证码
        errorMore: false,                                                               //  验证码输入错误过多提示
      }
    },
    methods: {
      initData() {
        this.phone = this.$route.query.phone;
        this.nationalCode = this.$route.query.code;
        this.verifyType = this.$route.query.verifyType;
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
        if(this.second > 0 && this.second !== 60) return;

        if(this.errorMore) {
          this.errorMore = false;
        }

        let data = {
          nationalCode: this.nationalCode,
          mobile: this.phone,
          type: this.verifyType
        };
        apiSendMessageCode({
          type: 'post',
          processData: true,
          data,
          retCodeError: () => {
            this.$toast(this.isEn ? this.field.retCodeError.en : this.field.retCodeError.ch);
            this.$router.go(-1);
          }
        }).then((res) => {
          // console.log(res)
          if(res.retCode === 0) {
            this.show = true;
            this.second = 60;
            this.countDown();
          } else if (res.retCode === 5) {
            this.$toast(this.isEn ? this.field.unregisteredErrorTip.en : this.field.unregisteredErrorTip.ch);
            this.$router.go(-1);
          }
        })
      },
      countDown() {
        clearTimeout(this.timer);
        this.timer = setInterval(() => {
          if(this.second <= 0) {
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
      }
    },
    created() {
      // redirect();
    },
    mounted() {
      this.initData();
    },
    watch: {
      verificationCode: function(newValue) {
        if(newValue.length == this.codeNumber){
          this.loginFn();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "../assets/scss/mixins";
  .verification-code-wrapper {
    position: relative;
    .error-more-tip {
      width: 100%;
      padding: 0 25px;
      position: absolute;
      bottom: -25px;
      left: 0;
      font-size: 10px;
      text-align: center;
      img {
        width: 10px;
        height: 10px;
        margin-top: -2px;
      }
    }
  }

  .desktop {
    .verification-code-wrapper {
      padding-top: 40px;
    }
    #main{
      min-height: 220px;
    }
  }
</style>
