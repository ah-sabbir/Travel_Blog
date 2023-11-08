import AdminCardTitle from "@/components/admin-card-title";
import CategoriesTable from "@/components/admin-categories-page/categories-table";
import BtnWithIcon from "@/components/btn-with-icon";
import { getAllCategories } from "@/lib/fetch-category-data";
import { NextPage } from "next";
import { BiPlusCircle } from "react-icons/bi";
import { MdCategory } from "react-icons/md";

interface Props {}

const AdminCategoriesPage: NextPage<Props> = async () => {
  //   const categories = await getAllCategories();

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <CategoriesTable />
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
