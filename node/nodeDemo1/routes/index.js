var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ndoe', body:'我是body'});
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {title: 'ndoe', body:'我是注册页面'});
});

/* GET error page. */
router.get('/error', function(req, res, next) {
    res.render('error', { message: '出错了aaaaa', error:{status:'404',stack:'服务器错误'}});
});

module.exports = router;
