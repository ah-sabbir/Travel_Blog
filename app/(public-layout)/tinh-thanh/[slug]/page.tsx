import NextImage from "@/components/next-image";
import RegionTabs from "@/components/region-page/region-tabs";
import { getRegionBySlug } from "@/lib/fetch-region-data";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const region = await getRegionBySlug(params.slug, "name description");

    return {
      title: region?.name,
      description: region?.description,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const region = await getRegionBySlug(
    params.slug,
    "name slug description thumbnail content countryId"
  );
  return (
    <>
      <div className="page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src={region?.thumbnail.url || ""}
            alt={region?.name || ""}
            priority
          />
        </div>
      </div>
      <div className="container flex">
        <div className="w-[43%] mt-28 max-[1250px]:w-full max-[1250px]:mt-10">
          <h1 className="sub-page-heading-type-2 !text-[60px]">
            Du lịch {region?.name}
          </h1>
          <p className="leading-8 text-justify">{region?.description}</p>
        </div>

        <div className="h-[550px] max-[1250px]:hidden"></div>
      </div>

      <div className="container mt-10">
        <RegionTabs region={region} />
      </div>
    </>
  );
};

export default Page;
