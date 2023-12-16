import AllGalleriesPageContent from "@/components/all-galleries-page/all-galleries-page-content";
import { NextPage } from "next";
export const dynamic = "force-dynamic";

interface Props {}

const Page: NextPage<Props> = async () => {
  return <AllGalleriesPageContent />;
};

export default Page;
