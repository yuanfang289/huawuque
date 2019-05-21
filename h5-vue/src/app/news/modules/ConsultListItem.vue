<template>
  <div>
    <a :href="'/news/getnewsdetial?id=' + list.id" class="consult-list-item consult--list-object" v-if="!isArray">
      <div class="consult-text">
        <h2>{{list.title}}</h2>
        <p><em v-if="list.userName">{{list.userName}}</em><span><format-date style="display: inline-block" :date="list.createTime" format="MM/dd hh:mm"></format-date></span></p>
      </div>
      <div class="consult-img-wrapper">
        <Img :src="list.image" v-if="list.image"/>
        <Img src="../../../static/images/news/consult-def.png" v-else/>
      </div>
    </a>
    <a :href="'/news/getnewsdetial?id=' + item.id" class="consult-list-item" v-else v-for="item in list" :key="item.id">
      <div class="consult-text">
        <h2>{{item.title}}</h2>
        <p><em v-if="item.userName">{{item.userName}}</em><span><format-date style="display: inline-block" :date="item.createTime" format="MM/dd hh:mm"></format-date></span></p>
      </div>
      <div class="consult-img-wrapper">
        <Img :src="item.image" v-if="item.image"/>
        <img src="../../../static/images/news/consult-def.png" v-else/>
      </div>
    </a>
  </div>
</template>

<script>
  import formatDate from 'component/comments/formatDate';

  /**
   * @property {Object, Array}   list                咨询列表
   */
  export default {
    props: {
      list: {
        type: [Object, Array],
        required: true
      }
    },
    components: {
      formatDate
    },
    computed: {
      isArray() {
        return Object.prototype.toString.call(this.list) === '[object Array]';
      }
    },
    data: () => {
      return {

      }
    },
    methods: {

    },
    mounted() {
      // console.log(this.list)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .consult-list-item {
    display: block;
    position: relative;
    padding: 20px 0;
    @include border-bottom(#E5E5E5);
    &:last-child {
      @include border-bottom(transparent);
    }
    @include clearfix;
    .list-item & {
      @include border-bottom(#E5E5E5);
    }
    .consult-text {
      float: left;
      margin-right: 15px;
      width: calc(100% - 120px - 15px);
      h2 {
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
      p {
        font-size: 12px;
        color: #7A808F;
        em {
          margin-right: 10px;
        }
      }
    }
    .consult-img-wrapper {
      float: left;
      width: 120px;
      height: 85px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
  .consult-list-item.consult--list-object {
    @include border-bottom(#E5E5E5);
  }
</style>
