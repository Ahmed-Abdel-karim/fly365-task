import React from "react";
import Button from "./Button";
import { render, fireEvent } from "@testing-library/react";

const Wrapper = ({ onClick, value, active, className, children }) => (
  <Button onClick={onClick} value={value} active={active} className={className}>
    {children}
  </Button>
);

test("should render the button with right props", () => {
  const clickHandler = jest.fn();
  const testText = "TEST_TEXT";
  const testValue = "TEST_VALUE";
  const testClassName = "testClassName";
  const { getByText } = render(
    <Wrapper onClick={clickHandler} value={testValue} className={testClassName}>
      {testText}
    </Wrapper>
  );
  const Button = getByText(testText);
  fireEvent.click(Button);
  // render correctly
  expect(Button).toBeInTheDocument();
  // have the right className
  expect(Button).toHaveClass(testClassName);
  // have the right value
  expect(Button).toHaveAttribute("value", testValue);
  // not to have class active when it is not active
  expect(Button).not.toHaveClass("active");
  // call the onClick
  expect(clickHandler).toBeCalled();
  expect(clickHandler).toBeCalledTimes(1);
});

test("should have class active when it is active", () => {
  const testText = "TEST_TEXT";
  const { getByText } = render(<Wrapper active={true}>{testText}</Wrapper>);
  const Button = getByText(testText);
  // have class active when it is active
  expect(Button).toHaveClass("active");
});
