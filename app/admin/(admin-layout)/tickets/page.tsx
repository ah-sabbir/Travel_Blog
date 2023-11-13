import AdminCardTitle from "@/components/admin-card-title";
import TicketsTable from "@/components/admin-tickets-page/tickets-table";
import { NextPage } from "next";
import { MdAirplaneTicket } from "react-icons/md";

interface Props {}

const AdminTicketPage: NextPage<Props> = () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Vé"
          cardIconClasses="admin-main-gradient"
          icon={MdAirplaneTicket}
          iconSize={22}
        />
        <TicketsTable />
      </div>
    </div>
  );
};

export default AdminTicketPage;
