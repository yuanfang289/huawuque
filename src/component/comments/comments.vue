<template>
  <ul class="message-list">
    <li v-for="item in comments" :key="item.id">
      <to-native-page :ios="ios" :android="android" :path="path">
        <dl class="sender-info">
          <dt>
            <Img v-if="item.infoVO.headImageUrl" :src="item.infoVO.headImageUrl"/>
            <Img v-else :src="defaultImg"/>
          </dt>
          <dd>
            <h2>{{item.infoVO.realname}}</h2>
            <p v-if="item.infoVO.workstageNames">{{item.infoVO.workstageNames[0]}}</p>
          </dd>
        </dl>
        <div class="message-content">
          <replay :content="item.content"></replay>
        </div>
        <div class="message-handle">
          <format-date class="time" :date="item.createAt"></format-date>
          <div class="actions">
            <span><i class="uricon-pinglun"></i>{{item.replyCnt}}</span>
            <span class="dianzan"><i class="uricon-dianzan"></i>{{item.likeCnt}}</span>
          </div>
        </div>
      </to-native-page>
    </li>
  </ul>
</template>

<script>
  import toNativePage from 'nativeFix/component/toNativePage';
  import formatDate from 'component/comments/formatDate';
  import replay from 'component/comments/replay';

  /**
   * @property  {string}    path             要访问的原生页路径，不需要包含scheme前缀
   * @property  {string}    ios              ios客户端版本号
   * @property  {string}    android          android客户端版本号
   * @property  {Array}     comments         评论列表
   */
  export default {
    props: {
      comments: {
        type: Array,
        required: true
      },
      path: {
        type: String,
        required: true
      },
      ios: {
        type: String
      },
      android: {
        type: String
      },
    },
    components: {
      toNativePage,
      formatDate,
      replay
    },
    data: () => {
      return {
        defaultImg: require('../../assets/images/def/pic_def.png')
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
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .message-list {
    & > li {
      padding: 15px 0 10px;
      position: relative;
      &:not(:last-child){
        @include border-bottom(#e6e6e6);
      }
    }
    .sender-info {
      overflow: hidden;
      display: flex;
      margin-bottom: 7px;
      dt {
        width: 44px;
        height: 44px;
        overflow: hidden;
        flex-basis: 44px;
        flex-grow: 0;
        flex-shrink: 0;
        align-self: center;
        border: 1px solid $border-def;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        flex-grow: 1;
        align-self: center;
        position: relative;
        padding-left: 10px;
        h2 {
          width: 60%;
          margin-bottom: 1px;
          font-size: 14px;
          font-weight: bold;
          @include text-overflow;
        }
        p {
          font-size: 11px;
          color: #999;
        }
      }
    }
    .message-content {
      @include text-break;
      a {
        font-size: 14px;
      }
      em {
        color: #098;
      }
    }
    .message-handle {
      @include clearfix;
      margin-top: 13px;
      line-height: 24px;

      .time {
        float: left;
        color: #999;
        font-size: 12px;
        transform: scale(.91666);
        transform-origin: 0 50%;
      }
      .actions {
        float: right;
        font-size: 11px;
        span{
          display: inline-block;
          color: #999;
          &:first-child{
            margin-right: 15px;
          }
        }
        i {
          margin-right: 5px;
          font-size: 15px;
        }
        .dianzan {
          i {
            top: -3px;
          }
        }
      }
    }
    .comments {
      position: relative;
      padding-top: 8px;
      padding-left: 10px;
      color: #666;
      font-size: 12px;
      line-height: 16px;
      &::before {
        position: absolute;
        top: 9px;
        left: 0;
        bottom: 2px;
        content: "";
        border-left: 3px solid #ffd53d;
      }
      li {
        @include text-break;
        margin-bottom: 3px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
    .reply-list {
      background: #fafafa;
      padding: 8px;
      margin-top: 7px;
      margin-bottom: 8px;
      color: #666;
      font-size: 12px;
      line-height: 17px;
    }
  }

</style>
