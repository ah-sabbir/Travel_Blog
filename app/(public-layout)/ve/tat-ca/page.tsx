import AllBrandTypesTabs from "@/components/all-brands.page/all-brand-types-tabs";
import SmallBrandSwiper from "@/components/all-brands.page/small-brand-swiper";
import AllBrandsTabs from "@/components/all-tickets-page/all-brands-tabs";
import { getAllBrands } from "@/lib/fetch-brand-data";
import { getAllBrandTypes } from "@/lib/fetch-brand-type-data";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async () => {
  const brands = await getAllBrands("name logo slug");
  return (
    <>
      <div className="sub-page-cover">
        <div className="container pt-24">
          <h1 className="font-dancing font-bold text-admin_primary mb-2 text-[60px] text-center">
            Chọn hãng vé yêu thích của bạn
          </h1>
          <div className="mt-4">
            <SmallBrandSwiper items={brands} />
          </div>
        </div>
      </div>

      <AllBrandsTabs brands={brands} />
    </>
  );
};

export default Page;
