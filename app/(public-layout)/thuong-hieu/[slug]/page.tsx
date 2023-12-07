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
        <div className="flex gap-16">
          <div className="w-1/2">
            <div className="flex items-center gap-2">
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

            <h1 className="font-dancing font-bold text-[70px] text-admin_primary mt-10">
              {brand?.name}
            </h1>

            <p className="leading-8 text-justify">{brand?.description}</p>
          </div>

          <div className="flex-1 border shadow-md rounded-md h-fit">
            <div className="w-full relative aspect-video rounded-t-md">
              <NextImage
                src={brand?.logo.url || ""}
                alt={brand?.name || ""}
                priority
                className="rounded-t-md"
              />
            </div>

            <div className="px-4 py-2 text-sm">
              <div className="flex items-center justify-between pt-2 pb-4 border-b">
                <span className="flex items-center gap-1">
                  <BiSolidDashboard />
                  Loại thương hiệu :{" "}
                </span>
                <Link
                  href={`${path.brand}${brand?.brandType.slug}`}
                  className="font-semibold text-admin_primary underline"
                >
                  {brand?.brandType?.name}
                </Link>
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <span className="flex items-center gap-1 flex-1">
                  <GiEarthAmerica />
                  Website :{" "}
                </span>
                <a
                  href={brand?.affLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-admin_primary underline ml-auto w-[70%] line-clamp-1 flex justify-end"
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
      </div>
    </>
  );
};

export default Page;
