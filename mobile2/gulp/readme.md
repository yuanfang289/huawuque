## Gulp 任务文件
> 基本不需要修改

### gulp 目录结构
```
- tasks
	- clean.js
	- default.js
	- main.js
	- watch.js 
- config.js
```

### tasks
> gulp 任务文件夹

```
clean.js        // 清空 assets 目录
default.js      // gulp 默认任务, 其中包含所有业务相关任务
main.js         // 主要 gulp 任务，包括 scss、public、imagemin 等
watch.js        // 监听业务相关 js 任务
```

### config.js
> gulp 配置文件
