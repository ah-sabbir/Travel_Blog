import CountryTabs from "@/components/country-page/country-tabs";
import NextImage from "@/components/next-image";
import { getCountryBySlug } from "@/lib/fetch-country-data";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const country = await getCountryBySlug(params.slug);

    return {
      title: country?.name,
      description: country?.description,
    };
  } catch (error) {
    console.log(error);
  }
};

const Page: NextPage<Props> = async ({ params }) => {
  const country = await getCountryBySlug(
    params.slug,
    "name slug description thumbnail content"
  );
  return (
    <>
      <div className="page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src={country?.thumbnail.url || ""}
            alt={country?.name || ""}
            priority
          />
        </div>
      </div>
      <div className="container flex">
        <div className="w-[43%] mt-24 max-[1250px]:w-full max-[1250px]:mt-10">
          <h1 className="sub-page-heading-type-2">Du lịch {country?.name}</h1>
          <p className="leading-8 text-justify">{country?.description}</p>
        </div>

        <div className="h-[550px] max-[1250px]:hidden"></div>
      </div>

      <div className="mt-12 container">
        <CountryTabs country={country} />
      </div>
    </>
  );
};

export default Page;
