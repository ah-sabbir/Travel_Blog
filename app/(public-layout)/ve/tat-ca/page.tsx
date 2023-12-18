import SmallBrandSwiper from "@/components/all-brands.page/small-brand-swiper";
import AllBrandsTabs from "@/components/all-tickets-page/all-brands-tabs";
import { getAllBrands } from "@/lib/fetch-brand-data";
import { Metadata, NextPage } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tất cả vé giá rẻ",
  description:
    "Những chiếc vé giả rẻ thuộc một số thương hiệu uy tín được đánh giá cao mà tôi cảm thấy phù hợp và muốn gợi ý cho chuyến du lịch vi vu tiếp theo của bạn.",
};

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
