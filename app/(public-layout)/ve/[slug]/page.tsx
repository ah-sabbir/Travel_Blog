import BtnWithIcon from "@/components/btn-with-icon";
import NextImage from "@/components/next-image";
import TicketDescription from "@/components/ticket-page/ticket-description";
import TicketImages from "@/components/ticket-page/ticket-images";
import TicketTabs from "@/components/ticket-page/ticket-tabs";
import { path } from "@/constant";
import { getTicketBySlug } from "@/lib/fetch-ticket-data";
import { formatVNDCurrency } from "@/lib/format-price";
import { NextPage } from "next";
import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdAirplaneTicket } from "react-icons/md";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const ticket = await getTicketBySlug(params.slug, true);

  return (
    <>
      <div className="container mt-28">
        <div className="flex gap-16">
          <div className="w-[55%]">
            <div className="flex items-center gap-2">
              <BtnWithIcon
                icon={FaAngleLeft}
                content=""
                customClasses="grid place-items-center h-[28px] w-[28px] !p-0 !rounded-full before:!rounded-full !text-sm"
                to={path.allTickets}
              />

              {ticket?.country?.name && (
                <BtnWithIcon
                  to={`${path.country}${ticket?.country?.slug}`}
                  content={ticket?.country?.name}
                  customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
                />
              )}

              {ticket?.region?.name && (
                <BtnWithIcon
                  to={`${path.region}${ticket?.region?.slug}`}
                  content={ticket?.region?.name}
                  customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
                />
              )}

              {ticket?.brand?.name && (
                <BtnWithIcon
                  to={`${path.brand}${ticket?.brand?.slug}`}
                  content={ticket?.brand?.name}
                  customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
                />
              )}
            </div>

            <h1 className="font-dancing font-bold text-[50px] text-admin_primary mt-8 mb-6">
              {ticket?.name}
            </h1>

            <span className="text-3xl block mb-6">
              Giá vé: <strong>{formatVNDCurrency(ticket?.price)}</strong>
            </span>

            <TicketDescription description={ticket?.description} />
          </div>

          <div className="flex-1 border shadow-md rounded-md h-fit">
            <div className="w-full relative aspect-video rounded-t-md">
              <NextImage
                src={ticket?.thumbnail?.url || ""}
                alt={ticket?.name || ""}
                priority
                className="rounded-t-md"
              />
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center justify-between pt-2 pb-4 border-b">
                <span className="flex items-center gap-1">
                  <BiSolidDashboard />
                  Loại vé :{" "}
                </span>
                <Link
                  href={`${path.ticketType}${ticket?.ticketType?.slug}`}
                  className="font-semibold text-admin_primary underline"
                >
                  {ticket?.ticketType?.name}
                </Link>
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <span className="flex items-center gap-1 flex-1">
                  <MdAirplaneTicket />
                  Hãng vé :{" "}
                </span>

                <div className="flex items-center gap-1">
                  <a
                    href={ticket?.brand?.affLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-video relative w-[100px] rounded-md"
                  >
                    <NextImage
                      src={ticket?.brand.logo.url || ""}
                      alt={ticket?.brand?.name || ""}
                      className="rounded-md"
                    />
                  </a>
                </div>
              </div>

              <BtnWithIcon
                content={`Mua vé tại ${ticket?.brand.name}`}
                iconBehind={FiExternalLink}
                iconCustomClasses="-mt-2"
                iconSize={14}
                customClasses="!mt-6 !mb-4 !w-full !text-lg !block"
                external
                href={ticket?.link}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <TicketImages images={ticket?.images} />
        </div>

        <div className="mt-10">
          <TicketTabs ticket={ticket} />
        </div>
      </div>
    </>
  );
};

export default Page;
