import Link from "next/link";
import { FC } from "react";
import NextImage from "./next-image";
import { MdOutlineLocationOn } from "react-icons/md";
import { path } from "@/constant";

interface Props {
  destination: any;
  countryName?: string;
}

const DestinationCard: FC<Props> = ({
  destination,
  countryName,
}): JSX.Element => {
  return (
    <Link
      href={`${path.destination}${destination.slug}`}
      className="group overflow-hidden block relative w-full aspect-[0.755] rounded-md after:rounded-md after:bg-[linear-gradient(_0,rgba(0,0,0,0.168627451)_50%,rgba(0,0,0,0.3490196078)_85%_)] after:content-[''] after:absolute after:z-0 after:inset-0"
    >
      <NextImage
        src={destination?.thumbnail.url}
        alt={destination?.name}
        className="rounded-md group-hover:scale-105 transition"
      />

      <div className="absolute bottom-3 left-4 text-white z-[1]">
        <h3 className="font-extrabold text-2xl">{destination?.name}</h3>
        <p className="flex items-center gap-1 text-lg">
          <MdOutlineLocationOn />
          {destination?.country?.name || countryName}
        </p>
      </div>
    </Link>
  );
};

export default DestinationCard;
