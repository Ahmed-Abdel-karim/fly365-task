import React, { useState, useCallback, useRef, useEffect } from "react";
import "./gallery.scss";
import Button from "../button/Button";

const Gallery = ({ pictures }) => {
  const [activeId, setActive] = useState(0);
  const [thumbnailOverflowSetp, setThumbnailOverflow] = useState(0);
  const photosContainerRef = useRef();

  const { photos, thumbnails } = pictures.reduce(
    (acc, { photo, thumbnail }, index) => {
      acc.photos.push({ id: index, photo });
      acc.thumbnails.push({ id: index, thumbnail });
      return acc;
    },
    { photos: [], thumbnails: [] }
  );
  const nextHandler = useCallback(() => {
    setActive(activeId => (activeId < photos.length - 1 ? activeId + 1 : 0));
  }, [photos.length]);
  const previousHandler = useCallback(() => {
    setActive(activeId => (activeId > 0 ? activeId - 1 : photos.length - 1));
  }, [photos.length]);

  const thumbnailClickhandler = useCallback(id => {
    setActive(id);
  }, []);

  useEffect(() => {
    if (photosContainerRef.current) {
      const containerWidth = photosContainerRef.current.offsetWidth;
      const thumWidth = thumbnails.length * 104;
      setThumbnailOverflow(
        thumWidth > containerWidth ? thumWidth / thumbnails.length : 0
      );
    }
  }, [thumbnails.length, photosContainerRef.current]);

  return (
    <div className="gallery">
      <div className="photos" ref={photosContainerRef}>
        <Button
          data-testid="previous"
          onClick={previousHandler}
          className="round btn-control left"
          aria-label="previous"
        >
          &larr;
        </Button>
        <Button
          data-testid="next"
          onClick={nextHandler}
          className="round btn-control right"
          aria-label="next"
        >
          &rarr;
        </Button>
        <div
          className="photos-container"
          data-testid="photos-container"
          style={{
            width: `${photos.length * 100}%`,
            transform:
              activeId > 0
                ? `translateX(-${(activeId * 100) / photos.length}%)`
                : `translateX(0%)`
          }}
        >
          {photos.map(({ photo, id }) => (
            <img
              src={photo}
              key={id}
              width={`${100 / photos.length}%`}
              alt="gallery item"
              title="gallery-photo"
            />
          ))}
        </div>
      </div>
      <div className="thumbnails">
        <div
          className="thumbnails-container"
          style={{
            justifyContent: thumbnailOverflowSetp > 0 ? "flex-start" : "center",
            transform:
              thumbnailOverflowSetp > 0
                ? `translateX(-${activeId * thumbnailOverflowSetp}px)`
                : ""
          }}
        >
          {thumbnails.map(({ thumbnail, id }) => {
            return (
              <button
                title="gallery-thumbnail"
                onClick={() => thumbnailClickhandler(id)}
                key={id}
              >
                <img
                  src={thumbnail}
                  className={activeId === id ? "active" : ""}
                  alt="gallery item"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
