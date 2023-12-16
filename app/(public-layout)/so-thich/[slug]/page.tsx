import InterestTabs from "@/components/interest-page/interest-tabs";
import NextImage from "@/components/next-image";
import { getInterestBySlug } from "@/lib/fetch-interest-data";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const interest = await getInterestBySlug(params.slug);

    return {
      title: interest?.name,
      description: interest?.description,
    };
  } catch (error) {
    console.log(error);
  }
};

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
      <div className="container flex">
        <div className="w-[43%] mt-28 max-[1250px]:w-full max-[1250px]:mt-10">
          <h1 className="sub-page-heading-type-2 !text-[60px]">
            {interest?.name}
          </h1>
          <p className="leading-8 text-justify">{interest?.description}</p>
        </div>

        <div className="h-[550px] max-[1250px]:hidden"></div>
      </div>

      <div className="container mt-12">
        <InterestTabs interestId={interest?._id.toString()} />
      </div>
    </>
  );
};

export default Page;
