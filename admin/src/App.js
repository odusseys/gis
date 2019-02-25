import React, { Component } from "react";
import styled from "styled-components";
import { PersistGate } from "redux-persist/es/integration/react";
import Router from "./router";
import { Provider, persistor } from "store";

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
          <PersistGate persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default App;
