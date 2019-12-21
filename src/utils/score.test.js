import { getScoreRating, rating } from "./score";

const testData = [
  { value: 5, rate: rating.FAIR },
  { value: 6.5, rate: rating.GOOD },
  { value: 8, rate: rating.EXCELLENT },
  { value: 15, rate: rating.EXCELLENT },
  { value: 4, rate: rating.BAD },
  { value: 0, rate: rating.BAD },
  { value: 0.5, rate: rating.BAD }
];

test("should return right score ", () => {
  testData.forEach(({ value, rate }) => {
    expect(getScoreRating(value)).toBe(rate);
  });
});
