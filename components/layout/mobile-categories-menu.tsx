import Link from "next/link";
import { FC } from "react";
import SubArticleCard from "../sub-article-card";
import { FaChevronRight } from "react-icons/fa";
import { path } from "@/constant";
import { categoryMenu } from "@/data/menu";

interface Props {}

const MobileCategoriesMenu: FC<Props> = (): JSX.Element => {
  return (
    <div className="text-black_text">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[10px]">
        {categoryMenu?.map((category) => (
          <Link
            key={category.name}
            href={`${path.category}${category.slug}`}
            className="header-dropdown-item"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 max-[750px]:grid-cols-1 gap-[10px] pt-2 pb-4">
        <SubArticleCard
          image="/assets/images/header/article-1.jpg"
          slug=""
          title="13 mẹo đơn giản để giảm thiểu sử dụng nhựa khi du lịch"
        />
        <SubArticleCard
          image="/assets/images/header/article-2.jpg"
          slug=""
          title="Làm thế nào để trở thành 1 Travel Blogger?"
        />
      </div>

      <Link
        href={path.allCategories}
        className="flex items-center justify-center gap-2 py-3 bg-[#DFF0F0] hover:underline rounded-md"
      >
        Tất cả danh mục <FaChevronRight size={12} />
      </Link>
    </div>
  );
};

export default MobileCategoriesMenu;
