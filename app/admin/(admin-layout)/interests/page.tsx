import AdminCardTitle from "@/components/admin-card-title";
import InterestsTable from "@/components/admin-interests-page/interests-table";
import { NextPage } from "next";
import { MdInterests } from "react-icons/md";

interface Props {}

const AdminInterestsPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Sở thích"
          cardIconClasses="admin-main-gradient"
          icon={MdInterests}
          iconSize={22}
        />
        <InterestsTable />
      </div>
    </div>
  );
};

export default AdminInterestsPage;
