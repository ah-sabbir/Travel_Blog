import AllCategoriesTabs from "@/components/all-categories-page/all-categories-tabs";
import { getAllCategories } from "@/lib/fetch-category-data";
import { formatShortDate } from "@/lib/format-date";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async () => {
  const categories = await getAllCategories("name");
  return (
    <>
      <div className="sub-page-cover">
        <div className="pt-28 mx-4">
          <h1 className="sub-page-heading">Tất cả danh mục</h1>
          <p className="sub-page-sub-heading">
            Từ ngày 03/11/2023 đến {formatShortDate(new Date().toDateString())}
          </p>
        </div>
      </div>

      <AllCategoriesTabs categories={categories} />
    </>
  );
};

export default Page;
