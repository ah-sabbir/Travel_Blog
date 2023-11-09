"use client";

import { FC, useEffect, useState } from "react";
import { path } from "@/constant";
import { CountryEntity } from "@/entities/country.entity";
import CustomModal from "../custom-modal";
import DeleteCountryForm from "../admin-countries-page/delete-country-form";
import AdminDataTable from "../admin-data-table";
import { RegionEntity } from "@/entities/region.entity";
import { getAllRegions } from "@/lib/fetch-region-data";

interface Props {}

const RegionsTable: FC<Props> = (): JSX.Element => {
  const [regions, setRegions] = useState<RegionEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletedRegion, setDeletedRegion] = useState<RegionEntity>();

  const fetchRegions = async () => {
    setIsLoading(true);
    const fetchedRegions = await getAllRegions();
    setRegions(fetchedRegions as RegionEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  return (
    <>
      <AdminDataTable
        addBtnContent="Thêm tỉnh / vùng miền"
        addBtnLink={path.createRegion}
        dataArr={regions || []}
        editBtnLink={path.editRegion}
        isLoading={isLoading}
        name="vùng / miền"
        setDeletedItem={setDeletedRegion}
        setShowDeleteHandler={setShowDeleteForm}
      />

      <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteCountryForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchRegions}
          deletedCountry={deletedRegion as CountryEntity}
        />
      </CustomModal>
    </>
  );
};

export default RegionsTable;
