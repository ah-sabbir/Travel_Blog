"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { path } from "@/constant";
import NextImage from "../next-image";

interface Props {
  items: any | undefined;
}

const SmallBrandSwiper: FC<Props> = ({ items }): JSX.Element => {
  return (
    <div className="flex items-center gap-6">
      <div className="w-[100px] text-black_text font-black">
        <p className="text-lg">Which</p>
        <p className="text-[34px] -mt-4">Brand?</p>
      </div>

      <Swiper
        modules={[Autoplay]}
        className="w-full"
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={1}
        autoplay={{ delay: 2000 }}
        speed={500}
        navigation={false}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          800: { slidesPerView: 3 },
          1100: { slidesPerView: 4 },
        }}
      >
        {items?.map((item: any) => (
          <SwiperSlide key={item?._id?.toString()}>
            <Link
              href={`${path.brand}${item?.slug}`}
              className="flex items-center gap-[10px] w-full rounded-md bg-light_gray p-[6px]"
            >
              <div className="rounded-md bg-white relative w-24 aspect-video">
                <NextImage
                  src={item?.logo?.url}
                  alt={item?.name}
                  className="rounded-md"
                />
              </div>

              <h3 className="font-black line-clamp-1 flex-1">{item?.name}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SmallBrandSwiper;
