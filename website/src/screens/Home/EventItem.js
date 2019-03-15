import React from "react";
import styled from "styled-components";
import moment from "moment";
import frLocale from "moment/locale/fr";
import colors from "styles/colors";
import { Link } from "react-router-dom";

const formatDate = d =>
  moment(d)
    .locale("fr", frLocale)
    .format("LLLL");

const Container = styled.div`
  width: 250px;
  padding: 12px;
`;

const Content = styled.div`
  background: white;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.05);
  &:hover {
    filter: brightness(0.95);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Description = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h3 {
    margin: 0;
    /* color: ${colors.yellow}; */
    margin-bottom: 8px;
    max-height: 80px;
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  p {
    margin: 0;
  }
`;

class EventItem extends React.PureComponent {
  render() {
    const { event, style } = this.props;
    const { place_name, image_url, name, start_date } = event;
    return (
      <Container style={style}>
        <Link
          to={`/events/${event.id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <Content>
            <ImageContainer>
              <img src={image_url} alt={name} />
            </ImageContainer>
            <Description>
              <h3>{name}</h3>
              <p style={{ fontSize: 10 }}>{place_name}</p>
              <p style={{ fontSize: 12 }}>{formatDate(start_date)}</p>
            </Description>
          </Content>
        </Link>
      </Container>
    );
  }
}
export default EventItem;
