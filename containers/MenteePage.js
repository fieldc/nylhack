/**
 * Created by chris on 10/9/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {notification, platform} from 'onsenui';
import * as Actions from '../actions';
import NavBar from '../components/NavBar';
import CallPage from './CallPage';
import ChatPage from './ChatPage';
import Chart from '../components/PieChart';

// ProgressCircular
import {
  Page,
  Row,
  Col, Tabbar, Tab, List, ListItem, ListHeader,
  BottomToolbar, ToolbarButton, Icon, ProgressBar
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
    paddingLeft: '10px',
    fontSize: '20px'
  },
  progress: {
    width: '50px',
    height: '50px'
  },
  statrow: {
    margin: '2px 0 0 0',
    fontSize: '12px',
    lineHeight: '12px'
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
  buttonbar: {
    lineHeight: '24px',
    height: '60px',
    padding: '5px 20px 5px 20px'
  },
  button: {
    fontSize: '16px',
    padding: '5px 20px 5px 20px'

  },
  icon: {
    fontSize: '100px',
    margin: '20px 0 0px 0'
  },
  data: {
    fontSize: '40px',
    fontWeight: 300,
    display: 'flex',
    margin: '5px 0 5px'
  },
  dataColumn: {
    margin: '0px 10px 0 10px'
  },
  dataValue: {
    fontSize: '60px'
  },
  dataCaption: {
    fontSize: '14px',
    fontWeight: 400,
    textAlign: 'left',
    horizAlign: 'left',
    float: 'left'
  },
  dataValueCaption: {
    fontSize: '14px',
    fontWeight: 400,
    textAlign: 'right',
    horizAlign: 'right',
    float: 'right'
  }
};

const MenteePage = ({
  navigator,
  name,
  index,
  activity,
  actions
}) => {
  const renderRow = (row, index) => {
    return (<ListItem key={index} navigator={navigator} onClick={() => { chatMentor(navigator); }} >
      <div className='left'>
        Great Job on your call activity
      </div>
      <div style={styles.dataValueCaption} className='right'>
        Yesterday
      </div>
    </ListItem>);
  };

  const renderHistory = (row, index) => {
    return (<ListItem key={index} navigator={navigator} >
      <div className='left'>
        {row.desc}
      </div>
      <div style={styles.dataValueCaption} className='right'>
        {row.time}
      </div>
    </ListItem>);
  };
  const renderAlerts = (row, index) => {
    return (<ListItem key={index}>
      <div className='left'>
       <Icon style={styles.invalid} icon='ion-android-warning'/><span style={styles.invalid} >Make more calls</span>
      </div>
      <div style={styles.dataValueCaption} className='right'>
        Today
      </div>
    </ListItem>);
  };
  const productivty = () => {
    return (
    <Page renderToolbar={() => <NavBar backButton={false} title={`Welcome ${name}`} navigator={navigator} />}>
      <section style={{margin: '16px'}}>
        <div style={styles.main}>
          <Row style={styles.data}>
            <Col>
              <span style={styles.dataCaption}>Pro-Rata FYC</span>
              <span style={styles.dataValueCaption}>40%</span>
              <ProgressBar key='names' value={40} />
            </Col>
          </Row>
          <Row style={styles.data}>
            <Col>
              <span style={styles.dataCaption}>Expense Allowance</span>
              <span style={styles.dataValueCaption}>30%</span>
              <ProgressBar key='names' value={30} />
            </Col>
          </Row>
          <Row style={styles.data}>
            <Col>
              <span style={styles.dataCaption}>Training Allowance</span>
              <span style={styles.dataValueCaption}>70%</span>
              <ProgressBar key='names' value={70} />
            </Col>
          </Row>
          <Row style={styles.data}>
            <Col>
              <span style={styles.dataCaption}>Name Flow</span>
              <span style={styles.dataValueCaption}>90%</span>
              <ProgressBar key='names' value={90} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Chart/>
            </Col>
          </Row>
          <Row>
            <Col>
              <BottomToolbar style={styles.buttonbar} modifier='material'>
                <ToolbarButton style={styles.button} modifier='material' onClick={() => { callMentor(navigator, actions); }} ><Icon icon='md-phone'></Icon><br/>call</ToolbarButton>
                <ToolbarButton style={styles.button} modifier='material' onClick={() => { chatMentor(navigator, actions); }} ><Icon icon='md-comments'></Icon><br/>chat</ToolbarButton>
                <ToolbarButton style={styles.button} modifier='material' onClick={() => { videoMentor(navigator, actions); notification.alert('Video!'); }}><Icon icon='md-videocam'></Icon><br/>video</ToolbarButton>
                <ToolbarButton style={styles.button} modifier='material' onClick={() => { emailedMentor(navigator, actions); notification.alert('Email!'); }}><Icon icon='md-email'></Icon><br/>email</ToolbarButton>
              </BottomToolbar>
            </Col>
          </Row>
        </div>
      </section>
    </Page>); };
  const history = () => {
    return (
    <Page renderToolbar={() => <NavBar backButton={false} title={`Welcome ${name}`} navigator={navigator} />}>
      <section style={{margin: '16px'}}>
        <div style={styles.main}>
          <Row>
            <Col>
              <List dataSource={activity}
                    renderRow={renderHistory}
                    renderHeader={() => <ListHeader>Conversations with your mentor</ListHeader>}>
              </List>
            </Col>
          </Row>
          <Row>
            <Col>
              <BottomToolbar style={styles.buttonbar} modifier='material'>
                <ToolbarButton style={styles.button} modifier='material' onClick={() => { callMentor(navigator, actions); }} ><Icon icon='md-phone'></Icon><br/>call</ToolbarButton>
                <ToolbarButton style={styles.button} modifier='material' onClick={() => { chatMentor(navigator, actions); }} ><Icon icon='md-comments'></Icon><br/>chat</ToolbarButton>
                <ToolbarButton style={styles.button} modifier='material' onClick={() => { videoMentor(navigator, actions); notification.alert('Video!'); }}><Icon icon='md-videocam'></Icon><br/>video</ToolbarButton>
                <ToolbarButton style={styles.button} modifier='material' onClick={() => { emailedMentor(navigator, actions); notification.alert('Email!'); }}><Icon icon='md-email'></Icon><br/>email</ToolbarButton>
              </BottomToolbar>
            </Col>
          </Row>
        </div>
      </section>
    </Page>); };
  const homeTab = () => {
    return (
    <Page renderToolbar={() => <NavBar backButton={false} title={`Welcome ${name}`} navigator={navigator} />}>
      <section style={{margin: '16px'}}>
        <div style={styles.main}>
          <Row style={styles.data}>
            <Col style={styles.dataColumn}>
              <span style={styles.dataCaption}>Training</span>
              <span style={styles.dataValueCaption}>80%</span>
              <ProgressBar key='training' value={60} />
            </Col>
            <Col style={styles.dataColumn}>
              <span style={styles.dataCaption}>Social</span>
              <span style={styles.dataValueCaption}>90%</span>
              <ProgressBar key='social' value={60} />
            </Col>
          </Row>
          <Row style={styles.data}>
            <Col style={styles.dataColumn}>
              <span style={styles.dataCaption}>Name Flow</span>
              <span style={styles.dataValueCaption}>60%</span>
              <ProgressBar key='names' value={60} />
            </Col>
          </Row>
         <Row style={styles.data}>
          <Col style={styles.dataColumn}>
            <span style={styles.dataCaption}>Calls</span>
            <span style={styles.dataValueCaption}>60%</span>
            <ProgressBar key='calls' value={60} />
          </Col>
        </Row>
        <Row style={styles.data}>
          <Col style={styles.dataColumn}>
            <span style={styles.dataCaption}>Total Appointments</span>
            <span style={styles.dataValueCaption}>20%</span>
            <ProgressBar key='ffs' value={20} />
          </Col>
        </Row>
        <Row style={styles.data}>
          <Col style={styles.dataColumn}>
            <span style={styles.dataCaption}>Fact Finders</span>
            <span style={styles.dataValueCaption}>10%</span>
            <ProgressBar key='appt' value={10} />
          </Col>
        </Row>
        <Row style={styles.data}>
          <Col style={styles.dataColumn}>
            <span style={styles.dataCaption}>Apps</span>
            <span style={styles.dataValueCaption}>10%</span>
            <ProgressBar key='apps' value={10} />
          </Col>
        </Row>
          <Row>
            <Col>
              <List dataSource={[1]}
                    renderRow={renderAlerts}
                    renderHeader={() => <ListHeader>Action Alerts</ListHeader>}>
              </List>
            </Col>
          </Row>
          <Row>
            <Col>
              <List dataSource={[2]}
                    renderRow={renderRow}
                    renderHeader={() => <ListHeader>Messages from your mentor</ListHeader>}>
                </List>
            </Col>
          </Row>
        <Row>
          <Col>
            <BottomToolbar style={styles.buttonbar} modifier='material'>
              <ToolbarButton style={styles.button} modifier='material' onClick={() => { callMentor(navigator, actions); }} ><Icon icon='md-phone'></Icon><br/>call</ToolbarButton>
              <ToolbarButton style={styles.button} modifier='material' onClick={() => { chatMentor(navigator, actions); }} ><Icon icon='md-comments'></Icon><br/>chat</ToolbarButton>
              <ToolbarButton style={styles.button} modifier='material' onClick={() => { videoMentor(navigator, actions); notification.alert('Video!'); }}><Icon icon='md-videocam'></Icon><br/>video</ToolbarButton>
              <ToolbarButton style={styles.button} modifier='material' onClick={() => { emailedMentor(navigator, actions); notification.alert('Email!'); }}><Icon icon='md-email'></Icon><br/>email</ToolbarButton>
            </BottomToolbar>
          </Col>
        </Row>
      </div>
    </section>
  </Page>);
  };

  const tabList = () => {
    return [
      {
        key: 0,
        content: homeTab(),
        tab: <Tab label='Home' icon='md-home' />
      },
      {
        key: 1,
        content: productivty(),
        tab: <Tab label='Productivity' icon='ion-arrow-graph-up-right' />
      },
      {
        key: 2,
        content: history(),
        tab: <Tab label='History' icon='ion-ios-book-outline' />
      }
    ];
  };

  return (
      <Tabbar
        navigator={navigator}
        index={index}
        onPreChange={
        (event) => {
          if (event.index !== index) {
            actions.changeMenteeTab(event.index);
          }
        }}
        renderTabs={tabList}
      />

  );
};

const chatMentor = (navigator, actions) => {
  actions.logChat('Chat with Jane');
  // actions.startChat();
  navigator.pushPage({component: ChatPage});
};

const callMentor = (navigator, actions) => {
  actions.logCall('Call to Jane');
  navigator.pushPage({component: CallPage});
};

const videoMentor = (navigator, actions) => {
  actions.logVideo('Video Call with Jane');
  // navigator.pushPage({component: CallPage});
};

const emailedMentor = (navigator, actions) => {
  actions.logEmail('Emailed Jane');
 // navigator.pushPage({component: CallPage});
};

const mapStateToProps = (state) => ({name: state.mentee.name, index: state.mentee.index, activity: state.history.history});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenteePage);
