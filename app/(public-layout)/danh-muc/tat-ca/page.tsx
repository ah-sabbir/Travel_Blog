import AllCategoriesTabs from "@/components/all-categories-page/all-categories-tabs";
import { webCreatedDate } from "@/constant";
import { getAllCategories } from "@/lib/fetch-category-data";
import { formatShortDate } from "@/lib/format-date";
import { Metadata, NextPage } from "next";

interface Props {}

export const metadata: Metadata = {
  title: "Tất cả danh mục",
  description:
    "Tất cả danh mục bài viết về bí kíp du lịch chinh phục thế giới. Khám phá những câu chuyện, cảm hứng và ý tưởng du lịch độc đáo cho chuyến vi vu tiếp theo của bạn.",
};

const Page: NextPage<Props> = async () => {
  const categories = await getAllCategories("name");
  return (
    <>
      <div className="sub-page-cover">
        <div className="pt-28 mx-4">
          <h1 className="sub-page-heading">Tất cả danh mục</h1>
          <p className="sub-page-sub-heading">
            Từ ngày {webCreatedDate} đến{" "}
            {formatShortDate(new Date().toDateString())}
          </p>
        </div>
      </div>

      <AllCategoriesTabs categories={categories} />
    </>
  );
};

export default Page;
