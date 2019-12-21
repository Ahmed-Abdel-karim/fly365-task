import React, { useContext, useEffect } from "react";
import { ErrorMessageContext } from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const OnLoading = ({ isLoading, error, rejected, children, resolved }) => {
  const { setErrorMessage } = useContext(ErrorMessageContext);
  useEffect(() => {
    if (rejected) return setErrorMessage(error);
    return setErrorMessage("");
  }, [rejected, error]);
  return (
    <>
      {isLoading && <Spinner />}
      {resolved && children}
    </>
  );
};

export default OnLoading;
