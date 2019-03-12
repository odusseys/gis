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
  overflow-y: auto;
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

  createPlace = async p => {
    await api.places.create(p);
    await this.fetchEvents();
  };

  onFormSubmit = async data => {
    const endpoint =
      this.mode() === "create" ? api.events.create : api.events.update;
    await endpoint(data);
    await this.fetchEvents();
  };

  onDelete = async d => {
    await api.events.delete(d);
    await this.fetchEvents();
  };

  onActiveToggle = async d => {
    const { id, active } = d;
    if (!active) {
      const events = this.state.events.filter(e => e.id !== id);
      this.setState({ events }, async () => {
        try {
          await api.events.toggle(d);
        } catch (e) {
          console.error("failed to update");
          await this.fetchEvents();
        }
      });
    } else {
      try {
        await api.events.toggle(d);
      } catch (e) {
        console.error("failed to update");
        await this.fetchEvents();
      }
    }
  };

  mode = () => (this.state.selectedEvent ? "edit" : "create");

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
            <EventListing
              events={events}
              selectedEvent={selectedEvent}
              onEventSelect={e => this.setState({ selectedEvent: e })}
              onDelete={this.onDelete}
              onActiveToggle={this.onActiveToggle}
            />
          </Pane>
          <Pane>
            <h4>{selectedEvent ? "Edit event" : "Create event"}</h4>
            <EventForm
              key={selectedEvent && selectedEvent.id}
              mode={this.mode()}
              places={places}
              defaultValue={selectedEvent}
              onCreatePlace={this.createPlace}
              onSubmit={this.onFormSubmit}
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
