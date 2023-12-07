import { TicketEntity } from "@/entities/ticket.entity";
import { FC } from "react";
import NextImage from "../next-image";
import { formatVNDCurrency } from "@/lib/format-price";
import BtnWithIcon from "../btn-with-icon";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import { path } from "@/constant";

interface Props {
  ticket: TicketEntity | undefined;
}

const TicketCTA: FC<Props> = ({ ticket }): JSX.Element => {
  return (
    <div className="sticky block top-28 max-h-[490px]">
      <div className="rounded-md shadow-md h-fit mt-3 border">
        <Link
          href={`${path.brand}${ticket?.brand.slug}`}
          className="rounded-t-md relative w-full aspect-video block"
        >
          <NextImage
            src={ticket?.brand.logo.url || ""}
            alt={ticket?.brand.name || ""}
            className="rounded-t-md"
          />
        </Link>

        <div className="p-4">
          <div className="text-center">
            Giá tham khảo :&nbsp;
            <span className="text-admin_primary font-bold text-2xl">
              {formatVNDCurrency(ticket?.price)}
            </span>
          </div>

          <BtnWithIcon
            content={`Tìm hiểu thêm`}
            iconBehind={FiExternalLink}
            iconCustomClasses="-mt-2"
            iconSize={14}
            customClasses="!mt-4 !mb-2 !w-full !text-lg !block"
            external
            href={ticket?.link}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketCTA;
