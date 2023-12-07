import Link from "next/link";
import { FC } from "react";
import NextImage from "./next-image";
import { formatShortDate } from "@/lib/format-date";
import { TiPen } from "react-icons/ti";
import { ImClock } from "react-icons/im";
import { path } from "@/constant";

interface Props {
  gallery: any;
}

const GalleryCard: FC<Props> = ({ gallery }): JSX.Element => {
  return (
    <Link
      href={`${path.gallery}${gallery?.slug}`}
      className="block w-full rounded-md shadow-md border group"
    >
      <div className="w-full aspect-[1.5] relative overflow-hidden rounded-t-md">
        <NextImage
          src={gallery?.thumbnail?.url}
          alt={gallery?.name}
          className="rounded-t-md group-hover:scale-105 transition"
        />
      </div>

      <div className="p-6">
        <h4 className="text-xl font-bold leading-8 text-black_text line-clamp-2">
          {gallery.name}
        </h4>
        <p className="text-sm mt-3 line-clamp-3 leading-7">
          {gallery.description}
        </p>
        <p className="flex items-center gap-4 text-[#838383] text-xs mt-4">
          <span className="flex items-center gap-[3px]">
            <ImClock size={11} className="-mt-[2px]" />
            Ngày đăng: {formatShortDate(gallery?.updatedAt)}
          </span>
          {gallery?.author?.name && (
            <span className="flex items-center gap-[2px]">
              <TiPen size={14} className="-mt-[2px]" />
              Tác giả: {gallery.author.name}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default GalleryCard;
