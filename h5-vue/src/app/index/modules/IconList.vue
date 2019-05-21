<template>
  <ul class="icon-list">
    <li v-for="(item, index) in iconList" :key="index">
      <a :href="item.linkUrl" v-if="!item.isRouterLink" @click="clickFn(item.name, item.linkUrl, $event)">
        <img :src="item.picUrl" alt="" :style="{width: imgWidth + 'px'}">
        <p>{{item.text}}</p>
        <img class="smimg" v-if="item.smpicUrl" :src="item.smpicUrl">
      </a>
      <router-link :to="{name: item.routeName}" v-else>
        <img :src="item.picUrl" alt="" :style="{width: imgWidth + 'px'}">
        <p>{{item.text}}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
  /**
   * @property {Array}   iconList         数据列表
   */
  export default {
    props: {
      iconList: {
        type: Array
      },
      imgWidth: {
        type: Number,
        default: 28
      }
    },
    data: () => {
      return {

      }
    },
    methods: {
      clickFn(name, linkUrl, e) {
        if(name) {
          e.preventDefault();
          this.$emit('icon-click', name, linkUrl)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      text-align: center;
      position: relative;
      .smimg{
        position: absolute;
        top: -8px;
        right: -5px;
        height: 14px;
        width: 26px;
      }
    }
    img {
      width: 28px;
    }

    p{
      font-size: 14px;
      color: #666666;
      margin-top: 9px;
      line-height: 14px;
    }
  }
</style>
