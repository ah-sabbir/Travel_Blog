import AllRegionsTabs from "@/components/all-regions-page/all-regions-tabs";
import SmallItemSwiper from "@/components/smaill-item-swiper";
import { path } from "@/constant";
import { getAllRegions } from "@/lib/fetch-region-data";
import { NextPage } from "next";

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
