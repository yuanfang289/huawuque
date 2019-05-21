/**
 * Created by admin on 2019/1/30.
 */
var http = require('http');//引入http模块
var url = require('url');//引入url模块
http.createServer(function (request, response) {
   
    response.writeHead(200, {'Content-Type':'text/html;charset="utf-8"'});

    if(request.url!='/favicon.ico'){
        console.log(request.url);
        var data = url.parse(request.url,true);
        console.log(data.query.ce);
    }
    response.write('你好  node.js');
    response.write('数据');
    // 发送响应数据 "Hello World"
    response.end();
}).listen(8000);

// 终端打印如下信息
console.log('Server running at http://localhost:8000/');