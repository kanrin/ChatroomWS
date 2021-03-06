import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import style from './style.css'
import LoginModal from '../Modal'
import Chat from '../Chat'
import Sender from '../Sender'

class Index extends React.Component {

  render() {
    return (
      <div className={style.body}>
        <Chat/>
        <Sender/>
        <LoginModal/>
      </div>
    );
  }
}

export default Index;
