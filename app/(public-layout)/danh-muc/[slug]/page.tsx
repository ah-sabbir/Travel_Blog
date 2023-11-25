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
      <div className="category-page-cover relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <h1 className="font-dancing font-bold text-admin_primary text-[60px] mb-3">
            Danh mục {category?.name}
          </h1>
          <p className="text-center text-xl font-semibold flex items-center gap-3 justify-center">
            <span>{category?.articles.length} bài viết</span>|
            <span>{category?.galleries.length} thư viện ảnh</span>
          </p>
        </div>
      </div>

      <CategoryTabs
        articles={category?.articles}
        galleries={category?.galleries}
        categoryId={category?._id.toString()}
      />
    </>
  );
};

export default Page;
