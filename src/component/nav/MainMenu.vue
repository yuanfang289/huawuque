<template>
  <transition name="menu-fade">
    <section class="main-menu">
      <a href="javascript:;" class="hide-btn" @click="hide"><i class="uricon-back-b"></i></a>

      <dl class="user-profile">
        <dt>
          <Img :src="userInfo.headImage" :def-img="defImg" :alt="'头像'"/>
        </dt>
        <dd>
          <template v-if="isLogin">
            <p class="user-name">{{userInfo.realName}}</p>
            <p class="user-desc">{{userInfo.defCompany}}</p>
            <p class="user-desc">{{userInfo.defWorkstage}}</p>
          </template>
          <p v-else class="user-passport"><a href="javascript:;" @click.preven="toLogin">登录 / 注册</a></p>
        </dd>
      </dl>

      <Scroll ref="scroll" class="nav-list">
        <ul>
          <li class="active"><a href="/v2"><i class="uricon-ur-b"></i>首页</a></li>
          <li><a href="/market/companyIndex"><img :src="companyIcon" alt="">企业</a></li>
          <li><a href="/facilitator/index"><i class="uricon-fuwushang-b"></i>服务</a></li>
          <!--<li><a href="/v2/uGoods/index"><i class="uricon-uwu-b"></i>U物</a></li>-->
          <li><a href="/user2/userCenter"><i class="uricon-person-nav-o"></i>个人中心</a></li>
        </ul>

        <ul>
          <li><a href="/language"><i class="uricon-language"></i>切换语言</a></li>
          <li><a href="/appDownload"><i class="uricon-down-b"></i>下载APP</a></li>
          <li><a href="/feedback/create"><i class="uricon-yjfk-b"></i>意见反馈</a></li>
          <li><a href="/job"><i class="uricon-join"></i>加入我们</a></li>
        </ul>

        <ul class="signout-wrap" v-if="isLogin">
          <li><a href="javascript:;" class="btn signout-btn" @click.prevent="toLogout">退出登录</a></li>
        </ul>
      </Scroll>

    </section>
  </transition>
</template>

<script>
  import {passport} from 'src/globalData';
  import Scroll from 'lib/scroll/Scroll';

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        isLogin: false,
        userInfo: {},
        defImg: require('images/def/pic_def.png'),
        companyIcon: require('images/menuIcon/qy-icon.png'),
      }
    },
    components: {
      Scroll
    },
    methods: {
      hide() {
        this.$emit('hide-menu');
      },
      toLogin() {
        passport.toLogin();
      },
      toLogout() {
        passport.toLogout();
      }
    },
    created() {
      const {
        isLogin,
        userInfo
      } = this.$store.state;

      this.isLogin  = isLogin;
      this.userInfo = userInfo;
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  $border-color: #f0f0f0;
  .main-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 920;
    width: 76%;
    height: 100%;
    padding: 44px 35px 20px;
    background-color: #fff;

    .hide-btn {
      position: absolute;
      top: -5px;
      right: 4px;
      padding: 18px;
      font-size: 22px;
      line-height: 1;
    }

    .user-profile {
      position: relative;
      display: flex;
      align-items: center;
      height: 77px;
      padding-bottom: 22px;
      @include border-bottom($border-color);

      dt {
        flex-basis: 55px;
        flex-grow: 0;
        flex-shrink: 0;
        overflow: hidden;
        width: 55px;
        height: 55px;
        border-radius: 50%;

        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      dd {
        flex-grow: 1;
        min-width: 0;
        padding-left: 10px;

        p {
          @include text-overflow;
        }
      }

      .user-name {
        padding-bottom: 1px;
        font-size: 14px;
        line-height: 19px;
      }
      .user-desc {
        color: $font-999;
        font-size: 12px;
        line-height: 16px;
      }
    }

    .nav-list.scroll-wrapper {
      position: absolute;
      top: 44px + 77;
      right: 35px;
      bottom: 20px;
      left: 35px;
      height: auto;

      ul {
        position: relative;
        padding: 8px 0;
        &:not(:first-child) {
          @include border-top($border-color);
        }
      }

      li {
        line-height: 53px;
        font-size: 16px;
        &, a {
          display: block;
          color: $font-999;
        }
        &.active {
          &, a {
            color: $font-def;
          }
        }
        i {
          position: relative;
          margin-right: 13px;
          font-size: 22px;
          vertical-align: middle;

          .ios-device & {
            top: 0;
          }
        }
        img {
          margin-right: 13px;
          width: 22px;
        }
      }
    }

    .signout-wrap {
      height: 34px;
      padding: 0 !important;
      &::before {
        display: none;
      }
      li {
        position: relative;
        height: 100%;
      }
    }
    .signout-btn {
      position: absolute;
      top: 0;
      width: 200%;
      height: 68px;
      border-color: $border-color;
      line-height: 66px;
      background: rgba(255,255,255,0);
      font-size: 28px;
      color: $font-999;
      transform: scale(.5);
      transform-origin: left top;

      &:active,
      &:hover {
        background: rgba(255,255,255,0);
        color: $font-999;
      }
    }
  }

  .menu-fade-enter-active, .menu-fade-leave-active {
    transition: .3s ease-in-out;
    transform: translateX(0);
  }
  .menu-fade-enter, .menu-fade-leave-to {
    transition: .3s ease-in-out;
    transform: translateX(-100%);
  }
</style>
