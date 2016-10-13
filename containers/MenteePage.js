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

// ProgressCircular
import {
  Page,
  Row,
  Col, Tabbar, Tab,
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
  }
};

const MenteePage = ({
  navigator,
  name,
  index,
  actions
}) => {
  const productivty = () => {
    return (
    <Page renderToolbar={() => <NavBar backButton={false} title={`Welcome ${name}`} navigator={navigator} />}>
      <section style={{margin: '16px'}}>
        Productivity
        </section></Page>); };
  const history = () => {
    return (
    <Page renderToolbar={() => <NavBar backButton={false} title={`Welcome ${name}`} navigator={navigator} />}>
      <section style={{margin: '16px'}}>
        History
      </section></Page>); };
  const homeTab = () => {
    return (
    <Page renderToolbar={() => <NavBar backButton={false} title={`Welcome ${name}`} navigator={navigator} />}>
    <section style={{margin: '16px'}}>
    <div style={styles.main}>
     <Row>
      <Col>
        <span>Names</span>
        <ProgressBar key='names' value={60} />
      </Col>
    </Row>
    <Row>
      <Col>
        <span>Calls</span>
        <ProgressBar key='calls' value={20} />
      </Col>
    </Row>
    <Row>
      <Col>
        <span>Appointments</span>
        <ProgressBar key='appt' value={10} />
      </Col>
    </Row>
    <Row>
      <Col>
        <span>Apps</span>
        <ProgressBar key='apps' value={10} />
      </Col>
    </Row>
    <Row>
      <Col>
        <BottomToolbar modifier='material'>
          <ToolbarButton modifier='material' onClick={() => { callMentor(navigator); }} ><Icon icon='md-phone'></Icon></ToolbarButton>
          <ToolbarButton modifier='material' onClick={() => { notification.alert('Text!'); }} ><Icon icon='md-comments'></Icon></ToolbarButton>
          <ToolbarButton modifier='material' onClick={() => { notification.alert('Video!'); }}><Icon icon='md-videocam'></Icon></ToolbarButton>
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
        content: homeTab(),
        tab: <Tab label='Home' icon='md-home' />
      },
      {
        content: productivty(),
        tab: <Tab label='Productivity' icon='md-home' />
      },
      {
        content: history(),
        tab: <Tab label='History' icon='md-home' />
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

const callMentor = (navigator) => {
  // notification.alert('Call!');
  navigator.pushPage({component: CallPage});
};

const mapStateToProps = (state) => ({name: state.mentee.name, index: state.mentee.index});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenteePage);
