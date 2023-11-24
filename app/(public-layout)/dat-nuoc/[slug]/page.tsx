import CountryTabs from "@/components/country-page/country-tabs";
import NextImage from "@/components/next-image";
import { getCountryBySlug } from "@/lib/fetch-country-data";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const country = await getCountryBySlug(
    params.slug,
    "name slug description thumbnail content"
  );
  return (
    <>
      <div className="country-page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src={country?.thumbnail.url || ""}
            alt={country?.name || ""}
            priority
          />
        </div>
      </div>
      <div className="container">
        <div className="mt-28 w-[45%]">
          <h1 className="font-dancing font-bold text-[70px] text-admin_primary">
            Du lịch {country?.name}
          </h1>
          <p className="leading-8 italic text-justify">
            {country?.description}
          </p>
        </div>

        <div className="mt-36">
          <CountryTabs country={country} />
        </div>
      </div>
    </>
  );
};

export default Page;
