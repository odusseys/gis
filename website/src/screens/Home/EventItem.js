import React from "react";
import styled from "styled-components";
import moment from "moment";
import frLocale from "moment/locale/fr";

const formatDate = d =>
  moment(d)
    .locale("fr", frLocale)
    .format("LLLL");

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  height: 90px;
  padding: 10px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.29);
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ImageContainer = styled.div`
  max-width: 100px;
  max-height: 50px;
  height: 50px;
  width: 100px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EventItem = ({ onClick, event, style }) => {
  const { place_name, image_url, name, start_date } = event;
  return (
    <Container style={style}>
      <Content onClick={onClick}>
        <ImageContainer>
          <img
            src={image_url}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            alt={name}
          />
        </ImageContainer>
        <div style={{ flex: 1 }}>
          {name} - {place_name}
        </div>
        <div>{formatDate(start_date)}</div>
      </Content>
    </Container>
  );
};
export default EventItem;
