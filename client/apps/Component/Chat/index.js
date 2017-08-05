import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Col} from 'react-bootstrap'
import style from './style.css'
import ws from '../WebSocket'
import Header from '../Header'

let msgnum = 0

class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      height: null,
      online: 0
    };
  }

  componentDidMount() {
    let height = window.innerHeight - 48 - 54 - 34 - 15
    this.setState({height: height})
    window.addEventListener('resize', () => {
      let height = window.innerHeight - 48 - 54 - 34 - 15
      this.setState({height: height})
    })

    let _this = this

    ws.onmessage = function(e) {
      msgnum++
      let data = JSON.parse(e.data)
      let msg = data.msg
      // console.log(data);
      switch (data.style) {
        case 'div':
          $('#info').append(`<div name="msg" class="text-center">${data.time}</div>`)
          $('#info').append(`<div name="msg" id="msg${msgnum}" class="text-center">${data.msg}</div>`)
          break;
        case 'online':
          _this.setState({online: data.num})
          return true;
          break;
        default:
          switch (data.name) {
            case sessionStorage.getItem('nickname'):
              $('#info').append(`<div name="msg" id="msg${msgnum}" class="${style.bubbleItem} ${style.clearfix}"><span name="msg" class="${style.bubble} ${style.rightBubble}">${msg.split('\n').join('<br>')}<span name="msg" class="${style.bottomLevel}"></span><span name="msg" class="${style.topLevel}"></span></span></div>`)
              break;
            default:
              $('#info').append(`<div name="msg" class="${style.roundLeft}">${data.name}</div><div name="msg" id="msg${msgnum}" class="${style.bubbleItem}"><span name="msg" class="${style.bubble} ${style.leftBubble}">${msg.split('\n').join('<br>')}<span name="msg" class="${style.bottomLevel}"></span><span name="msg" class="${style.topLevel}"></span></span></div>`)
          }
          // $('#info').append(`<div name="msg" class="text-left">${data.name} -- ${data.time}</div>`)

      }
      document.getElementById(`msg${msgnum}`).scrollIntoView();
    }
}

componentWillUnmount() {
  window.removeEventListener('resize', this.onWindowResize)
}

render() {
  return (
    <div className="row">
      <Header online={this.state.online}/>
      <div id="info" className={classNames(style.bubbleDiv)} style={{height: this.state.height}}></div>
    </div>
  );
}
}

export default Chat;
