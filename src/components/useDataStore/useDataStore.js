import { useReducer, useCallback, useMemo } from "react";
const SORT = "SORT";
const CHANGE_PAGE = "CHANGE_PAGE";
const sortTypeEnum = {
  ASC: "ASC",
  DESC: "DESC"
};

const sortData = property => (data, type) =>
  type === sortTypeEnum.ASC
    ? data.sort((a, b) => a[property] - b[property])
    : data.sort((a, b) => b[property] - a[property]);

const paginate = (data, page, pageSize) =>
  data.slice((page - 1) * pageSize, page * pageSize);

const dataReducer = sortFn => (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SORT:
      return {
        ...state,
        sortType: payload,
        sourceData: sortFn(state.sourceData, payload)
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: payload,
        pageData: paginate(state.sourceData, payload, state.pageSize)
      };
    default:
      throw new Error();
  }
};

const useDataStore = (data, sortBy, pageSize) => {
  const reducer = useMemo(() => dataReducer(sortData(sortBy)), [sortBy]);
  //
  const initialState = useMemo(() => {
    // sort data with the default sort
    const sourceData = sortData(sortBy)(data, sortTypeEnum.DESC);
    const pageData = paginate(sourceData, 1, pageSize);
    const initialState = {
      sortType: sortTypeEnum.DESC,
      page: 1,
      pageSize,
      sourceData,
      pageData
    };
    return initialState;
  }, []);
  //
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pageData, sourceData, sortType, page, pageSize: limit } = state;

  // actions
  const handleSort = useCallback(sortType => {
    dispatch({
      type: SORT,
      payload: sortType
    });
    // start from first page when sortnig
    dispatch({
      type: CHANGE_PAGE,
      payload: 1
    });
  }, []);
  const handleChangePage = useCallback(page => {
    dispatch({
      type: CHANGE_PAGE,
      payload: page
    });
  }, []);
  //

  return {
    handleSort,
    handleChangePage,
    totalCount: sourceData.length,
    page,
    pageData,
    pageSize: limit,
    sortType
  };
};

export { useDataStore as default, sortTypeEnum };
