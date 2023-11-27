import DestinationTabs from "@/components/destination-page/destination-tabs";
import NextImage from "@/components/next-image";
import { getDestinationBySlug } from "@/lib/fetch-destination-data";
import { NextPage } from "next";

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
      <div className="country-page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src={destination?.thumbnail.url || ""}
            alt={destination?.name || ""}
            priority
          />
        </div>
      </div>
      <div className="container">
        <div className="mt-28 w-[45%]">
          <h1 className="font-dancing font-bold text-[70px] text-admin_primary">
            {destination?.name}
          </h1>

          <p className="leading-8 text-justify">{destination?.description}</p>
        </div>

        <div className="mt-36">
          <DestinationTabs destination={destination} />
        </div>
      </div>
    </>
  );
};

export default Page;
