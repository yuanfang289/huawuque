<template>
  <div class="page-topbar" :style="backgroundColor">

    <div class="navigate">
      <slot name="navigate"></slot>
    </div>

    <h1 class="title">
      <slot name="title"></slot>
    </h1>

    <div class="actions">
      <slot name="actions"></slot>
    </div>

    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      bgColor: {
        type: String,
        default: ''
      }
    },
    computed: {
      backgroundColor() {
        return `background-color: ${this.bgColor}`
      }
    }
  }
</script>
