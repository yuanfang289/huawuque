## 前端架构H5 2.0 

> 基于 nodejs 和 gulpjs 对资源进行编译打包生成静态资源

```
// 初始化环境, node 模块安装
npm install

// 启动服务
// 访问地址 127.0.0.1:4000/assets/views/index/index.html
node server.js

// 运行 gulp
gulp                 // 编译开发环境所需资源(css、js 未压缩)
npm run dev          // => gulp watch
npm run build        // linux || mac 编译生产环境所需资源
npm run win-build    // windows 编译生成环境所需资源

```

### 目录结构
```
- assets
	- public
	- views
- gulp
- source
	- public
	- views
		- _template
		- index
			- data
			- images
			- styles
			- scripts
			- index.html
		- ...
```

### assets
> gulp 生成的静态文件

```
public      // 所有公共资源, 包括 font、css、image、js 等
views       // 所有的 html 文件
```

### gulp
> gulp 任务文件, 基本上不需要修改

### source
> 所有源文件

```
public      // 所有公共资源, 包括 font、scss、image、js 等
views       // 所有业务相关的 html、scss、js、image 等
_template   // 公用html模板
data        // json 等
images      // 图片
scripts     // js
styles      // scss
```
