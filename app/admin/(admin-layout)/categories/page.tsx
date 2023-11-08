import CategoriesTable from "@/components/admin-categories-page/categories-table";
import { NextPage } from "next";

interface Props {}

const AdminCategoriesPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <CategoriesTable />
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
