import AdminCardTitle from "@/components/admin-card-title";
import CountriesTable from "@/components/admin-countries-page/countries-table";
import DestinationsTable from "@/components/admin-destinations-page/destinations-table";
import { NextPage } from "next";
import { MdAddLocationAlt, MdOutlinePublic } from "react-icons/md";

interface Props {}

const AdminDestinationsPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Địa danh"
          cardIconClasses="admin-main-gradient"
          icon={MdAddLocationAlt}
          iconSize={22}
        />
        <DestinationsTable />
      </div>
    </div>
  );
};

export default AdminDestinationsPage;
