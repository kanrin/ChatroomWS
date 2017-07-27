import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Col, FormControl, Button, ButtonGroup, Tooltip, OverlayTrigger} from 'react-bootstrap'
import ws from '../WebSocket'
import style from './style.css'


class Sender extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      tooltip: true
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  send(){
    if (this.refs.msg.props.value) {
      let nickname = sessionStorage.getItem('nickname')
      let send = {"name":nickname, "msg": this.refs.msg.props.value}
      ws.send(JSON.stringify(send))
      this.setState({ value: '' });
    } else {
      this.setState({ tooltip: false });
    }
  }

  clear(){
    $("div[name='msg']").remove()
    $("p[name='msg']").remove()
  }

  clearTooltips(){
    this.setState({ tooltip: true });
  }

  render() {
    return (
      <div className="row">
        <div id="info" className="center-block">
          <Tooltip id="tooltip" placement="top" className={classNames("in", {"hide": this.state.tooltip})}>必须输入内容</Tooltip>
          <FormControl
            className={style.text}
            ref="msg"
            type="text"
            value={this.state.value}
            componentClass="textarea"
            onChange={this.handleChange.bind(this)}
            onFocus={this.clearTooltips.bind(this)}
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
