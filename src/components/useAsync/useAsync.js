import { useState } from "react";

const useAsync = (func, defaultData) => {
  const initalState = {
    isLoading: false,
    data: defaultData,
    resolved: false,
    rejected: false,
    error: ""
  };
  const [
    { isLoading, data, error, resolved, rejected },
    setLoadingFlags
  ] = useState(initalState);
  const asyncFn = (...args) => {
    if (isLoading) return Promise.resolve("isLoading");
    setLoadingFlags({ ...initalState, isLoading: true });
    return func(...args)
      .then(({ data }) => {
        setLoadingFlags({
          ...initalState,
          isLoading: false,
          resolved: true,
          data
        });
        Promise.resolve(data);
      })
      .catch(error => {
        setLoadingFlags({
          ...initalState,
          isLoading: false,
          rejected: true,
          error: "error occurred please try again later"
        });
        Promise.reject(error);
      });
  };
  return {
    isLoading,
    resolved,
    rejected,
    data,
    error,
    asyncFn
  };
};

export default useAsync;
