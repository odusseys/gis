import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  @media (max-width: 600px) {
    padding: 8px 20px;
  }
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.15);
  & > h1 {
    font-size: 18px;
    font-weight: normal;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  a {
    color: black;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
  }
  img {
    margin-right: 15px;
  }
`;

const Links = styled(Row)`
  a {
    color: black;
    text-decoration: none;
  }
  & > * {
    margin-left: 12px;
  }
`;

class TopNav extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Title>
          <Link to="/">
            <Row>
              <img
                src="/favicon.ico"
                style={{ width: 50, height: 50 }}
                alt="kiki"
              />
              Kiki
            </Row>
          </Link>
        </Title>
        <h1>Tes sorties gay à Paris</h1>
        <Links>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </Links>
      </Container>
    );
  }
}

export default TopNav;
