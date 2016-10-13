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
  Page
  // ProgressCircular
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
  name
}) => {
  return (
    <Page renderToolbar={() => <NavBar backButton={true} title={`Welcome ${name}`} navigator={navigator} />}>
      <div style={styles.main}>
        Mentor View -{name}-
      </div>
    </Page>
  );
};

const mapStateToProps = (state) => ({ name: state.mentor.name });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenteePage);
