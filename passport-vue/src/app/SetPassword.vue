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
                >{{isEn ? field.createPassword.en : field.createPassword.ch}}</a>
              </div>
            </TitleWrapper>
            <div class="password-tip-wrapper">
              <FormItem>
                <PasswordInput :open="true" v-model="passwordValue" ref="passwordInput" :placeholder="isEn ? field.createPasswordPH.en : field.createPasswordPH.ch"></PasswordInput>
              </FormItem>
              <p class="password-tip">{{isEn ? field.createPasswordTip.en : field.createPasswordTip.ch}}</p>
            </div>
            <FormBtnGroup :top="70">
              <template slot="button">
                <FormButton :text="isEn ? field.confirm.en : field.confirm.ch" :active="btnActive" @click-btn="confirmFn"></FormButton>
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
  import PasswordInput from 'src/app/model/PasswordInput';
  import FormButton from 'src/app/model/FormButton';
  import FormBtnGroup from 'src/app/model/FormBtnGroup';
  import TitleWrapper from 'src/app/model/TitleWrapper';
  import WebComponent from 'src/app/model/WebComponent';
  import apiChangePassword from 'src/api/apiChangePassword';


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
        //  按钮高亮
        return !!this.passwordValue.length;
      },
    },
    components: {
      FormItem,
      FormMain,
      PasswordInput,
      FormButton,
      FormBtnGroup,
      TitleWrapper,
      WebComponent
    },
    data: () => {
      return {
        show: false,
        error: false,
        title: '设置密码',
        passwordValue: '',                                                                    //  密码
        phone: '',                                                                            //  手机号
        nationalCode: '',                                                                     //  国家号
        changeType: '',                                                                       //  设置密码类型  0:登录  2:忘记密码
      }
    },
    methods: {
      refresh() {
        // 500页面内，刷新按钮的事件，用来重新调用渲染页面的接口，达到刷新效果
        console.log('refresh')
      },
      confirmFn() {
        if(!this.btnActive) return;
        if(this.$refs.passwordInput.validate()){
          this.ajaxChangePassword();
        }
      },
      ajaxChangePassword() {
        let data = {
          type: this.changeType,
          nationalCode: this.nationalCode,
          mobile: this.phone,
          password: this.passwordValue
        };
        apiChangePassword({
          type: 'post',
          processData: true,
          data
        }).then((res) => {
          console.log(res);
          if(res){
            this.$toast(this.isEn ? this.field.passwordSet.en : this.field.passwordSet.ch);
            redirect(true);
          }
        })
      }
    },
    mounted() {
      this.phone = this.$route.query.mobile;
      this.nationalCode = this.$route.query.nationalCode;
      this.changeType = this.$route.query.changeType;
      this.show = true;
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";
  @import "../assets/scss/mixins";
  .password-tip-wrapper{
    position: relative;
    .password-tip{
      position: absolute;
      bottom: -25px;
      left: 0;
      font-size: 11px;
      color: #9A9AA1;
    }
  }
</style>
