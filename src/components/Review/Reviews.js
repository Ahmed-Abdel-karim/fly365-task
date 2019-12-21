import React from "react";
import Pagination from "../pagination/Pagination";
import useDataStore from "../useDataStore/useDataStore";
import SortButton from "../sortButton/SortButton";
import "./reviews.scss";

const Reviews = ({ reviews }) => {
  const {
    handleSort,
    handleChangePage,
    pageData: reviewsList,
    page,
    pageSize,
    totalCount,
    sortType
  } = useDataStore(reviews, "score", 3);

  return (
    <section className="rounded p-3 reviews">
      <header className="d-flex align-items-center mb-4">
        <h3 className="mb-0 mr-3">Reviews</h3>
        <SortButton currentSort={sortType} handleSort={handleSort} />
      </header>
      <ul className="reviews-list">
        {reviewsList.map(({ review, score }, i) => {
          return (
            <li key={`${review}-${i}`}>
              <p className="review clearfix">
                <span className="score">{score}</span>
                <span>{review}</span>
              </p>
            </li>
          );
        })}
      </ul>
      <Pagination
        handleChangePage={handleChangePage}
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        itemsInPageCount={reviewsList.length}
      />
    </section>
  );
};

export default Reviews;
