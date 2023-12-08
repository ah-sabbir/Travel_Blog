import Link from "next/link";
import { FC } from "react";
import NextImage from "./next-image";
import { path } from "@/constant";
import { TicketEntity } from "@/entities/ticket.entity";
import { formatVNDCurrency } from "@/lib/format-price";
import { FaEarthAmericas, FaLocationDot } from "react-icons/fa6";
import { FaAccusoft } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import parse from "html-react-parser";

interface Props {
  ticket: TicketEntity;
}

const TicketCard: FC<Props> = ({ ticket }): JSX.Element => {
  return (
    <Link
      href={`${path.ticket}${ticket?.slug}`}
      className="block w-full rounded-md shadow-md border group"
    >
      <div className="w-full aspect-[1.5] relative overflow-hidden rounded-t-md">
        <NextImage
          src={ticket?.thumbnail?.url}
          alt={ticket?.name}
          className="rounded-t-md group-hover:scale-105 transition"
        />

        <div className="absolute top-4 right-4 admin-main-gradient text-white rounded-full w-12 h-12 grid place-items-center">
          <IoTicket size={30} />
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-xl font-bold leading-8 line-clamp-2">
          {ticket.name}
        </h4>

        <div className="text-sm mt-3 line-clamp-4 leading-7 prose">
          {parse(ticket.description)}
        </div>

        <ul className="flex items-center gap-4 justify-between text-[#838383] text-xs my-4 flex-wrap">
          {ticket.country.name && (
            <li className="flex items-center gap-1">
              Quốc gia:{" "}
              <span className="text-black_text font-semibold">
                {ticket.country.name}
              </span>
            </li>
          )}

          {ticket.region.name && (
            <li className="flex items-center gap-1">
              Khu vực:{" "}
              <span className="text-black_text font-semibold">
                {ticket.region.name}
              </span>
            </li>
          )}

          {ticket.brand.name && (
            <li className="flex items-center gap-1">
              Hãng vé:{" "}
              <span className="text-black_text font-semibold">
                {ticket.brand.name}
              </span>
            </li>
          )}
        </ul>

        <div className="admin-main-gradient text-white px-2 py-3 rounded-md text-center">
          Giá vé:{" "}
          <span className="font-bold text-xl">
            {formatVNDCurrency(ticket.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;
