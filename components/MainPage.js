import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
  Page,
  Button, Row, Icon
} from 'react-onsenui';

import * as Actions from '../actions';
import NavBar from './NavBar';
import MenteePage from '../containers/MenteePage';
import MentorPage from '../containers/MentorPage';

const MainPage = ({
  navigator,
  actions
  }) => (
  <Page renderToolbar={() => <NavBar title='Mentor This!' navigator={navigator} />}>
    <Row verticalAlign='center'>
       <Button style={{margin: '6px', verticalAlign: 'middle'}}
            onClick={() => { actions.navMentor('Jane Mentor'); navigator.pushPage({component: MentorPage}); }}
            navigator={navigator}><Icon icon='ion-ios-information-outline'></Icon> Mentor</Button>
    </Row>
    <Row verticalAlign='center'>
     <Button style={{margin: '6px', verticalAlign: 'middle'}}
            onClick={() => { actions.navMentee('John Mentee'); navigator.pushPage({component: MenteePage}); }}
            navigator={navigator}><Icon icon='ion-ios-help-outline'></Icon> Mentee</Button>
    </Row>

  </Page>
);

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(MainPage);
