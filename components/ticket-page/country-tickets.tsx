import { FC, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { TicketEntity } from "@/entities/ticket.entity";
import TicketCard from "../ticket-card";
import { getSameCountryTickets } from "@/lib/fetch-ticket-data";

interface Props {
  ticketId: string | undefined;
  countryId: string | undefined;
}

const CountryTickets: FC<Props> = ({ ticketId, countryId }): JSX.Element => {
  const [tickets, setTickets] = useState<TicketEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    if (!countryId) {
      return;
    }

    setIsLoading(true);
    const data = await getSameCountryTickets(
      ticketId,
      countryId,
      currentPage,
      6
    );
    setTickets(data?.tickets || []);
    setTotalPages(data?.totalPages || 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [ticketId, countryId, currentPage]);

  return (
    <div>
      <>
        {isLoading ? (
          <div className="grid grid-cols-3 gap-6">
            {[...Array(6).keys()].map((item) => (
              <Skeleton className="w-full aspect-[0.755]" key={item} />
            ))}
          </div>
        ) : (
          <>
            {tickets && tickets?.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 gap-6">
                  {tickets?.map((ticket) => (
                    <TicketCard key={ticket._id.toString()} ticket={ticket} />
                  ))}
                </div>
                <div className="w-fit pagination pt-12 mx-auto">
                  <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                    previousLabel="Trang trước"
                    nextLabel="Trang sau"
                  />
                </div>
              </div>
            ) : (
              <p>Không tìm thấy loại vé nào</p>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default CountryTickets;
