<template>
  <page-wrap>
    <div v-title>{{title}}</div>

    <page-header>
      <topbar theme="white">
        <template slot="actions" v-if="isEn">
          <a
            v-show="isVCLogin"
            class="top-tab-title"
            href=javascript:;
            @click="vcLogin(false)"
          >{{isEn ? field.passwordLogin.en : field.passwordLogin.ch}}</a>
          <a
            v-show="!isVCLogin"
            class="top-tab-title"
            href=javascript:;
            @click="vcLogin(true)"
          >{{isEn ? field.verificationLogin.en : field.verificationLogin.ch}}</a>
        </template>
      </topbar>

    </page-header>

    <page-main :show="show">
      <div class="main-wrapper">
        <div class="main-inner">
          <FormMain>
            <TitleWrapper>
              <div class="form-title" v-if="!isEn">
                <a
                  :class="isVCLogin ? 'active' : ''"
                  href="javascript:;"
                  @click="vcLogin(true)"
                >{{isEn ? field.verificationLogin.en : field.verificationLogin.ch}}</a>
                <a
                  :class="!isVCLogin ? 'active' : ''"
                  href=javascript:;
                  @click="vcLogin(false)"
                >{{isEn ? field.passwordLogin.en : field.passwordLogin.ch}}</a>
              </div>
              <div class="form-title" v-else>
                <a
                  v-if="isVCLogin"
                  class="active"
                  href="javascript:;"
                >{{isEn ? field.verificationLogin.en : field.verificationLogin.ch}}</a>
                <a
                  v-else
                  class="active"
                  href=javascript:;
                >{{isEn ? field.passwordLogin.en : field.passwordLogin.ch}}</a>
              </div>
              <div class="bubble-tip" v-show="passwordBubbleShow && !isEn">
                <a href="javascript:;" @click="toVLogin">忘记密码？试试验证码登录</a>
              </div>
              <div class="bubble-tip" v-show="unregisteredBubbleShow && !isEn">
                <a href="javascript:;" @click="toVLogin">还没注册？试试验证码登录</a>
              </div>
            </TitleWrapper>
            <FormItem>
              <PhoneItem ref="phoneItem">
                <TxtInput v-model="phoneValue" ref="phoneInput" :placeholder="isEn ? field.phonePH.en : field.phonePH.ch"></TxtInput>
              </PhoneItem>
            </FormItem>
            <FormItem v-show="!isVCLogin">
              <PasswordInput v-model="passwordValue" ref="passwordInput" :placeholder="isEn ? field.passwordPH.en : field.passwordPH.ch"></PasswordInput>
            </FormItem>
            <FormBtnGroup :top="70" v-show="isVCLogin">
              <template slot="button">
                <FormButton :text="isEn ? field.vlButtonText.en : field.vlButtonText.ch" :active="vlBtnActive" @click-btn="nextFn"></FormButton>
              </template>
              <template slot="tip">
                <p>
                  {{isEn ? field.unregisteredTip.en : field.unregisteredTip.ch}}
                  <a href="javascript:;" class="orange" @click="toAgreement">{{isEn ? field.agreement.en : field.agreement.ch}}</a>
                </p>
              </template>
            </FormBtnGroup>
            <FormBtnGroup :top="65" v-show="!isVCLogin">
              <template slot="button">
                <FormButton :text="isEn ? field.plButtonText.en : field.plButtonText.ch" :active="plBtnActive" @click-btn="loginFn"></FormButton>
              </template>
              <template slot="tip">
                <p>
                  <a href="javascript:;" @click="toForget">{{isEn ? field.forgetPassword.en : field.forgetPassword.ch}}</a>
                </p>
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
  import FormItem from 'src/app/model/FormItem';
  import FormMain from 'src/app/model/FormMain';
  import PhoneItem from 'src/app/model/PhoneItem';
  import TxtInput from 'src/app/model/TxtInput';
  import FormButton from 'src/app/model/FormButton';
  import FormBtnGroup from 'src/app/model/FormBtnGroup';
  import PasswordInput from 'src/app/model/PasswordInput';
  import TitleWrapper from 'src/app/model/TitleWrapper';
  import WebComponent from 'src/app/model/WebComponent';
  import apiPasswordLogin from 'src/api/apiPasswordLogin';


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
      vlBtnActive() {
        //  验证码按钮高亮
        return !!this.phoneValue.length;
      },
      plBtnActive() {
        //  密码按钮高亮
        return !!(this.phoneValue.length && this.passwordValue.length);
      },
      isChinese() {
        //  中国区号
        if(this.nationalCode === 86){
          return true;
        } else {
          return false;
        }
      }
    },
    components: {
      FormItem,
      FormMain,
      PhoneItem,
      TxtInput,
      FormButton,
      FormBtnGroup,
      PasswordInput,
      TitleWrapper,
      WebComponent
    },
    data: () => {
      return {
        show: false,
        error: false,
        title: '登录',
        phoneValue: '',                                                                       //  电话号码
        passwordValue: '',                                                                    //  密码
        isVCLogin: true,                                                                     //  验证码登录
        nationalCode: 86,                                                                     //  国家号，默认86
        passwordBubbleShow: false,                                                           //  密码错误气泡显示
        unregisteredBubbleShow: false,                                                       //  未注册气泡显示

      }
    },
    methods: {
      refresh() {
        // 500页面内，刷新按钮的事件，用来重新调用渲染页面的接口，达到刷新效果
        console.log('refresh')
      },
      nextFn() {
        if(!this.vlBtnActive) return;
        if(this.$refs.phoneInput.validate(this.isChinese)){
          //  verifyType 验证码短信类型  登录或注册: 0   重置密码: 1   忘记密码: 2
          this.$router.push({name: 'verification', query: {code: this.nationalCode, phone: this.phoneValue, verifyType: 0}});
        }
      },
      vcLogin(yes) {
        //  切换验证码登录or密码登陆
        if(yes){
          this.isVCLogin = true;
          this.passwordBubbleShow = false;
          this.unregisteredBubbleShow = false;
        } else {
          this.isVCLogin = false;
        }
      },
      toVLogin() {
        //  切换为验证码登录
        this.isVCLogin = true;
        this.passwordBubbleShow = false;
        this.unregisteredBubbleShow = false;
      },
      loginFn() {
        if(!this.plBtnActive) return;
        if(this.$refs.phoneInput.validate(this.isChinese)){
          this.ajaxPasswordLogin();
        }
      },
      watchNationalCode() {
        //  监听国家号选择
        this.$refs.phoneItem.$on('nationalCode-choose',(code) => {
          this.nationalCode = +code;
        });
      },
      ajaxPasswordLogin() {
        let data =  {
          nationalCode: this.nationalCode,
          mobile: this.phoneValue,
          password: this.passwordValue
        };

        this.$showLoading(this.isEn ? this.field.loading.en : this.field.loading.ch);

        apiPasswordLogin({
          type: 'post',
          processData: true,
          data
        }).then( res => {
          // console.log(res);
          this.passwordBubbleShow = false;
          this.unregisteredBubbleShow = false;
          this.hideLoading();

          if(res.retCode === 1){
            this.$toast(this.isEn ? this.field.errorTip.en : this.field.errorTip.ch);
            this.passwordBubbleShow = true;
          }
          else if(res.retCode === 6){
            this.$toast(this.isEn ? this.field.unregisteredErrorTip.en : this.field.unregisteredErrorTip.ch);
            this.unregisteredBubbleShow = true;
          }
          else {
            this.$toast(this.isEn ? this.field.loginSuccess.en : this.field.loginSuccess.ch);
            redirect(true);
            // console.log('登录成功');
          }
        })
      },
      hideLoading() {
        this.$hideLoading();
      },
      toForget() {
        //  忘记密码页
        if(this.$refs.phoneInput.validate(this.isChinese, false)){
          this.$router.push({name: 'forget', query: {mobile: this.phoneValue}});
        } else {
          this.$router.push({name: 'forget', query: {mobile: ''}});
        }
      },
      toAgreement() {
        //  协议页
        this.$router.push({name: 'agreement'});
      }
    },
    mounted() {
      this.show = true;
      this.$nextTick(() => {
        this.watchNationalCode();
      });

    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";
  @import "../assets/scss/mixins";

  .page-topbar .actions {
    padding-right: 20px!important;
  }
  .top-tab-title{
    font-size: 14px;
    color: #999999;
  }

</style>
