/**
 * Created by chris on 10/9/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {platform} from 'onsenui';
import * as Actions from '../actions';
import NavBar from '../components/NavBar';

// ProgressCircular
import {
  Page,
  Row,
  Col,
  Input, List, ListItem, ListHeader
} from 'react-onsenui';

const styles = {
  main: {
    fontFamily: platform.isIOS() ? 'Lato' : null,
    textAlign: 'center',
    color: '#4a4a4a',
    width: '100%',
    marginTop: '30px'
  },
  invalid: {
    color: 'red',
    fontSize: '20px'
  },
  progress: {
    width: '50px',
    height: '50px'
  },
  name: {
    textTransform: 'uppercase',
    fontSize: '24px',
    lineHeight: '24px'
  },
  country: {
    margin: '2px 0 0 0',
    textTransform: 'uppercase',
    fontSize: '12px',
    lineHeight: '12px'
  },
  icon: {
    fontSize: '100px',
    margin: '20px 0 0px 0'
  },
  data: {
    fontSize: '40px',
    fontWeight: 300,
    display: 'flex',
    margin: '40px 25px'
  },
  dataColumn: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  dataValue: {
    fontSize: '60px'
  },
  dataCaption: {
    fontSize: '14px',
    fontWeight: 400
  },
  sent: {
    color: 'blue',
    float: 'right'
  },
  recv: {
    color: 'green',
    float: 'left'
  },
  time: {
    fontSize: '8px',
    fontWeight: 400
  }
};

const ChatPage = ({
  navigator,
  to = 'Jane',
  messages = [],
  composing,
  manager,
  client,
  channel,
  actions
}) => {
  const handleMessageChange = (e) => {
    if (e.target.value.endsWith('  ')) {
      actions.sendMessage(e.target.value);
    } else {
      actions.composingMessage(e.target.value);
    }
  };
  const renderMessage = (row, index) => {
    return (<ListItem key={index}>
      <div style={row.direction === 'sent' ? styles.sent : styles.recv}>
        {row.message}
        <div style={styles.time}>{row.time}</div>
      </div>
    </ListItem>);
  };
  
  return (
    <Page renderToolbar={() => <NavBar backButton={true} title={`Chatting with ${to}`} navigator={navigator} />}>
      <div style={styles.main}>
        <Row>
          <Col>Chat {to}</Col>
        </Row>
        <Row>
          <Col>
            <List dataSource={messages}
                  renderRow={renderMessage}
                  renderHeader={() => <ListHeader><h3>Message History</h3></ListHeader>}>
            </List>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={composing}
              onChange={handleMessageChange}
              modifier='underbar'
              float
              placeholder='Message' />
          </Col>
        </Row>
      </div>
    </Page>
  );
};

const mapStateToProps = (state) => ({messages: state.chat.messages, composing: state.chat.composing, channel: state.chat.generalChannel});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);

