import AllInterestsTabs from "@/components/all-interests-page/all-interests-tabs";
import SmallItemSwiper from "@/components/smaill-item-swiper";
import { path } from "@/constant";
import { getAllInterests } from "@/lib/fetch-interest-data";
import { Metadata, NextPage } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tất cả sở thích",
  description:
    "Tất cả bài viết được phân loại theo sở thích như Đảo, Núi, Khu vui chơi, ... với nội dung đề cập đến những bí kíp du lịch chinh phục thế giới. Khám phá những câu chuyện, cảm hứng và ý tưởng du lịch độc đáo cho chuyến vi vu tiếp theo của bạn.",
};

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
