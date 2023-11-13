import AdminCardTitle from "@/components/admin-card-title";
import CreateTicketForm from "@/components/admin-tickets-page/create-ticket-form";
import { NextPage } from "next";
import { MdCreateNewFolder } from "react-icons/md";

interface Props {}

const CreateTicketPage: NextPage<Props> = () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Tạo vé mới"
          cardIconClasses="admin-main-gradient"
          icon={MdCreateNewFolder}
          iconSize={22}
        />

        <CreateTicketForm />
      </div>
    </div>
  );
};

export default CreateTicketPage;
