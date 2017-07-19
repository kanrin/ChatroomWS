const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const path = require('path');
const util = require('util');
const {execSync} = require('child_process');
app.use(express.static(path.join(__dirname, 'static')));
// const schedule = require("node-schedule");

const style = ['danger', 'warning', 'success']
let a = 0
let isLogin=new RegExp("加入了聊天室");

// const rule = new schedule.RecurrenceRule();
// let times = [];
// for(var i=1; i<60; i+=5){
//   times.push(i);
// }
// rule.second = times;
// var c=0;

// the web socket routes
app.ws('/ws', function(ws, req) {
  util.inspect(ws);
  // let j = schedule.scheduleJob(rule, function(){
  //   let aWss = expressWs.getWss('/ws');
  //   let num = aWss.clients.length
  //   aWss.clients.forEach(function(client) {
  //     send = {"time":time, "style":"div", "msg": `${num}`}
  //     client.send(JSON.stringify(send));
  //   });
  // });

  ws.on('message', function(msg) {
    let time = getNowFormatDate()
    console.log(`${time}====>${msg}`);
    if (msg == 'link test') {
      ws.send(`{"time":"${time}", "style":"div", "msg":"连接服务器成功"}`)
    } else if (isLogin.test(msg)) {
      let aWss = expressWs.getWss('/ws');
      aWss.clients.forEach(function(client) {
        send = {"time":time, "style":"div", "msg": msg, "name": msg.name}
        client.send(JSON.stringify(send));
      });
    } else {
      let aWss = expressWs.getWss('/ws');
      msg = JSON.parse(msg)
      aWss.clients.forEach(function(client) {
        send = {"time": time, "style": style[a], "msg": msg.msg, "name": msg.name}
        client.send(JSON.stringify(send));
      });
      if (a > 1) {
        a = 0
      }else {
        a++
      }
    }
  });
})

// format time
const getNowFormatDate = () => {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

app.listen(3000);
