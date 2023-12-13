import { FC } from "react";
import NextImage from "./next-image";
import Link from "next/link";
import { path } from "@/constant";

interface Props {
  image: string;
  title: string;
  slug: string;
  isLastItem?: boolean;
  isMedium?: boolean;
}

const SmallArticleCard: FC<Props> = ({
  image,
  title,
  slug,
  isLastItem,
  isMedium,
}): JSX.Element => {
  return (
    <Link
      href={`${path.article}${slug}`}
      className={`flex items-center gap-4 p-2 hover:bg-light_gray transition group ${
        !isLastItem && "border-b border-light_gray"
      } hover:rounded-md hover:border-transparent`}
    >
      <div
        className={`relative ${
          isMedium ? "w-[126px] max-[700px]:w-[90px]" : "w-[90px]"
        } aspect-[1.5] overflow-hidden rounded-md`}
      >
        <NextImage
          src={image}
          alt={title}
          className="rounded-md group-hover:scale-105 transition"
        />
      </div>

      <h4
        className={`flex-1 font-black line-clamp-2 tracking-tight text-black_text ${
          isMedium ? "text-xl max-[700px]:text-base" : "text-base"
        }`}
      >
        {title}
      </h4>
    </Link>
  );
};

export default SmallArticleCard;
