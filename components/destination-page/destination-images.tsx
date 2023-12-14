"use client";

import { FC, useState } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import NextImage from "../next-image";
import LightboxImage from "../lightbox-image";

interface Props {
  images: string[] | undefined;
}

const DestinationImages: FC<Props> = ({ images }): JSX.Element => {
  const [index, setIndex] = useState(-1);

  const newImages =
    images &&
    images?.map((image) => ({
      src: image,
    }));

  return (
    <>
      {images && images.length > 0 ? (
        <>
          <div className="cards-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-full aspect-video cursor-zoom-in"
                onClick={() => setIndex(index)}
              >
                <NextImage
                  src={image || ""}
                  alt={image || ""}
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
          <Lightbox
            index={index}
            open={index >= 0}
            close={() => setIndex(-1)}
            slides={newImages as SlideImage[] | undefined}
            render={{ slide: LightboxImage }}
            plugins={[Zoom]}
          />
        </>
      ) : (
        <p>Không có hình ảnh nào</p>
      )}
    </>
  );
};

export default DestinationImages;
