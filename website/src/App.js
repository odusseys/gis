import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import TopNav from "./TopNav";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <TopNav />
          <Content>
            <Routes />
          </Content>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
