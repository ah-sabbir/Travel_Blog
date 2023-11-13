import BrandCategoriesTable from "@/components/admin-brand-categories-page/brand-categories-table";
import AdminCardTitle from "@/components/admin-card-title";
import TicketTypesTable from "@/components/admin-ticket-types-page/ticket-types-table";
import { NextPage } from "next";
import { IoTicket } from "react-icons/io5";
import { TbCategoryFilled } from "react-icons/tb";

interface Props {}

const AdminTicketTypesPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Danh mục vé"
          cardIconClasses="admin-main-gradient"
          icon={IoTicket}
          iconSize={22}
        />
        <TicketTypesTable />
      </div>
    </div>
  );
};

export default AdminTicketTypesPage;
