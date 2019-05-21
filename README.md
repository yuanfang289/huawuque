
### npm script 说明
```
yarn mock  // 使用mock接口数据
yarn dev   // 使用本地接口数据
yarn debug // 使用测试环境接口数据
yarn test  // 部署测试环境
yarn build // 部署生产环境

```


### 警告
- router-link 使用`to={name='xxx'}`格式，不要直接指定路径名称
- 如果需要打开新的webview，需要给router-link添加参数`params: {openWebView: true}`，会在新的webview显示页面
- 必须使用utils --> storage中的方法操作localStorage
- 调用原生API，需要加注释(文本必须保持一致): // TODO 原生APP补丁
- api 最多建两级目录，分为: 业务线目录、业务目录


### 页面模板
查看demo文件夹


### 移植项目修改清单
- DANativeApi UA、链接
- config/config 中的域名
- config/feature 中的配置


### 目录清单
 目录名           | 说明 
 --------------- |-------------------------------------
 config          | 配置文件
 demo            | 页面模板
 src             | 
   - api         | 接口定义
   - app         | 页面逻辑
   - assets      | 与网站布局相关的静态资源
   - component   | 抽象的布局和业务相关组件
   - convert     | 通过code输出指定文本
   - directive   | 自定义Vue指令
   - filters     | 自定义Vue过滤器
   - lib         | 公共组件库，不依赖业务
   - nativeFix   | 原生APP补丁
   - router      | 路由
   - static      | 与业务相关的静态图片和视频
   - store       | 状态存储
   - utils       | 工具类
 vendor          | 第三方工具
 webpack_config  | webpack配置文件
