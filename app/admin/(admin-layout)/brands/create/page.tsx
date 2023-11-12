import CreateBrandForm from "@/components/admin-brands-page/create-brand-form";
import AdminCardTitle from "@/components/admin-card-title";
import { NextPage } from "next";
import { MdCreateNewFolder } from "react-icons/md";

interface Props {}

const CreateBrandPage: NextPage<Props> = () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Tạo thương hiệu"
          cardIconClasses="admin-main-gradient"
          icon={MdCreateNewFolder}
          iconSize={22}
        />

        <CreateBrandForm />
      </div>
    </div>
  );
};

export default CreateBrandPage;
