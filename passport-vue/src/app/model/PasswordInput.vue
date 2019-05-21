<template>
  <div class="txt-wrapper">
    <input :type="inputType" ref="pasInput" :value="value" @input="inputChange" class="txt-input" :placeholder="placeholder">
    <a href="javascript:;" tabindex="-1" class="img-wrapper" @click="changeStatus">
      <img v-show="isOpen" class="open-img" src="../../assets/images/login/open.png" alt="">
      <img v-show="!isOpen" class="close-img" src="../../assets/images/login/close.png" alt="">
    </a>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  /**
   * @property {String}     value           input值
   * @property {String}     placeholder     占位提示语
   * @property {Boolean}    open            打开密码
   */
  export default {
    computed: {
      ...mapState({
        field: state => state.comparisonTable,
        isEn: state => state.languageEnUS
      }),
      inputType() {
        //  input的type
        if(this.isOpen) {
          return 'text';
        } else {
          return 'password';
        }
      }
    },
    props: {
      value: {
        type: [String, Number]
      },
      placeholder: {
        type: String,
      },
      open: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isOpen: false,                 //  显示密码状态
      }
    },
    methods: {
      inputChange() {
        this.$emit('input',this.$refs.pasInput.value)
      },
      validate() {
        //  验证规则：数字 英文字母 英文符号 符号包含 `~!@#$%^&*()-[]{}\|’;:,.<>/?"

        let reg = /^[0-9a-zA-Z`~!@#\$%\^&\*()\-\[\]{}\|’;:,\.<>/\?"]{6,18}$/;
        if(reg.test(this.value)){
          return true;
        } else {
          this.$toast(this.isEn ? this.field.passwordErrorTip.en : this.field.passwordErrorTip.ch);
          return false;
        }
      },
      changeStatus() {
        this.isOpen = !this.isOpen;
      }
    },
    mounted() {
      this.isOpen = this.open;
    }
  }
</script>

<style lang="scss">
  .txt-wrapper{
    display: flex;
    .txt-input{
      border: none;
      height: 23px;
      flex: 1;
      caret-color: #FFA600;
      &::placeholder{
        font-size: 16px;
        color: #cccccc;
      }
    }
    .img-wrapper{
      padding: 0 3px;
      outline: none;
      .open-img{
        width: 17px;
        height: 13px;
      }
      .close-img{
        width: 16px;
        height: 13px;
      }
    }
  }
</style>
