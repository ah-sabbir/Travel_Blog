import CategoryTabs from "@/components/category-page/category-tabs";
import { getCategoryBySlug } from "@/lib/fetch-category-data";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const category = await getCategoryBySlug(params.slug);

    return {
      title: category?.name,
      description: `Tất cả bài viết thuộc danh mục ${category?.name}. Khám phá những câu chuyện, cảm hứng và ý tưởng du lịch độc đáo cho chuyến vi vu tiếp theo của bạn.`,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const category = await getCategoryBySlug(params.slug);

  return (
    <>
      <div className="sub-page-cover relative">
        <div className="pt-28 mx-4">
          <h1 className="sub-page-heading">Danh mục {category?.name}</h1>
          <p className="sub-page-sub-heading">
            <span>{category?.articles.length} bài viết</span>|
            <span>{category?.galleries.length} thư viện ảnh</span>
          </p>
        </div>
      </div>

      <CategoryTabs categoryId={category?._id.toString()} />
    </>
  );
};

export default Page;
