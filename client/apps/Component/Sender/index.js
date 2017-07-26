import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Col, FormControl, Button, ButtonGroup} from 'react-bootstrap'
import ws from '../WebSocket'
import style from './style.css'


class Sender extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  send(){
    let nickname = sessionStorage.getItem('nickname')
    let send = {"name":nickname, "msg": this.refs.msg.props.value}
    ws.send(JSON.stringify(send))
    this.setState({ value: '' });
  }

  clear(){
    $("div[name='msg']").remove()
    $("p[name='msg']").remove()
  }

  render() {
    return (
      <div className="row">
        <div id="info" className="center-block">
          <FormControl
            className={style.text}
            ref="msg"
            type="text"
            value={this.state.value}
            componentClass="textarea"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <ButtonGroup justified>
          <ButtonGroup>
            <Button ref="send" bsStyle="primary" onClick={this.send.bind(this)}>发送</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button ref="clear" bsStyle="danger" onClick={this.clear.bind(this)}>清屏</Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    );
  }
}

export default Sender;
