<template>
  <div class="phone-wrapper">
    <div class="add-item">
      <a href="javascript:;" @click="showNationalDialog">
        +<span>{{NationalCode}}</span><img class="arrow-down-img" src="../../assets/images/login/arrow-down.png" alt="">
      </a>
    </div>
    <div class="input-item">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    props: {

    },
    data() {
      return {
        NationalCode: 86,
        NationalId: '',
      }
    },
    methods: {
      showNationalDialog() {
        this.$showNationalCode({
          currentId: this.NationalId,
          onChoose: (code, id) => {
            this.NationalCode = code;
            this.NationalId = id;
            this.$emit('nationalCode-choose', this.NationalCode);
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .phone-wrapper{
    display: flex;
    align-items: center;
  }
  .add-item{
    padding-right: 20px;
    font-size: 16px;
    .arrow-down-img{
      width: 7px;
      height: 4px;
      margin-left: 5px;
    }
  }
  .input-item{
    flex: 1;
  }
</style>
