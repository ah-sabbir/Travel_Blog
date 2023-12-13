"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { GetDestinationsForHomepage } from "@/dtos/destination/get-all-destinations.dto";
import DestinationCard from "../destination-card";

interface Props {
  destinations: GetDestinationsForHomepage["destinations"];
}

const DestinationsSwiper: FC<Props> = ({ destinations }): JSX.Element => {
  return (
    <Swiper
      className="mr-3"
      spaceBetween={10}
      slidesPerView={2.5}
      slidesPerGroup={1}
      navigation={false}
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1.5,
        },
        660: {
          slidesPerView: 2.5,
        },
      }}
    >
      {destinations?.map((destination) => (
        <SwiperSlide key={destination._id.toString()}>
          <DestinationCard destination={destination} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DestinationsSwiper;
