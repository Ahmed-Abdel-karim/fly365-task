import React, { useContext } from "react";
import { render, fireEvent } from "@testing-library/react";
import ErrorMessage, {
  ErrorMessageProvider,
  ErrorMessageContext
} from "./ErrorMessage";

const testMessage = "TEST_MESSAGE";

const WrapperComponent = () => {
  return (
    <ErrorMessageProvider>
      <ErrorMessage />
      <TestComponent />
    </ErrorMessageProvider>
  );
};

const TestComponent = () => {
  const { setErrorMessage } = useContext(ErrorMessageContext);
  return (
    <button onClick={() => setErrorMessage(testMessage)}>
      click to set error message
    </button>
  );
};

test("should show error message ", () => {
  const { getByRole, getByText } = render(<WrapperComponent />);
  const button = getByText("click to set error message");
  fireEvent.click(button);
  const errorMessage = getByRole("alert");
  // to be in the dom
  expect(errorMessage).toBeInTheDocument();
  //show the right error message
  expect(errorMessage).toHaveTextContent(testMessage);
});
