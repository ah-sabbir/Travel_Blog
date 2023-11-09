import AdminCardTitle from "@/components/admin-card-title";
import RegionsTable from "@/components/admin-regions-page/regions-table";
import { NextPage } from "next";
import { MdOutlineGpsFixed } from "react-icons/md";

interface Props {}

const AdminRegionPage: NextPage<Props> = () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Tỉnh - Vùng miền"
          cardIconClasses="admin-main-gradient"
          icon={MdOutlineGpsFixed}
          iconSize={22}
        />
        <RegionsTable />
      </div>
    </div>
  );
};

export default AdminRegionPage;
