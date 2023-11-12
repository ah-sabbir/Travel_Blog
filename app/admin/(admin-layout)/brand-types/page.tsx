import BrandCategoriesTable from "@/components/admin-brand-categories-page/brand-categories-table";
import AdminCardTitle from "@/components/admin-card-title";
import { NextPage } from "next";
import { TbCategoryFilled } from "react-icons/tb";

interface Props {}

const AdminBrandCategoriesPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Danh mục thương hiệu"
          cardIconClasses="admin-main-gradient"
          icon={TbCategoryFilled}
          iconSize={22}
        />
        <BrandCategoriesTable />
      </div>
    </div>
  );
};

export default AdminBrandCategoriesPage;
