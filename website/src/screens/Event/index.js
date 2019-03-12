import React, { Component } from "react";
import styled from "styled-components";
import api from "api";
import moment from "moment";
import frLocale from "moment/locale/fr";

const formatDate = d =>
  moment(d)
    .locale("fr", frLocale)
    .format("LLLL");

const Container = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
  margin-bottom: 30px;
  text-align: center;
`;

const Image = styled.img`
  max-height: 120px;
`;

const Pane = styled.div`
  padding: 30px;
  &:first-child {
    border-right: 1px rgba(0, 0, 0, 0.05) solid;
    @media (max-width: 600px) {
      border-right: none;
      border-bottom: 1px rgba(0, 0, 0, 0.05) solid;
    }
  }
`;

class Event extends Component {
  state = {
    event: null,
    loading: true
  };
  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const event = await api.events.get({ id });
    this.setState({ event, loading: false });
  };

  renderDetails = () => {
    const {
      start_date,
      end_date,
      place_name,
      place_address
    } = this.state.event;
    return (
      <React.Fragment>
        <div>du {formatDate(start_date)}</div>
        <div style={{ marginBottom: 12 }}>à {formatDate(end_date)}</div>
        <div>
          {place_name} - {place_address}
        </div>
      </React.Fragment>
    );
  };

  renderLoaded = () => {
    const { image_url, name, description } = this.state.event;
    return (
      <React.Fragment>
        <Pane style={{ flex: 1 }}>
          <Title>
            <Image src={image_url} alt={name} />
            {name}
          </Title>
          {this.renderDetails()}
        </Pane>
        <Pane style={{ flex: 2 }}>
          <div style={{ whiteSpace: "pre-wrap" }}>{description}</div>
        </Pane>
      </React.Fragment>
    );
  };
  render() {
    const { loading } = this.state;
    return (
      <Container>
        {loading ? <div>Loading</div> : this.renderLoaded()}
      </Container>
    );
  }
}

export default Event;
