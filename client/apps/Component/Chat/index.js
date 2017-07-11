import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import {Col} from 'react-bootstrap'
import style from './style.css'


class Chat extends React.Component {

  render() {
    return (
      <div id="container row">
        <div id="info" className={classNames('alert', 'alert-info')}>
        </div>
      </div>
    );
  }
}

export default Chat;
