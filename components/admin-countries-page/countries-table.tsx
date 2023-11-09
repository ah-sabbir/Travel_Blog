"use client";

import { FC, useEffect, useState } from "react";
import { path } from "@/constant";
import { getAllCountries } from "@/lib/fetch-country-data";
import { CountryEntity } from "@/entities/country.entity";
import CustomModal from "../custom-modal";
import DeleteCountryForm from "./delete-country-form";
import AdminDataTable from "../admin-data-table";

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
      <AdminDataTable
        addBtnContent="Thêm quốc gia"
        addBtnLink={path.createCountry}
        dataArr={countries || []}
        editBtnLink={path.editCountry}
        isLoading={isLoading}
        name="quốc gia"
        setDeletedItem={setDeletedCountry}
        setShowDeleteHandler={setShowDeleteForm}
      />

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
