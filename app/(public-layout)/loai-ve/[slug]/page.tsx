import TicketTypeTabs from "@/components/ticket-type-page/ticket-type-tabs";
import { getTicketTypeBySlug } from "@/lib/fetch-ticket-type-data";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const ticketType = await getTicketTypeBySlug(params.slug);

    return {
      title: ticketType?.name,
      description: `
    Những loại vế giá rẻ nhất thuộc loại ${ticketType?.name} mà tôi muốn gợi ý cho chuyến du lịch vi vu tiếp theo của bạn.
      `,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const ticketType = await getTicketTypeBySlug(params.slug);
  return (
    <>
      <div className="sub-page-cover">
        <div className="container pt-24">
          <h1 className="sub-page-heading">{ticketType?.name}</h1>
          <p className="sub-page-sub-heading">
            Tìm thấy {ticketType?.tickets.length} vé thuộc danh mục{" "}
            {ticketType?.name}
          </p>
        </div>
      </div>

      <TicketTypeTabs ticketType={ticketType} />
    </>
  );
};

export default Page;
