"use client";

import { FC, useEffect, useState } from "react";
import Logo from "../logo";
import { BiSolidChevronDown } from "react-icons/bi";
import { getAllCountries } from "@/lib/fetch-country-data";
import { CountryForHeader } from "@/dtos/country/get-all-countries.dto";
import DestinationsDropdown from "./destinations-dropdown";
import { getAllCategories } from "@/lib/fetch-category-data";
import { CategoryEntity } from "@/entities/category.entity";
import CategoriesDropdown from "./categories-dropdown";
import ServicesDropdown from "./services-dropdown";

interface Props {}
const liClasses =
  "group relative font-black flex justify-center items-center gap-1 hover:bg-[#f0f0f040] rounded-2xl pl-[10px] pr-1 py-1 transition cursor-pointer after:absolute after:top-full after:left-0 after:block after:bg-transparent after:w-full after:h-8";

const Header: FC<Props> = (props): JSX.Element => {
  const [countries, setCountries] = useState<CountryForHeader[]>();
  const [categories, setCategories] = useState<CategoryEntity[]>();

  const fetchCountries = async () => {
    const countries = await getAllCountries(
      "name slug",
      "5",
      "regions",
      "name slug",
      "16"
    );
    setCountries(countries as any);
  };

  const fetchCategories = async () => {
    const categories = await getAllCategories("name slug", "8");
    setCategories(categories as CategoryEntity[]);
  };

  const fetchData = () => {
    Promise.all([fetchCountries(), fetchCategories()]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header className="z-10 mx-4 fixed top-0 right-0 left-0 py-2 flex items-center justify-between text-white">
      <div className="flex items-center gap-8">
        <Logo wrapperClasses="w-[150px] h-[30px]" />

        <ul className="flex items-center gap-2">
          <li className={liClasses}>
            Điểm đến <BiSolidChevronDown size={18} />
            <DestinationsDropdown countries={countries} />
          </li>

          <li className={liClasses}>
            Danh mục <BiSolidChevronDown size={18} />
            <CategoriesDropdown categories={categories} />
          </li>

          <li className={liClasses}>
            Dịch vụ
            <BiSolidChevronDown size={18} />
            <ServicesDropdown />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
