import SmallBrandSwiper from "@/components/all-brands.page/small-brand-swiper";
import { getAllBrands } from "@/lib/fetch-brand-data";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async () => {
  const brands = await getAllBrands("name logo slug");
  return (
    <>
      <div className="sub-page-cover">
        <div className="container pt-24">
          <h1 className="font-dancing font-bold text-admin_primary mb-2 text-[60px] text-center">
            Thương hiệu trong ngành du lịch
          </h1>
          <div>
            <SmallBrandSwiper items={brands} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
