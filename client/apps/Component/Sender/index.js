import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Col, FormControl, Button} from 'react-bootstrap'
import ws from '../WebSocket'


class Sender extends React.Component {
  constructor() {
    super();
    this.state = {
      send: 'disable',
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    if (this.refs.msg.props.value) {
      this.setState({ send: '' });
    }else{
      this.setState({ send: 'disable'});
    }
  }

  send(){
    if (this.refs.msg.props.value == '') {
      this.setState({ send: 'disable' });
    } else {
      let nickname = sessionStorage.getItem('nickname')
      let send = `${nickname}: ${this.refs.msg.props.value}`
      ws.send(send)
    }
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
          <Button bsStyle="primary" onClick={this.send.bind(this)}>发送</Button>
          <Button bsStyle="danger" onClick={this.clear.bind(this)}>清屏</Button>
        </div>
      </div>
    );
  }
}

export default Sender;
