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
                >{{isEn ? field.findPassword.en : field.findPassword.ch}}</a>
              </div>
              <div class="form-title-tip">
                <p>{{isEn ? field.verifyMobile.en : field.verifyMobile.ch}}</p>
              </div>
            </TitleWrapper>
            <FormItem>
              <PhoneItem ref="phoneItem">
                <TxtInput v-model="phoneValue" ref="phoneInput" :placeholder="isEn ? field.phonePH.en : field.phonePH.ch"></TxtInput>
              </PhoneItem>
            </FormItem>
            <FormBtnGroup :top="70">
              <template slot="button">
                <FormButton :text="isEn ? field.vlButtonText.en : field.vlButtonText.ch" :active="btnActive" @click-btn="nextFn"></FormButton>
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
  import TitleWrapper from 'src/app/model/TitleWrapper';
  import WebComponent from 'src/app/model/WebComponent';

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
        return !!this.phoneValue
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
      TitleWrapper,
      WebComponent
    },
    data: () => {
      return {
        show: false,
        error: false,
        title: '忘记密码',
        phoneValue: '',                                                                       //  手机号
        nationalCode: 86,                                                                     //  国家号，默认86
      }
    },
    methods: {
      refresh() {
        // 500页面内，刷新按钮的事件，用来重新调用渲染页面的接口，达到刷新效果
        console.log('refresh')
      },
      nextFn() {
        if(!this.btnActive) return;
        if(this.$refs.phoneInput.validate(this.isChinese)){
          //  verifyType 验证码短信类型  登录或注册: 0   重置密码: 1   忘记密码: 2
          this.$router.push({name: 'verification', query: {code: this.nationalCode, phone: this.phoneValue, verifyType: 2}});
        }
      },
      watchNationalCode() {
        //  监听国家号选择
        this.$refs.phoneItem.$on('nationalCode-choose',(code) => {
          this.nationalCode = +code;
        });
      },
    },
    mounted() {
      if(this.$route.query.mobile) {
        this.phoneValue = this.$route.query.mobile;
      }
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

</style>
