import $ from 'jquery'
import config from '../../config'

const ws = new WebSocket(`ws://${config.host}:${config.port}/${config.route}`);

// console.log(`ws://${config.host}:${config.port}/${config.route}`);

ws.onerror = function(err) {
  console.log('_error');
  console.log(err);
};

ws.onopen = function() {
  console.log('_connect')
  ws.send('link test');
};

ws.onmessage = function(e) {
  let data = JSON.parse(e.data)
  if (data.style == 'div') {
    $('#info').append(`<p name="msg">${data.time}</p>`)
    $('#info').append(`<p name="msg">${data.msg}</p>`)
  } else {
    $('#info').append(`<p name="msg">${data.name}    ---    ${data.time}</p>`)
    $('#info').append(`<div class="text-${data.style}" name="msg">${data.msg}</div>`)
  }
};

ws.onclose = function() {
  console.log('_close');
};

function send() {
  ws.send($('#sender').val())
  $('#sender').val('')
}

module.exports = ws;
