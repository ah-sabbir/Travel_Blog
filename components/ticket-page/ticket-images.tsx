"use client";

import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import "swiper/css";
import "swiper/css/navigation";
import NextImage from "../next-image";
import LightboxImage from "../lightbox-image";

interface Props {
  images: string[] | undefined;
}

const TicketImages: FC<Props> = ({ images }): JSX.Element => {
  const [index, setIndex] = useState(-1);

  const newImages =
    images &&
    images?.map((image) => ({
      src: image,
    }));

  return (
    <>
      {images && images.length > 0 && (
        <>
          <Swiper
            modules={[Autoplay]}
            className="w-full"
            spaceBetween={10}
            slidesPerView={7}
            slidesPerGroup={1}
            autoplay={{ delay: 2000 }}
            speed={500}
            navigation={false}
            loop={true}
          >
            {images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full aspect-video rounded-md cursor-zoom-in"
                  onClick={() => setIndex(index)}
                >
                  <NextImage
                    src={image || ""}
                    alt={image || ""}
                    className="rounded-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Lightbox
            index={index}
            open={index >= 0}
            close={() => setIndex(-1)}
            slides={newImages as SlideImage[] | undefined}
            render={{ slide: LightboxImage }}
            plugins={[Zoom]}
          />
        </>
      )}
    </>
  );
};

export default TicketImages;
