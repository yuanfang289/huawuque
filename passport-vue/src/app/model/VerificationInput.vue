<template>
  <div class="security-code-wrap">
    <label for="code">
      <ul class="security-code-container">
        <li class="field-wrap" v-for="(item, index) in number" :key="index">
          <i :class="value.length === index ? 'active' : ''">{{value[index]}}</i>
        </li>
      </ul>
    </label>
    <input ref="vcInput"
           class="input-code"
           @input="handleInput($event)"
           :value="value"
           id="code" name="code" type="number" :maxlength="number"
           autocorrect="off" autocomplete="off" autocapitalize="off">
  </div>
</template>

<script>
  export default {
    name: 'SecurityCode',
    props: {
      value: {
        type: [String, Number]
      },
      number: {
        type: Number,
        default: 4
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
      hideKeyboard() {
        // 输入完成隐藏键盘
        document.activeElement.blur();             // ios隐藏键盘
        this.$refs.vcInput.blur()                   // android隐藏键盘
      },
      showKeyboard() {
        this.$refs.vcInput.focus();
      },
      handleSubmit() {
        this.$emit('verify-over', this.$refs.vcInput.value)
      },
      handleInput(e) {
        this.$emit('input', this.$refs.vcInput.value);
        if (this.$refs.vcInput.value.length >= this.number) {
          this.hideKeyboard();
          this.handleSubmit();
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.vcInput.focus();
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  @keyframes myActive
  {
    from {background: rgba(255,215,0,0.8);}
    to {background: rgba(255,215,0,0);}
  }

  .security-code-wrap {
    overflow: hidden;
  }

  .security-code-container {
    display: flex;
    justify-content: center;
    .field-wrap {
      position: relative;
      width: 45px;
      height: 45px;
      line-height: 45px;
      font-size: 22px;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #bbb;
      text-align: center;
      &:not(:last-child){
        margin-right: 15px;
      }
      .active{
        @include position-center;
        height: 18px;
        width: 2px;
        animation: myActive 1s infinite;
      }
    }
  }

  .input-code {
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 100px;       //  宽度必须大于4位数字的宽度，否则android机下会有问题
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }

</style>
