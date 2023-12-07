import { path } from "@/constant";
import { BrandEntity } from "@/entities/brand.entity";
import Link from "next/link";
import { FC } from "react";
import NextImage from "./next-image";

interface Props {
  brand: BrandEntity;
}

const BrandCard: FC<Props> = ({ brand }): JSX.Element => {
  return (
    <Link
      href={`${path.brand}${brand?.slug}`}
      className="block w-full rounded-md shadow-md border group"
    >
      <div className="w-full aspect-[1.78] relative overflow-hidden rounded-t-md">
        <NextImage
          src={brand?.logo?.url}
          alt={brand?.name}
          className="rounded-t-md group-hover:scale-105 transition"
        />
      </div>

      <div className="p-6">
        <p className="text-white rounded-[40px] admin-main-gradient text-xs py-1 px-2 mb-4 w-fit">
          {brand.brandType.name}
        </p>

        <h4 className="text-xl font-bold leading-8 text-black_text line-clamp-2">
          {brand.name}
        </h4>
        <p className="text-sm mt-3 line-clamp-3 leading-7">
          {brand.description}
        </p>
      </div>
    </Link>
  );
};

export default BrandCard;
