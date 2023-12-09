import AllArticlesPageContent from "@/components/all-articles-page/all-articles-page-content";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async () => {
  return <AllArticlesPageContent />;
};

export default Page;
