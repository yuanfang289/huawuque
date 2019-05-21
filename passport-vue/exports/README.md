向外部提供 退出登录、跳转登录页、获取URL等方法

- ES6用法(支持webpack devServer代理)
```js
import passportInit from 'vendor/passport/passport_es6';
passportInit({local: "localhost:8085", test: "211.144.5.130:8075", prod: "passport.urwork.cn"});
```

- ES5用法(不支持webpack devServer代理)
```html
<script src="/exports/passport_es5.js"></script>
<script>
  XY.passportInit({local: "localhost:8085", test: "211.144.5.130:8075", prod: "passport.urwork.cn"})
</script>
```
