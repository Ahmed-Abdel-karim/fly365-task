import React, { useCallback, useMemo, useState, useEffect } from "react";
import Button from "../button/Button";
import "./pagination.scss";

const BUTTONS_RANGE = 2;

const Pagination = ({
  pageSize,
  totalCount,
  page,
  handleChangePage,
  itemsInPageCount
}) => {
  const [paginationButtons, setButtons] = useState([]);
  const pageChangehandler = useCallback(e => {
    const {
      target: { value }
    } = e;
    handleChangePage(Number(value));
  }, []);

  const pagesCount = useMemo(() => Math.ceil(totalCount / pageSize), [
    pageSize,
    totalCount
  ]);

  useEffect(() => {
    const allPagesArray = Array.from(new Array(pagesCount).keys(), x => x + 1);
    if (pagesCount - page > BUTTONS_RANGE && page > BUTTONS_RANGE / 2) {
      return setButtons(
        allPagesArray.slice(page - BUTTONS_RANGE / 2, page + BUTTONS_RANGE / 2)
      );
    }
    return setButtons(allPagesArray.slice(0, page + BUTTONS_RANGE));
  }, [page, pagesCount]);

  const startFrom = useMemo(() => (page - 1) * pageSize, [page, pageSize]);

  return (
    <nav aria-label="page navigation" className="pagination">
      <p className="font-weight-bold">
        <span>{startFrom + 1}</span> <span>-</span>{" "}
        <span>{startFrom + itemsInPageCount}</span> <span>of</span>{" "}
        <span>{totalCount}</span>
      </p>
      {pagesCount > 1 && (
        <ul className="pagination">
          {page > 1 && (
            <li aria-label="previous">
              <Button value={page - 1} onClick={pageChangehandler}>
                &lt;
              </Button>
            </li>
          )}
          {/* show first page button only when it is not in the range */}
          {!paginationButtons.includes(1) && (
            <>
              <li>
                <Button
                  value={1}
                  onClick={pageChangehandler}
                  active={page === 1}
                >
                  1
                </Button>
              </li>
              <span className="separator">...</span>
            </>
          )}
          {paginationButtons.map(pageNumber => (
            <li title={pageNumber} key={pageNumber}>
              <Button
                className="page-link"
                value={pageNumber}
                onClick={pageChangehandler}
                active={page === pageNumber}
              >
                {pageNumber}
              </Button>
            </li>
          ))}
          {/* show last page button only when it is not in the range */}
          {!paginationButtons.includes(pagesCount) && (
            <>
              <span className="separator">...</span>
              <li>
                <Button
                  className="page-link"
                  value={pagesCount}
                  onClick={pageChangehandler}
                >
                  {pagesCount}
                </Button>
              </li>
            </>
          )}
          {page < pagesCount && (
            <li title={page + 1} aria-label="next">
              <Button
                className="page-link"
                value={page + 1}
                onClick={pageChangehandler}
                page={page}
              >
                &gt;
              </Button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Pagination;
