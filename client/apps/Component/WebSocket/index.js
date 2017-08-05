import $ from 'jquery'
import config from '../../config'

const ws = new WebSocket(`ws://${config.host}:${config.port}/${config.route}`);

let msgnum = 0

ws.onerror = function(err) {
  console.log('_error');
  console.log(err);
};

ws.onclose = function() {
  console.log('_close');
  $('#info').append(`<div name="msg" class="text-center text-danger">与服务器断开链接</div>`)
};

module.exports = ws;
