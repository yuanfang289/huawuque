<template>
  <a href="javascript:;"
     @click.prevent="toPage">
    <slot></slot>
  </a>
</template>

<script>
  import {isLogin} from "utils";
  import {isApp, appVersionHold, setScheme, toLogin} from 'nativeFix';

  /**
   * 跳转原生页面以及H5页面
   *
   * @property {string}             nativePath                        要访问的原生页路径，不需要包含scheme前缀
   * @property {string,Object}      path                              要访问的h5页路径
   * @property {string}             ios                               ios客户端版本号
   * @property {string}             android                           android客户端版本号
   * @property {Boolean}            isAuth                            是否需要登录访问
   * @property {Boolean}            isOldPage                         是否为老页面P（老页面使用href跳转）
   */
  export default {
    props: {
      nativePath: {
        type: String,
        required: true
      },
      path: {
        type: [String, Object],
        required: true
      },
      ios: {
        type: String
      },
      android: {
        type: String
      },
      isAuth: {
        type: Boolean,
        default: false
      },
      isOldPage: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {}
    },
    methods: {
      toPage(e) {
        e.stopPropagation();//阻止事件冒泡  防止topage里面套topage

        let target = e.target;
        let that = this;

        if (target.lock) return;
        target.lock = true;

        if (isApp()) {
          if (this.ios && this.android) {
            appVersionHold.call(target, this.ios, this.android, {
              success() {
                that.inApp(target);
              }
            })
          } else {
            this.inApp(target);
          }
        } else {
          if(this.isOldPage) {
            location.href = this.path;
          } else {
            this.$router.push(this.path);
          }
          target.lock = false;
        }
      },
      inApp(target) {
        if (!this.isAuth) {
          setScheme(this.nativePath);
          target.lock = false;
          return;
        }

        isLogin({
          success: () => {
            setScheme(this.nativePath);
            target.lock = false;
          },
          fail: () => {
            toLogin(this.nativePath);
            target.lock = false;
          },
          error: () => {
            target.lock = false;
          }
        })
      }
    }
  }
</script>
