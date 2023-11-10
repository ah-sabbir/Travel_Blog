"use client";

import { FC, useEffect, useState } from "react";
import { path } from "@/constant";
import { getAllCountries } from "@/lib/fetch-country-data";
import { CountryEntity } from "@/entities/country.entity";
import CustomModal from "../custom-modal";
import DeleteCountryForm from "./delete-country-form";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";

interface Props {}

const CountriesTable: FC<Props> = (): JSX.Element => {
  const [countries, setCountries] = useState<CountryEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletedCountry, setDeletedCountry] = useState<CountryEntity>();

  const fetchCountries = async () => {
    setIsLoading(true);
    const fetchedCountries = await getAllCountries();
    setCountries(fetchedCountries as CountryEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm quốc gia"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createCountry}
            customClasses="w-fit ml-auto block"
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên quốc gia</th>
              <th>Đường dẫn (Slug)</th>
              <th>Số bài viết</th>
              <th>Số galleries</th>
              <th>Sửa / Xóa</th>
            </tr>
          </thead>

          {isLoading ? (
            <>
              {[...Array(6).keys()].map((item) => (
                <tr key={item} className="mb-3">
                  <td colSpan={5}>
                    <Skeleton className="w-full h-10" />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tbody>
              {countries.map((country) => (
                <tr key={country._id.toString()}>
                  <td className="text-center">{country.name}</td>
                  <td className="text-center">{country.slug}</td>
                  <td className="text-center">{country.articles.length}</td>
                  <td className="text-center">{country.galleries.length}</td>
                  <td className="flex items-center justify-center gap-4">
                    <Link href={`${path.editCountry}?slug=${country.slug}`}>
                      <MdEditSquare
                        className="mt-1 cursor-pointer text-blue-900"
                        size={18}
                      />
                    </Link>
                    <AiFillDelete
                      className="mt-1 cursor-pointer text-red-700"
                      size={18}
                      onClick={() => {
                        setShowDeleteForm(true);
                        setDeletedCountry(country);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteCountryForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchCountries}
          deletedCountry={deletedCountry as CountryEntity}
        />
      </CustomModal>
    </>
  );
};

export default CountriesTable;
