<template>
  <a href="javascript:;"
     @click.prevent="clickHandler"
  >
    <slot></slot>
  </a>
</template>

<script>
  import {isLogin} from 'utils';
  import {isApp, toLogin, getScheme, setScheme, appVersionHold} from 'nativeFix';

  /**
   * @property  {string}    props.path             要访问的原生页路径，不需要包含scheme前缀
   * @property  {string}    props.ios              ios客户端版本号
   * @property  {string}    props.android          android客户端版本号
   * @property  {boolean}   props.isAuth           是否需要登录访问
   */
  export default {
    props: {
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
      isAuth: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clickHandler(e) {
        let target = e.target;
        let that = this;

        // 防止重复点击
        if (target.lock) return;
        target.lock = true;

        if (isApp()) {

          // 如果传入版本号，则判断版本
          if (this.ios && this.android) {
            appVersionHold.call(target, this.ios, this.android, {
              success() {
                that.inApp(target)
              }
            })
          } else {
            this.inApp(target)
          }
        } else {

          // 如果不是APP，则打开APP
          this.$openApp(getScheme(this.path));
          target.lock = false;
        }
      },

      // 在APP内，打开指定页面
      inApp(target) {
        if (!this.isAuth) {
          setScheme(this.path);
          target.lock = false;
          return;
        }

        isLogin({
          success: () => {
            setScheme(this.path);
            target.lock = false;
          },
          fail: () => {
            toLogin(this.path);
            target.lock = false;
          },
          error: () => {
            target.lock = false;
          }
        });
      }
    }
  }
</script>
