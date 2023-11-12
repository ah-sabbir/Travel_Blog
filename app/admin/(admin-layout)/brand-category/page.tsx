import BrandCategoriesTable from "@/components/admin-brand-categories-page/brand-categories-table";
import AdminCardTitle from "@/components/admin-card-title";
import { NextPage } from "next";
import { MdCategory } from "react-icons/md";

interface Props {}

const AdminBrandCategoriesPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Danh mục thương hiệu"
          cardIconClasses="admin-main-gradient"
          icon={MdCategory}
          iconSize={22}
        />
        <BrandCategoriesTable />
      </div>
    </div>
  );
};

export default AdminBrandCategoriesPage;
