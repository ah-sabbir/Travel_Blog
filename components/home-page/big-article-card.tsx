import { ArticleEntity } from "@/entities/article.entity";
import Link from "next/link";
import { FC } from "react";
import StyledIcon from "../styled-icon";
import { iconPosition } from "@/constant";
import NextImage from "../next-image";

interface Props {
  article: ArticleEntity | undefined;
  order: number;
}

const BigArticleCard: FC<Props> = ({ article, order }): JSX.Element => {
  return (
    <Link
      href={`/bai-viet/${article?.slug}`}
      className="block w-full text-black_text relative"
    >
      {order === 0 && (
        <span className="bg-white block z-0 absolute w-[100px] h-[100px] circle-radius -top-[10px] left-1/2 -translate-x-1/2"></span>
      )}
      <StyledIcon
        position={
          order === 0
            ? iconPosition.earth
            : order === 1
            ? iconPosition.foot
            : iconPosition.plane
        }
        wrapperClasses="w-[70px] h-[70px] mx-auto"
      />

      <p className="relative z-[1] text-center font-extrabold my-2">
        {article?.country.name}
      </p>
      <h3 className="text-center w-[90%] mx-auto text-2xl font-black line-clamp-2">
        {article?.name}
      </h3>

      <div className="w-full aspect-[1.5] relative mt-4">
        <NextImage
          src={article?.thumbnail.url || ""}
          alt={article?.name || ""}
          className="rounded-md"
        />
      </div>
    </Link>
  );
};

export default BigArticleCard;
