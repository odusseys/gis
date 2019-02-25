import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  state = {};
  render() {
    const { isSuperAdmin, logout } = this.props;
    if (!isSuperAdmin) {
      return <div>Coming soon for companies</div>;
    }
    return (
      <div>
        home <button onClick={logout}>Log out</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isSuperAdmin: state.auth.is_super_admin });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: "LOGOUT" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
