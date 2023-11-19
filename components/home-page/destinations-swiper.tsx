"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import NextImage from "../next-image";
import { GetDestinationsForHomepage } from "@/dtos/destination/get-all-destinations.dto";
import { MdOutlineLocationOn } from "react-icons/md";

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
    >
      {destinations?.map((destination) => (
        <SwiperSlide key={destination._id.toString()}>
          <Link
            href=""
            className="group overflow-hidden block relative w-full aspect-[0.755] rounded-md after:rounded-md after:bg-[linear-gradient(_0,rgba(0,0,0,0.168627451)_50%,rgba(0,0,0,0.3490196078)_85%_)] after:content-[''] after:absolute after:z-0 after:inset-0"
          >
            <NextImage
              src={destination.thumbnail.url}
              alt={destination.name}
              className="rounded-md group-hover:scale-105 transition"
            />

            <div className="absolute bottom-3 left-4 text-white z-[1]">
              <h3 className="font-extrabold text-2xl">{destination.name}</h3>
              <p className="flex items-center gap-1 text-lg">
                <MdOutlineLocationOn />
                {destination.country.name}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DestinationsSwiper;
