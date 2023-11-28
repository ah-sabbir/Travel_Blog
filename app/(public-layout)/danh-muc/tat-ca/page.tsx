import AllCategoriesTabs from "@/components/all-categories-page/all-categories-tabs";
import AllCountriesTabs from "@/components/all-countries-page/all-countries-tabs";
import { domain } from "@/constant";
import { getAllCategories } from "@/lib/fetch-category-data";
import { getAllCountries } from "@/lib/fetch-country-data";
import { formatShortDate } from "@/lib/format-date";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const categories = await getAllCategories("name");
  return (
    <>
      <div className="sub-page-cover relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <h1 className="font-dancing font-bold text-admin_primary mb-2 text-[60px] text-center">
            Tất cả danh mục
          </h1>
          <p className="text-center text-lg font-semibold flex items-center gap-3 justify-center">
            Từ ngày 03/11/2023 đến {formatShortDate(new Date().toDateString())}
          </p>
        </div>
      </div>

      <AllCategoriesTabs categories={categories} />
    </>
  );
};

export default Page;
