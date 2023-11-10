import ArticlesTable from "@/components/admin-articles-page/articles-table";
import AdminCardTitle from "@/components/admin-card-title";
import { NextPage } from "next";
import { MdEditSquare } from "react-icons/md";

interface Props {}

const AdminArticlesPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Bài viết"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />
        <ArticlesTable />
      </div>
    </div>
  );
};

export default AdminArticlesPage;
