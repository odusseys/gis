import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "components/buttons";
import EventListing from "./EventListing";
import api from "api";
import EventForm from "./EventForm";
import colors from "styles/colors";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  border-bottom: 1px ${colors.lightGrey} solid;
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  & > :first-child {
    border-right: 1px ${colors.lightGrey} solid;
  }
`;

const Pane = styled.div`
  padding: 0 40px;
`;

class Home extends Component {
  state = { events: [], places: [], selectedEvent: undefined };
  componentDidMount = () => {
    this.fetchEvents();
  };

  fetchEvents = async () => {
    const [events, places] = await Promise.all([
      api.events.list(),
      api.places.list()
    ]);
    this.setState({ events, places });
  };

  render() {
    const { isSuperAdmin, logout } = this.props;
    const { events, selectedEvent, places } = this.state;
    if (!isSuperAdmin) {
      return <div>Coming soon for companies</div>;
    }
    return (
      <Container>
        <TopBar>
          <span style={{ fontSize: 24 }}>Event management</span>
          <Button onClick={logout}>Log out</Button>
        </TopBar>
        <Content>
          <Pane style={{ flex: 1 }}>
            <h4>Upcoming</h4>
            <EventListing
              events={events}
              selectedEvent={selectedEvent}
              onEventSelect={e => this.setState({ selectedEvent: e })}
            />
          </Pane>
          <Pane>
            <h4>{selectedEvent ? "Edit event" : "Create event"}</h4>
            <EventForm
              key={selectedEvent && selectedEvent.id}
              mode={selectedEvent ? "edit" : "create"}
              places={places}
              defaultValue={selectedEvent}
              onSubmit={console.warn}
            />
            {selectedEvent && (
              <Button
                onClick={() => this.setState({ selectedEvent: undefined })}
              >
                Create new
              </Button>
            )}
          </Pane>
        </Content>
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
