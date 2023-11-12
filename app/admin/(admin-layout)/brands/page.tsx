import BrandsTable from "@/components/admin-brands-page/brands-table";
import AdminCardTitle from "@/components/admin-card-title";
import { NextPage } from "next";
import { IoMdPricetags } from "react-icons/io";

interface Props {}

const AdminBrandsPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Thương hiệu"
          cardIconClasses="admin-main-gradient"
          icon={IoMdPricetags}
          iconSize={22}
        />
        <BrandsTable />
      </div>
    </div>
  );
};

export default AdminBrandsPage;
