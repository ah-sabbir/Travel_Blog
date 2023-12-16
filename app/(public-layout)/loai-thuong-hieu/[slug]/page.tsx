import BrandTypeTabs from "@/components/brand-type-page/brand-type-tabs";
import { getBrandTypeBySlug } from "@/lib/fetch-brand-type-data";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const brandType = await getBrandTypeBySlug(params.slug);

    return {
      title: brandType?.name,
      description: `
    Các thương hiệu thuộc loại ${brandType?.name} mà tôi muốn gợi ý cho chuyến du lịch vi vu tiếp theo của bạn.
      `,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const brandType = await getBrandTypeBySlug(params.slug);
  return (
    <>
      <div className="sub-page-cover">
        <div className="container pt-24">
          <h1 className="sub-page-heading">{brandType?.name}</h1>
          <p className="sub-page-sub-heading">
            Tìm thấy {brandType?.brands.length} thương hiệu thuộc danh mục{" "}
            {brandType?.name}
          </p>
        </div>
      </div>

      <BrandTypeTabs brandType={brandType} />
    </>
  );
};

export default Page;
