import React from "react";
import "./styles/app.scss";
import Main from "./components/main/Main";
import ErrorMessage, {
  ErrorMessageProvider
} from "./components/errorMessage/ErrorMessage";

function App() {
  return (
    <ErrorMessageProvider>
      <ErrorMessage />
      <Main />
    </ErrorMessageProvider>
  );
}

export default App;
