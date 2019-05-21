<template>
  <div class="btn-wrapper">
    <button :class="active ? 'form-btn btn-active': 'form-btn'" @click="$emit('click-btn')">{{text}}</button>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      active: {
        type: Boolean,
      }
    }
  }
</script>

<style lang="scss">
  .btn-wrapper{
    .form-btn{
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-radius: 45px;
      font-size: 15px;
      color: #CCCCCC;
      background: #EEEEEE;
      cursor: pointer;
    }
    .btn-active{
      background: #FFCD00;
      color: #333;
    }
  }
</style>
