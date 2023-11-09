import AdminCardTitle from "@/components/admin-card-title";
import CreateInterestForm from "@/components/admin-interests-page/create-interest-form";
import { NextPage } from "next";
import { MdCreateNewFolder } from "react-icons/md";

interface Props {}

const CreateInterestPage: NextPage<Props> = () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Tạo sở thích"
          cardIconClasses="admin-main-gradient"
          icon={MdCreateNewFolder}
          iconSize={22}
        />

        <CreateInterestForm />
      </div>
    </div>
  );
};

export default CreateInterestPage;
