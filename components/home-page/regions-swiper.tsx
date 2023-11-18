"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { RegionEntity } from "@/entities/region.entity";
import Link from "next/link";
import NextImage from "../next-image";

interface Props {
  regions: RegionEntity[] | undefined;
}

const RegionsSwiper: FC<Props> = ({ regions }): JSX.Element => {
  return (
    <div className="flex items-center gap-6">
      <div className="w-[94px] text-black_text font-black">
        <p className="text-lg">Where to</p>
        <p className="text-[34px] -mt-4">next?</p>
      </div>

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
        {regions?.map((region) => (
          <SwiperSlide key={region._id.toString()}>
            <Link
              href=""
              className="flex items-center gap-2 w-full rounded-[40px] bg-light_gray p-[6px]"
            >
              <div className="circle-radius border border-white relative w-11 h-11">
                <NextImage
                  src={region.thumbnail.url}
                  alt={region.name}
                  className="circle-radius"
                />
              </div>

              <h3 className="font-black line-clamp-1">{region.name}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RegionsSwiper;
