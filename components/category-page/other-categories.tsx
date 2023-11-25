import { path } from "@/constant";
import { CategoryEntity } from "@/entities/category.entity";
import { getAllCategories } from "@/lib/fetch-category-data";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  currentId: string | undefined;
}

const OtherCategories: FC<Props> = ({ currentId }): JSX.Element => {
  const [categories, setCategories] = useState<CategoryEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchOtherCategories = async () => {
    setIsLoading(true);
    const allCategories = await getAllCategories("name slug");

    const otherCategories = allCategories?.filter(
      (category) => category._id.toString() !== currentId
    );

    setCategories(otherCategories);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOtherCategories();
  }, []);

  return (
    <div className="grid grid-cols-8 gap-[10px] py-3 px-6 flex-wrap">
      {isLoading ? (
        <>
          {[...Array(16).keys()].map((item) => (
            <Skeleton className="w-full h-[40px] !rounded-[40px]" key={item} />
          ))}
        </>
      ) : (
        <>
          {categories?.map((category) => (
            <Link
              key={category._id.toString()}
              href={`${path.category}${category.slug}`}
              className="header-dropdown-item"
            >
              {category.name}
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default OtherCategories;
