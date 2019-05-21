<template>
  <div class="form-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {

    }
  }
</script>

<style lang="scss">
  .form-item{
    padding: 30px 0 13px;
    border-bottom: 1px solid #DDDDDD;
  }
</style>
