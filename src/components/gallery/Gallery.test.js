import React from "react";
import Gallery from "./Gallery";
import { render, fireEvent } from "@testing-library/react";

const genTestData = number =>
  Array.from(new Array(number).keys(), x => ({
    photo: `src-${x}`,
    thumbnail: `thum-${x}`
  }));

const Wrapper = ({ pictures }) => <Gallery pictures={pictures} />;

test("should render provided photos & thumbnails", () => {
  const { queryAllByTitle, queryAllByTestId } = render(
    <Wrapper pictures={genTestData(5)} />
  );
  const slider = queryAllByTestId("photos-container");
  const thumbnails = queryAllByTitle("gallery-thumbnail");
  const photos = queryAllByTitle("gallery-photo");
  // render the right number of photos
  expect(thumbnails.length).toBe(5);
  expect(photos.length).toBe(5);

  // initially show the first photo
  expect(slider[0]).toHaveStyle(`transform:translateX(0%)`);
  expect(thumbnails[0].querySelector("img")).toHaveClass("active");

  const randomThimbnail = thumbnails[2];
  fireEvent.click(randomThimbnail);
  // active thumbnail when click on it
  expect(randomThimbnail.querySelector("img")).toHaveClass("active");
  // translate conatiner to show the right image
  expect(slider[0]).toHaveStyle(`transform:translateX(-${(2 * 100) / 5}%)`);
});

test("should work with controllers", () => {
  const { queryAllByTitle, getByTestId } = render(
    <Wrapper pictures={genTestData(5)} />
  );
  const thumbnails = queryAllByTitle("gallery-thumbnail");
  const nextbtn = getByTestId("next");
  const prevbtn = getByTestId("previous");
  const nextThumbnail = thumbnails[1];
  // go to next photo when click next
  fireEvent.click(nextbtn);
  expect(nextThumbnail.querySelector("img")).toHaveClass("active");
  const prevThumbnail = thumbnails[0];
  // go to previous when click previuos
  fireEvent.click(prevbtn);
  expect(prevThumbnail.querySelector("img")).toHaveClass("active");
  // remove active class from the next photo
  expect(nextThumbnail.querySelector("img")).not.toHaveClass("active");
});
