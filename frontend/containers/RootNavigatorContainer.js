import { connect } from 'react-redux';

import RootNavigator from '../navigation/RootNavigator';

const mapStateToProps = ({ session, userSettings, userProfile }) => ({
    signedIn: Boolean(session.currentUser),
    setup: Boolean(userSettings.settings && userProfile.userProfile.id),
});


export default connect(
  mapStateToProps,
  null
)(RootNavigator);
