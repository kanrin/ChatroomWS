import $ from 'jquery'
import config from '../../config'

const ws = new WebSocket(`ws://${config.host}:${config.port}/${config.route}`);

let msgnum = 0

ws.onerror = function(err) {
  console.log('_error');
  console.log(err);
};

ws.onopen = function() {
  console.log('_connect')
  ws.send('link test');
};

ws.onmessage = function(e) {
  msgnum++
  let data = JSON.parse(e.data)
  if (data.style == 'div') {
    $('#info').append(`<div name="msg" class="text-center">${data.time}</div>`)
    $('#info').append(`<div name="msg" id="msg${msgnum}" class="text-center">${data.msg}</div>`)
  } else if (data.style == 'online') {
    $('#online').text(data.num)
  } else {
    let msg = data.msg.split('\n')
    if (data.name === sessionStorage.getItem('nickname')) {
      $('#info').append(`<div name="msg" class="text-right">${data.name}    ---    ${data.time}</div>`)
      msg.map((m) => {
        msgnum++
        $('#info').append(`<div class="text-success text-right" id="msg${msgnum}" name="msg">${m}</div>`)
      })
    } else {
      $('#info').append(`<div name="msg">${data.name}    ---    ${data.time}</div>`)
      msg.map((m) => {
        msgnum++
        $('#info').append(`<div id="msg${msgnum}" name="msg">${m}</div>`)
      })
    }
    document.getElementById(`msg${msgnum}`).scrollIntoView();
  }
};

ws.onclose = function() {
  console.log('_close');
  $('#info').append(`<div name="msg" class="text-center text-danger">与服务器断开链接</div>`)
};

function send() {
  ws.send($('#sender').val())
  $('#sender').val('')
}

module.exports = ws;
