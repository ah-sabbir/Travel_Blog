import NextImage from "@/components/next-image";
import RegionTabs from "@/components/region-page/region-tabs";
import { getRegionBySlug } from "@/lib/fetch-region-data";
import { NextPage } from "next";

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
        <div className="mt-28 w-[45%]">
          <h1 className="font-dancing font-bold text-[70px] text-admin_primary">
            Du lịch {region?.name}
          </h1>
          <p className="leading-8 text-justify">{region?.description}</p>
        </div>

        <div className="h-[550px]"></div>
      </div>

      <div className="container mt-10">
        <RegionTabs region={region} />
      </div>
    </>
  );
};

export default Page;
