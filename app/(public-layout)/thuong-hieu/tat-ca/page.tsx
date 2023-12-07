import AllBrandTypesTabs from "@/components/all-brands.page/all-brand-types-tabs";
import SmallBrandSwiper from "@/components/all-brands.page/small-brand-swiper";
import { getAllBrands } from "@/lib/fetch-brand-data";
import { getAllBrandTypes } from "@/lib/fetch-brand-type-data";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async () => {
  const brands = await getAllBrands("name logo slug");
  const brandTypes = await getAllBrandTypes("name");
  return (
    <>
      <div className="sub-page-cover">
        <div className="container pt-24">
          <h1 className="font-dancing font-bold text-admin_primary mb-2 text-[60px] text-center">
            Thương hiệu trong ngành du lịch
          </h1>
          <div className="mt-4">
            <SmallBrandSwiper items={brands} />
          </div>
        </div>
      </div>

      <AllBrandTypesTabs brandTypes={brandTypes} />
    </>
  );
};

export default Page;
