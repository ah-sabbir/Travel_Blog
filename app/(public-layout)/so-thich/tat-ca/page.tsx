import AllInterestsTabs from "@/components/all-interests-page/all-interests-tabs";
import SmallItemSwiper from "@/components/smaill-item-swiper";
import { path } from "@/constant";
import { getAllInterests } from "@/lib/fetch-interest-data";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async () => {
  const interests = await getAllInterests("name thumbnail slug");
  return (
    <>
      <div className="sub-page-cover">
        <div className="container pt-24">
          <h1 className="sub-page-heading">Tìm đọc theo sở thích</h1>
          <div>
            <SmallItemSwiper items={interests} coreSlug={path.interest} />
          </div>
        </div>
      </div>

      <AllInterestsTabs interests={interests} />
    </>
  );
};

export default Page;
