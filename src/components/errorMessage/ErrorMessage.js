import React, { useState, useContext } from "react";
import "./error-message.scss";

const ErrorMessageContext = React.createContext({});
const EMProvider = ErrorMessageContext.Provider;

const ErrorMessageProvider = ({ children }) => {
  const [message, setErrorMessage] = useState("");
  return (
    <EMProvider
      value={{
        message,
        setErrorMessage
      }}
    >
      {children}
    </EMProvider>
  );
};

const ErrorMessage = () => {
  const { message } = useContext(ErrorMessageContext);
  return (
    <>
      {!!message && (
        <div className="error-message">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </>
  );
};

export { ErrorMessage as default, ErrorMessageContext, ErrorMessageProvider };
