const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const path = require('path');
const util = require('util');
const {execSync} = require('child_process');
app.use(express.static(path.join(__dirname, 'static')));
const schedule = require("node-schedule");

const style = ['danger', 'warning', 'success']
let a = 0
let isLogin=new RegExp("加入了聊天室");

const rule = new schedule.RecurrenceRule();
const times = [1,6,11,16,21,26,31,36,41,46,51,56];
rule.second  = times;

// the web socket routes
app.ws('/chat', function(ws, req) {
  util.inspect(ws);

  schedule.scheduleJob(rule, function(){
    let aWss = expressWs.getWss('/chat');
    let num = 0
    aWss.clients.forEach(function(client) {
      num++
    });
    aWss.clients.forEach(function(client) {
      send = {"style":"online", "num": num}
      client.send(JSON.stringify(send));
    });
  });

  ws.on('message', function(msg) {
    let time = getNowFormatDate()
    console.log(`${time}====>${msg}`);
    if (msg == 'link test') {
      ws.send(`{"time":"${time}", "style":"div", "msg":"连接服务器成功"}`)
    } else if (isLogin.test(msg)) {
      let aWss = expressWs.getWss('/chat');
      aWss.clients.forEach(function(client) {
        send = {"time":time, "style":"div", "msg": msg, "name": msg.name}
        client.send(JSON.stringify(send));
      });
    } else {
      let aWss = expressWs.getWss('/chat');
      msg = JSON.parse(msg)
      aWss.clients.forEach(function(client) {
        send = {"time": time, "style": style[a], "msg": msg.msg, "name": msg.name, "type": msg.type}
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
