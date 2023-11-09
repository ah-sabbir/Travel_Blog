import AdminCardTitle from "@/components/admin-card-title";
import CountriesTable from "@/components/admin-countries-page/countries-table";
import { NextPage } from "next";
import { MdOutlinePublic } from "react-icons/md";

interface Props {}

const AdminCountriesPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Quốc gia"
          cardIconClasses="admin-main-gradient"
          icon={MdOutlinePublic}
          iconSize={22}
        />
        <CountriesTable />
      </div>
    </div>
  );
};

export default AdminCountriesPage;
