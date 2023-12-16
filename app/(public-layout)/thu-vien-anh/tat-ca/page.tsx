import AllGalleriesPageContent from "@/components/all-galleries-page/all-galleries-page-content";
import { Metadata, NextPage } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tất cả thư viện ảnh",
  description:
    "Tất cả thư viện ảnh với những hình ảnh sắc nét nhất, giúp bạn khám phá những câu chuyện, cảm hứng và ý tưởng du lịch độc đáo cho chuyến vi vu tiếp theo của bạn mà không cần đi đâu xa.",
};

interface Props {}

const Page: NextPage<Props> = async () => {
  return <AllGalleriesPageContent />;
};

export default Page;
