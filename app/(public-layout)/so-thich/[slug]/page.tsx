import InterestTabs from "@/components/interest-page/interest-tabs";
import NextImage from "@/components/next-image";
import { getInterestBySlug } from "@/lib/fetch-interest-data";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const interest = await getInterestBySlug(params.slug);

  return (
    <>
      <div className="page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src={interest?.thumbnail.url || ""}
            alt={interest?.name || ""}
            priority
          />
        </div>
      </div>
      <div className="container flex mt-28">
        <div className="w-[45%]">
          <h1 className="font-dancing font-bold text-[70px] text-admin_primary">
            {interest?.name}
          </h1>
          <p className="leading-8 text-justify">{interest?.description}</p>
        </div>

        <div className="h-[550px]"></div>
      </div>

      <div className="container">
        <InterestTabs interestId={interest?._id.toString()} />
      </div>
    </>
  );
};

export default Page;
