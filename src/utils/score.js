const rating = {
  BAD: "bad",
  FAIR: "fair",
  GOOD: "good",
  VERY_GOOD: "very good",
  EXCELLENT: "excellent"
};

const ScoreRating = {
  [rating.BAD]: {
    to: 5
  },
  [rating.FAIR]: {
    from: 5,
    to: 6
  },
  [rating.GOOD]: {
    from: 6,
    to: 7
  },
  [rating.VERY_GOOD]: {
    from: 7,
    to: 8
  },
  [rating.EXCELLENT]: {
    from: 8
  }
};

const getScoreRating = score =>
  Object.entries(ScoreRating).reduce((res, [rating, { to, from }]) => {
    const max = to || Infinity;
    const min = from || 0;
    return score >= min && score < max ? (res = rating) : res;
  }, "");

export { getScoreRating, rating };
