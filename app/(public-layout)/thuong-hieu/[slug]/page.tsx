import BrandTabs from "@/components/brand-page/brand-tabs";
import BtnWithIcon from "@/components/btn-with-icon";
import NextImage from "@/components/next-image";
import { path } from "@/constant";
import { getBrandBySlug } from "@/lib/fetch-brand-data";
import { NextPage } from "next";
import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { GiEarthAmerica } from "react-icons/gi";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const brand = await getBrandBySlug(params.slug);

  return (
    <>
      <div className="container mt-28">
        <div className="flex gap-16 max-[890px]:gap-8 max-[750px]:block">
          <div className="w-1/2 max-[750px]:w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <BtnWithIcon
                icon={FaAngleLeft}
                content=""
                customClasses="grid place-items-center h-[28px] w-[28px] !p-0 !rounded-full before:!rounded-full !text-sm"
                to={path.allBrands}
              />

              {brand?.brandType?.name && (
                <BtnWithIcon
                  to={`${path.brand}${brand.brandType.slug}`}
                  content={brand?.brandType?.name}
                  customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-sm"
                />
              )}
            </div>

            <h1 className="sub-page-heading-type-2 !text-[60px] mt-10">
              {brand?.name}
            </h1>

            <p className="leading-8 text-justify">{brand?.description}</p>
          </div>

          <div className="flex-1 border shadow-md rounded-md h-fit max-[750px]:mt-4">
            <div className="w-full relative aspect-video rounded-t-md">
              <NextImage
                src={brand?.logo.url || ""}
                alt={brand?.name || ""}
                priority
                className="rounded-t-md"
              />
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center justify-between pt-2 pb-4 border-b flex-wrap gap-2">
                <span className="flex items-center gap-1">
                  <BiSolidDashboard />
                  Loại thương hiệu :{" "}
                </span>
                <Link
                  href={`${path.brandType}${brand?.brandType.slug}`}
                  className="font-semibold text-admin_primary underline"
                >
                  {brand?.brandType?.name}
                </Link>
              </div>

              <div className="flex items-center justify-between py-4 border-b flex-wrap gap-2">
                <span className="flex items-center gap-1">
                  <GiEarthAmerica />
                  Website :{" "}
                </span>
                <a
                  href={brand?.affLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-admin_primary underline line-clamp-1"
                >
                  {brand?.link}
                </a>
              </div>

              <BtnWithIcon
                content={`Đến ${brand?.name}`}
                iconBehind={FiExternalLink}
                iconCustomClasses="-mt-1"
                iconSize={14}
                customClasses="!mt-6 !mb-4 !w-full !text-lg !block"
                external
                href={brand?.affLink}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <BrandTabs brand={brand} />
        </div>
      </div>
    </>
  );
};

export default Page;
