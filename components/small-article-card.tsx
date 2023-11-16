import { FC } from "react";
import NextImage from "./next-image";

interface Props {
  image: string;
  title: string;
  slug: string;
}

const SmallArticleCard: FC<Props> = ({ image, title, slug }): JSX.Element => {
  return (
    <article className="flex items-center gap-4 p-2 hover:bg-light_gray transition rounded-md">
      <div className="relative w-[90px] aspect-[1.5]">
        <NextImage src={image} alt={title} className="rounded-md" />
      </div>

      <h3 className="flex-1 font-black line-clamp-2 tracking-tight">{title}</h3>
    </article>
  );
};

export default SmallArticleCard;
