import CategoryTabs from "@/components/category-page/category-tabs";
import { getCategoryBySlug } from "@/lib/fetch-category-data";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const category = await getCategoryBySlug(params.slug);

  return (
    <>
      <div className="sub-page-cover relative">
        <div className="text-center pt-28 mx-4">
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
