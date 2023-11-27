import { FC } from "react";
import ArticleContent from "../article-page/article-content";
import { DestinationEntity } from "@/entities/destination.entity";
import BtnWithIcon from "../btn-with-icon";
import { path } from "@/constant";

interface Props {
  destination: DestinationEntity | undefined;
}

const DestinationContent: FC<Props> = ({ destination }): JSX.Element => {
  return (
    <>
      <div>
        <div className="mb-8 space-y-1 text-black_text">
          <p className="leading-8">
            <span className="font-semibold"> Địa chỉ: </span>
            {destination?.address}
          </p>

          <p className="leading-8 flex items-center gap-2">
            <span className="font-semibold">
              Thành phố / tỉnh / vùng miền:{" "}
            </span>
            <BtnWithIcon
              to={`${path.region}${destination?.region?.slug}`}
              content={destination?.region?.name}
              customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-xs"
            />
            <BtnWithIcon
              to={`${path.country}${destination?.country?.slug}`}
              content={destination?.country?.name}
              customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-xs"
            />
          </p>

          <p className="leading-8 flex items-center gap-2">
            <span className="font-semibold">Danh mục: </span>
            <BtnWithIcon
              to={`${path.interest}${destination?.interest?.slug}`}
              content={destination?.interest?.name}
              customClasses="!py-1 !rounded-[40px] before:!rounded-[40px] !text-xs"
            />
          </p>

          <p className="leading-8">
            <span className="font-semibold">Cách đến đó: </span>
            {destination?.instruction}
          </p>
        </div>

        <div className="content prose prose-img:w-full prose-h2:text-admin_primary prose-h2:font-extrabold prose-h3:font-extrabold text-justify">
          <ArticleContent content={destination?.content} />
        </div>
      </div>
    </>
  );
};

export default DestinationContent;
