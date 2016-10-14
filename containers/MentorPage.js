/**
 * Created by chris on 10/9/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {platform} from 'onsenui';
import * as Actions from '../actions';
import NavBar from '../components/NavBar';

import {
  Page, Row, Col, Fab, Icon, List, ListItem, ListHeader, Tabbar, Tab
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
  const mentees = [
    {name: 'Dave', alert: true},
    {name: 'Sam', alert: true}
  ];
  const renderAgents = (row, index) => {
    return (<ListItem key={index}>
      <div className='left'>
        <span style={styles.mentee}>{row.name}</span>
      </div>
      <div className='right'>
        {row.alert ? <Icon style={styles.invalid} icon='ion-android-warning'/> : ''}
      </div>
    </ListItem>);
  };
  const agentTab = () => {
    return (
      <Page renderToolbar={() => <NavBar backButton={false} title={`Welcome ${name}`} navigator={navigator} />}>
        <div style={styles.main}>
          <Row><Col>
            <List dataSource={mentees}
                  renderRow={renderAgents}
                  renderHeader={() => <ListHeader>Your Mentees</ListHeader>}>
            </List></Col>
          </Row>
          <Row>
            <Col><Fab ripple={true}><Icon icon='ion-plus'></Icon></Fab></Col>
          </Row>

        </div>
      </Page>
    );
  };
  const groupProductivity = () => {
    return (
      <Page renderToolbar={() => <NavBar backButton={false} title={`Welcome ${name}`} navigator={navigator} />}>
        <div style={styles.main}>
          <Row>
            <Col>Group Productivity</Col>
          </Row>
        </div>
      </Page>
    );
  };
  const tabList = () => {
    return [
      {
        content: agentTab(),
        tab: <Tab label='Mentees' icon='md-home' />
      },
      {
        content: groupProductivity(),
        tab: <Tab label='Group Performance' icon='ion-arrow-graph-up-right' />
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
              actions.changeMentorTab(event.index);
            }
          }}
      renderTabs={tabList}
    />);
};

const mapStateToProps = (state) => ({ name: state.mentor.name, index: state.mentor.index });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenteePage);
