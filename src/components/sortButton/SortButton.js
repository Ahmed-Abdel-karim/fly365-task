import React, { useCallback } from "react";
import { sortTypeEnum } from "../useDataStore/useDataStore";
import Button from "../button/Button";
import "./sort-button.scss";

const SortButton = ({ currentSort, handleSort }) => {
  const sortHandler = useCallback(() => {
    currentSort === sortTypeEnum.ASC
      ? handleSort(sortTypeEnum.DESC)
      : handleSort(sortTypeEnum.ASC);
  }, [currentSort, handleSort]);
  return (
    <>
      {currentSort === sortTypeEnum.ASC ? (
        <Button
          title="sort"
          className="rounded sort-button"
          onClick={sortHandler}
        >
          &uarr;
        </Button>
      ) : (
        <Button
          title="sort"
          className="rounded sort-button"
          onClick={sortHandler}
        >
          &darr;
        </Button>
      )}
    </>
  );
};

export default SortButton;
