import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Col, FormControl, Button} from 'react-bootstrap'
import ws from '../WebSocket'


class Sender extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  componentDidMount(){
    this.refs.send.addEventListener("keypress", 13, function(){
        this.send
    });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  send(){
    let nickname = sessionStorage.getItem('nickname')
    let send = {"name":nickname, "msg": this.refs.msg.props.value}
    console.log(send);
    ws.send(JSON.stringify(send))
    this.setState({ value: '' });
  }

  clear(){
    $("div[name='msg']").remove()
    $("p[name='msg']").remove()
  }

  render() {
    return (
      <div id="container row">
        <div id="info" className="center-block">
          <FormControl
            ref="msg"
            type="text"
            value={this.state.value}
            componentClass="textarea"
            onChange={this.handleChange.bind(this)}
          />
          <Button ref="send" bsStyle="primary" onClick={this.send.bind(this)}>发送</Button>
          <Button ref="clear" bsStyle="danger" onClick={this.clear.bind(this)}>清屏</Button>
        </div>
      </div>
    );
  }
}

export default Sender;
