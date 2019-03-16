import React, { Component } from "react";
import styled from "styled-components";
import api from "api";
import moment from "moment";
import frLocale from "moment/locale/fr";
import Linkify from "react-linkify";
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa";
import colors from "../../styles/colors";

const formatDate = d =>
  moment(d)
    .locale("fr", frLocale)
    .format("dddd D MMMM HH:mm");

const Container = styled.div`
  width: 100%;
  display: flex;
  min-height: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  background-color: ${colors.coal};
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const Pane = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  margin: 15px;
  align-self: flex-start;
  &:first-child {
    margin-right: 0;
    @media (max-width: 600px) {
      margin-right: 15px;
      margin-bottom: 0;
    }
  }
`;

const TextBlock = styled.div`
  padding: 20px 30px;
  width: 100%;
  border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  &:last-child {
    border-bottom: none;
  }
`;

const IconRowContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconRow = ({ icon: Icon, children }) => {
  return (
    <IconRowContainer>
      <Icon color="gray" style={{ marginRight: 12 }} />
      <div>{children}</div>
    </IconRowContainer>
  );
};

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
      place_address,
      name
    } = this.state.event;
    return (
      <React.Fragment>
        <TextBlock>
          <Title>{name}</Title>
        </TextBlock>
        <TextBlock>
          <IconRow icon={FaRegClock}>
            <div>du {formatDate(start_date)}</div>

            <div>au {formatDate(end_date)}</div>
          </IconRow>
        </TextBlock>
        <TextBlock>
          <IconRow icon={FaMapMarkerAlt}>
            {place_name} - {place_address}
          </IconRow>
        </TextBlock>
      </React.Fragment>
    );
  };

  renderLoaded = () => {
    const { image_url, name, description } = this.state.event;
    return (
      <React.Fragment>
        <Pane style={{ flex: 1, alignItems: "center" }}>
          <Image src={image_url} alt={name} />
          {this.renderDetails()}
        </Pane>
        <Pane style={{ flex: 2 }}>
          <TextBlock
            style={{
              whiteSpace: "pre-wrap",
              paddingTop: 30,
              paddingBottom: 30
            }}
          >
            <Linkify>{description}</Linkify>
          </TextBlock>
        </Pane>
      </React.Fragment>
    );
  };
  render() {
    const { loading } = this.state;
    return <Container>{loading ? <div /> : this.renderLoaded()}</Container>;
  }
}

export default Event;
