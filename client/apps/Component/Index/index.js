import React from 'react';
import $ from 'jquery'
import classNames from 'classnames'
import LoginModal from '../Modal'
import Chat from '../Chat'
import Sender from '../Sender'

class Index extends React.Component {

  render() {
    return (
      <div id="container">
        <LoginModal/>
        <Chat/>
        <Sender/>
      </div>
    );
  }
}

export default Index;
