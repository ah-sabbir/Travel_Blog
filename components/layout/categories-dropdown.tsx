import { CategoryEntity } from "@/entities/category.entity";
import Link from "next/link";
import { FC } from "react";
import SubArticleCard from "../sub-article-card";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  categories: CategoryEntity[] | undefined;
}

const CategoriesDropdown: FC<Props> = ({ categories }): JSX.Element => {
  return (
    <div className="header-dropdown-card top-[150%] -left-1/3 text-black_text w-[780px]">
      <Link
        href=""
        className="block w-full border-b border-light_gray pb-2 pt-6 px-6"
      >
        Danh mục
      </Link>
      <div className="grid grid-cols-4 gap-[10px] py-3 px-6">
        {categories?.map((category) => (
          <Link
            key={category._id.toString()}
            href=""
            className="header-dropdown-item"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-[10px] px-6 pt-2 pb-8">
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
        href=""
        className="flex items-center justify-center gap-2 py-3 bg-[#DFF0F0] hover:underline rounded-b-md"
      >
        Tất cả danh mục <FaChevronRight size={12} />
      </Link>
    </div>
  );
};

export default CategoriesDropdown;
