var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost:27017/test')
// 得到数据库连接句柄
var db=mongoose.connection;
//通过 数据库连接句柄，监听mongoose数据库成功的事件
db.on('open',function(err){
    if(err){
        console.log('数据库连接失败');
        throw err;
    }
    console.log('数据库连接成功')
})

const userModel = new mongoose.Schema({
    name:String,
    pass:Number
})
const aa = mongoose.model('userList',userModel,'userList');

router.post('/api/register',function(req,res,next){
    console.log(req.body);
    var userList = [req.body];
    aa.insertMany(userList,(err,result) => {
        if(err){
            console.log('数据添加失败');
            throw err;
        }
        console.log('数据添加成功:',result);
    });
    res.send({msg:'success'});
    res.end();
 })

 router.post('/api/login',function(req,res,next){
    console.log(req.body);
    var userList = [req.body];
    aa.find(userList,(err,result) => {
        if(err){
            console.log('没有查到');
            throw err;
        }
        console.log('匹配成功:',result);
    });
    res.send({msg:'success'});
    res.end();
 })

module.exports = router;
