var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var serverRouter = require('./server/server');
//  ↑通过require()加载了http-errors、express、path 等模块 以及 routes 文件夹下的index. js和 users.js 路由文件。↑

var app = express();//生成一个express实例。app.

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置views文件夹为存放视图文件的目录，即存放模板文件的目录。_dirname为全局变量，存储当前正在执行的脚本所在的目录。
app.set('view engine', 'ejs');//设置视图模板引擎为ejs。

app.use(logger('dev'));//加载日志中间件。
app.use(express.json());//加载解析json的中间件。
app.use(express.urlencoded({ extended: false }));//加载解析urlencoded请求体的中间件。
app.use(cookieParser());//加载解析cookie的中间件。
app.use(express.static(path.join(__dirname, 'public')));//设置public文件夹为存放静态文件的目录。

//路由控制器。
app.use('/', indexRouter);

//服务
app.use('/', serverRouter);

// catch 404 and forward to error handler(捕获404错误，并转发到错误处理器。)
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler(错误处理器)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page（渲染error模版并显示到浏览器中。）
  res.status(err.status || 500);
  res.render('error');
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

module.exports = app;//导出app实例供其他模块调用。
