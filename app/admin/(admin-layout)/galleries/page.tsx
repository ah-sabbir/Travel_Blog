import ArticlesTable from "@/components/admin-articles-page/articles-table";
import AdminCardTitle from "@/components/admin-card-title";
import GalleriesTable from "@/components/admin-galleries-page/galleries-table";
import { NextPage } from "next";
import { MdEditSquare } from "react-icons/md";

interface Props {}

const AdminGalleriesPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Galleries"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />
        <GalleriesTable />
      </div>
    </div>
  );
};

export default AdminGalleriesPage;
