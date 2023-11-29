"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import NextImage from "./next-image";
import { path } from "@/constant";
import { MdOutlineAdsClick } from "react-icons/md";

interface Props {
  items: any | undefined;
  span1?: string;
  span2?: string;
  coreSlug: string;
  isHomepage?: boolean;
}

const SmallItemSwiper: FC<Props> = ({
  items,
  span1 = "Where to",
  span2 = "next?",
  coreSlug,
  isHomepage,
}): JSX.Element => {
  return (
    <div className="flex items-center gap-6">
      <div className="w-[94px] text-black_text font-black">
        <p className="text-lg">{span1}</p>
        <p className="text-[34px] -mt-4">{span2}</p>
      </div>

      <Swiper
        modules={[Autoplay]}
        className="w-full"
        spaceBetween={10}
        slidesPerView={isHomepage ? 6 : 7}
        slidesPerGroup={1}
        autoplay={{ delay: 2000 }}
        speed={500}
        navigation={false}
        loop={true}
      >
        {items?.map((item: any) => (
          <SwiperSlide key={item?._id?.toString()}>
            <Link
              href={`${coreSlug}${item?.slug}`}
              className="flex items-center gap-[10px] w-full rounded-[40px] bg-light_gray p-[6px]"
            >
              <div className="circle-radius border border-white relative w-11 h-11">
                <NextImage
                  src={item?.thumbnail?.url}
                  alt={item?.name}
                  className="circle-radius"
                />
              </div>

              <h3 className="font-black line-clamp-1 flex-1">{item?.name}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {isHomepage && (
        <Link
          href={`${path.allRegions}`}
          className="w-[200px] flex items-center gap-[10px] rounded-[40px] bg-light_gray p-[6px]"
        >
          <div className="circle-radius border border-white relative w-11 h-11 grid place-items-center">
            <MdOutlineAdsClick size={18} />
          </div>

          <h3 className="font-black line-clamp-1 flex-1 underline">
            Xem tất cả
          </h3>
        </Link>
      )}
    </div>
  );
};

export default SmallItemSwiper;
