import { FC } from "react";
import Link from "next/link";
import { path } from "@/constant";
import NextImage from "../next-image";

interface Props {
  image: string;
  title: string;
  slug: string;
  isLastItem?: boolean;
}

const SmallInterestCard: FC<Props> = ({
  image,
  title,
  slug,
  isLastItem,
}): JSX.Element => {
  return (
    <Link
      href={`${path.interest}${slug}`}
      className={`flex items-center gap-4 p-2 hover:bg-light_gray transition group ${
        !isLastItem && "border-b border-light_gray"
      } hover:rounded-md hover:border-transparent`}
    >
      <div className="relative w-[90px] aspect-[1.5] overflow-hidden rounded-md">
        <NextImage
          src={image}
          alt={title}
          className="rounded-md group-hover:scale-105 transition"
        />
      </div>

      <h4
        className="flex-1 font-black line-clamp-2 tracking-tight text-black_text text-sm
        "
      >
        {title}
      </h4>
    </Link>
  );
};

export default SmallInterestCard;
