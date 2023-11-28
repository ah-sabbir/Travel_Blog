import AllCountriesTabs from "@/components/all-countries-page/all-countries-tabs";
import { domain } from "@/constant";
import { getAllCountries } from "@/lib/fetch-country-data";
import { formatShortDate } from "@/lib/format-date";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const countries = await getAllCountries("name");
  return (
    <>
      <div className="sub-page-cover relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <h1 className="font-dancing font-bold text-admin_primary mb-2 text-[60px] text-center">
            Những quốc gia đã đi qua
          </h1>
          <p className="text-center text-lg font-semibold flex items-center gap-3 justify-center">
            Từ ngày 03/11/2023 đến {formatShortDate(new Date().toDateString())}
          </p>
        </div>
      </div>

      <AllCountriesTabs countries={countries} />
    </>
  );
};

export default Page;
