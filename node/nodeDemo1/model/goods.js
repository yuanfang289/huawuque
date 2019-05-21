// 引入模块
var mongoose=require('mongoose');
//引入data.js
var seafoodList=require('./data.js').seafoodList
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
//定义表数据结构
var seafoodModel=new mongoose.Schema({
    id:Number,
    name:String,
    desc:String,
    discount:Number,
    price:Number,
    coin:Number,
    remain:String,
    img_sm:String,
    img_lg:String
},{
    versionKey:false //去除： - -v
})
// 将表的数据结构和表关联起来
var seafoodModel=mongoose.model("seafoodList",seafoodModel,"goods");
// 添加数据
seafoodModel.insertMany(seafoodList,function(err,result){
    if(err){
        console.log("数据添加失败");
        throw err;
    }
    console.log("数据添加成功:",result);
})
//导出数据
module.exports={
    seafoodModel:seafoodModel
}