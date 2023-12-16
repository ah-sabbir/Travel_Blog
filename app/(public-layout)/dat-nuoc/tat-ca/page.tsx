import AllCountriesTabs from "@/components/all-countries-page/all-countries-tabs";
import SmallItemSwiper from "@/components/smaill-item-swiper";
import { path } from "@/constant";
import { getAllCountries } from "@/lib/fetch-country-data";
import { Metadata, NextPage } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tất cả đất nước",
  description:
    "Tất cả đất nước thế giới mà tôi đã ghé thăm. Khám phá những câu chuyện, cảm hứng và ý tưởng du lịch độc đáo cho chuyến vi vu tiếp theo của bạn.",
};

interface Props {}

const Page: NextPage<Props> = async () => {
  const countries = await getAllCountries("name slug thumbnail");
  return (
    <>
      <div className="sub-page-cover">
        <div className="container pt-24">
          <h1 className="sub-page-heading">Những quốc gia đã đi qua</h1>
          <div>
            <SmallItemSwiper items={countries} coreSlug={path.country} />
          </div>
        </div>
      </div>

      <AllCountriesTabs countries={countries} />
    </>
  );
};

export default Page;
