import React, { Component } from "react";
import styled from "styled-components";
import Router from "./router";
import { Provider } from "store";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Provider>
          <Router />
        </Provider>
      </Container>
    );
  }
}

export default App;
