import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "components/buttons";
import EventListing from "./EventListing";
import api from "api";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
`;

class Home extends Component {
  state = { events: [] };
  componentDidMount = () => {
    this.fetchEvents();
  };

  fetchEvents = async () => {
    const events = await api.events.list();
    this.setState({ events });
  };

  render() {
    const { isSuperAdmin, logout } = this.props;
    if (!isSuperAdmin) {
      return <div>Coming soon for companies</div>;
    }
    return (
      <Container>
        <TopBar>
          <span>Event management</span>{" "}
          <Button onClick={logout}>Log out</Button>
        </TopBar>
        <EventListing events={this.state.events} />
      </Container>
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
