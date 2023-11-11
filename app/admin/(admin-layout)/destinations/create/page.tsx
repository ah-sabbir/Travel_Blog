import AdminCardTitle from "@/components/admin-card-title";
import CreateDestinationForm from "@/components/admin-destinations-page/create-destination-form";
import { NextPage } from "next";
import { MdCreateNewFolder } from "react-icons/md";

interface Props {}

const CreateDestinationPage: NextPage<Props> = () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Tạo điểm đến"
          cardIconClasses="admin-main-gradient"
          icon={MdCreateNewFolder}
          iconSize={22}
        />

        <CreateDestinationForm />
      </div>
    </div>
  );
};

export default CreateDestinationPage;
