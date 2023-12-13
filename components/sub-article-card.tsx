import { FC } from "react";
import NextImage from "./next-image";
import Link from "next/link";

interface Props {
  image: string;
  title: string;
  slug: string;
}

const SubArticleCard: FC<Props> = ({ image, title, slug }): JSX.Element => {
  return (
    <Link
      href={slug}
      className="block w-full aspect-[1.5] max-[766px]:aspect-[3] max-[500px]:aspect-[2] max-[400px]:aspect-[1.5] rounded-md relative overflow-hidden"
    >
      <NextImage
        src={image}
        alt={title}
        className="rounded-md hover:scale-105 transition"
      />
      <div className="bg-transparent absolute top-6 right-10 left-10">
        <span className="font-bold text-lg max-[500px]:text-base bg-white rounded-md leading-10 py-1 box-decoration-clone shadow-[0.4em_0_0_#fff,-0.4em_0_0_#fff]">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default SubArticleCard;
