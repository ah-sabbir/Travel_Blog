import AdminCardTitle from "@/components/admin-card-title";
import EditRegionForm from "@/components/admin-regions-page/edit-region-form";
import EditTicketForm from "@/components/admin-tickets-page/edit-ticket-form";
import { getRegionBySlug } from "@/lib/fetch-region-data";
import { getTicketBySlug } from "@/lib/fetch-ticket-data";
import { NextPage } from "next";
import { MdEditSquare } from "react-icons/md";

interface Props {
  searchParams: { slug: string };
}

const EditTicketPage: NextPage<Props> = async ({ searchParams }) => {
  const ticket = await getTicketBySlug(searchParams.slug);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Cập nhật thông tin vé"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <EditTicketForm ticket={ticket} />
      </div>
    </div>
  );
};

export default EditTicketPage;
