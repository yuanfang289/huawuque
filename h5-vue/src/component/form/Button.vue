<template>
  <button></button>
</template>

<script>
  export default {
    props: {
      type: {
        validator(value) {
          return ['button', 'link'].indexOf(value) !== -1
        },
        default: 'button'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
