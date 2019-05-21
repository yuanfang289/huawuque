<template>
  <div class="txt-wrapper">
    <input :type="type" ref="txtInput" :value="value" @input="inputChange" class="txt-input" :placeholder="placeholder">
    <a href="javascript:;" tabindex="-1" class="delete-wrapper" v-show="value.length" @click="clearFn">
      <img class="delete-img" src="../../assets/images/login/delete.png" alt="">
    </a>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  /**
   * @property {String}     value           input值
   * @property {string}     type            input类型，默认number
   * @property {string}     placeholder     占位提示语
   */
  export default {
    computed: {
      ...mapState({
        field: state => state.comparisonTable,
        isEn: state => state.languageEnUS
      })
    },
    props: {
      value: {
        type: [String, Number]
      },
      type: {
        type: String,
        default: 'tel'
      },
      placeholder: {
        type: String,
      }
    },
    data() {
      return {

      }
    },
    methods: {
      inputChange() {
        this.$emit('input',this.$refs.txtInput.value)
      },
      validate(isCh, isToast = true) {
        //  验证规则：中国手机号码限制为11位数字，首位是1。其他国家手机号码最短7位数字，最长11位数字。

        //  isCh  代表为中国手机号  isToast   代表是否出现弹窗

        if(isCh) {
          if(this.value.length === 11 && +this.value.split('')[0] === 1) {
            return true;
          } else {
            if(isToast) {
              this.$toast(this.isEn ? this.field.phoneErrorTip.en : this.field.phoneErrorTip.ch);
            }
            return false;
          }
        } else {
          if(this.value.length >= 7 && this.value.length <= 11) {
            return true;
          } else {
            if(isToast) {
              this.$toast(this.isEn ? this.field.phoneErrorTip.en : this.field.phoneErrorTip.ch);
            }
            return false;
          }
        }

      },
      clearFn() {
        this.$emit('input','')        //  不能直接改变prop的值，所以执行input方法去清空value
      }
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
    .delete-wrapper{
      padding: 0 3px;
      outline: none;
      .delete-img{
        width: 15px;
        height: 15px;
      }
    }
  }
</style>
