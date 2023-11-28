import InterestTabs from "@/components/interest-page/interest-tabs";
import NextImage from "@/components/next-image";
import { getInterestBySlug } from "@/lib/fetch-interest-data";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const interest = await getInterestBySlug(
    params.slug,
    "name slug description thumbnail",
    "articles",
    "name slug thumbnail description updatedAt"
  );
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
      <div className="container">
        <div className="mt-28 w-[45%]">
          <h1 className="font-dancing font-bold text-[70px] text-admin_primary">
            {interest?.name}
          </h1>
          <p className="leading-8 text-justify">{interest?.description}</p>
        </div>

        <div className="mt-36">
          <InterestTabs
            articles={interest?.articles}
            interestId={interest?._id.toString()}
            interestSlug={params.slug}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
