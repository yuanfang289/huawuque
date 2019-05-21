<template>
  <router-link :active-class="activeClass" :to="href">{{text}}</router-link>
</template>

<script>
  export default {
    name: "nav-link",
    props: {
      text: {
        type: String
      },
      href: {
        type: String
      },
      activeClass: {
        type: String,
        default: 'router-link-active'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
