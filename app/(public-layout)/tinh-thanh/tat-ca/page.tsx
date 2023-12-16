import AllRegionsTabs from "@/components/all-regions-page/all-regions-tabs";
import SmallItemSwiper from "@/components/smaill-item-swiper";
import { path } from "@/constant";
import { getAllRegions } from "@/lib/fetch-region-data";
import { Metadata, NextPage } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tất cả tỉnh / thành",
  description:
    "Tất cả tỉnh / thành thuộc một số quốc gia trên thế giới mà tôi đã ghé thăm. Khám phá những câu chuyện, cảm hứng và ý tưởng du lịch độc đáo cho chuyến vi vu tiếp theo của bạn.",
};

interface Props {}

const Page: NextPage<Props> = async () => {
  const regions = await getAllRegions("name slug thumbnail");
  return (
    <>
      <div className="sub-page-cover">
        <div className="container pt-24">
          <h1 className="sub-page-heading">Những tỉnh / thành đã ghé thăm</h1>
          <div>
            <SmallItemSwiper items={regions} coreSlug={path.region} />
          </div>
        </div>
      </div>

      <AllRegionsTabs regions={regions} />
    </>
  );
};

export default Page;
