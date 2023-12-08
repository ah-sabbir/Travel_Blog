import AllDestinationsTabs from "@/components/all-destinations-page/all-destinations-tabs";
import SmallItemSwiper from "@/components/smaill-item-swiper";
import { path } from "@/constant";
import { getAllDestinations } from "@/lib/fetch-destination-data";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async () => {
  const destinations = await getAllDestinations("name slug thumbnail");
  return (
    <>
      <div className="sub-page-cover">
        <div className="container pt-24">
          <h1 className="font-dancing font-bold text-admin_primary mb-2 text-[60px] text-center">
            Những địa danh đã ghé thăm
          </h1>
          <div>
            <SmallItemSwiper items={destinations} coreSlug={path.destination} />
          </div>
        </div>
      </div>

      <AllDestinationsTabs destinations={destinations} />
    </>
  );
};

export default Page;

