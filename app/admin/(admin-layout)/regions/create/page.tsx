import AdminCardTitle from "@/components/admin-card-title";
import CreateRegionForm from "@/components/admin-regions-page/create-region-form";
import { NextPage } from "next";
import { MdCreateNewFolder } from "react-icons/md";

interface Props {}

const CreateRegionPage: NextPage<Props> = () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Tạo tỉnh / vùng miền"
          cardIconClasses="admin-main-gradient"
          icon={MdCreateNewFolder}
          iconSize={22}
        />

        <CreateRegionForm />
      </div>
    </div>
  );
};

export default CreateRegionPage;
