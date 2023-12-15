import { path } from "@/constant";
import { TicketTypeEntity } from "@/entities/ticketType.entity";
import { getAllTicketTypes } from "@/lib/fetch-ticket-type-data";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  currentId: string | undefined;
}

const OtherTicketTypes: FC<Props> = ({ currentId }): JSX.Element => {
  const [ticketTypes, setTicketTypes] = useState<TicketTypeEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchOtherTicketTypes = async () => {
    setIsLoading(true);
    const allTicketTypes = await getAllTicketTypes("name slug");

    const otherTicketTypes = allTicketTypes?.filter(
      (ticketType) => ticketType._id.toString() !== currentId
    );

    setTicketTypes(otherTicketTypes);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOtherTicketTypes();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="category-cards-grid">
          {[...Array(16).keys()].map((item) => (
            <Skeleton className="w-full h-[40px] !rounded-[40px]" key={item} />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-[10px] flex-wrap">
          {ticketTypes?.map((ticketType) => (
            <Link
              key={ticketType._id.toString()}
              href={`${path.ticketType}${ticketType.slug}`}
              className="header-dropdown-item !px-3 !block"
            >
              {ticketType.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default OtherTicketTypes;
