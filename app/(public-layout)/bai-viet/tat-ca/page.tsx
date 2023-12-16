import AllArticlesPageContent from "@/components/all-articles-page/all-articles-page-content";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Tất cả bài viết",
  description:
    "Tất cả bài viết về bí kíp du lịch chinh phục thế giới. Khám phá những câu chuyện, cảm hứng và ý tưởng du lịch độc đáo cho chuyến vi vu tiếp theo của bạn.",
};

interface Props {}

const Page: NextPage<Props> = async () => {
  return <AllArticlesPageContent />;
};

export default Page;
