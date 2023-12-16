import DestinationTabs from "@/components/destination-page/destination-tabs";
import NextImage from "@/components/next-image";
import { getDestinationBySlug } from "@/lib/fetch-destination-data";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const destination = await getDestinationBySlug(
      params.slug,
      "name description"
    );

    return {
      title: destination?.name,
      description: destination?.description,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const destination = await getDestinationBySlug(
    params.slug,
    "name slug description thumbnail instruction address content images",
    true,
    "name slug"
  );

  return (
    <>
      <div className="page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src={destination?.thumbnail.url || ""}
            alt={destination?.name || ""}
            priority
          />
        </div>
      </div>
      <div className="container flex">
        <div className="w-[43%] mt-28 max-[1250px]:w-full max-[1250px]:mt-10">
          <h1 className="sub-page-heading-type-2 !text-[60px]">
            {destination?.name}
          </h1>

          <p className="leading-8 text-justify">{destination?.description}</p>
        </div>

        <div className="h-[550px] max-[1250px]:hidden"></div>
      </div>

      <div className="mt-12 container">
        <DestinationTabs destination={destination} />
      </div>
    </>
  );
};

export default Page;
